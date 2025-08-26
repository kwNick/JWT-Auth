// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
// import jwt from "jsonwebtoken"; // optional, only if you want to issue JWTs here

// Define schema
const LoginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }).max(15, {
    message: "Username must be 15 characters or less",
  }),
  password: z
    .string()
    .min(6, { message: "Password is required, must be at least six characters long" }),
});

// POST /api/auth/login
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = LoginSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          errors: validated.error.flatten().fieldErrors,
          message: "Missing Fields. Failed to Auth Login.",
          success: false,
        },
        { status: 400 }
      );
    }

    const { username, password } = validated.data;

    // 🔹 Call Spring Boot backend
    const response = await fetch(
      `https://${process.env.JWT_AUTH_API_DOMAIN}/auth/login-refresh`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Invalid credentials", success: false },
        { status: 401 }
      );
    }

    const { roleToken, token }: { roleToken: string; token: string } = await response.json();

    // 🔹 Set tokens in HTTP-only cookies
    const res = NextResponse.json({ success: true, message: "Login successful!" });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 3, // 15 minutes
    });

    res.cookies.set("roleToken", roleToken, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 3, // 15 minutes
    });

    return res;
  } catch (err) {
    return NextResponse.json(
      { message: "Server Error: Failed to Auth Login.", success: false, error: String(err) },
      { status: 500 }
    );
  }
}
