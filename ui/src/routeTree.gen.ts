/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const TwoBLazyImport = createFileRoute('/two-b')()
const TwoLazyImport = createFileRoute('/two')()
const ThreeBLazyImport = createFileRoute('/three-b')()
const ThreeLazyImport = createFileRoute('/three')()
const OneLazyImport = createFileRoute('/one')()
const FourBLazyImport = createFileRoute('/four-b')()
const FourLazyImport = createFileRoute('/four')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const TwoBLazyRoute = TwoBLazyImport.update({
  path: '/two-b',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/two-b.lazy').then((d) => d.Route))

const TwoLazyRoute = TwoLazyImport.update({
  path: '/two',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/two.lazy').then((d) => d.Route))

const ThreeBLazyRoute = ThreeBLazyImport.update({
  path: '/three-b',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/three-b.lazy').then((d) => d.Route))

const ThreeLazyRoute = ThreeLazyImport.update({
  path: '/three',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/three.lazy').then((d) => d.Route))

const OneLazyRoute = OneLazyImport.update({
  path: '/one',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/one.lazy').then((d) => d.Route))

const FourBLazyRoute = FourBLazyImport.update({
  path: '/four-b',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/four-b.lazy').then((d) => d.Route))

const FourLazyRoute = FourLazyImport.update({
  path: '/four',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/four.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/four': {
      preLoaderRoute: typeof FourLazyImport
      parentRoute: typeof rootRoute
    }
    '/four-b': {
      preLoaderRoute: typeof FourBLazyImport
      parentRoute: typeof rootRoute
    }
    '/one': {
      preLoaderRoute: typeof OneLazyImport
      parentRoute: typeof rootRoute
    }
    '/three': {
      preLoaderRoute: typeof ThreeLazyImport
      parentRoute: typeof rootRoute
    }
    '/three-b': {
      preLoaderRoute: typeof ThreeBLazyImport
      parentRoute: typeof rootRoute
    }
    '/two': {
      preLoaderRoute: typeof TwoLazyImport
      parentRoute: typeof rootRoute
    }
    '/two-b': {
      preLoaderRoute: typeof TwoBLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  FourLazyRoute,
  FourBLazyRoute,
  OneLazyRoute,
  ThreeLazyRoute,
  ThreeBLazyRoute,
  TwoLazyRoute,
  TwoBLazyRoute,
])

/* prettier-ignore-end */
