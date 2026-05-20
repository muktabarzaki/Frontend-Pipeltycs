import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { 
    LineChart, Line, BarChart, Bar, 
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

export default function PlatformComparison() {
    return <Layout><h1 className="text-2xl font-bold">Platform Comparison</h1></Layout>;
    // ==========================================
    // 1. WADAH DATA (STATE) & DUMMY DATA (Sesuai Figma)
    // ==========================================
    const [isLoading, setIsLoading] = useState(true);

    const [summaryCards, setSummaryCards] = useState({
        bestPlatform: { platform: 'Shopee', value: '$45,000', desc: 'Daily Revenue', color: 'bg-[#F97316]' },
        highestConversion: { platform: 'TikTok Shop', value: '5.6%', desc: 'Conversion Rate', color: 'bg-black' },
        bestGrowth: { platform: 'TikTok Shop', value: '+28.4%', desc: 'Monthly Growth', color: 'bg-black' }
    });

    const [revenueComparison, setRevenueComparison] = useState([
        { week: 'Week 1', Instagram: 12000, Shopee: 35000, Tiktokshop: 18000, Tokopedia: 28000 },
        { week: 'Week 2', Instagram: 15000, Shopee: 32000, Tiktokshop: 22000, Tokopedia: 32000 },
        { week: 'Week 3', Instagram: 18000, Shopee: 42000, Tiktokshop: 25000, Tokopedia: 30000 },
        { week: 'Week 4', Instagram: 20000, Shopee: 45000, Tiktokshop: 28000, Tokopedia: 35000 },
    ]);

    const [conversionData, setConversionData] = useState([
        { platform: 'Shopee', rate: 4.2 },
        { platform: 'Tokopedia', rate: 3.8 },
        { platform: 'TikTok', rate: 5.6 },
        { platform: 'Instagram', rate: 2.9 },
    ]);

    const [feesData, setFeesData] = useState([
        { platform: 'Shopee', fee: 7200 },
        { platform: 'Tokopedia', rate: 0, fee: 4900 }, // rate diabaikan, hanya dummy data struktur
        { platform: 'Tiktok', fee: 3800 },
        { platform: 'Instagram', fee: 2700 },
    ]);

    const [trafficRevenueData, setTrafficRevenueData] = useState([
        { platform: 'Shopee', Revenue: 145000, Traffics: 45000 },
        { platform: 'Tokopedia', Revenue: 98000, Traffics: 38000 },
        { platform: 'Tiktok', Revenue: 76000, Traffics: 28000 },
        { platform: 'Instagram', Revenue: 54000, Traffics: 15000 },
    ]);

    const [tableData, setTableData] = useState([
        { platform: 'Shopee', revenue: '$145,000', orders: 487, conversion: '4.2%', aov: '$298', growth: '+12.3%', color: 'bg-[#F97316]' },
        { platform: 'Tokopedia', revenue: '$98,000', orders: 312, conversion: '3.8%', aov: '$314', growth: '+8.7%', color: 'bg-[#22C55E]' },
        { platform: 'TikTok Shop', revenue: '$76,000', orders: 267, conversion: '5.6%', aov: '$285', growth: '+15.2%', color: 'bg-black' },
        { platform: 'Instagram', revenue: '$54,000', orders: 171, conversion: '2.9%', aov: '$316', growth: '+28.4%', color: 'bg-[#D946EF]' },
    ]);

    // ==========================================
    // 2. SIMULASI API KE LARAVEL
    // ==========================================
    useEffect(() => {
        axios.get('http://localhost:8000/api/platform-comparison')
            .then(response => {
                // setSummaryCards(response.data.summary);
                // setRevenueComparison(response.data.revenue_comparison);
                // setConversionData(response.data.conversion);
                // setFeesData(response.data.fees);
                // setTrafficRevenueData(response.data.traffic_revenue);
                // setTableData(response.data.table_data);
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
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-1 text-gray-800">Platform Comparison</h1>
                <p className="text-sm text-gray-500">Compare performance across Shopee, Tokopedia, TikTok Shop, and Instagram</p>
            </div>

            {/* --- 3 KARTU SUMMARY --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Card 1 */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 mb-4">Best Platform Today</h3>
                    <span className={`text-[11px] font-bold text-white px-3 py-1 rounded-full ${summaryCards.bestPlatform.color}`}>
                        {summaryCards.bestPlatform.platform}
                    </span>
                    <p className="text-3xl font-bold text-gray-800 mt-4 mb-1">{summaryCards.bestPlatform.value}</p>
                    <p className="text-xs text-gray-400 font-medium">{summaryCards.bestPlatform.desc}</p>
                </div>
                {/* Card 2 */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 mb-4">Highest Conversion</h3>
                    <span className={`text-[11px] font-bold text-white px-3 py-1 rounded-full ${summaryCards.highestConversion.color}`}>
                        {summaryCards.highestConversion.platform}
                    </span>
                    <p className="text-3xl font-bold text-gray-800 mt-4 mb-1">{summaryCards.highestConversion.value}</p>
                    <p className="text-xs text-gray-400 font-medium">{summaryCards.highestConversion.desc}</p>
                </div>
                {/* Card 3 */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 mb-4">Best Growth Rate</h3>
                    <span className={`text-[11px] font-bold text-white px-3 py-1 rounded-full ${summaryCards.bestGrowth.color}`}>
                        {summaryCards.bestGrowth.platform}
                    </span>
                    <p className="text-3xl font-bold text-gray-800 mt-4 mb-1">{summaryCards.bestGrowth.value}</p>
                    <p className="text-xs text-gray-400 font-medium">{summaryCards.bestGrowth.desc}</p>
                </div>
            </div>

            {/* --- GRAFIK LINE (REVENUE COMPARISON) --- */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                <h2 className="text-base font-bold text-gray-800 mb-1">Revenue Comparison (Last 4 Weeks)</h2>
                <p className="text-xs text-gray-500 mb-6">Weekly revenue trends across all platforms</p>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={revenueComparison} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11}} />
                            <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                            <Legend iconType="circle" wrapperStyle={{fontSize: '12px', color: '#6B7280', paddingTop: '10px'}} />
                            
                            <Line type="monotone" dataKey="Instagram" stroke="#A855F7" strokeWidth={2} dot={{r: 3}} activeDot={{r: 5}} />
                            <Line type="monotone" dataKey="Shopee" stroke="#F87171" strokeWidth={2} dot={{r: 3}} activeDot={{r: 5}} />
                            <Line type="monotone" dataKey="Tiktokshop" stroke="#38BDF8" strokeWidth={2} dot={{r: 3}} activeDot={{r: 5}} />
                            <Line type="monotone" dataKey="Tokopedia" stroke="#FBBF24" strokeWidth={2} dot={{r: 3}} activeDot={{r: 5}} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* --- 2 GRAFIK BAR KECIL --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Bar 1: Conversion Rate */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-base font-bold text-gray-800 mb-1">Conversion Rate by Platform</h2>
                    <p className="text-xs text-gray-500 mb-6">Percentage of visitors who make a purchase</p>
                    <div className="h-[220px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={conversionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="platform" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11}} />
                                <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                <Legend iconType="square" wrapperStyle={{fontSize: '11px', color: '#6B7280'}} />
                                <Bar dataKey="rate" name="Conversion Rate (%)" fill="#9D8DF1" radius={[2, 2, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Bar 2: Platform Fees */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-base font-bold text-gray-800 mb-1">Platform Fees Comparison</h2>
                    <p className="text-xs text-gray-500 mb-6">Total fees charged by each platform</p>
                    <div className="h-[220px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={feesData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="platform" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11}} />
                                <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                <Legend iconType="square" wrapperStyle={{fontSize: '11px', color: '#6B7280'}} />
                                <Bar dataKey="fee" name="Fee" fill="#FCA5A5" radius={[2, 2, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* --- GRAFIK DOUBLE BAR (TRAFFIC VS REVENUE) --- */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                <h2 className="text-base font-bold text-gray-800 mb-1">Traffic vs Revenue Analysis</h2>
                <p className="text-xs text-gray-500 mb-6">Comparing visitor traffic and generated revenue</p>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={trafficRevenueData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="platform" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11}} />
                            <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                            <Legend iconType="square" wrapperStyle={{fontSize: '11px', color: '#6B7280'}} />
                            <Bar dataKey="Revenue" fill="#38BDF8" radius={[2, 2, 0, 0]} barSize={35} />
                            <Bar dataKey="Traffics" fill="#A3E635" radius={[2, 2, 0, 0]} barSize={35} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* --- TABEL DETAIL --- */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                <h2 className="text-base font-bold text-gray-800 mb-1">Detailed Platform Metrics</h2>
                <p className="text-xs text-gray-500 mb-8">Complete comparison of all key metrics</p>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="py-4 px-2 text-sm font-bold text-gray-600">Platform</th>
                                <th className="py-4 px-2 text-sm font-bold text-gray-600">Revenue</th>
                                <th className="py-4 px-2 text-sm font-bold text-gray-600">Orders</th>
                                <th className="py-4 px-2 text-sm font-bold text-gray-600">Conversion</th>
                                <th className="py-4 px-2 text-sm font-bold text-gray-600">AOV</th>
                                <th className="py-4 px-2 text-sm font-bold text-gray-600">Growth</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, index) => (
                                <tr key={index} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                                    <td className="py-5 px-2">
                                        <span className={`text-xs font-bold text-white px-3 py-1.5 rounded-full shadow-sm ${row.color}`}>
                                            {row.platform}
                                        </span>
                                    </td>
                                    <td className="py-5 px-2 text-sm font-semibold text-gray-800">{row.revenue}</td>
                                    <td className="py-5 px-2 text-sm text-gray-800">{row.orders}</td>
                                    <td className="py-5 px-2 text-sm text-gray-800">{row.conversion}</td>
                                    <td className="py-5 px-2 text-sm text-gray-800">{row.aov}</td>
                                    <td className="py-5 px-2 text-sm font-bold text-[#22C55E]">{row.growth}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </Layout>
    );
}