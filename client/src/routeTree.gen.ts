/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as PlayerPlayerIdImport } from './routes/player.$playerId'
import { Route as LeaguestatsYearImport } from './routes/leaguestats.$year'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const PlayerPlayerIdRoute = PlayerPlayerIdImport.update({
  id: '/player/$playerId',
  path: '/player/$playerId',
  getParentRoute: () => rootRoute,
} as any)

const LeaguestatsYearRoute = LeaguestatsYearImport.update({
  id: '/leaguestats/$year',
  path: '/leaguestats/$year',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/leaguestats/$year': {
      id: '/leaguestats/$year'
      path: '/leaguestats/$year'
      fullPath: '/leaguestats/$year'
      preLoaderRoute: typeof LeaguestatsYearImport
      parentRoute: typeof rootRoute
    }
    '/player/$playerId': {
      id: '/player/$playerId'
      path: '/player/$playerId'
      fullPath: '/player/$playerId'
      preLoaderRoute: typeof PlayerPlayerIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/leaguestats/$year': typeof LeaguestatsYearRoute
  '/player/$playerId': typeof PlayerPlayerIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/leaguestats/$year': typeof LeaguestatsYearRoute
  '/player/$playerId': typeof PlayerPlayerIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/leaguestats/$year': typeof LeaguestatsYearRoute
  '/player/$playerId': typeof PlayerPlayerIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/leaguestats/$year' | '/player/$playerId'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/leaguestats/$year' | '/player/$playerId'
  id: '__root__' | '/' | '/leaguestats/$year' | '/player/$playerId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  LeaguestatsYearRoute: typeof LeaguestatsYearRoute
  PlayerPlayerIdRoute: typeof PlayerPlayerIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  LeaguestatsYearRoute: LeaguestatsYearRoute,
  PlayerPlayerIdRoute: PlayerPlayerIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.jsx",
      "children": [
        "/",
        "/leaguestats/$year",
        "/player/$playerId"
      ]
    },
    "/": {
      "filePath": "index.jsx"
    },
    "/leaguestats/$year": {
      "filePath": "leaguestats.$year.jsx"
    },
    "/player/$playerId": {
      "filePath": "player.$playerId.jsx"
    }
  }
}
ROUTE_MANIFEST_END */
