import { z } from "zod"

export default function validateRegisterForm (formData: FormData): Object|null {
    var errorBag = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

      var passwordLoop = 0;
      var password = null;
      var confirmPassword = null;

      var array = [];

    for (var item of formData.entries()) {
        switch (item[0]) {
            case "password":
                if (passwordLoop > 0) {
                    confirmPassword = item[1];
                    if (password!== confirmPassword) {
                        errorBag.confirmPassword = "Ambas contraseñas deben coincidir.";
                        break;
                    }
                }
                password = item[1];
                passwordLoop++;
                break;
            default:
                break;
        };
        array.push(item[1]);
      }
      
      // Validacion con Zod
      const User = z.object({
        name: z.string().max(255, {message: "maximum length 255"}),
        email: z.string().email({message: "invalid email"}),
        password: z.string().min(8, {message: "password should be at least 8 characters"}),
      }).safeParse({
        name: array[0],
        email: array[1],
        password: array[2],
      });
      
      if (!User.success) {
        for (var error of User.error.issues) {
          var name = error.path[0];
          switch (name) {
            case "name":
              errorBag.name = error.message;
              break;
            case "email":
              errorBag.email = error.message;
              break;
            case "password":
              errorBag.password = error.message;
              break;
            default:
              break;
          }
        }
      }
      var arrayOfErrors = Object.values(errorBag)
      var hasError = false;
      arrayOfErrors.forEach(element => {
        if (element != '') {
          hasError = true;
          return
        }
      });

      if (!hasError) {
        return null;
      }
        return errorBag;
}