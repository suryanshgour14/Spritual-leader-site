'use client'

type GTagEventName =
  | 'whatsapp_click'
  | 'katha_booking_initiated'
  | 'video_play'
  | 'live_banner_clicked'
  | 'language_toggle'
  | 'phone_call_clicked'
  | 'email_clicked'
  | 'social_link_clicked'
  | 'seva_donation_initiated'

interface EventParams {
  [key: string]: string | number | boolean | undefined
}

export function trackEvent(eventName: GTagEventName, params?: EventParams): void {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', eventName, params ?? {})
}

export const analytics = {
  whatsappClick: (source: string) =>
    trackEvent('whatsapp_click', { source }),

  kathaBookingInitiated: (topic: string) =>
    trackEvent('katha_booking_initiated', { topic }),

  videoPlayed: (videoId: string, title: string) =>
    trackEvent('video_play', { video_id: videoId, video_title: title }),

  liveBannerClicked: () =>
    trackEvent('live_banner_clicked'),

  languageToggled: (from: string, to: string) =>
    trackEvent('language_toggle', { from_locale: from, to_locale: to }),

  socialLinkClicked: (platform: 'youtube' | 'facebook' | 'instagram') =>
    trackEvent('social_link_clicked', { platform }),

  phoneCallClicked: () =>
    trackEvent('phone_call_clicked'),

  emailClicked: () =>
    trackEvent('email_clicked'),

  sevaDonationInitiated: (method: string) =>
    trackEvent('seva_donation_initiated', { method }),
}

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
  }
}
