import { RootRoute, Route, Router } from "@tanstack/react-router"
import SigninCustomer from "@/pages/SignInCustomer"
import SignInSeller from "@/pages/SignInSeller"
import Login from "@/pages/Login"
import CustomerHomepage from "@/pages/CustomerHomepage"
import SellerHomepage from "@/pages/SellerHomepage"
// import CustomerItem from "@/pages/CustomerItem"
import withAuth from "@/middleware/auth"

const rootRoute = new RootRoute()

const SigninCustomerRoute = new Route({ getParentRoute: () => rootRoute, path: "/", component: SigninCustomer })
const SigninSellerRoute = new Route({ getParentRoute: () => rootRoute, path: "/signin", component: SignInSeller })
const LoginRoute = new Route({ getParentRoute: () => rootRoute, path: "/login", component: Login })
const CustomerHomepageRoute = new Route({ getParentRoute: () => rootRoute, path: "/customer", component: withAuth(CustomerHomepage, "customer") })
// const CustomerItemHomepageRoute = new Route({ getParentRoute: () => rootRoute, path: "/customer/$id", component: withAuth(CustomerItem, "customer") })
// const CustomerHomepageRoute = new Route({ getParentRoute: () => rootRoute, path: "/customer/profile", component: withAuth(page, "customer") })
// const CustomerHomepageRoute = new Route({ getParentRoute: () => rootRoute, path: "/customer/profile/update", component: withAuth(page, "customer") })
const SellerHomepageRoute = new Route({ getParentRoute: () => rootRoute, path: "/seller", component: withAuth(SellerHomepage, "seller") })
// const SellerHomepageRoute = new Route({ getParentRoute: () => rootRoute, path: "/seller/update", component: withAuth(page, "seller") })
// const SellerHomepageRoute = new Route({ getParentRoute: () => rootRoute, path: "/seller/profile", component: withAuth(page, "seller") })
// const SellerHomepageRoute = new Route({ getParentRoute: () => rootRoute, path: "/seller/profile/update", component: withAuth(page, "seller") })

const routeTree = rootRoute.addChildren([
  SigninCustomerRoute,
  SigninSellerRoute,
  LoginRoute,
  CustomerHomepageRoute,
  SellerHomepageRoute
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