import { z } from "zod"

export default function validateRegisterForm (formData: FormData): Object|null {
    var errorBag = {
      firstName: "",
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
        firstName: z.string().max(255, {message: "Longitud maxima 255 caracteres."}),
        email: z.string().email({message: "Direccion E-mail inválida."}),
        password: z.string().min(8, {message: "La contraseña debe tener al menos 8 caracteres."}),
      }).safeParse({
        firstName: array[0],
        email: array[1],
        password: array[2],
      });
      
      if (!User.success) {
        for (var error of User.error.issues) {
          var name = error.path[0];
          switch (name) {
            case "firstName":
              errorBag.firstName = error.message;
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
        return errorBag;
}