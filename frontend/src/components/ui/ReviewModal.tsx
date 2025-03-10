"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/hooks/auth"
import { reservation, useReservation } from "@/hooks/reservations"
import { useReview } from "@/hooks/reviews"

interface User {
  created_at?: string,
  email?: string
  email_verified_at?: string,
  id?: number,
  name?: string,
  roles?: any[],
  updated_at?: string
  // Agrega más propiedades si es necesario
}
interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (rating: number, message: string) => void
  onAskLater: () => void
  user? : User
}

const StarRating = ({
  rating,
  setRating,
  hoveredStar,
  setHoveredStar,
}: {
  rating: number
  setRating: (rating: number) => void
  hoveredStar: number
  setHoveredStar: (star: number) => void
}) => {
  return (
    <div className="flex gap-1 mb-6 justify-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.div key={star} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <svg
            className="w-12 h-12 cursor-pointer"
            viewBox="0 0 30 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(0)}
          >
            <path
              d="M10.2511 10.5755C10.2717 10.5231 10.2765 10.467 10.2651 10.4126C10.2536 10.3581 10.2264 10.3071 10.1858 10.2643C10.1452 10.2216 10.0927 10.1885 10.0333 10.1683C9.97386 10.148 9.90943 10.1413 9.84614 10.1487L2.82614 11.0153C2.75722 11.0231 2.69215 11.0473 2.63818 11.0853C2.58422 11.1232 2.54349 11.1734 2.52054 11.2303C2.49759 11.2872 2.49333 11.3484 2.50822 11.4073C2.52312 11.4661 2.55659 11.5202 2.60489 11.5635L7.60489 16.0355C7.64913 16.0771 7.70532 16.1078 7.76772 16.1244C7.83011 16.141 7.89648 16.1429 7.96004 16.1301C8.02359 16.1172 8.08206 16.0899 8.12947 16.051C8.17689 16.0121 8.21154 15.963 8.22989 15.9087L10.2511 10.5755Z"
              fill={star <= (hoveredStar || rating) ? "#FFB400" : "#D1D5DB"}
            />
            <path
              d="M7.6998 23.1019C7.67615 23.1625 7.6741 23.2278 7.6939 23.2894C7.7137 23.351 7.75443 23.406 7.81081 23.4473C7.86718 23.4885 7.93658 23.5141 8.00997 23.5207C8.08336 23.5273 8.15735 23.5146 8.2223 23.4843L14.7873 20.7825C14.8358 20.7635 14.8884 20.7536 14.9417 20.7536C14.9949 20.7536 15.0475 20.7635 15.096 20.7825L21.9548 23.4778C22.0213 23.5034 22.095 23.5116 22.1669 23.5016C22.2388 23.4915 22.3057 23.4635 22.3595 23.421C22.4133 23.3785 22.4517 23.3233 22.47 23.2622C22.4882 23.2011 22.4855 23.1368 22.4623 23.077C21.1685 19.6991 19.9998 16.3603 18.7498 12.99C18.7271 12.9328 18.6861 12.8823 18.6316 12.8445C18.5771 12.8067 18.5113 12.7831 18.4419 12.7764C18.3725 12.7697 18.3023 12.7802 18.2395 12.8067C18.1768 12.8332 18.124 12.8746 18.0873 12.9261L15.3173 17.2335C15.2843 17.2843 15.2362 17.3265 15.1779 17.3557C15.1196 17.3849 15.0533 17.3999 14.986 17.3992H14.8685C14.8018 17.3981 14.7366 17.3815 14.6796 17.3512C14.6227 17.321 14.5762 17.2781 14.5448 17.227L11.8535 12.9391C11.8223 12.8882 11.7759 12.8454 11.7192 12.8151C11.6626 12.7848 11.5976 12.7682 11.531 12.7669H11.4935C11.4129 12.7659 11.334 12.7878 11.269 12.8293C11.204 12.8707 11.1564 12.9295 11.1335 12.9965C9.91932 16.3469 8.77455 19.7159 7.6998 23.1019Z"
              fill={star <= (hoveredStar || rating) ? "url(#paint0_linear_303_1477)" : "#9CA3AF"}
            />
            <path
              d="M21.7198 15.8133C21.7388 15.8662 21.7735 15.914 21.8203 15.9519C21.8671 15.9897 21.9245 16.0164 21.9868 16.0292C22.0492 16.042 22.1142 16.0405 22.1757 16.0248C22.2371 16.0092 22.2928 15.98 22.3373 15.94L27.3873 11.5633C27.4366 11.5204 27.4713 11.4665 27.4873 11.4075C27.5034 11.3485 27.5002 11.2868 27.4782 11.2293C27.4561 11.1718 27.4161 11.1207 27.3625 11.0817C27.309 11.0428 27.244 11.0175 27.1748 11.0087L20.191 10.1615C20.128 10.1534 20.0636 10.1593 20.004 10.1787C19.9443 10.1981 19.8914 10.2303 19.8501 10.2724C19.8088 10.3145 19.7806 10.3649 19.7681 10.4191C19.7555 10.4732 19.7591 10.5292 19.7785 10.5818L21.7198 15.8133Z"
              fill={star <= (hoveredStar || rating) ? "#FFB300" : "#D1D5DB"}
            />
            <path
              d="M17.8086 10.0532C17.8321 10.0058 17.8443 9.95478 17.8443 9.90318C17.8443 9.85158 17.8321 9.80053 17.8086 9.75314L17.7711 9.67731L15.2961 2.71906C15.276 2.65036 15.23 2.58944 15.1655 2.54591C15.101 2.50239 15.0216 2.47876 14.9398 2.47876C14.858 2.47876 14.7786 2.50239 14.7141 2.54591C14.6496 2.58944 14.6036 2.65036 14.5836 2.71906L12.1536 9.67731L12.1173 9.77914C12.0887 9.85862 12.094 9.94437 12.1323 10.0207L14.5361 14.8253C14.5667 14.8808 14.6144 14.928 14.674 14.9616C14.7335 14.9953 14.8025 15.0141 14.8736 15.016H14.9623C15.0337 15.0153 15.1033 14.997 15.1631 14.9633C15.2229 14.9295 15.2703 14.8816 15.2998 14.8253L17.7998 10.0532H17.8086Z"
              fill={star <= (hoveredStar || rating) ? "url(#paint1_linear_303_1477)" : "#9CA3AF"}
            />
            <defs>
              <linearGradient
                id="paint0_linear_303_1477"
                x1="-6.24645"
                y1="0.346462"
                x2="35.9723"
                y2="0.346462"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.49" stopColor="#FFB400" />
                <stop offset="0.5" stopColor="#ECBA44" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_303_1477"
                x1="2.50356"
                y1="11.6771"
                x2="27.4998"
                y2="11.6771"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.49" stopColor="#FFB400" />
                <stop offset="0.595" stopColor="#FFC849" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

export default function ReviewModal({ isOpen, onClose, onSubmit, onAskLater, user }: ReviewModalProps) {
  const [rating, setRating] = useState(0)
  const [message, setMessage] = useState("")
  const [hoveredStar, setHoveredStar] = useState(0)
  const [reservations, setReservations] = useState<any>();
  const { getReservationWithPendingReview } = useReservation();
  const { createReview } = useReview();
  const fetchData = async () => {
    try {
      if (user == null || user == undefined) {
        return;
      }
      else {
        const response = await getReservationWithPendingReview(user?.id);
        setReservations(response.reservations);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const updateReview = async (rating: number, message: string, reservations: reservation, user: User|undefined) => {
    try {
      var formData = new FormData()
      formData.append("stars", String(rating));
      formData.append("content", message);
      formData.append("reservation_id", String(reservations?.id));
      formData.append("user_id", String(user?.id));
      const response = await createReview(formData)
      console.log("Review updated successfully", response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  useEffect(() => {
      fetchData();
    }, [user]);
  const handleSubmit = () => {
    onSubmit(rating, message)
    setRating(0)
    setMessage("")
    updateReview(rating, message, reservations, user);
  }
  if (user == null || user == undefined) {
    return;
  }
  else {
    if (reservations == null || reservations == undefined || reservations?.length == 0) {
      return;
    }
    else{
        return (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full relative shadow-2xl"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </motion.button>
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Rate Your Last Trip</h2>
                <StarRating
                  rating={rating}
                  setRating={setRating}
                  hoveredStar={hoveredStar}
                  setHoveredStar={setHoveredStar}
                />
                <Textarea
                  placeholder="Este campo es requerido..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mb-6 h-32 resize-none border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl p-4 text-gray-800 dark:text-white bg-white dark:bg-gray-700"
                />
                <div className="flex justify-between">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={handleSubmit}
                      disabled={message === ""}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                      <span>Send Review</span>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      onClick={onAskLater}
                      className="border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-6 py-2 rounded-full flex items-center space-x-2"
                    >
                      <Clock className="w-5 h-5" />
                      <span>Ask Later</span>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )
    }
  }
}

