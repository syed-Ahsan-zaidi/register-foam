'use server'
import pool from '@/lib/db';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { SignJWT } from 'jose';

const SECRET = new TextEncoder().encode('my-super-secret-key-12345');

export async function loginUser(formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = res.rows[0];

        if (!user) {
            return { error: "User nahi mila! Pehle account banayein." };
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { error: "Password ghalat hai!" };
        }

        const token = await new SignJWT({ userId: user.id, email: user.email })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('2h')
            .sign(SECRET);

        const cookieStore = await cookies();
        cookieStore.set('auth_token', token, { 
            httpOnly: true,
            path: '/',
            secure: true, 
            sameSite: 'lax'
        });

        // Redirect yahan se hata diya hai, ab success bhej rahe hain
        return { success: true }; 

    } catch (error) {
        console.error("Login Database Error:", error);
        return { error: "Database se rabta nahi ho saka." };
    }
}