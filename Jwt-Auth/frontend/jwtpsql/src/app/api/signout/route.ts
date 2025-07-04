import { NextResponse } from 'next/server';

export async function POST() {
    //clear server cookies by calling the fetch path
    await fetch('http://localhost:8080/auth/logout-refresh', {
        method: 'POST',
        credentials: 'include'
    });

    // Clear the cookie
    const response = NextResponse.json({ message: 'Signed out' });
    response.cookies.set('token', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        expires: new Date(0), // Expire the cookie
    });
    response.cookies.set('roleToken', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        expires: new Date(0), // Expire the cookie
    });
    response.cookies.set('user', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        expires: new Date(0), // Expire the cookie
    });
    return response;
}
