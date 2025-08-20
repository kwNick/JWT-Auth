'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { z } from 'zod';
// import { revalidatePath } from 'next/cache';

/* Authentication Mutations ----------------------- */
const LoginSchema = z.object({
    id: z.string(),
    username: z.string().min(1, { message: 'Username is required' }).max(15, { message: 'Username must be 15 characters or less' }),
    password: z.string().min(6, { message: 'Password is required, must be at least six characters long' }),
});

export type State = {
    errors?: {
        username?: string[] | null;
        password?: string[] | null;
    } | undefined;
    // role?: string | null;
    message?: string | null;
    success?: boolean;
};

const LoginAuth = LoginSchema.omit({ id: true });
export async function LoginAction(prevState: State, formData: FormData) {
    // console.log(formData.get("password")); //somehow formData has null values --> needed name attr on input tag in form using action for this server action
    const validatedFields = LoginAuth.safeParse({
        username: formData.get("username"),
        password: formData.get("password"),
    });

    // If form validation fails, return errors early.Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Auth Login.',
            success: false
        };
    }

    const { username, password }: { username: string, password: string } = validatedFields.data;
    try {
        const response = await fetch(`http://${process.env.JWT_AUTH_API_DOMAIN}/auth/login-refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, password: password }),
            credentials: "include", // if you’re dealing with cookies/sessions
        });

        const cookieStore = cookies();  //for server-side cookies use cookies from next/headers
        // On the client side, you can access cookies using document.cookie, or a library like js-cookie.
        const { roleToken, token }: { roleToken: string, token: string } = await response.json();
        // console.log(roleToken); // do something w/ roleToken

        (await cookieStore).set('token', token, {
            httpOnly: true,
            secure: true,
            path: '/',
            maxAge: 15 * 60, // 15 minutes
        }); // store token in cookie. MaxAge is in seconds.
        // Setting maxAge will cause the cookie to become a persistent cookie with an explicit expiration. If maxAge is not set, the cookie is a session cookie (cleared when browser is closed).
        // Setting maxAge: 0 will delete the cookie.

        // console.log((await cookieStore).get('token')?.value);

        (await cookieStore).set('roleToken', roleToken, {
            httpOnly: true,
            secure: true,
            path: '/',
            maxAge: 60 * 15, // 15 minutes
        });

        // const role = user.roles.find(x => x.name === 'ROLE_ADMIN') ? 'ROLE_ADMIN' : 'ROLE_USER';
        // console.log(role);
        // revalidatePath('/login');
        return { success: true, message: 'Login successful!' };
    } catch (error) {
        return {
            // errors: undefined,
            message: 'Database Error: Failed to Auth Login.' + error,
            success: false
        };
    }
    // redirect('/user-dashboard')   // redirect to protected route - but doesnt work on when called from a client-component that has the form submission 
};

const RegisterSchema = z.object({
    id: z.string(),
    username: z.string().min(1, { message: 'Username is required' }).max(15, { message: 'Username must be 15 characters or less' }),
    email: z.string().email({ message: 'Invalid email address format' }),
    password: z.string().min(6, { message: 'Password is required, must be at least six characters long' }),
});

export type RegisterState = {
    errors?: {
        username?: string[] | null;
        email?: string[] | null;
        password?: string[] | null;
    } | undefined;
    // role?: string | null;
    message?: string | null;
    success?: boolean;
};

const RegisterAuth = RegisterSchema.omit({ id: true });
export async function RegisterAction(prevState: State, formData: FormData) {
    // console.log(formData.get("password")); //somehow formData has null values --> needed name attr on input tag in form using action for this server action
    const validatedFields = RegisterAuth.safeParse({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    // If form validation fails, return errors early.Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Auth Registration.',
            success: false
        };
    }

    const { username, email, password }: { username: string, email: string, password: string } = validatedFields.data;
    try {

        const response = await fetch(`http://${process.env.JWT_AUTH_API_DOMAIN}/auth/register-refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, email: email, password: password }),
            credentials: "include", // if you’re dealing with cookies/sessions
        });

        const cookieStore = cookies();  //for server-side cookies use cookies from next/headers
        // On the client side, you can access cookies using document.cookie, or a library like js-cookie.
        const { roleToken, token }: { roleToken: string, token: string } = await response.json();
        // console.log(roleToken); // do something w/ roleToken

        (await cookieStore).set('token', token, {
            httpOnly: true,
            secure: true,
            path: '/',
            maxAge: 15 * 60, // 15 minutes
        }); // store token in cookie
        // maxAge is in seconds.
        // Setting maxAge will cause the cookie to become a persistent cookie with an explicit expiration.
        // If maxAge is not set, the cookie is a session cookie (cleared when browser is closed).
        // Setting maxAge: 0 will delete the cookie.
        // console.log((await cookieStore).get('token')?.value);

        (await cookieStore).set('roleToken', roleToken, {
            httpOnly: true,
            secure: true,
            path: '/',
            maxAge: 60 * 15, // 15 minutes
        });

        // const role = user.roles.find(x => x.name === 'ROLE_ADMIN') ? 'ROLE_ADMIN' : 'ROLE_USER';
        // console.log(role);
        // revalidatePath('/register');
        return { success: true, message: 'Registration successful!\n' + ` Welcome ${username} (${email})` };
    } catch (error) {
        return {
            // errors: undefined,
            message: 'Database Error: Failed to Auth Registration.' + error,
            success: false
        };
    }
    // redirect('/')   // redirect to protected route - but doesnt work on when called from a client-component that has the form submission 
};

export async function LogoutAction() {
    try {
        const res = await fetch(`http://${process.env.JWT_AUTH_API_DOMAIN}/auth/logout-refresh`, {
            method: 'POST',
            credentials: 'include'
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
}

export async function DeleteAction() {
    try {
        const res = await fetch(`http://${process.env.JWT_AUTH_API_DOMAIN}/api/delete`, {
            method: 'DELETE',
            credentials: 'include'
        });

        console.log(res.status, res.body);

        if (!res.ok) {
            throw new Error('Failed to delete user on backend');
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
        console.error('Delete failed:', error);
        throw error;
    }
    redirect('/')
}

/* Shop Mutations ----------------------- */
const AddShopSchema = z.object({
    id: z.string(),
    name: z.string().min(1, { message: 'Name is required' }).max(15, { message: 'Username must be 15 characters or less' }),
    location: z.string().min(1, { message: 'Location is required' }).max(50, { message: 'Location must be 50 characters or less' }),
});

export type AddShopState = {
    errors?: {
        name?: string[] | null;
        location?: string[] | null;
    } | undefined;
    // role?: string | null;
    message?: string | null;
    success?: boolean;
};

const AddShopAuth = AddShopSchema.omit({ id: true });
export async function AddShopAction(prevState: AddShopState, formData: FormData) {
    const validatedFields = AddShopAuth.safeParse({
        name: formData.get("name"),
        location: formData.get("location"),
    });

    // If form validation fails, return errors early.Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Add Shop.',
            success: false
        };
    }

    const { name, location }: { name: string, location: string } = validatedFields.data;
    try {
        const cookieStore = cookies();
        const token = (await cookieStore).get('token')?.value;

        const response = await fetch(`http://${process.env.JWT_AUTH_API_DOMAIN}/shops/addShop`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, location: location }),
            credentials: "include"
        });

        // console.log(response.status, response.body);

        if (!response.ok) {
            throw new Error('Failed to add shop');
        }

        const { shopName, shopLocation, username }: { shopName: string, shopLocation: string, username: string } = await response.json();

        return { success: true, message: 'Shop Added Successfully!\n' + ` ${shopName} - ${shopLocation} - ${username}` };

    } catch (error) {
        console.error('Add Shop Failed:', error);
        throw error;

    }
}