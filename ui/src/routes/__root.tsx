import {Outlet, createRootRoute} from '@tanstack/react-router'

import {HeadlessController} from '../components/HeadlessController'
import {StatusIndicator} from '../dictation'
import {CurrentProgramBadge} from '../components/CurrentProgramBadge'
import FadeToBlack from '../components/FadeToBlack'
import {ProgressBadge} from '../components/ProgressBadge'
import {AnimatedNoise} from '../components/AnimatedNoise'
import {ExhibitionFallbackVideo} from '../components/ExhibitionFallbackVideo'
import {SettingsButton} from '../components/SettingsButton'
import {ProgramErrorBoundary} from '../components/ErrorBoundary'
import {WaitingRoomScreen} from '../components/WaitingScreen'
import {ClosedScreen} from '../components/ClosedScreen'
import {ProgramTimeBadge} from '../components/CurrentTimeBadge'

export const Route = createRootRoute({
  component: () => (
    <ProgramErrorBoundary>
      <div className="fixed flex left-3 bottom-3 z-[1000000] gap-x-1">
        <SettingsButton />
        <CurrentProgramBadge />
        <ProgressBadge />
        <ProgramTimeBadge />
      </div>

      <FadeToBlack />

      <WaitingRoomScreen />
      <ClosedScreen />
      <ExhibitionFallbackVideo />

      <Outlet />

      <div className="fixed right-3 bottom-3 z-10">
        <StatusIndicator />
      </div>

      <AnimatedNoise />
      <HeadlessController />
    </ProgramErrorBoundary>
  ),
})
