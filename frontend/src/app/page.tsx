import Hero from "../components/interface/Hero";
import TravelPosts from "../components/interface/TravelPosts";
import HowItWorks from "../components/interface/HowItWorks";
import Navbar from "@/components/Navbar";
import TrustInUs from "@/components/interface/TrustInUs";
import Footer from "@/components/Footer";
import Contact from "@/components/interface/Contact";
import Reviews from "@/components/interface/Reviews";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <Navbar />
      <main className="flex-grow bg-transparent">
        <Hero />
        <div className="h-screen snap-center grid grid-cols-5 gap-2">
          <div className="col-span-2">
            <TravelPosts />
          </div>
          <div className="col-span-3">
            <Reviews />
          </div>
        </div>
        <TrustInUs />
        <HowItWorks />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
