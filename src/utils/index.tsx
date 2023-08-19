export { YT_V3, readYoutubePlayerState } from './yt_v3'

export function secToHMS(
  seconds: number,
  type: 'HMS' | 'colon' = 'colon'
): string {
  const H = Math.floor(seconds / 3600)
  const M = Math.floor((seconds % 3600) / 60)
  const S = Math.floor(seconds % 60)

  switch (type) {
    case 'HMS':
      return `${H}h ${M}m ${S}s`
    case 'colon':
      return `${H ? H + ':' : ''}${M || 0}:${S.toString().padStart(2, '0')}`
  }
}
