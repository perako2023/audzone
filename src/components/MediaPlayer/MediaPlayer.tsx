import css from './MediaPlayer.module.css'
import YouTubePlayer from 'react-player/youtube'
import VideoProgressbar from '../VideoProgressbar'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { OnProgressProps } from 'react-player/base'
import { YT_V3, secToHMS } from '../../utils'
import { useVideoState } from '../../Context/VideoStateContext'
import { PlayPauseIcon, SkipBackIcon, SkipForwardIcon } from './ButtonIcons'

type InternalPlayer = {
    playVideo: () => void
    pauseVideo: () => void
    seekTo: (seconds: number) => void
    // getPlayerState: () => number
    // getCurrentTime: () => number
    // getDuration: () => number
}

export const MediaPlayer = () => {
    const [loading, setLoading] = useState(true)
    const youTubePlayerRef = useRef<YouTubePlayer>(null)
    const [internalPlayer, setInternalPlayer] = useState<InternalPlayer>()
    const [playing, setPlaying] = useState(false)
    const [playedSeconds, setPlayedSeconds] = useState(0)
    const {
        id: videoId,
        thumbnailUrl,
        duration,
        title,
        channelTitle,
    } = useVideoState()

    useEffect(() => {
        //* keep checking until it gets the internal player
        console.count('youTubePlayerRef changed')
        function tryUpdateInternalPlayer() {
            // prettier-ignore
            console.count('interval for internal player getter is running\n count ')
            const player = youTubePlayerRef.current?.getInternalPlayer()
            if (player) {
                setInternalPlayer(player as InternalPlayer)
                setLoading(false)
                clearInterval(interval)
            }
        }
        const interval = setInterval(tryUpdateInternalPlayer, 1000)
        return () => clearInterval(interval)
    }, [youTubePlayerRef])

    function handlePlayPause() {
        setPlaying((prevPlaying) => {
            prevPlaying
                ? internalPlayer?.pauseVideo()
                : internalPlayer?.playVideo()
            return !prevPlaying
        })
    }

    function handleSkip(seconds: number) {
        const newDuration = playedSeconds + seconds
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
                // controls
                url={`https://www.youtube.com/watch?v=${videoId}`}
            />
            <div className={css['player-manager']}>
                <div className={css['player-info']}>
                    <img
                        className={css['info__thumbnail']}
                        src={thumbnailUrl}
                        alt="thumbnail"
                    />
                    <div className={css['info']}>
                        <div className={css['info__title']}>{title}</div>
                        <div className={css['info__channel-title']}>
                            {channelTitle ?? '???'}
                        </div>
                    </div>
                </div>
                <div className={css['player-duration']}>
                    <div>{secToHMS(playedSeconds)}</div>
                    <VideoProgressbar
                        onChange={handleSliderSeek}
                        value={playedSeconds}
                        max={YT_V3.formatDuration(duration ?? '', 'seconds')}
                        className={css['duration__range']}
                    />
                    <div>{YT_V3.formatDuration(duration ?? '', 'colon')}</div>
                </div>
                <div className={css['player-controls']}>
                    <button
                        onClick={() => handleSkip(-5)}
                        className={css['control__btn']}>
                        <SkipBackIcon />
                    </button>
                    <button
                        onClick={handlePlayPause}
                        className={css['control__btn']}>
                        <PlayPauseIcon playing={playing} />
                    </button>
                    <button
                        onClick={() => handleSkip(5)}
                        className={`${css['control__btn']} tablet-hidden`}>
                        <SkipForwardIcon />
                    </button>
                </div>
            </div>
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
