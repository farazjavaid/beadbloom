import { About } from '@/components/About';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { CartDrawer } from '@/components/CartDrawer';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { Navbar } from '@/components/Navbar';
import { Products } from '@/components/Products';
import { Reviews } from '@/components/Reviews';
import { ScrollProgress } from '@/components/ScrollProgress';
import { ScrollToTop } from '@/components/ScrollToTop';

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Products />
        <About />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <CartDrawer />
      <ScrollToTop />
    </>
  );
}