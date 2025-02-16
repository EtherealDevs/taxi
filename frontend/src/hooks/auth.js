import useSWR from "swr";
import axios from "@/lib/axios";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const router = useRouter();
  const params = useParams();

  const {
    data: user,
    error,
    mutate,
    isLoading,
  } = useSWR("/api/user", () =>
    axios
      .get("/api/user")
      .then((res) => res.data)
      .catch((error) => {
        console.log(error);
        if (error.response.status !== 409) throw error;
        router.push("/verify-email");
      })
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const register = async ({ setErrors, ...props }) => {
    await csrf();

    setErrors([]);
    axios
      .post("/register", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;
        for (const [key, value] of Object.entries(error.response.data.errors)) {
          console.log(`${key}: ${value}`);
        }

        setErrors(Object.entries(error.response.data.errors));
      });
  };

  const login = async ({ setErrors, setStatus, ...props }) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/login", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const forgotPassword = async ({ setErrors, setStatus, email }) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/forgot-password", { email })
      .then((response) => setStatus(response.data.status))
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resetPassword = async ({ setErrors, setStatus, ...props }) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/reset-password", { token: params.token, ...props })
      .then((response) =>
        router.push("/login?reset=" + btoa(response.data.status))
      )
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resendEmailVerification = ({ setStatus }) => {
    axios
      .post("/email/verification-notification")
      .then((response) => setStatus(response.data.status));
  };

  const logout = async () => {
    if (!error) {
      await axios.post("/logout").then(() => mutate());
    }

    window.location.pathname = "/";
  };

    useEffect(() => {
      if (!isLoading){
        if (middleware === "guest" && redirectIfAuthenticated && user){
          router.push(redirectIfAuthenticated);
        }
        if (middleware === "auth" && !user?.email_verified_at){
          router.push("/verify-email");
        }
        if (window.location.pathname === "/verify-email" && user?.email_verified_at){
          router.push(redirectIfAuthenticated);
        }
        if (middleware === "auth" && error) {
          logout()
        };
        if (middleware === "admin"){
            var hasRole = false;
          if (user == undefined || user?.roles.length == 0) {
            router.push("/");
          }
          else {
            if(user?.roles.length > 0){
              user.roles.forEach(element => {
                if (element.name == "admin"){
                  hasRole = true;
                }
              });
            }
            if (!hasRole) {
              router.push("/");
            }
          }
        }
      }
    }, [user, error]);

  return {
    user,
    isLoading,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  };
};
