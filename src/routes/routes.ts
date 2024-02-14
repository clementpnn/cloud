import { RootRoute, Route, Router } from "@tanstack/react-router"
import Signin from "@/pages/Signin"
import Login from "@/pages/Login"
import ClientHomepage from "@/pages/ClientHomepage"
import AdminHomepage from "@/pages/AdminHomepage"

const rootRoute = new RootRoute()

const SigninRoute = new Route({ getParentRoute: () => rootRoute, path: "/", component: Signin })
const LoginRoute = new Route({ getParentRoute: () => rootRoute, path: "/login", component: Login })
const ClientHomepageRoute = new Route({ getParentRoute: () => rootRoute, path: "/client", component: ClientHomepage })
const AdminHomepageRoute = new Route({ getParentRoute: () => rootRoute, path: "/admin", component: AdminHomepage })

const routeTree = rootRoute.addChildren([
  SigninRoute,
  LoginRoute,
  ClientHomepageRoute,
  AdminHomepageRoute
])

const router = new Router({
  routeTree
})

export default router

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}