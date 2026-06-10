import { useState, useEffect } from 'react';
import api from '../lib/axios';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import {
    LineChart, Line, PieChart, Pie, Cell, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const PLATFORM_COLORS = {
    'Shopee':     '#F97316',
    'Tokopedia':  '#22C55E',
    'TikTok Shop':'#000000',
    'Website':    '#38BDF8',
    'Instagram':  '#E1306C',
};

export default function Dashboard() {
    const { formatCurrency, t } = useApp();
    const [summary, setSummary] = useState({
        totalSales: 0, salesGrowth: 0, unitsSold: 0, avgOrderValue: 0
    });
    const [salesTrend, setSalesTrend]           = useState([]);
    const [revenuePlatform, setRevenuePlatform] = useState([]);
    const [peakHours, setPeakHours]             = useState([]);
    const [topProducts, setTopProducts]         = useState([]);
    const [formData, setFormData] = useState({
        platform: '', waktu: '', kategori: '', keuntungan: '',
        tanggal: '', namaProduk: '', jumlah: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    
    // STATE UNTUK MODAL KUSTOM DASHBOARD
    const [showSuccessModal, setShowSuccessModal] = useState(false);

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

    const handleAddData = async (e) => {
        e.preventDefault();
        const { platform, waktu, kategori, keuntungan, tanggal, namaProduk, jumlah } = formData;
        if (!platform || !namaProduk || !jumlah) {
            alert("Isi minimal: Platform, Nama Produk, dan Jumlah Penjualan.");
            return;
        }
        try {
            await api.post('/dashboard/add-sale', {
                platform, product_name: namaProduk, kategori,
                waktu, tanggal, jumlah: parseInt(jumlah),
                keuntungan: parseFloat(keuntungan),
            });
            setFormData({ platform: '', waktu: '', kategori: '', keuntungan: '', tanggal: '', namaProduk: '', jumlah: '' });
            const res = await api.get('/dashboard-data');
            setSummary(res.data.summary);
            setSalesTrend(res.data.trend);
            setRevenuePlatform(res.data.platform);
            setPeakHours(res.data.peak_hours);
            setTopProducts(res.data.top_products);
            
            // Ganti alert jadoel dengan modal state
            setShowSuccessModal(true);
        } catch (err) {
            console.error('Gagal simpan:', err.message);
            alert("Gagal menyimpan data. Coba lagi.");
        }
    };

    return (
        <Layout>
            <div className="mb-6 relative">
                <h1 className="text-2xl font-bold mb-1">{t('salesOverview')}</h1>
                <p className="text-gray-500 mb-8">{t('salesOverviewDesc')}</p>

                {/* --- 4 KOTAK RINGKASAN ATAS --- */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-[#635BFF] rounded-2xl p-6 text-white shadow-lg shadow-indigo-200/50 relative overflow-hidden">
                        {isLoading && <div className="absolute inset-0 bg-white/20 animate-pulse"></div>}
                        <h3 className="text-sm font-medium mb-4 opacity-90">{t('totalSales')}</h3>
                        <p className="text-3xl font-bold mb-1">{formatCurrency(summary.totalSales)}</p>
                        <p className="text-xs opacity-80">+12.5% from last month</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-sm font-medium text-gray-500 mb-4">{t('salesGrowth')}</h3>
                        <p className="text-3xl font-bold text-gray-800 mb-1">{summary.salesGrowth}%</p>
                        <p className="text-xs text-[#22C55E] font-medium">+vs previous period</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-sm font-medium text-gray-500 mb-4">{t('unitsSold')}</h3>
                        <p className="text-3xl font-bold text-gray-800 mb-1">{summary.unitsSold.toLocaleString()}</p>
                        <p className="text-xs text-[#22C55E] font-medium">+8.2% this week</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-sm font-medium text-gray-500 mb-4">{t('avgOrderValue')}</h3>
                        <p className="text-3xl font-bold text-gray-800 mb-1">{formatCurrency(summary.avgOrderValue)}</p>
                        <p className="text-xs text-red-500 font-medium">-2.1% from avg</p>
                    </div>
                </div>

                {/* --- FORM INPUT DATA --- */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                    <h2 className="text-base font-bold text-gray-800 mb-6">{t('addData')}</h2>
                    <form onSubmit={handleAddData} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold text-gray-600">{t('platform')}:</label>
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
                                <label className="text-xs font-semibold text-gray-600">{t('time')}:</label>
                                <input type="time" name="waktu" value={formData.waktu} onChange={handleChange} className="w-[70%] bg-gray-100/70 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-[#635BFF]/30" />
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold text-gray-600">{t('category')}:</label>
                                <select name="kategori" value={formData.kategori} onChange={handleChange} className="w-[70%] bg-gray-100/70 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-[#635BFF]/30">
                                    <option value="">Pilih Kategori...</option>
                                    <option value="elektronik">Elektronik</option>
                                    <option value="fashion">Fashion</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold text-gray-800">{t('totalProfit')}:</label>
                                <div className="w-[70%] relative">
                                    <span className="absolute left-3 top-2 text-gray-500 text-xs font-medium">Rp.</span>
                                    <input type="number" name="keuntungan" value={formData.keuntungan} onChange={handleChange} className="w-full bg-gray-100/70 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:ring-[#635BFF]/30" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold text-gray-600">{t('date')}:</label>
                                <input type="date" name="tanggal" value={formData.tanggal} onChange={handleChange} className="w-[70%] bg-gray-100/70 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-[#635BFF]/30" />
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold text-gray-600">{t('productName')}:</label>
                                <input type="text" name="namaProduk" value={formData.namaProduk} onChange={handleChange} className="w-[70%] bg-gray-100/70 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-[#635BFF]/30" />
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold text-gray-600">{t('salesQty')}:</label>
                                <input type="number" name="jumlah" value={formData.jumlah} onChange={handleChange} className="w-[70%] bg-gray-100/70 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-[#635BFF]/30" />
                            </div>
                            <div className="flex justify-end mt-1">
                                <button type="submit" className="bg-[#635BFF] hover:bg-indigo-600 text-white font-semibold text-xs py-2 px-8 rounded-lg shadow-md transition-all">
                                    {t('addBtn')}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* --- GRAFIK LINE & PIE --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-sm font-bold text-gray-800 mb-1">{t('salesTrend')}</h2>
                        <p className="text-xs text-gray-500 mb-6">{t('dailyRevenue')}</p>
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
                        <h2 className="text-sm font-bold text-gray-800 mb-1">{t('revenueByPlatform')}</h2>
                        <p className="text-xs text-gray-500 mb-6">{t('distributionChannels')}</p>
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
                    <h2 className="text-sm font-bold text-gray-800 mb-1">{t('peakHours')}</h2>
                    <p className="text-xs text-gray-500 mb-6">{t('ordersTimeOfDay')}</p>
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
                    <h2 className="text-sm font-bold text-gray-800 mb-1">{t('topProducts')}</h2>
                    <p className="text-xs text-gray-500 mb-6">{t('highestItemsMonth')}</p>
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
                                                <span className="text-xs text-gray-500">{product.units} units • {formatCurrency(product.rev)}</span>
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

            {/* POPUP MODAL SAAT DATA BERHASIL DISIMPAN */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full mx-4 border border-[#38BDF8] text-center flex flex-col items-center justify-center">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 leading-relaxed">
                            Data Berhasil Disimpan!
                        </h2>
                        <button
                            onClick={() => setShowSuccessModal(false)}
                            className="w-32 py-2 bg-[#635BFF] hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-md transition-colors text-sm"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </Layout>
    );
}