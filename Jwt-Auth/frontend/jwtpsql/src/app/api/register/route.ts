// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";

// 🔹 Define schema (same as RegisterSchema minus id)
const RegisterSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }).max(15, {
    message: "Username must be 15 characters or less",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least six characters long" }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = RegisterSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          errors: validated.error.flatten().fieldErrors,
          message: "Missing fields. Failed to register.",
          success: false,
        },
        { status: 400 }
      );
    }

    const { username, email, password } = validated.data;

    // 🔹 Call your Spring Boot backend
    const response = await fetch(
      `https://${process.env.JWT_AUTH_API_DOMAIN}/auth/register-refresh`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
        credentials: "include",
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Registration failed", success: false },
        { status: response.status }
      );
    }

    const { roleToken, token }: { roleToken: string; token: string } =
      await response.json();

    // 🔹 Set cookies
    const res = NextResponse.json({
      success: true,
      message: `Registration successful! Welcome ${username} (${email})`,
      roleToken,
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 15 * 60, // 15 minutes
    });

    res.cookies.set("roleToken", roleToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 15 * 60, // 15 minutes
    });

    return res;
  } catch (err) {
    return NextResponse.json(
      {
        message: "Server Error: Failed to register user.",
        success: false,
        error: String(err),
      },
      { status: 500 }
    );
  }
}
