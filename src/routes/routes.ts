import { RootRoute, Route, Router } from "@tanstack/react-router"
import App from "@/pages/Signin"

const rootRoute = new RootRoute()

const SigninRoute = new Route({ getParentRoute: () => rootRoute, path: "/", component: App })

const routeTree = rootRoute.addChildren([SigninRoute])

const router = new Router({
  routeTree
})

export default router

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}