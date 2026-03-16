'use client';
import { useState } from 'react';
import { logoutUser } from '@/app/actions/auth';

export default function DashboardContent({ products, adminEmail, adminName }) {
    const [activeTab, setActiveTab] = useState('inventory');
    
    // Initial order mein adminName use ho raha hai
    const [orders, setOrders] = useState([
        { orderId: "#ORD-7721", customer: adminName || "Admin", product: "iPhone 15 Pro", amount: "$999", status: "Delivered" }
    ]);

    // Customers list mein safety check
    const customers = [
        { id: 2, name: adminName || "User", email: adminEmail }
    ];

    const handleOrder = (product) => {
        const newOrder = {
            orderId: `#ORD-${Math.floor(Math.random() * 10000)}`,
            customer: adminName || "User",
            product: product.title,
            amount: `$${product.price}`,
            status: "Pending"
        };
        setOrders([newOrder, ...orders]);
        alert(`${product.title} has been added to Sales!`);
    };

    return (
        <div className="min-h-screen bg-[#f1f5f9] flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-[#0f172a] text-white p-6 hidden lg:flex flex-col sticky top-0 h-screen">
                <h2 className="text-xl font-black text-blue-500 mb-10 italic uppercase tracking-tighter">AMMARA STORE</h2>
                <nav className="flex flex-col gap-2">
                    <button onClick={() => setActiveTab('inventory')} className={`p-3 rounded-xl font-bold text-left transition-all ${activeTab === 'inventory' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>📦 Inventory</button>
                    <button onClick={() => setActiveTab('sales')} className={`p-3 rounded-xl font-bold text-left transition-all ${activeTab === 'sales' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>💰 Sales</button>
                    <button onClick={() => setActiveTab('customers')} className={`p-3 rounded-xl font-bold text-left transition-all ${activeTab === 'customers' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>👥 Customers</button>
                </nav>
            </aside>

            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{activeTab}</h1>
                        <p className="text-slate-500 text-sm italic">Admin: {adminEmail}</p>
                    </div>
                    <form action={logoutUser}>
                        <button type="submit" className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-red-600 transition-all">Sign Out</button>
                    </form>
                </header>

                {/* Inventory View */}
                {activeTab === 'inventory' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
                        {products.map((product) => (
                            <div key={product.id} className="bg-white border border-slate-200 p-5 rounded-[2rem] hover:shadow-xl transition-all flex flex-col justify-between group">
                                <div className="h-48 bg-slate-50 rounded-2xl p-4 mb-4 overflow-hidden">
                                    <img src={product.image} alt={product.title} className="h-full w-full object-contain group-hover:scale-110 transition-transform" />
                                </div>
                                <h4 className="font-bold text-slate-800 text-sm line-clamp-2 h-10">{product.title}</h4>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="font-black text-slate-900">${product.price}</span>
                                    <button onClick={() => handleOrder(product)} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all text-xs">+ Add Order</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Sales View */}
                {activeTab === 'sales' && (
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                <tr>
                                    <th className="p-6">Order ID</th>
                                    <th className="p-6">Customer</th>
                                    <th className="p-6">Product</th>
                                    <th className="p-6">Amount</th>
                                    <th className="p-6">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, idx) => (
                                    <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                        <td className="p-6 text-slate-400">{order.orderId}</td>
                                        <td className="p-6 font-bold">{order.customer}</td>
                                        <td className="p-6 italic">{order.product}</td>
                                        <td className="p-6 font-black text-blue-600">{order.amount}</td>
                                        <td className="p-6 text-[10px] font-black uppercase tracking-widest"><span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">{order.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Customers View */}
                {activeTab === 'customers' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {customers.map((c) => (
                            <div key={c.id} className="bg-white p-6 rounded-[2rem] border border-slate-200 flex items-center gap-4">
                                {/* FIXED LINE HERE */}
                                <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                    {c.name ? c.name[0].toUpperCase() : "U"}
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-800">{c.name}</h3>
                                    <p className="text-slate-500 text-sm">{c.email}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}