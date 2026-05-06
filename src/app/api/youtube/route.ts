import { NextResponse } from 'next/server'

const API_KEY    = process.env.YOUTUBE_API_KEY
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID

// Server-side in-memory cache — survives between requests within the same worker
let _cache: { payload: YouTubePayload; at: number } | null = null
const TTL = 5 * 60 * 1000 // 5 minutes

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
  const res = await fetch(url, { next: { revalidate: 300 } })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(`YouTube API ${res.status}: ${JSON.stringify(err)}`)
  }
  return res.json()
}

const HEADERS = {
  'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
}

export async function GET() {
  // Serve from cache if fresh
  if (_cache && Date.now() - _cache.at < TTL) {
    return NextResponse.json(_cache.payload, { headers: HEADERS })
  }

  // Not configured — return empty payload so UI can show fallback
  if (!API_KEY || !CHANNEL_ID) {
    const payload: YouTubePayload = {
      isLive: false, liveVideoId: null, liveTitle: null, liveUrl: null,
      videos: [], configured: false,
    }
    return NextResponse.json(payload, { headers: HEADERS })
  }

  try {
    const [liveData, videosData] = await Promise.all([
      ytGet(`search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&maxResults=1`),
      ytGet(`search?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&maxResults=4`),
    ])

    const liveItem   = liveData.items?.[0]
    const liveVidId  = liveItem?.id?.videoId ?? null

    const videos: VideoItem[] = (videosData.items ?? []).map((item: any) => ({
      id:          item.id.videoId,
      title:       item.snippet.title,
      thumbnail:   item.snippet.thumbnails.high?.url
                ?? item.snippet.thumbnails.medium?.url
                ?? item.snippet.thumbnails.default?.url
                ?? '',
      publishedAt: item.snippet.publishedAt,
    }))

    const payload: YouTubePayload = {
      isLive:      Boolean(liveItem),
      liveVideoId: liveVidId,
      liveTitle:   liveItem?.snippet?.title ?? null,
      liveUrl:     liveVidId ? `https://www.youtube.com/watch?v=${liveVidId}` : null,
      videos,
      configured:  true,
    }

    _cache = { payload, at: Date.now() }
    return NextResponse.json(payload, { headers: HEADERS })
  } catch (err) {
    console.error('[/api/youtube]', err)
    // Return graceful empty response — UI shows fallback
    return NextResponse.json(
      { isLive: false, liveVideoId: null, liveTitle: null, liveUrl: null, videos: [], configured: true },
      { status: 200, headers: HEADERS }
    )
  }
}
