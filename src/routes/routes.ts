import { RootRoute, Route, Router } from "@tanstack/react-router"
import SigninCustomer from "@/pages/auth/SignInCustomer"
import SignInSeller from "@/pages/auth/SignInSeller"
import Login from "@/pages/auth/Login"
import SellerAddArticle from "@/pages/seller/SellerAddArticle"
import CustomerHomepage from "@/pages/customer/CustomerHomepage"
import SellerHomepage from "@/pages/seller/SellerHomepage"
import CustomerItem from "@/pages/customer/CustomerItem"
import withAuth from "@/middleware/auth"
import CustomerCart from "@/pages/customer/CustomerCart"
import SellerItem from "@/pages/seller/SellerItem"

const rootRoute = new RootRoute()

const SigninCustomerRoute = new Route({ getParentRoute: () => rootRoute, path: "/", component: SigninCustomer })
const SigninSellerRoute = new Route({ getParentRoute: () => rootRoute, path: "/signin", component: SignInSeller })
const LoginRoute = new Route({ getParentRoute: () => rootRoute, path: "/login", component: Login })
const CustomerHomepageRoute = new Route({ getParentRoute: () => rootRoute, path: "/customer", component: withAuth(CustomerHomepage, "customer") })
const CustomerItemHomepageRoute = new Route({ getParentRoute: () => rootRoute, path: "/customer/$id", component: withAuth(CustomerItem, "customer") })
const CustomerCartRoute = new Route({ getParentRoute: () => rootRoute, path: "/customer/cart", component: withAuth(CustomerCart, "customer") })
const SellerHomepageRoute = new Route({ getParentRoute: () => rootRoute, path: "/seller", component: withAuth(SellerHomepage, "seller") })
const SellerAddArticleRoute = new Route({ getParentRoute: () => rootRoute, path: "/seller/add", component: SellerAddArticle })
const sellerItemHomepageRoute = new Route({ getParentRoute: () => rootRoute, path: "/seller/$id", component: withAuth(SellerItem, "seller") })
// const SellerHomepageRoute = new Route({ getParentRoute: () => rootRoute, path: "/seller/update", component: withAuth(page, "seller") })

const routeTree = rootRoute.addChildren([
  SigninCustomerRoute,
  SigninSellerRoute,
  LoginRoute,
  SellerAddArticleRoute,
  CustomerHomepageRoute,
  CustomerCartRoute,
  SellerHomepageRoute,
  sellerItemHomepageRoute,
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
