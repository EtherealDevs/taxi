import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    console.log({ name, email, phone, message });

    return NextResponse.json(
      { message: "Mensaje enviado correctamente." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al procesar el formulario:", error);
    return NextResponse.json(
      { error: "Error en el servidor." },
      { status: 500 }
    );
  }
}
