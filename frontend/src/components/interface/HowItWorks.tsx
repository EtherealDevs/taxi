"use client"

import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion"
import { Camera, CreditCard, Car, MapPin, HelpCircle, Check } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

export default function HowItWorks() {
  const { t } = useTranslation()
  const [activeSteps, setActiveSteps] = useState<number[]>([])
  const [currentStep, setCurrentStep] = useState<number | null>(null)
  const [hasScrolled, setHasScrolled] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled && window.scrollY > 0) {
        setHasScrolled(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasScrolled])

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const index = stepsRef.current.findIndex((ref) => ref === entry.target)

        if (entry.isIntersecting && hasScrolled) {
          setCurrentStep(index)
          setActiveSteps((prev) => {
            const newSteps = Array.from(
              new Set([
                ...prev,
                ...Array(index)
                  .fill(0)
                  .map((_, i) => i),
              ]),
            )
            return newSteps.sort((a, b) => a - b)
          })
        } else if (entry.boundingClientRect.top > 0) {
          setCurrentStep((prev) => (prev === index ? null : prev))
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.7,
      rootMargin: "-20% 0px -20% 0px",
    })

    stepsRef.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [hasScrolled])

  const getStepStatus = (index: number) => {
    if (!hasScrolled) return "upcoming"
    if (activeSteps.includes(index) && index !== currentStep) return "completed"
    if (index === currentStep) return "current"
    return "upcoming"
  }

  const steps = [
    {
      icon: <Camera className="w-6 h-6 text-[#6944ff]" />,
      step: "PASO 1",
      title: "Trip Booking",
      description: "International trips at the ideal price. Offering safe trips since 2004",
    },
    {
      icon: <CreditCard className="w-6 h-6 text-[#6944ff]" />,
      step: "PASO 2",
      title: "Quotation",
      description: "International trips at the ideal price. Offering safe trips since 2004",
    },
    {
      icon: <MapPin className="w-6 h-6 text-[#6944ff]" />,
      step: "PASO 3",
      title: "Payment",
      description: "International trips at the ideal price. Offering safe trips since 2004",
    },
    {
      icon: <Car className="w-6 h-6 text-[#6944ff]" />,
      step: "PASO 4",
      title: "Arrival",
      description: "International trips at the ideal price. Offering safe trips since 2004",
    },
  ]

  return (
    <div className="bg-white min-h-screen py-12" ref={containerRef}>
      <div className="max-w-3xl mx-auto px-4">
        <div className="relative">
          {/* Progress line */}
          <div className="absolute left-[27px] top-10 bottom-10 w-[2px] bg-gray-200" />
          <motion.div
            className="absolute left-[27px] top-10 bottom-10 w-[2px] bg-[#6944ff]"
            style={{ scaleY: scaleX, originY: 0 }}
          />

          <div className="space-y-12">
            {steps.map((step, index) => {
              const status = getStepStatus(index)

              return (
                <motion.div
                  key={index}
                  ref={(el) => (stepsRef.current[index] = el)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex items-start gap-6"
                >
                  {/* Status indicator */}
                  <div className="relative z-10">
                    <motion.div
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300
                        ${
                          status === "completed"
                            ? "bg-green-500"
                            : status === "current"
                              ? "bg-[#6944ff]"
                              : "bg-white border-2 border-gray-200"
                        }`}
                      initial={false}
                      animate={{
                        scale: status !== "upcoming" ? [1, 1.2, 1] : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <AnimatePresence mode="wait">
                        {status === "completed" && (
                          <motion.div
                            key="check"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Check className="w-6 h-6 text-white" />
                          </motion.div>
                        )}
                        {status === "current" && (
                          <motion.div
                            key="dot"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-3 h-3 bg-white rounded-full"
                          />
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-3">
                    <div className="mb-1 text-sm font-medium text-gray-500">{step.step}</div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Help Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-20 bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#6944ff]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <HelpCircle className="w-8 h-8 text-[#6944ff]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">¿Necesitas ayuda?</h3>
              <p className="text-gray-600 mb-6 max-w-md">
                Estamos aquí para ayudarte en cada paso del proceso. No dudes en contactarnos si tienes alguna pregunta.
              </p>
              <Button
                className="bg-[#6944ff] hover:bg-[#5835cc] text-white px-8"
                onClick={() => (window.location.href = "/contact")}
              >
                Contactar Soporte
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

