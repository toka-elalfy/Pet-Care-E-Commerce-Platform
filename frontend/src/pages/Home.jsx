import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ShopByCategory from '../components/ShopByCategory';
import FeaturedProducts from '../components/FeaturedProducts';
import WhyZootopia from '../components/WhyZootopia';
import BundleBuilder from '../components/BundleBuilder';
import ReorderReminders from '../components/ReorderReminders';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#FFF8F1] selection:bg-[#0f766e] selection:text-white">
      <Navbar />
      
      <main>
        {/* Decorative background element for Hero */}
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-[#fff8f1] to-[#fff8f1] -z-10"></div>
          <Hero />
        </div>
        
        <ShopByCategory />
        <FeaturedProducts />
        <WhyZootopia />
        <BundleBuilder />
        <ReorderReminders />
        <HowItWorks />
        <Testimonials />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
