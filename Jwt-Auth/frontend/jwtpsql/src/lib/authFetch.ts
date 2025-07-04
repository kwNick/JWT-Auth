// lib/authFetch.ts
// import Cookies from 'js-cookie'
import { cookies } from "next/headers"

export async function authFetch(url: string, options: RequestInit = {}) {
    const cookieStore = cookies();
    const token = (await cookieStore).get('token');

    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        },
    })
}
