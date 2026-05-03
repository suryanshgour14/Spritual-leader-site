import { NextResponse } from 'next/server'

export const runtime = 'edge'
export const revalidate = 60

export async function GET() {
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID
  const API_KEY = process.env.YOUTUBE_API_KEY

  if (!CHANNEL_ID || !API_KEY) {
    return NextResponse.json({ isLive: false, liveUrl: null })
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&eventType=live&key=${API_KEY}`,
      { next: { revalidate: 60 } }
    )
    const data = await res.json()
    const isLive = data.items && data.items.length > 0
    const liveUrl = isLive
      ? `https://youtube.com/watch?v=${data.items[0].id.videoId}`
      : null

    return NextResponse.json({ isLive, liveUrl })
  } catch {
    return NextResponse.json({ isLive: false, liveUrl: null })
  }
}
