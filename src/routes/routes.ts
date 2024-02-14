import { RootRoute, Route, Router } from "@tanstack/react-router"
import SigninCustomer from "@/pages/SignInCustomer"
import SignInSeller from "@/pages/SignInSeller"
import Login from "@/pages/Login"
import ClientHomepage from "@/pages/ClientHomepage"
import AdminHomepage from "@/pages/AdminHomepage"

const rootRoute = new RootRoute()

const SigninCustomerRoute = new Route({ getParentRoute: () => rootRoute, path: "/", component: SigninCustomer })
const SigninSellerRoute = new Route({ getParentRoute: () => rootRoute, path: "/signin", component: SignInSeller })
const LoginRoute = new Route({ getParentRoute: () => rootRoute, path: "/login", component: Login })
const ClientHomepageRoute = new Route({ getParentRoute: () => rootRoute, path: "/customer", component: ClientHomepage })
const AdminHomepageRoute = new Route({ getParentRoute: () => rootRoute, path: "/seller", component: AdminHomepage })

const routeTree = rootRoute.addChildren([
  SigninCustomerRoute,
  SigninSellerRoute,
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