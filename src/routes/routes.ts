import { RootRoute, Route, Router } from "@tanstack/react-router"
import SigninCustomer from "@/pages/auth/SignInCustomer"
import SignInSeller from "@/pages/auth/SignInSeller"
import Login from "@/pages/auth/Login"
import SellerAddArticle from "@/pages/seller/SellerAddArticle"
import CustomerHomepage from "@/pages/CustomerHomepage"
import SellerHomepage from "@/pages/SellerHomepage"
import CustomerItem from "@/pages/CustomerItem"
import withAuth from "@/middleware/auth"

const rootRoute = new RootRoute()

const SigninCustomerRoute = new Route({ getParentRoute: () => rootRoute, path: "/", component: SigninCustomer })
const SigninSellerRoute = new Route({ getParentRoute: () => rootRoute, path: "/signin", component: SignInSeller })
const LoginRoute = new Route({ getParentRoute: () => rootRoute, path: "/login", component: Login })
const CustomerHomepageRoute = new Route({ getParentRoute: () => rootRoute, path: "/customer", component: withAuth(CustomerHomepage, "customer") })
const CustomerItemHomepageRoute = new Route({ getParentRoute: () => rootRoute, path: "/customer/$id", component: withAuth(CustomerItem, "customer") })
// const CustomerHomepageRoute = new Route({ getParentRoute: () => rootRoute, path: "/customer/profile", component: withAuth(page, "customer") })
// const CustomerHomepageRoute = new Route({ getParentRoute: () => rootRoute, path: "/customer/profile/update", component: withAuth(page, "customer") })
const SellerHomepageRoute = new Route({ getParentRoute: () => rootRoute, path: "/seller", component: withAuth(SellerHomepage, "seller") })
const SellerAddArticleRoute = new Route({ getParentRoute: () => rootRoute, path: "/seller/add", component: SellerAddArticle })
// const SellerHomepageRoute = new Route({ getParentRoute: () => rootRoute, path: "/seller/update", component: withAuth(page, "seller") })
// const SellerHomepageRoute = new Route({ getParentRoute: () => rootRoute, path: "/seller/profile", component: withAuth(page, "seller") })
// const SellerHomepageRoute = new Route({ getParentRoute: () => rootRoute, path: "/seller/profile/update", component: withAuth(page, "seller") })

const routeTree = rootRoute.addChildren([
  SigninCustomerRoute,
  SigninSellerRoute,
  LoginRoute,
  SellerAddArticleRoute,
  CustomerHomepageRoute,
  SellerHomepageRoute,
  CustomerItemHomepageRoute
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
