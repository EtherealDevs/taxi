import axios from "@/lib/axios";
import { error } from "console";
import useSWR from "swr";


export async function LogIn(formData: {email: string, password: string}) {
  const csrf = () => axios.get('/sanctum/csrf-cookie')
  await csrf();
  const { data } = await axios
      .post("/login", {
        "email": formData.email,
        "password": formData.password
      })
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      });
  return data;
}
