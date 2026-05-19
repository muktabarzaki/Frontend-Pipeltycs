import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { 
    LineChart, Line, BarChart, Bar, 
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

// Ikon untuk dropdown kustom (Sesuai dengan aturanmu: wajib pakai img, bukan svg tag langsung)
import IconSetting from '../icon/icondashboard/Setting.svg'; 

export default function SalesInsight() {
    // ==========================================
    // 1. WADAH DATA (STATE) & DUMMY DATA
    // ==========================================
    const [isLoading, setIsLoading] = useState(true);

    const [metrics, setMetrics] = useState({
        avgOrderValue: 327, aovGrowth: "+5.2%",
        retention: 82.4, retentionGrowth: "+3.1%",
        repeatRate: 45.6, repeatGrowth: "+2.8%",
        growthRate: 18.9, growthPeriod: "Monthly"
    });

    const [revenueData, setRevenueData] = useState([
        { week: 'Week 1', revenue: 42000 },
        { week: 'Week 2', revenue: 51000 },
        { week: 'Week 3', revenue: 45000 },
        { week: 'Week 4', revenue: 61000 }
    ]);

    const [categoryData, setCategoryData] = useState([
        { category: 'Electronics', revenue: 125000 },
        { category: 'Fashion', revenue: 98000 },
        { category: 'Beauty', revenue: 75000 },
        { category: 'Home', revenue: 54000 },
        { category: 'Sports', revenue: 51000 }
    ]);

    const [retentionData, setRetentionData] = useState([
        { month: 'Nov', rate: 68 }, { month: 'Dec', rate: 71 },
        { month: 'Jan', rate: 74 }, { month: 'Feb', rate: 78 },
        { month: 'Mar', rate: 82 }, { month: 'Apr', rate: 86 }
    ]);

    const [tableData, setTableData] = useState([
        { metric: 'Total Revenue', thisMonth: '$404,000', lastMonth: '$359,000', change: '+12.5%' },
        { metric: 'Total Orders', thisMonth: '1,237', lastMonth: '1,142', change: '+8.3%' },
        { metric: 'Average Order Value', thisMonth: '$327', lastMonth: '$314', change: '+4.1%' },
        { metric: 'New Customers', thisMonth: '342', lastMonth: '298', change: '+14.8%' },
        { metric: 'Returning Customers', thisMonth: '895', lastMonth: '844', change: '+6.0%' }
    ]);

    // ==========================================
    // 2. SIMULASI PENGAMBILAN DATA DARI LARAVEL
    // ==========================================
    useEffect(() => {
        axios.get('http://localhost:8000/api/sales-insights')
            .then(response => {
                // Uncomment ini jika backend sudah siap mengirim data format serupa
                /*
                setMetrics(response.data.metrics);
                setRevenueData(response.data.revenue);
                setCategoryData(response.data.category);
                setRetentionData(response.data.retention);
                setTableData(response.data.table);
                */
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
            {/* --- HEADER KONTEN --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold mb-1 text-gray-800">Sales Performance Insights</h1>
                    <p className="text-sm text-gray-500">Deep dive into your sales metrics and customer behavior</p>
                </div>
                
                {/* 2 Dropdown Filters di Kanan Atas */}
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <div className="relative w-40">
                        <select className="w-full appearance-none bg-white border border-gray-200 rounded-full pl-4 pr-10 py-2 text-sm font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 cursor-pointer shadow-sm">
                            <option>All Platform</option>
                            <option>Shopee</option>
                            <option>Tokopedia</option>
                        </select>
                        <img src={IconSetting} alt="arrow" className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none opacity-50 rotate-90" />
                    </div>
                    <div className="relative w-40">
                        <select className="w-full appearance-none bg-white border border-gray-200 rounded-full pl-4 pr-10 py-2 text-sm font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 cursor-pointer shadow-sm">
                            <option>Last 30 Days</option>
                            <option>This Month</option>
                            <option>Last Year</option>
                        </select>
                        <img src={IconSetting} alt="arrow" className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none opacity-50 rotate-90" />
                    </div>
                </div>
            </div>

            {/* --- 4 KARTU METRIK --- */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 mb-4">Average Order Value</h3>
                    <p className="text-4xl font-bold text-gray-800 mb-1">${metrics.avgOrderValue}</p>
                    <p className="text-sm text-[#22C55E] font-medium">{metrics.aovGrowth}</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 mb-4">Customer Retention</h3>
                    <p className="text-4xl font-bold text-gray-800 mb-1">{metrics.retention}%</p>
                    <p className="text-sm text-[#22C55E] font-medium">{metrics.retentionGrowth}</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 mb-4">Repeat Purchase Rate</h3>
                    <p className="text-4xl font-bold text-gray-800 mb-1">{metrics.repeatRate}%</p>
                    <p className="text-sm text-[#22C55E] font-medium">{metrics.repeatGrowth}</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 mb-4">Growth Rate</h3>
                    <p className="text-4xl font-bold text-gray-800 mb-1">{metrics.growthRate}%</p>
                    <p className="text-sm text-[#22C55E] font-medium">{metrics.growthPeriod}</p>
                </div>
            </div>

            {/* --- GRAFIK UTAMA (FULL WIDTH) --- */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={revenueData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dx={-10} />
                            <Tooltip cursor={{stroke: '#E5E7EB', strokeWidth: 1}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                            <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#8B5CF6" strokeWidth={2} dot={{r: 3, fill: '#8B5CF6'}} activeDot={{r: 5}} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* --- 2 GRAFIK BAWAH (KIRI & KANAN) --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Bar Chart: Revenue by Category */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-base font-bold text-gray-800 mb-1">Revenue by Category</h2>
                    <p className="text-sm text-gray-500 mb-6">Top performing product categories</p>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={categoryData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11}} />
                                <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                <Bar dataKey="revenue" name="Revenue" fill="#9D8DF1" radius={[2, 2, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Line Chart: Customer Retention Trend */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-base font-bold text-gray-800 mb-1">Customer Retention Trend</h2>
                    <p className="text-sm text-gray-500 mb-6">Monthly retention rate percentage</p>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={retentionData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11}} />
                                <Tooltip cursor={{stroke: '#E5E7EB'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                <Line type="monotone" dataKey="rate" name="Retention Rate (%)" stroke="#A78BFA" strokeWidth={2} dot={{r: 4, fill: '#fff', stroke: '#A78BFA', strokeWidth: 2}} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* --- TABEL DETAILED PERFORMANCE METRICS --- */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                <h2 className="text-lg font-bold text-gray-800 mb-1">Detailed Performance Metrics</h2>
                <p className="text-sm text-gray-500 mb-8">Comprehensive breakdown of key indicators</p>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="py-4 px-2 text-sm font-bold text-gray-600 w-1/4">Metric</th>
                                <th className="py-4 px-2 text-sm font-bold text-gray-600 w-1/4 text-center">This Month</th>
                                <th className="py-4 px-2 text-sm font-bold text-gray-600 w-1/4 text-center">Last Month</th>
                                <th className="py-4 px-2 text-sm font-bold text-gray-600 w-1/4 text-right">Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, index) => (
                                <tr key={index} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                                    <td className="py-5 px-2 text-sm font-semibold text-gray-800">{row.metric}</td>
                                    <td className="py-5 px-2 text-sm text-gray-800 text-center">{row.thisMonth}</td>
                                    <td className="py-5 px-2 text-sm text-gray-800 text-center">{row.lastMonth}</td>
                                    <td className="py-5 px-2 text-sm font-semibold text-[#22C55E] text-right">{row.change}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </Layout>
    );
}