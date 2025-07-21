// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    // console.log(request.cookies);

    // const refreshToken = request.cookies.get('refreshToken'); // use NextRequest in middleware to access cookies
    // console.log("RefreshToken: ", refreshToken);

    const token = request.cookies.get('token'); // use NextRequest in middleware to access cookies
    // console.log("token: ", token);

    let isLoggedIn = false; // Default to false
    if (token?.value) {
        isLoggedIn = true; // If token exists, user is logged in
    }
    // if (token === undefined) {
    //     console.log("token is undefined");
    //     refreshToken?.value ? isLoggedIn = true : isLoggedIn = false; // If token is undefined, check refreshToken
    // }

    const roleToken = request.cookies.get('roleToken'); // use NextRequest in middleware to access cookies
    // console.log("roleToken: ", roleToken);

    let isAdmin = false; // Default to false
    if (roleToken?.value) {
        const { payload }: { payload: { roles: string[] } } = await jwtVerify(roleToken?.value, new TextEncoder().encode(`${process.env.API_SECRET_KEY}`));
        // console.log("payload.roles: ", payload.roles);
        isAdmin = payload?.roles?.includes('ROLE_ADMIN') || false; // Check if the user has admin roles
    }

    const isLoginPage = request.nextUrl.pathname.startsWith('/login');
    const isRegisterPage = request.nextUrl.pathname.startsWith('/register');
    const isAdminDash = request.nextUrl.pathname.startsWith('/admin-dashboard');
    // const isUserDash = request.nextUrl.pathname.startsWith('/user-dashboard');

    const isProtected = ['/admin-dashboard', '/user-dashboard'].some(path =>
        request.nextUrl.pathname.startsWith(path)
    );

    // If the user is trying to access a protected route without a token
    if (isProtected && !isLoggedIn) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If the user w/ token is trying to access the admin dashboard without admin roles
    if (isLoggedIn && isAdminDash && !isAdmin) {
        return NextResponse.redirect(new URL('/user-dashboard', request.url));
    }

    // If the user is trying to access the login page while already logged in
    if (isLoginPage && isLoggedIn) {
        if (isAdmin) {
            return NextResponse.redirect(new URL('/admin-dashboard', request.url));
        }
        return NextResponse.redirect(new URL('/user-dashboard', request.url));
        //Or Redirect to admin dashboard if the user is an admin
    }

    // If the user is trying to access the register page while already logged in
    if (isRegisterPage && isLoggedIn) {
        if (isAdmin) {        //Or Redirect to admin dashboard if the user has admin roles
            return NextResponse.redirect(new URL('/admin-dashboard', request.url));
        }
        return NextResponse.redirect(new URL('/user-dashboard', request.url));
    }

    return NextResponse.next();
};

export const config = {
    matcher: ['/admin-dashboard', '/user-dashboard', '/login', '/register'],
};
