import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { redirect } from 'next/navigation';
import DashboardContent from './DashboardContent'; // Import the new component

const SECRET = new TextEncoder().encode('my-super-secret-key-12345');

async function getProducts() {
    const res = await fetch('https://fakestoreapi.com/products?limit=20');
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
}

export default async function Dashboard() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) redirect('/login');

    try {
        const { payload } = await jwtVerify(token, SECRET);
        const products = await getProducts();

        // Sirf client component return karein
        return <DashboardContent products={products} adminEmail={payload.email} adminName={payload.name} />;
        
    } catch (error) {
        redirect('/login');
    }
}