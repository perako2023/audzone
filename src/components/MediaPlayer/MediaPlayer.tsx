import css from './MediaPlayer.module.css'
import YouTubePlayer from 'react-player/youtube'
import VideoProgressbar from '../VideoProgressbar'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { OnProgressProps } from 'react-player/base'
import { secToHMS } from '../../utils'
import { useUserState } from '../../Context/UserStateContext'

type InternalPlayer = {
  playVideo: () => void
  pauseVideo: () => void
  seekTo: (seconds: number) => void
  getPlayerState: () => number
  getCurrentTime: () => number
  getDuration: () => number
  playerInfo: {
    videoData?: {
      title: string
      author: string
    }
  }
}

export const MediaPlayer = () => {
  const [loading, setLoading] = useState(true)
  const youTubePlayerRef = useRef<YouTubePlayer>(null)
  const [internalPlayer, setInternalPlayer] = useState<InternalPlayer>()
  const [playing, setPlaying] = useState(false)
  const [playedSeconds, setPlayedSeconds] = useState(0)
  const [videoId] = useUserState().useNowPlayingVideoId

  useEffect(() => {
    // keep checking until it gets the internal player
    setLoading(true)
    const interval = setInterval(() => {
      console.count('interval for internal player getter is running\n count: ')
      const player =
        youTubePlayerRef.current?.getInternalPlayer() as InternalPlayer
      if (player) {
        setInternalPlayer(player)
        setLoading(false)
        clearInterval(interval)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [youTubePlayerRef])

  function handlePlayPause() {
    setPlaying(!playing)
  }

  function handleSkip(seconds: number) {
    const newDuration = internalPlayer!.getCurrentTime() + seconds
    if (newDuration <= 0) {
      setPlayedSeconds(0)
    } else {
      setPlayedSeconds(newDuration)
      internalPlayer?.seekTo(newDuration)
    }
  }

  function handleProgress(state: OnProgressProps): void {
    const currentTime = state.playedSeconds
    setPlayedSeconds(Math.floor(currentTime))
  }

  function handleSliderSeek(event: ChangeEvent<HTMLInputElement>): void {
    const newDuration = event.target.valueAsNumber
    internalPlayer?.seekTo(newDuration)
    setPlayedSeconds(event.target.valueAsNumber)
  }

  return (
    <div className={css['media-player']}>
      {loading && <Skeleton />}
      <YouTubePlayer
        className={css['youtube-player']}
        onProgress={handleProgress}
        playing={playing}
        ref={youTubePlayerRef}
        height={'100%'}
        width={'100%'}
        controls
        url={`https://www.youtube.com/watch?v=${videoId}`}
      />

      {loading /* REVIEW */ ? (
        <Skeleton />
      ) : (
        <div className={css['player-manager']}>
          <div className={css['player-info']}>
            <img
              className={css['info__thumbnail']}
              src="https://miro.medium.com/v2/resize:fit:1400/1*sVSPf1ZdHnSSmAfDm328Hg.png"
              alt="thumbnail"
            />
            <div className={css['info']}>
              <div className={css['info__title']}>
                {internalPlayer?.playerInfo.videoData?.title}
              </div>
              <div className={css['info__channel-title']}>
                {internalPlayer?.playerInfo.videoData?.author || '???'}
              </div>
            </div>
          </div>
          <div className={css['player-duration']}>
            <div>{secToHMS(playedSeconds)}</div>
            <VideoProgressbar
              onChange={handleSliderSeek}
              value={playedSeconds}
              max={internalPlayer?.getDuration?.()}
              className={css['duration__range']}
            />
            <div>
              {secToHMS(internalPlayer?.getDuration?.() ?? 0) || '0:00'}
            </div>
          </div>
          <div className={css['player-controls']}>
            <button className={`${css['control__btn']} tablet-hidden`}>
              p
            </button>
            <button
              onClick={() => handleSkip(-5)}
              className={css['control__btn']}>
              -5
            </button>
            <button onClick={handlePlayPause} className={css['control__btn']}>
              {playing ? '⏸' : '▶'}
            </button>
            <button
              onClick={() => handleSkip(5)}
              className={`${css['control__btn']} tablet-hidden`}>
              +5
            </button>
            <button className={`${css['control__btn']} tablet-hidden`}>
              n
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/* REVIEW - page skeleton loader */
const Skeleton = () => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'black',
      opacity: 0.6,
      display: 'grid',
      placeContent: 'center',
    }}>
    loading...
  </div>
)
