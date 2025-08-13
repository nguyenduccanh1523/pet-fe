import HomePage from "../pages/main/HomePage"
import ProductPage from "../pages/main/ProductPage"
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
  },
  {
    path: '/product',
    element: <ProductPage />,
  },
  {
    path: '/product/:productId',
    element: <ProductPage />,
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
