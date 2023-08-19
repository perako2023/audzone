export class YT_V3 {
  static formatDuration(ISO_8601_duration: string, type: 'hms' | 'colon') {
    let result = ISO_8601_duration
    const H = ISO_8601_duration.match(/\d*H/)?.[0]
    const M = ISO_8601_duration.match(/\d*M/)?.[0]
    const S = ISO_8601_duration.match(/\d*S/)?.[0]
    switch (type) {
      case 'hms':
        result = `${H || ''} ${M || ''} ${S || result}`.toLowerCase()
        break

      case 'colon':
        result =
          `${H !== undefined ? parseInt(H) + ':' : ''}` +
          `${M !== undefined ? parseInt(M) + ':' : ''}` +
          `${
            S !== undefined
              ? parseInt(S).toString().padStart(2, '0')
              : ISO_8601_duration
          }`
        break
    }

    return result
  }
}

export function readYoutubePlayerState(youtubePlayerState: number) {
  switch (youtubePlayerState) {
    case -1:
      return 'unstarted'
    case 0:
      return 'ended'
    case 1:
      return 'playing'

    case 2:
      return 'paused'

    case 3:
      return 'buffering'

    case 5:
      return 'video cued'
  }
}
