import {useEffect} from 'react'
import {createLazyFileRoute} from '@tanstack/react-router'
import cx from 'classnames'
import {useStore} from '@nanostores/react'

import {$videoTimestamp} from '../store/timestamps'

import {automator} from '../utils/exhibition/exhibition-automator'
import {$exhibitionStatus, $canPlay, $videoMode} from '../store/exhibition'

import {EXHIBITION_VIDEO_SOURCES} from '../constants/exhibition-videos'

export const Route = createLazyFileRoute('/video')({
  component: VideoRoute,
})

function VideoRoute() {
  const status = useStore($exhibitionStatus)
  const canPlay = useStore($canPlay)

  const isVideoShown = status.type === 'active'

  useEffect(() => {
    $videoMode.set(true)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (!automator.videoRef) return
      if (automator.videoRef.readyState < 3) return

      const actualTime = automator.videoRef.currentTime
      const expectedTime = automator.elapsed
      const drift = actualTime - expectedTime

      if (Math.abs(drift) > 1.5) {
        automator.videoRef.currentTime = expectedTime
        console.log(`[video] drift by ${drift}s`)
      }
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-full font-mono min-h-screen bg-black text-white gap-y-8 relative">
      {!canPlay && (
        <div
          className="flex items-center justify-center absolute w-full h-full z-50 bg-black bg-opacity-70"
          onClick={() => {
            automator.playVideo()
          }}
        >
          <div className="border border-green-300 text-green-300 px-4 py-2">
            click anywhere to allow video to play
          </div>
        </div>
      )}

      <video
        src={EXHIBITION_VIDEO_SOURCES.lecture}
        preload="auto"
        ref={(ref) => ref && automator.initVideo(ref)}
        className={cx(
          'w-full h-full',
          isVideoShown ? 'opacity-100' : 'opacity-5'
        )}
        onClick={() => automator.playVideo()}
        onTimeUpdate={(e) => $videoTimestamp.set(e.currentTarget.currentTime)}
      ></video>
    </div>
  )
}
