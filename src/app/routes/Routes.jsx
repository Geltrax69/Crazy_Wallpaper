import { Routes, Route } from 'react-router-dom'
import SiteLayout from '../layouts/SiteLayout'
import HomePage from '../../features/home/components/HomePage'
import ShopPage from '../../features/shop/components/ShopPage'
import CollectionsPage from '../../features/collections/components/CollectionsPage'
import CollectionDetailPage from '../../features/collections/components/CollectionDetailPage'
import CategoriesPage from '../../features/categories/components/CategoriesPage'
import ProductDetailPage from '../../features/products/components/ProductDetailPage'
import SearchPage from '../../features/search/components/SearchPage'
import CartPage from '../../features/cart/components/CartPage'
import CheckoutPage from '../../features/checkout/components/CheckoutPage'
import CheckoutSuccessPage from '../../features/checkout/components/CheckoutSuccessPage'
import DownloadsPage from '../../features/downloads/components/DownloadsPage'
import AccountPage from '../../features/account/components/AccountPage'
import FavoritesPage from '../../features/favorites/components/FavoritesPage'
import AboutPage from '../../features/about/components/AboutPage'
import LicensePage from '../../features/license/components/LicensePage'
import FaqPage from '../../features/faq/components/FaqPage'
import ContactPage from '../../features/contact/components/ContactPage'
import NotFoundPage from '../../features/notfound/components/NotFoundPage'

export default function AppRoutes() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/collections/:slug" element={<CollectionDetailPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/wallpaper/:slug" element={<ProductDetailPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
        <Route path="/downloads" element={<DownloadsPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/license" element={<LicensePage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SiteLayout>
  )
}
