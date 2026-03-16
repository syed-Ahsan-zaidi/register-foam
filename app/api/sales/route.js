import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { productId, productName, price } = await request.json();

        // 1. Sales table mein entry dalein
        await pool.query(
            'INSERT INTO sales (product_id, product_name, price) VALUES ($1, $2, $3)',
            [productId, productName, price]
        );

        // 2. Product ka stock 1 kam kar dein
        await pool.query(
            'UPDATE products SET stock = GREATEST(stock - 1, 0) WHERE id = $1',
            [productId]
        );

        return NextResponse.json({ success: true, message: "Order placed!" });
    } catch (error) {
        console.error("Order API Error:", error);
        return NextResponse.json({ error: "Order process nahi ho saka" }, { status: 500 });
    }
}