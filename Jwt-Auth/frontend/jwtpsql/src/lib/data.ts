// import Cookies from 'js-cookie'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import User from "./userModel";

export async function fetchProfile() {
    try {
        // console.log('fetchProfile!');
        const cookieStore = cookies();
        const token = (await cookieStore).get('token')?.value;

        let data = await fetch(`http://${process.env.JWT_AUTH_API_DOMAIN}/api/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log('data: ', data.status, data.ok, data.body);

        if (!data.ok) {
            // console.log('access token expired! -> Sending fetch to refresh access token!');
            // redirect('/login');
            const refreshRes = await fetch(`http://${process.env.JWT_AUTH_API_DOMAIN}/auth/refresh`, {
                method: 'POST',
                credentials: 'include',
            });
            // console.log('refreshRes: ', refreshRes.status, refreshRes.ok, refreshRes.body);
            if (!refreshRes.ok) {
                // console.log("refresh token expired! -> redirect to login!"); // + refreshRes.json()
                redirect('/login');
            }

            if (refreshRes.ok) {
                // console.log("refresh fetch successful! -> updating cookies again!");
                const { roleToken, token }: { roleToken: string, token: string } = await refreshRes.json();
                // console.log({ user, roleToken, token });
                (await cookieStore).set('token', token, {
                    httpOnly: true,
                    secure: true,
                    path: '/',
                    maxAge: 60 * 15, // 15 minutes
                });
                (await cookieStore).set('roleToken', roleToken, {
                    httpOnly: true,
                    secure: true,
                    path: '/',
                    maxAge: 60 * 15, // 15 minutes
                });

                data = await fetch(`http://${process.env.JWT_AUTH_API_DOMAIN}/api/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
        }

        if (!data.ok) {
            return [];
        }

        return data.json();

    } catch (error) {
        throw new Error('Failed to fetch profile: ' + error);
    }
}

export async function fetchUsers() {
    try {
        const cookieStore = cookies();  //for server-side cookies use cookies from next/headers
        // On the client side, you can access cookies using document.cookie, or a library like js-cookie.

        const token = (await cookieStore).get('token')?.value;
        // console.log(`Bearer ${token}`); //maybe add a try/catch here to check if token is null

        let data = await fetch(`http://${process.env.JWT_AUTH_API_DOMAIN}/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (data.status === 403) {
            // redirect('/login');
            const refreshRes = await fetch(`http://${process.env.JWT_AUTH_API_DOMAIN}/auth/refresh`, {
                method: 'POST',
                credentials: 'include',
            });

            if (refreshRes.status === 401) {
                // console.log("refresh token expired! -> redirect to login!");
                redirect('/login');
            }

            if (refreshRes.ok) {
                const { roleToken, token }: { roleToken: string, token: string } = await refreshRes.json();
                (await cookieStore).set('token', token, {
                    httpOnly: true,
                    secure: true,
                    path: '/',
                    maxAge: 60 * 15, // 15 minutes
                });
                (await cookieStore).set('roleToken', roleToken, {
                    httpOnly: true,
                    secure: true,
                    path: '/',
                    maxAge: 60 * 15, // 15 minutes
                });

                data = await fetch(`http://${process.env.JWT_AUTH_API_DOMAIN}/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
        }

        if (!data.ok) {
            return [];
        }

        return data.json();
    } catch (error) {
        throw new Error('Failed to fetch users: ' + error);
    }
}

export async function fetchUsersWithDetails() {
    try {
        const cookieStore = cookies();  //for server-side cookies use cookies from next/headers
        // On the client side, you can access cookies using document.cookie, or a library like js-cookie.

        const token = (await cookieStore).get('token')?.value;
        // console.log(`Bearer ${token}`); //maybe add a try/catch here to check if token is null

        let data = await fetch(`http://${process.env.JWT_AUTH_API_DOMAIN}/api/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (data.status === 401) {
            // redirect('/login');
            const refreshRes = await fetch(`http://${process.env.JWT_AUTH_API_DOMAIN}/auth/refresh`, {
                method: 'POST',
                credentials: 'include',
            });

            if (refreshRes.status === 401) {
                // console.log("refresh token expired! -> redirect to login!");
                redirect('/login');
            }

            if (refreshRes.ok) {
                const { roleToken, token }: { roleToken: string, token: string } = await refreshRes.json();
                (await cookieStore).set('token', token, {
                    httpOnly: true,
                    secure: true,
                    path: '/',
                    maxAge: 60 * 15, // 15 minutes
                });
                (await cookieStore).set('roleToken', roleToken, {
                    httpOnly: true,
                    secure: true,
                    path: '/',
                    maxAge: 60 * 15, // 15 minutes
                });

                data = await fetch(`http://${process.env.JWT_AUTH_API_DOMAIN}/api/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
        }

        if (!data.ok) {
            return [];
        }

        return data.json();
    } catch (error) {
        throw new Error('Failed to fetch users with details: ' + error);
    }
}

export async function fetchShops() {
    try {
        const cookieStore = cookies();  //for server-side cookies use cookies from next/headers
        // On the client side, you can access cookies using document.cookie, or a library like js-cookie.

        const token = (await cookieStore).get('token')?.value;
        // console.log(`Bearer ${token}`); //maybe add a try/catch here to check if token is null

        let data = await fetch(`http://${process.env.JWT_AUTH_API_DOMAIN}/shops`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (data.status === 401) {
            // redirect('/login');
            const refreshRes = await fetch(`http://${process.env.JWT_AUTH_API_DOMAIN}/auth/refresh`, {
                method: 'POST',
                credentials: 'include',
            });

            if (refreshRes.status === 401) {
                // console.log("refresh token expired! -> redirect to login!");
                redirect('/login');
            }

            if (refreshRes.ok) {
                const { roleToken, token }: { roleToken: string, token: string } = await refreshRes.json();
                (await cookieStore).set('token', token, {
                    httpOnly: true,
                    secure: true,
                    path: '/',
                    maxAge: 60 * 15, // 15 minutes
                });
                (await cookieStore).set('roleToken', roleToken, {
                    httpOnly: true,
                    secure: true,
                    path: '/',
                    maxAge: 60 * 15, // 15 minutes
                });

                data = await fetch(`http://${process.env.JWT_AUTH_API_DOMAIN}/shops`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
        }

        if (!data.ok) {
            return [];
        }

        return data.json();
    } catch (error) {
        throw new Error('Failed to fetch shops for users: ' + error);
    }
}

export async function fetchRoles() {
    try {
        const cookieStore = cookies();  //for server-side cookies use cookies from next/headers
        // On the client side, you can access cookies using document.cookie, or a library like js-cookie.

        const token = (await cookieStore).get('token')?.value;
        // console.log(`Bearer ${token}`); //maybe add a try/catch here to check if token is null

        let data = await fetch(`http://${process.env.JWT_AUTH_API_DOMAIN}/roles`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (data.status === 401) {
            // redirect('/login');
            const refreshRes = await fetch(`http://${process.env.JWT_AUTH_API_DOMAIN}/auth/refresh`, {
                method: 'POST',
                credentials: 'include',
            });

            if (refreshRes.status === 401) {
                // console.log("refresh token expired! -> redirect to login!");
                redirect('/login');
            }

            if (refreshRes.ok) {
                const { roleToken, token }: { roleToken: string, token: string } = await refreshRes.json();
                (await cookieStore).set('token', token, {
                    httpOnly: true,
                    secure: true,
                    path: '/',
                    maxAge: 60 * 15, // 15 minutes
                });
                (await cookieStore).set('roleToken', roleToken, {
                    httpOnly: true,
                    secure: true,
                    path: '/',
                    maxAge: 60 * 15, // 15 minutes
                });

                data = await fetch(`http://${process.env.JWT_AUTH_API_DOMAIN}/roles`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
        }

        if (!data.ok) {
            return [];
        }

        return data.json();
    } catch (error) {
        throw new Error('Failed to fetch roles: ' + error);
    }
}