import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import { NextResponse } from "next/server";

export async function POST() {
    try {
        const res = await fetch(`https://${process.env.JWT_AUTH_API_DOMAIN}/auth/logout-refresh`, {
            method: "POST",
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error('Failed to logout user on backend');
        }
        // Expire auth-related cookies
        const expiredDate = new Date(0);
        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'strict' as const,
            path: '/',
            expires: expiredDate,
        };

        (await cookies()).set('token', '', options);
        (await cookies()).set('roleToken', '', options);
        // (await cookies()).set('user', '', options);
            
      } catch (error) {
        console.error('Logout failed:', error);
        throw error;
      }
      redirect('/')
//   return NextResponse.json({}, { status: res.status });
}
