"use client";

import Hero from "../components/interface/Hero";
import TravelPosts from "../components/interface/TravelPosts";
import HowItWorks from "../components/interface/HowItWorks";
import Navbar from "@/components/Navbar";
import TrustInUs from "@/components/interface/TrustInUs";
import Footer from "@/components/Footer";
import Contact from "@/components/interface/Contact";
import Reviews from "@/components/interface/Reviews";
import ReviewModal from "@/components/ui/ReviewModal";
import { useAuth } from "@/hooks/auth";
import Loading from "@/components/interface/Loading";
import Redirecting from "@/components/interface/Redirecting";
import { useEffect, useRef, useState } from "react";
import OtherPosts from "@/components/interface/OtherPosts";

export default function Home() {
  const { user, isLoading } = useAuth({ middleware: "guest" });
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [askLaterTimer, setAskLaterTimer] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Show the modal when the page loads
    setIsReviewModalOpen(true)
  }, [])

  const handleCloseModal = () => {
    setIsReviewModalOpen(false)
    if (askLaterTimer) {
      clearTimeout(askLaterTimer)
    }
  }

  const handleSubmitReview = (rating: number, message: string) => {
    // Here you would typically send the review to your backend
    console.log("Review submitted:", { rating, message })
    handleCloseModal()
  }

  const handleAskLater = () => {
    handleCloseModal()
    const timer = setTimeout(
      () => {
        setIsReviewModalOpen(true)
      },
      4 * 60 * 1000,
    ) // 4 minutes in milliseconds
    setAskLaterTimer(timer)
  }
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <Navbar user={user} />
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitReview}
        onAskLater={handleAskLater}
      />
      <main className="flex-grow bg-transparent">
        <section id="hero">
          <Hero />
        </section>
        <section id="reviews" className="snap-center grid grid-cols-1 md:grid-cols-5 gap-2">
          <div className="col-span-1 md:col-span-2">
            <Reviews />
          </div>
          <div className="col-span-1 md:col-span-3">
            <TravelPosts />
          </div>
          <div className="lg:mt-12 w-full col-span-1 md:col-span-5">
            <OtherPosts/>
          </div>
        </section>
        <section id="trust-in-us">
          <TrustInUs />
        </section>
        <section id="how-it-works">
          <HowItWorks />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}
