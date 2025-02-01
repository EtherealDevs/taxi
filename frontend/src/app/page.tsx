"use client";

import Hero from "../components/interface/Hero";
import TravelPosts from "../components/interface/TravelPosts";
import HowItWorks from "../components/interface/HowItWorks";
import Navbar from "@/components/Navbar";
import TrustInUs from "@/components/interface/TrustInUs";
import Footer from "@/components/Footer";
import Contact from "@/components/interface/Contact";
import Reviews from "@/components/interface/Reviews";
import { useAuth } from "@/hooks/auth";
import Loading from "@/components/interface/Loading";
import Redirecting from "@/components/interface/Redirecting";
import { useEffect, useRef } from "react";

export default function Home() {
  const { user, isLoading } = useAuth({ middleware: "guest" });
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <Navbar user={user} />
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
