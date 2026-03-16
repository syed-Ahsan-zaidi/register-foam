'use server'

import pool from '@/lib/db';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { SignJWT } from 'jose';
import { redirect } from 'next/navigation';

const SECRET = new TextEncoder().encode('my-super-secret-key-12345');

// --- 1. REGISTER USER ACTION ---
export async function registerUser(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
            [name, email, hashedPassword]
        );
    } catch (error) {
        if (error.code === '23505') { 
            return { error: "Ye email pehle se register hai!" };
        }
        return { error: "Registration fail ho gayi." };
    }

    redirect('/login');
}

// --- 2. LOGIN USER ACTION ---
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
            secure: process.env.NODE_ENV === 'production', 
        });

    } catch (error) {
        // Next.js redirect errors ko catch block mein handle karna zaroori hai
        if (error.digest?.includes('NEXT_REDIRECT')) throw error;
        return { error: "Login error!" };
    }

    redirect('/dashboard');
}

// --- 3. LOGOUT USER ACTION (Naya Add Kiya Gaya) ---
export async function logoutUser() {
    const cookieStore = await cookies();
    
    // Cookie ko delete karein taake session khatam ho jaye
    cookieStore.delete('auth_token');
    
    // Wapis login page par redirect karein
    redirect('/login');
}