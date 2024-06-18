import cx from 'classnames'

import {GuidanceSlider} from './GuidanceSlider'
import {PromptInput} from './PromptInput'
import {useStore} from '@nanostores/react'
import {
  $apiReady,
  $generating,
  $inferencePreview,
  $prompt,
} from '../store/prompt'
import {$guidance} from '../store/guidance'
import {socket} from '../manager/socket.ts'
import {AnimatedNoise} from './AnimatedNoise.tsx'
import {useCrossFade} from '../hooks/useCrossFade.tsx'

const MIN_KEYWORD_TRIGGER = 2

interface Props {
  keyword?: string
  command: string
}

export function PromptManager(props: Props) {
  const {keyword, command} = props

  const prompt = useStore($prompt)
  const isGenerating = useStore($generating)
  const guidance = useStore($guidance)
  const previewUrl = useStore($inferencePreview)
  const apiReady = useStore($apiReady)

  const {crossfading, prevUrl} = useCrossFade(previewUrl, false)

  const useKeyword = typeof keyword === 'string' && keyword.length > 0

  function handleChange(input: string) {
    $prompt.set(input)
    $inferencePreview.set('')

    if (useKeyword) {
      const isKeyword = input
        .trim()
        .toLowerCase()
        .endsWith(keyword.toLowerCase())

      const segments = input.split(' ')

      if (isKeyword && segments.length > MIN_KEYWORD_TRIGGER) {
        console.log(
          `generating "${input}" with guidance ${guidance} -> ${command}`
        )

        $generating.set(true)

        if (!apiReady) {
          console.log('[!!!!] socket not ready')
          return
        }

        console.log('program:', command, guidance)

        if (command === 'P2') {
          socket.sock.send(`P2:${(guidance / 100).toFixed(2)}`)
        } else if (command === 'P2B') {
          socket.sock.send(`P2B:${(guidance / 100).toFixed(2)}`)
        } else if (command === 'P3B') {
          socket.sock.send(`P3B:${input}`)
        } else {
          socket.sock.send(command)
        }
      }
    }
  }

  function handleGuidanceChange(value: number) {
    let valid = false

    if (useKeyword) {
      const isKeyword = prompt
        .trim()
        .toLowerCase()
        .endsWith(keyword.toLowerCase())

      const segments = prompt.split(' ')

      // if the keyword is not present or the prompt is too short
      if (!isKeyword || segments.length <= MIN_KEYWORD_TRIGGER) {
        return
      }
    }

    if (command === 'P2') {
      socket.sock.send(`P2:${(value / 100).toFixed(2)}`)
      valid = true
    } else if (command === 'P2B') {
      socket.sock.send(`P2B:${(value / 100).toFixed(2)}`)
      valid = true
    }

    if (valid) {
      $inferencePreview.set('')
      $generating.set(true)
    }
  }

  return (
    <div className="flex bg-[#424242] min-h-screen">
      <div className="fixed w-screen h-screen bg-transparent z-30">
        <div className="flex flex-col items-center justify-center w-full h-full bg-transparent">
          <PromptInput
            input={{
              disabled: isGenerating || !apiReady,
              onChange: (e) => handleChange(e.target.value),
              value: prompt,
              onKeyDown: (e) => {
                // freestyle inference
                if (e.key === 'Enter' && !useKeyword) {
                  if (!apiReady) {
                    console.log('[!!!!] socket not ready')
                    return
                  }

                  $generating.set(true)

                  const sys = `${command}:${prompt}`
                  console.log(`> sent "${sys}"`)

                  socket.sock.send(sys)
                }
              },
            }}
          />

          <div className="pt-4">
            <GuidanceSlider onChange={handleGuidanceChange} />
          </div>
        </div>
      </div>

      <div className="fixed flex items-center justify-center w-full h-full z-[1]">
        <div className="relative flex items-center justify-center w-full h-full">
          <img
            src={crossfading ? prevUrl : previewUrl}
            alt=""
            className={cx(
              'absolute h-screen object-cover object-center transition-opacity duration-[3s] ease-in-out pointer-events-none select-none z-[1]',
              previewUrl ? 'opacity-100' : 'opacity-0'
            )}
          />

          <img
            src={previewUrl}
            alt=""
            className={cx(
              'absolute h-screen object-cover object-center transition-opacity duration-[3s] ease-in-out pointer-events-none select-none z-[10]',
              crossfading ? 'opacity-100' : 'opacity-0'
            )}
          />
        </div>
      </div>

      <div className="z-0">
        <AnimatedNoise />
      </div>
    </div>
  )
}
