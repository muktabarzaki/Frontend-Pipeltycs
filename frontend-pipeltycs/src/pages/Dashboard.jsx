import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { 
    LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, 
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

export default function Dashboard() {
    // ==========================================
    // 1. WADAH DATA (STATE) DENGAN FALLBACK DUMMY
    // ==========================================
    const [summary, setSummary] = useState({
        totalSales: 400000, salesGrowth: 18.4, unitsSold: 1237, avgOrderValue: 327
    });

    const [salesTrend, setSalesTrend] = useState([
        { date: 'DEC 1', sales: 25000 }, { date: 'DEC 05', sales: 30000 },
        { date: 'DEC 10', sales: 45000 }, { date: 'DEC 15', sales: 40000 },
        { date: 'DEC 20', sales: 60000 }, { date: 'DEC 25', sales: 55000 },
        { date: 'DEC 30', sales: 70000 }
    ]);

    const [revenuePlatform, setRevenuePlatform] = useState([
        { name: 'Shopee', value: 145000, color: '#8B5CF6' },
        { name: 'Tokopedia', value: 98000, color: '#F87171' },
        { name: 'TikTok Shop', value: 76000, color: '#FBBF24' },
        { name: 'Website', value: 31000, color: '#38BDF8' },
        { name: 'Instagram', value: 54000, color: '#6366F1' }
    ]);

    const [peakHours, setPeakHours] = useState([
        { time: '8-12', order: 2500 }, { time: '12-15', order: 3800 },
        { time: '15-18', order: 4200 }, { time: '18-21', order: 6800 },
        { time: '21-24', order: 3200 }
    ]);

    const [topProducts, setTopProducts] = useState([
        { id: 1, name: 'Wireless Earbuds Pro', platform: 'Shopee', units: 342, rev: 68400, growth: 15, color: '#F97316' },
        { id: 2, name: 'Smart Watch Series 5', platform: 'Tokopedia', units: 287, rev: 143500, growth: 15, color: '#22C55E' },
        { id: 3, name: 'Running Shoes Premium', platform: 'TikTok Shop', units: 234, rev: 46800, growth: 15, color: '#000000' },
        { id: 4, name: 'Laptop Stand Adjustable', platform: 'Instagram', units: 198, rev: 19800, growth: -5, color: '#E1306C' },
        { id: 5, name: 'USB-C Hub 7-in-1', platform: 'Shopee', units: 176, rev: 17600, growth: 15, color: '#F97316' }
    ]);

    // State untuk form input (Jika ingin diintegrasikan POST ke Laravel nantinya)
    const [formData, setFormData] = useState({
        platform: '', waktu: '', kategori: '', keuntungan: '', tanggal: '', namaProduk: '', jumlah: ''
    });

    const [isLoading, setIsLoading] = useState(true);

    // ==========================================
    // 2. PEMANGGILAN API KE LARAVEL
    // ==========================================
    useEffect(() => {
        axios.get('http://localhost:8000/api/dashboard-data')
            .then((response) => {
                // Jika Laravel sudah siap dan merespon, timpa data dummy dengan data asli
                setSummary(response.data.summary);
                setSalesTrend(response.data.trend);
                setRevenuePlatform(response.data.platform);
                setPeakHours(response.data.peak_hours);
                setTopProducts(response.data.top_products);
                setIsLoading(false);
            })
            .catch((error) => {
                // Jika Laravel belum siap/error, biarkan data dummy tetap tampil agar UI tidak rusak
                console.error("Backend belum merespon, menggunakan data dummy.", error.message);
                setIsLoading(false);
            });
    }, []);


    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleAddData = (e) => {
        e.preventDefault();
        // Nanti diganti dengan axios.post('http://localhost:8000/api/simpan-data', formData)
        alert("Fitur simpan ke database sedang disiapkan oleh backend!");
    };

    return (
        <Layout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">Sales Overview</h1>
                <p className="text-gray-500 mb-8">Your complete sales performance across all platforms</p>

                {/* --- 4 KOTAK RINGKASAN ATAS --- */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-[#635BFF] rounded-2xl p-6 text-white shadow-lg shadow-indigo-200/50 relative overflow-hidden">
                        {isLoading && <div className="absolute inset-0 bg-white/20 animate-pulse"></div>}
                        <h3 className="text-sm font-medium mb-4 opacity-90">Total Sales</h3>
                        <p className="text-3xl font-bold mb-1">${summary.totalSales.toLocaleString()}</p>
                        <p className="text-xs opacity-80">+12.5% from last month</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-sm font-medium text-gray-500 mb-4">Sales Growth</h3>
                        <p className="text-3xl font-bold text-gray-800 mb-1">{summary.salesGrowth}%</p>
                        <p className="text-xs text-[#22C55E] font-medium">+vs previous period</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-sm font-medium text-gray-500 mb-4">Units Sold</h3>
                        <p className="text-3xl font-bold text-gray-800 mb-1">{summary.unitsSold.toLocaleString()}</p>
                        <p className="text-xs text-[#22C55E] font-medium">+8.2% this week</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-sm font-medium text-gray-500 mb-4">Avg Order Value</h3>
                        <p className="text-3xl font-bold text-gray-800 mb-1">${summary.avgOrderValue.toLocaleString()}</p>
                        <p className="text-xs text-red-500 font-medium">-2.1% from avg</p>
                    </div>
                </div>

                {/* --- FORM INPUT DATA --- */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                    <h2 className="text-base font-bold text-gray-800 mb-6">Add the data you need!</h2>
                    <form onSubmit={handleAddData} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold text-gray-600">Platform:</label>
                                <select name="platform" value={formData.platform} onChange={handleChange} className="w-[70%] bg-gray-100/70 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-[#635BFF]/30">
                                    <option value="">Pilih Platform...</option>
                                    <option value="shopee">Shopee</option>
                                    <option value="tokopedia">Tokopedia</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold text-gray-600">Waktu:</label>
                                <input type="time" name="waktu" value={formData.waktu} onChange={handleChange} className="w-[70%] bg-gray-100/70 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-[#635BFF]/30" />
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold text-gray-600">Kategori Produk:</label>
                                <select name="kategori" value={formData.kategori} onChange={handleChange} className="w-[70%] bg-gray-100/70 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-[#635BFF]/30">
                                    <option value="">Pilih Kategori...</option>
                                    <option value="elektronik">Elektronik</option>
                                    <option value="fashion">Fashion</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold text-gray-800">Total Keuntungan:</label>
                                <div className="w-[70%] relative">
                                    <span className="absolute left-3 top-2 text-gray-500 text-xs font-medium">Rp.</span>
                                    <input type="number" name="keuntungan" value={formData.keuntungan} onChange={handleChange} className="w-full bg-gray-100/70 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:ring-[#635BFF]/30" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold text-gray-600">Tanggal:</label>
                                <input type="date" name="tanggal" value={formData.tanggal} onChange={handleChange} className="w-[70%] bg-gray-100/70 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-[#635BFF]/30" />
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold text-gray-600">Nama Produk:</label>
                                <input type="text" name="namaProduk" value={formData.namaProduk} onChange={handleChange} className="w-[70%] bg-gray-100/70 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-[#635BFF]/30" />
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold text-gray-600">Jumlah Penjualan:</label>
                                <input type="number" name="jumlah" value={formData.jumlah} onChange={handleChange} className="w-[70%] bg-gray-100/70 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-[#635BFF]/30" />
                            </div>
                            <div className="flex justify-end mt-1">
                                <button type="submit" className="bg-[#635BFF] hover:bg-indigo-600 text-white font-semibold text-xs py-2 px-8 rounded-lg shadow-md transition-all">
                                    Add Data
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* --- GRAFIK LINE & PIE --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-sm font-bold text-gray-800 mb-1">Sales Trend (Last 30 Days)</h2>
                        <p className="text-xs text-gray-500 mb-6">Daily revenue performance</p>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={salesTrend}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11}} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11}} dx={-10} />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="sales" stroke="#635BFF" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-sm font-bold text-gray-800 mb-1">Revenue by Platform</h2>
                        <p className="text-xs text-gray-500 mb-6">Distribution across channels</p>
                        <div className="h-[250px] w-full flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={revenuePlatform} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                                        {revenuePlatform.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* --- GRAFIK BAR --- */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                    <h2 className="text-sm font-bold text-gray-800 mb-1">Peak Sales Hours</h2>
                    <p className="text-xs text-gray-500 mb-6">Orders by time of day</p>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={peakHours} barSize={60}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dx={-10} />
                                <Tooltip cursor={{fill: '#F3F4F6'}} />
                                <Bar dataKey="order" fill="#A78BFA" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* --- DAFTAR TOP PRODUK --- */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                    <h2 className="text-sm font-bold text-gray-800 mb-1">Top 5 Best-Selling Products</h2>
                    <p className="text-xs text-gray-500 mb-6">Highest performing items this month</p>
                    
                    <div className="flex flex-col gap-4">
                        {topProducts.map((product) => (
                            <div key={product.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors border-b border-gray-50 last:border-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-[#8B5CF6] text-white flex items-center justify-center font-bold text-sm">
                                        {product.id}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-800">{product.name}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-bold text-white px-2 py-0.5 rounded-full" style={{backgroundColor: product.color}}>
                                                {product.platform}
                                            </span>
                                            <span className="text-xs text-gray-500">{product.units} units • ${product.rev.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={`text-sm font-bold flex items-center gap-1 ${product.growth > 0 ? 'text-[#22C55E]' : 'text-red-500'}`}>
                                    {product.growth > 0 ? '↑' : '↓'} {Math.abs(product.growth)}%
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </Layout>
    );
}