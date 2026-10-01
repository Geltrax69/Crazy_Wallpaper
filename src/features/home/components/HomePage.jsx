import { useDocumentMeta } from '../../../app/routes/useDocumentMeta'
import Hero from '../sections/Hero'
import FeaturedWorks from '../sections/FeaturedWorks'
import NewArrivals from '../sections/NewArrivals'
import CollectionsTeaser from '../sections/CollectionsTeaser'
import Editorial from '../sections/Editorial'
import FinalCta from '../sections/FinalCta'
import '../home.css'

export default function HomePage() {
  useDocumentMeta()
  return (
    <>
      <Hero />
      <FeaturedWorks />
      <NewArrivals />
      <CollectionsTeaser />
      <Editorial />
      <FinalCta />
    </>
  )
}
