// app/api/profile/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("token")?.value;

    // First attempt: call profile API
    let res = await fetch(`https://${process.env.JWT_AUTH_API_DOMAIN}/api/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // If access token expired, try refresh
    if (!res.ok) {
      const refreshRes = await fetch(`https://${process.env.JWT_AUTH_API_DOMAIN}/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: {
          Cookie: cookieStore.toString(), // forward cookies
        },
      });

      if (!refreshRes.ok) {
        // Refresh also failed → force login
        return NextResponse.redirect("/login");
      }

      // Refresh succeeded → update cookies
      const { roleToken, token: newToken }: { roleToken: string; token: string } =
        await refreshRes.json();

      const response = NextResponse.next();
      response.cookies.set("token", newToken, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 15,
      });
      response.cookies.set("roleToken", roleToken, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 15,
      });

      // Retry profile fetch
      res = await fetch(`http://${process.env.JWT_AUTH_API_DOMAIN}/api/profile`, {
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
      });

      if (!res.ok) {
        return NextResponse.json([], { status: 401 });
      }

      const data = await res.json();
      return NextResponse.json(data, response);
    }

    // Success on first try
    const data = await res.json();
    return NextResponse.json(data);

  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch profile", details: String(err) },
      { status: 500 }
    );
  }
}
