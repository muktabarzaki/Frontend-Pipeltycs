import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

export default function ProductAnalyst() {
    // ==========================================
    // 1. WADAH DATA (STATE) & DUMMY DATA
    // ==========================================
    const [isLoading, setIsLoading] = useState(true);

    const [alert, setAlert] = useState({
        show: true,
        message: "2 products have low inventory levels. Consider restocking soon."
    });

    const [products, setProducts] = useState([
        { id: 1, name: 'Wireless Earbuds Pro', sku: 'SKU-0001', platform: 'Shopee', platformColor: 'bg-[#F97316]', sold: 342, revenue: '$68,400', trend: 15.2, status: 'Fast-moving', statusColor: 'bg-green-100 text-green-700' },
        { id: 2, name: 'Smart Watch Series 5', sku: 'SKU-0002', platform: 'Tokopedia', platformColor: 'bg-[#22C55E]', sold: 287, revenue: '$143,500', trend: 22.1, status: 'Fast-moving', statusColor: 'bg-green-100 text-green-700' },
        { id: 3, name: 'Running Shoes Premium', sku: 'SKU-0003', platform: 'TikTok Shop', platformColor: 'bg-black', sold: 234, revenue: '$46,800', trend: 8.4, status: 'Fast-moving', statusColor: 'bg-green-100 text-green-700' },
        { id: 4, name: 'Laptop Stand Adjustable', sku: 'SKU-0004', platform: 'Instagram', platformColor: 'bg-[#D946EF]', sold: 198, revenue: '$19,800', trend: -5.2, status: 'Normal', statusColor: 'bg-gray-100 text-gray-700' },
        { id: 5, name: 'USB-C Hub 7-in-1', sku: 'SKU-0005', platform: 'Shopee', platformColor: 'bg-[#F97316]', sold: 176, revenue: '$17,600', trend: 12.8, status: 'Slow-moving', statusColor: 'bg-green-100 text-green-700' },
    ]);

    const [heatmapData, setHeatmapData] = useState([
        { time: '0-3', sales: 15 },
        { time: '3-6', sales: 10 },
        { time: '6-9', sales: 45 },
        { time: '9-12', sales: 90 },
        { time: '12-15', sales: 125 },
        { time: '15-18', sales: 160 },
        { time: '18-21', sales: 200 },
        { time: '21-24', sales: 85 },
    ]);

    const [summary, setSummary] = useState({
        totalProducts: 342, activeSkus: "Active SKUs",
        fastMoving: 127, highDemand: "High demand products",
        lowStock: 2, needRestocking: "Need restocking"
    });

    // ==========================================
    // 2. SIMULASI API KE LARAVEL
    // ==========================================
    useEffect(() => {
        axios.get('http://localhost:8000/api/product-performance')
            .then(response => {
                // Uncomment ini ketika backend siap
                // setAlert(response.data.alert);
                // setProducts(response.data.products);
                // setHeatmapData(response.data.heatmap);
                // setSummary(response.data.summary);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Menggunakan data mockup karena backend belum siap.", error.message);
                setIsLoading(false);
            });
    }, []);

    // ==========================================
    // 3. TAMPILAN ANTARMUKA
    // ==========================================
    return (
        <Layout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1 text-gray-800">Product Performance</h1>
                <p className="text-sm text-gray-500">Analyze individual product sales and inventory trends</p>
            </div>

            {/* --- ALERT BOX (LOW STOCK) --- */}
            {alert.show && (
                <div className="bg-[#FFF3E0] border border-[#FFE0B2] rounded-xl p-4 mb-8 flex items-center gap-4">
                    <div className="w-5 h-5 bg-[#FFB74D] rounded-sm flex-shrink-0"></div>
                    <div>
                        <h4 className="text-[#F57C00] font-semibold text-sm">Low Stock Alert</h4>
                        <p className="text-[#F57C00] text-sm">{alert.message}</p>
                    </div>
                </div>
            )}

            {/* --- TABLE: TOP-SELLING PRODUCTS --- */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                <h2 className="text-base font-bold text-gray-800 mb-1">Top-Selling Products</h2>
                <p className="text-xs text-gray-500 mb-6">Complete product performance breakdown</p>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="py-4 px-2 text-sm font-bold text-gray-500 w-[30%]">Product</th>
                                <th className="py-4 px-2 text-sm font-bold text-gray-500 text-center w-[15%]">Platform</th>
                                <th className="py-4 px-2 text-sm font-bold text-gray-500 text-center w-[15%]">Units Sold</th>
                                <th className="py-4 px-2 text-sm font-bold text-gray-500 text-center w-[15%]">Revenue</th>
                                <th className="py-4 px-2 text-sm font-bold text-gray-500 text-center w-[10%]">Trend</th>
                                <th className="py-4 px-2 text-sm font-bold text-gray-500 text-center w-[15%]">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-2">
                                        <div className="flex items-center gap-4">
                                            {/* Placeholder Ikon Produk (Silakan ganti src dengan img icon sungguhan) */}
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-gray-400 text-xs">IMG</span>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-800">{product.name}</h4>
                                                <p className="text-xs text-gray-400">{product.sku}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-2 text-center">
                                        <span className={`text-[10px] font-bold text-white px-3 py-1 rounded-full ${product.platformColor}`}>
                                            {product.platform}
                                        </span>
                                    </td>
                                    <td className="py-4 px-2 text-sm text-gray-800 text-center font-medium">{product.sold}</td>
                                    <td className="py-4 px-2 text-sm text-gray-800 text-center font-medium">{product.revenue}</td>
                                    <td className={`py-4 px-2 text-sm font-bold text-center ${product.trend > 0 ? 'text-[#22C55E]' : 'text-red-500'}`}>
                                        {product.trend > 0 ? '↗' : '↘'} {Math.abs(product.trend)}%
                                    </td>
                                    <td className="py-4 px-2 text-center">
                                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${product.statusColor}`}>
                                            {product.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- BAR CHART: SALES HEATMAP BY HOUR --- */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                <h2 className="text-base font-bold text-gray-800 mb-1">Sales Heatmap by Hour</h2>
                <p className="text-xs text-gray-500 mb-6">Peak selling times throughout the day</p>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={heatmapData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11}} />
                            <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                            <Bar dataKey="sales" name="Sales Count" fill="#3B82F6" barSize={50} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* --- 3 BOTTOM SUMMARY CARDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Blue Card */}
                <div className="bg-[#4285F4] rounded-2xl p-6 text-white shadow-md shadow-blue-200">
                    {/* Placeholder Ikon (Silakan ganti src dengan img icon sungguhan) */}
                    <div className="w-10 h-10 mb-4 opacity-90 flex items-center justify-start text-3xl">📦</div>
                    <h3 className="text-lg font-bold mb-1">Total Products</h3>
                    <p className="text-4xl font-bold mb-2">{summary.totalProducts}</p>
                    <p className="text-sm opacity-90">{summary.activeSkus}</p>
                </div>
                
                {/* Teal Card */}
                <div className="bg-[#2DD4BF] rounded-2xl p-6 text-white shadow-md shadow-teal-200">
                     {/* Placeholder Ikon (Silakan ganti src dengan img icon sungguhan) */}
                    <div className="w-10 h-10 mb-4 opacity-90 flex items-center justify-start text-3xl">📈</div>
                    <h3 className="text-lg font-bold mb-1">Fast-Moving Items</h3>
                    <p className="text-4xl font-bold mb-2">{summary.fastMoving}</p>
                    <p className="text-sm opacity-90">{summary.highDemand}</p>
                </div>

                {/* Orange Card */}
                <div className="bg-[#F97316] rounded-2xl p-6 text-white shadow-md shadow-orange-200">
                     {/* Placeholder Ikon (Silakan ganti src dengan img icon sungguhan) */}
                    <div className="w-10 h-10 mb-4 opacity-90 flex items-center justify-start text-3xl">⚠️</div>
                    <h3 className="text-lg font-bold mb-1">Low Stock Alert</h3>
                    <p className="text-4xl font-bold mb-2">{summary.lowStock}</p>
                    <p className="text-sm opacity-90">{summary.needRestocking}</p>
                </div>
            </div>

        </Layout>
    );
}