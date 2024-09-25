import {useStore} from '@nanostores/react'

import {$fadeStatus} from '../store/fader'
import {useMatchRoute} from '@tanstack/react-router'
import {useIsVideo} from '../hooks/useIsVideo'
import {$exhibitionStatus} from '../store/exhibition'

export const FadeToBlack = () => {
  const fadeStatus = useStore($fadeStatus)

  const mr = useMatchRoute()
  const isVideo = useIsVideo()
  const cannotFadeToBlack = mr({to: '/'}) || mr({to: '/transcript-tester'})
  const exhitionStatus = useStore($exhibitionStatus)

  const isVisible = isVideo ? exhitionStatus.type === 'active' : fadeStatus

  if (cannotFadeToBlack) return null

  return (
    <div
      className={`fixed z-[100000] w-full h-full top-0 left-0 inset-0 bg-black transition-opacity duration-[5s] ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{pointerEvents: isVisible ? 'auto' : 'none'}}
    />
  )
}

export default FadeToBlack
