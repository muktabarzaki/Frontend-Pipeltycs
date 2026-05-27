import { useState, useEffect } from 'react';
import api from '../lib/axios';
import Layout from '../components/Layout';
import {
    LineChart, Line, PieChart, Pie, Cell, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// Warna platform yang konsisten
const PLATFORM_COLORS = {
    'Shopee':     '#F97316',
    'Tokopedia':  '#22C55E',
    'TikTok Shop':'#000000',
    'Website':    '#38BDF8',
    'Instagram':  '#E1306C',
};

// Helper: format tanggal jadi label singkat, misal "20 Mei"

// Helper: hitung ulang summary dari topProducts & salesTrend


export default function Dashboard() {
    // ==========================================
    // STATE — kosong, diisi dari API atau Add Data
    // ==========================================
    const [summary, setSummary] = useState({
        totalSales: 0, salesGrowth: 0, unitsSold: 0, avgOrderValue: 0
    });
    const [salesTrend, setSalesTrend]         = useState([]);   // [{ date, sales }]
    const [revenuePlatform, setRevenuePlatform] = useState([]); // [{ name, value, color }]
    const [peakHours, setPeakHours]           = useState([]);   // [{ time, order }]
    const [topProducts, setTopProducts]       = useState([]);   // [{ id, name, platform, units, rev, growth, color }]

    const [formData, setFormData] = useState({
        platform: '', waktu: '', kategori: '', keuntungan: '',
        tanggal: '', namaProduk: '', jumlah: ''
    });

    const [isLoading, setIsLoading] = useState(true);

    // ==========================================
    // PEMANGGILAN API KE LARAVEL
    // ==========================================
    useEffect(() => {
        api.get('/dashboard-data')
            .then((response) => {
                setSummary(response.data.summary);
                setSalesTrend(response.data.trend);
                setRevenuePlatform(response.data.platform);
                setPeakHours(response.data.peak_hours);
                setTopProducts(response.data.top_products);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Backend belum merespon.", error.message);
                setIsLoading(false);
            });
    }, []);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    // ==========================================
    // ADD DATA — langsung update semua state lokal
    // ==========================================
    const handleAddData = async (e) => {
    e.preventDefault();

    const { platform, waktu, kategori, keuntungan, tanggal, namaProduk, jumlah } = formData;

    if (!platform || !namaProduk || !jumlah) {
        alert("Isi minimal: Platform, Nama Produk, dan Jumlah Penjualan.");
        return;
    }

    try {
        // Kirim ke database
        await api.post('/dashboard/add-sale', {
            platform:     platform,
            product_name: namaProduk,
            kategori:     kategori,
            waktu:        waktu,
            tanggal:      tanggal,
            jumlah:       parseInt(jumlah),
            keuntungan:   parseFloat(keuntungan),
        });

        // Reset form
        setFormData({
            platform: '', waktu: '', kategori: '', keuntungan: '',
            tanggal: '', namaProduk: '', jumlah: ''
        });

        // Refresh data dari database
        const res = await api.get('/dashboard-data');
        setSummary(res.data.summary);
        setSalesTrend(res.data.trend);
        setRevenuePlatform(res.data.platform);
        setPeakHours(res.data.peak_hours);
        setTopProducts(res.data.top_products);

        alert("Data berhasil disimpan!");

    } catch (err) {
        console.error('Gagal simpan:', err.message);
        alert("Gagal menyimpan data. Coba lagi.");
    }
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
                                    <option value="Shopee">Shopee</option>
                                    <option value="Tokopedia">Tokopedia</option>
                                    <option value="TikTok Shop">TikTok Shop</option>
                                    <option value="Website">Website</option>
                                    <option value="Instagram">Instagram</option>
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
                        {salesTrend.length === 0 ? (
                            <div className="h-[250px] flex items-center justify-center text-gray-400 text-sm">
                                Belum ada data. Tambahkan data melalui form di atas.
                            </div>
                        ) : (
                            <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={salesTrend}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} dx={-10} />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="sales" stroke="#635BFF" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-sm font-bold text-gray-800 mb-1">Revenue by Platform</h2>
                        <p className="text-xs text-gray-500 mb-6">Distribution across channels</p>
                        {revenuePlatform.length === 0 ? (
                            <div className="h-[250px] flex items-center justify-center text-gray-400 text-sm text-center px-4">
                                Belum ada data platform.
                            </div>
                        ) : (
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
                        )}
                    </div>
                </div>

                {/* --- GRAFIK BAR --- */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                    <h2 className="text-sm font-bold text-gray-800 mb-1">Peak Sales Hours</h2>
                    <p className="text-xs text-gray-500 mb-6">Orders by time of day</p>
                    {peakHours.length === 0 ? (
                        <div className="h-[250px] flex items-center justify-center text-gray-400 text-sm">
                            Belum ada data jam penjualan.
                        </div>
                    ) : (
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={peakHours} barSize={60}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dx={-10} />
                                    <Tooltip cursor={{ fill: '#F3F4F6' }} />
                                    <Bar dataKey="order" fill="#A78BFA" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>

                {/* --- DAFTAR TOP PRODUK --- */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                    <h2 className="text-sm font-bold text-gray-800 mb-1">Top 5 Best-Selling Products</h2>
                    <p className="text-xs text-gray-500 mb-6">Highest performing items this month</p>

                    {topProducts.length === 0 ? (
                        <div className="py-12 text-center text-gray-400 text-sm">
                            Belum ada produk. Tambahkan data melalui form di atas.
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {topProducts.slice(0, 5).map((product) => (
                                <div key={product.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors border-b border-gray-50 last:border-0">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-[#8B5CF6] text-white flex items-center justify-center font-bold text-sm">
                                            {product.id}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-800">{product.name}</h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] font-bold text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: product.color }}>
                                                    {product.platform}
                                                </span>
                                                <span className="text-xs text-gray-500">{product.units} units • Rp {product.rev.toLocaleString('id-ID')}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`text-sm font-bold flex items-center gap-1 ${product.growth > 0 ? 'text-[#22C55E]' : product.growth < 0 ? 'text-red-500' : 'text-gray-400'}`}>
                                        {product.growth > 0 ? '↑' : product.growth < 0 ? '↓' : '—'} {product.growth !== 0 ? Math.abs(product.growth) + '%' : 'Baru'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </Layout>
    );
}