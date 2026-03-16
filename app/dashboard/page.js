import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import DashboardContent from './DashboardContent';
import { redirect } from 'next/navigation';
import pool from '@/lib/db'; // Database se products lane ke liye

// YE KEY EXACT WAHI HONI CHAHIYE JO actions/auth.js MEIN HAI
const SECRET = new TextEncoder().encode('my-super-secret-key-12345');

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');

    // 1. Agar cookie nahi mili
    if (!token) {
        console.log("Token nahi mila, redirecting to login...");
        redirect('/login');
    }

    try {
        // 2. Token verify karein
        const { payload } = await jwtVerify(token.value, SECRET);
        
        // 3. Database se products dhoond kar layein (optional)
        const res = await pool.query('SELECT * FROM products ORDER BY id DESC');
        const products = res.rows;

        // 4. Sab sahi hai toh content dikhao
        return (
            <DashboardContent 
                products={products} 
                adminEmail={payload.email} 
                adminName={payload.name || 'Admin'} 
            />
        );
    } catch (error) {
        console.error("JWT Verification failed:", error);
        // 5. Agar token purana ya ghalat hai
        redirect('/login');
    }
}