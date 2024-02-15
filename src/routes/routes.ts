import { RootRoute, Route, Router } from "@tanstack/react-router"
import SigninCustomer from "@/pages/auth/SignInCustomer"
import SignInSeller from "@/pages/auth/SignInSeller"
import Login from "@/pages/auth/Login"
import ClientHomepage from "@/pages/customer/ClientHomepage"
import SellerHomepage from "@/pages/seller/SellerHomepage"
import SelletAddArticle from "@/pages/seller/SellerAddArticle"

const rootRoute = new RootRoute()

const SigninCustomerRoute = new Route({ getParentRoute: () => rootRoute, path: "/", component: SigninCustomer })
const SigninSellerRoute = new Route({ getParentRoute: () => rootRoute, path: "/signin", component: SignInSeller })
const LoginRoute = new Route({ getParentRoute: () => rootRoute, path: "/login", component: Login })
const ClientHomepageRoute = new Route({ getParentRoute: () => rootRoute, path: "/customer", component: ClientHomepage })
const SellerHomepageRoute = new Route({ getParentRoute: () => rootRoute, path: "/seller", component: SellerHomepage })
const SellerAddArticleRoute = new Route({ getParentRoute: () => rootRoute, path: "/seller/add", component: SelletAddArticle })

const routeTree = rootRoute.addChildren([
  SigninCustomerRoute,
  SigninSellerRoute,
  LoginRoute,
  ClientHomepageRoute,
  SellerHomepageRoute,
  SellerAddArticleRoute
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