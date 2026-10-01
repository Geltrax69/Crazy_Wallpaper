import Header from '../../components/navigation/Header'
import Footer from '../../components/navigation/Footer'
import CartDrawer from '../../features/cart/components/CartDrawer'
import CustomCursor from '../../components/animation/CustomCursor'

export default function SiteLayout({ children }) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <CartDrawer />
      <CustomCursor />
      <main id="main" style={{ paddingTop: 'var(--header-h)' }}>
        {children}
      </main>
      <Footer />
    </>
  )
}
