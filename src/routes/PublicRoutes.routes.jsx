import BlogDetail from "../features/BlogFeature/BlogDetail"
import AboutUsPage from "../pages/main/AboutUsPage"
import AdsPage from "../pages/main/AdsPage"
import BlogPage from "../pages/main/BlogPage"
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
  },
  {
    path: '/blog',
    element: <BlogPage />,
  },
  {
    path: '/blog/category/:categorySlug',
    element: <BlogPage />,
  },
  {
    path: '/blog/:id',
    element: <BlogDetail />,
  },
  {
    path: '/about-us',
    element: <AboutUsPage />,
  },
  {
    path: '/ads',
    element: <AdsPage />,
  }
  // {
  //   path: '/contact',
  //   element: <ContactPage />,
  // },
]

export default publicRoutes
