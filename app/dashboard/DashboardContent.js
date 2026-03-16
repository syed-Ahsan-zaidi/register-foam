"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logoutUser } from '../actions/auth';

export default function DashboardContent({ products: initialProducts, adminEmail }) {
    const [products, setProducts] = useState(initialProducts);
    const router = useRouter();

    const handleOrder = async (product) => {
        if (product.stock <= 0) {
            alert("Stock khatam ho chuka hai!");
            return;
        }

        try {
            const res = await fetch('/api/sales', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId: product.id,
                    productName: product.name,
                    price: product.price
                })
            });

            if (res.ok) {
                alert(`Order Successful: ${product.name}`);
                // Router refresh se server component naya data layega
                router.refresh(); 
            } else {
                alert("Order fail ho gaya. Database check karein.");
            }
        } catch (error) {
            console.error("Order Error:", error);
            alert("Server se rabta nahi ho saka.");
        }
    };

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Inventory</h1>
                    <p className="text-slate-500 text-sm italic">Admin: {adminEmail}</p>
                </div>
                <button 
                    onClick={() => logoutUser()}
                    className="bg-slate-900 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-slate-200"
                >
                    Sign Out
                </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">ID</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Product Name</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Stock Status</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Price</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {products.length > 0 ? (
                            products.map((item) => (
                                <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="p-4 text-slate-400 font-mono text-sm">#{item.id}</td>
                                    <td className="p-4 font-bold text-slate-700">{item.name}</td>
                                    <td className="p-4 text-slate-600">
                                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${item.stock <= 5 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                            {item.stock} in stock
                                        </span>
                                    </td>
                                    <td className="p-4 font-semibold text-blue-600">${item.price}</td>
                                    <td className="p-4 text-right">
                                        <button 
                                            onClick={() => handleOrder(item)}
                                            disabled={item.stock <= 0}
                                            className={`font-bold text-sm px-4 py-2 rounded-xl transition-all shadow-sm ${
                                                item.stock > 0 
                                                ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95' 
                                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                            }`}
                                        >
                                            {item.stock > 0 ? "Order Now" : "Sold Out"}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-10 text-center text-slate-400 font-medium">
                                    Inventory khali hai. Neon mein data check karein.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}