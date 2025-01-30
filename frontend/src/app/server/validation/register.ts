import { z } from "zod"

export default function validateRegisterForm (formData: FormData): Array<string|null> {
    var errorBag = [];

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
                        errorBag.push("Ambas contraseñas deben coincidir.");
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
          errorBag.unshift(error.message);
        }
      }

      return errorBag;
}