import HomePage from "../pages/main/HomePage"
import ShopPage from "../pages/main/ShopPage"

const publicRoutes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/shop',
    element: <ShopPage />,
  },
  {
    path: '/shop/:categorySlug',
    element: <ShopPage />,
  }
  // {
  //   path: '/about',
  //   element: <AboutPage />,
  // },
  // {
  //   path: '/contact',
  //   element: <ContactPage />,
  // },
]

export default publicRoutes
