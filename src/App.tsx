import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import CallToAction from '@/components/CallToAction';
import FruitGallery from '@/components/FruitGallery';
import Subscribe from '@/components/Subscribe';
import Footer from '@/components/Footer';
import Instructions from '@/components/Instructions';

const App: React.FC = () => {
  return (
    <div className="relative">
      <Navbar />
      <Header />
      <main>
        <CallToAction />
        <Instructions />
        <FruitGallery />
        <Subscribe />
      </main>
      <Footer />
    </div>
  );
};

export default App;