import { NextResponse } from 'next/server'

const API_KEY    = process.env.YOUTUBE_API_KEY
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID

// Two independent server-side caches with different TTLs
// Live status changes frequently; videos change at most once per day
let _liveCache: {
  isLive: boolean; liveVideoId: string | null
  liveTitle: string | null; liveUrl: string | null; at: number
} | null = null

let _videosCache: { videos: VideoItem[]; at: number } | null = null

const LIVE_TTL   = 30 * 60 * 1000       // 30 min  — search.list costs 100 units
const VIDEOS_TTL =  6 * 60 * 60 * 1000  // 6 hours — playlistItems.list costs 1 unit

export interface VideoItem {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
}

export interface YouTubePayload {
  isLive: boolean
  liveVideoId: string | null
  liveTitle: string | null
  liveUrl: string | null
  videos: VideoItem[]
  configured: boolean
}

async function ytGet(path: string): Promise<any> {
  const url = `https://www.googleapis.com/youtube/v3/${path}&key=${API_KEY}`
  // cache: 'no-store' — we manage TTL ourselves via _liveCache / _videosCache
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(`YouTube API ${res.status}: ${JSON.stringify(err)}`)
  }
  return res.json()
}

// CDN header matches live TTL (the shorter of the two caches)
const HEADERS = {
  'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=120',
}

export async function GET() {
  if (!API_KEY || !CHANNEL_ID) {
    return NextResponse.json(
      { isLive: false, liveVideoId: null, liveTitle: null, liveUrl: null, videos: [], configured: false },
      { headers: HEADERS }
    )
  }

  const now = Date.now()
  const liveStale   = !_liveCache   || now - _liveCache.at   >= LIVE_TTL
  const videosStale = !_videosCache || now - _videosCache.at >= VIDEOS_TTL

  try {
    const fetches: Promise<void>[] = []

    if (liveStale) {
      fetches.push(
        ytGet(`search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&maxResults=1`)
          .then(data => {
            const item    = data.items?.[0]
            const videoId = item?.id?.videoId ?? null
            _liveCache = {
              isLive:      Boolean(item),
              liveVideoId: videoId,
              liveTitle:   item?.snippet?.title ?? null,
              liveUrl:     videoId ? `https://www.youtube.com/watch?v=${videoId}` : null,
              at:          now,
            }
          })
      )
    }

    if (videosStale) {
      // playlistItems.list costs 1 quota unit (vs search.list at 100 units)
      // Uploads playlist ID = "UU" + channelId.slice(2) — stable YouTube convention
      const uploadsId = 'UU' + CHANNEL_ID.slice(2)
      fetches.push(
        ytGet(`playlistItems?part=snippet&playlistId=${uploadsId}&maxResults=4`)
          .then(data => {
            const videos: VideoItem[] = (data.items ?? []).map((item: any) => ({
              id:          item.snippet.resourceId.videoId,
              title:       item.snippet.title,
              thumbnail:   item.snippet.thumbnails?.high?.url
                        ?? item.snippet.thumbnails?.medium?.url
                        ?? item.snippet.thumbnails?.default?.url
                        ?? '',
              publishedAt: item.snippet.publishedAt,
            }))
            _videosCache = { videos, at: now }
          })
      )
    }

    await Promise.all(fetches)
  } catch (err) {
    console.error('[/api/youtube]', err)
    // On error: keep whatever stale cache exists rather than serving empty
    if (!_liveCache)   _liveCache   = { isLive: false, liveVideoId: null, liveTitle: null, liveUrl: null, at: now }
    if (!_videosCache) _videosCache = { videos: [], at: now }
  }

  const payload: YouTubePayload = {
    isLive:      _liveCache?.isLive      ?? false,
    liveVideoId: _liveCache?.liveVideoId ?? null,
    liveTitle:   _liveCache?.liveTitle   ?? null,
    liveUrl:     _liveCache?.liveUrl     ?? null,
    videos:      _videosCache?.videos    ?? [],
    configured:  true,
  }

  return NextResponse.json(payload, { headers: HEADERS })
}
