import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import DashboardContent from './DashboardContent';
import { redirect } from 'next/navigation';
// pool ko abhi comment kar dein agar products table nahi bana
// import pool from '@/lib/db'; 

const SECRET = new TextEncoder().encode('my-super-secret-key-12345');

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');

    if (!token) {
        redirect('/login');
    }

    try {
        const { payload } = await jwtVerify(token.value, SECRET);
        
        // Agar products table nahi bana toh khali array bhej dein
        const products = []; 

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