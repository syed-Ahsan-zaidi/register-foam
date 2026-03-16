import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import DashboardContent from './DashboardContent';
import { redirect } from 'next/navigation';
import pool from '@/lib/db'; 

// Next.js ko har baar database se naya data fetch karne par majboor karta hai
export const revalidate = 0; 

const SECRET = new TextEncoder().encode('my-super-secret-key-12345');

async function getProducts() {
    try {
        const res = await pool.query('SELECT * FROM products ORDER BY id DESC');
        return res.rows;
    } catch (error) {
        console.error("DATABASE_ERROR:", error.message);
        return [];
    }
}

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');

    if (!token) {
        redirect('/login');
    }

    try {
        const { payload } = await jwtVerify(token.value, SECRET);
        
        // Data fetch ho raha hai
        const products = await getProducts(); 

        return (
            <DashboardContent 
                products={products} 
                adminEmail={payload.email} 
                adminName={payload.name || 'Admin'} 
            />
        );
    } catch (error) {
        console.error("Dashboard Error:", error);
        redirect('/login');
    }
}