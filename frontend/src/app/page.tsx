import Hero from '../components/interface/Hero'
import TravelPosts from '../components/interface/TravelPosts'
import HowItWorks from '../components/interface/HowItWorks'
/* import ReservationSection from './components/ReservationSection'
import DriverCarousel from './components/DriverCarousel'
import TravelPosts from './components/TravelPosts'
import HowItWorks from './components/HowItWorks'
import Footer from './components/Footer' */

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow">
        <Hero />
        <TravelPosts />
        <HowItWorks />
        {/* <ReservationSection />
        <DriverCarousel />
       
         */}
      </main>
    </div>
  )
}

