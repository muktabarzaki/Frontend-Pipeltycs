import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { 
    LineChart, Line, BarChart, Bar, 
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

export default function CampaignPerformance() {
    const [isLoading, setIsLoading] = useState(true);

    // ==========================================
    // 1. WADAH DATA (STATE) & DUMMY DATA SUEUAI FIGMA
    // ==========================================
    const [summaryCards, setSummaryCards] = useState({
        impressions: { value: '788K', growth: '+14.2%' },
        clicks: { value: '32,662', growth: '+11.8%' },
        ctr: { value: '4.14%', growth: '+0.3%' },
        conversions: { value: '1,409', growth: '+18.5%' },
        roas: { value: '5.02x', growth: '+0.4x' }
    });

    const [adSpendRevenue, setAdSpendRevenue] = useState([
        { week: 'Week 1', adSpend: 4000, revenue: 16000 },
        { week: 'Week 2', adSpend: 3800, revenue: 19600 },
        { week: 'Week 3', adSpend: 2900, revenue: 13400 },
        { week: 'Week 4', adSpend: 3500, revenue: 15600 }
    ]);

    const [ctrPlatform, setCtrPlatform] = useState([
        { platform: 'Shopee Ads', ctr: 3.8 },
        { platform: 'Tiktok Ads', ctr: 5.2 },
        { platform: 'Instagram Ads', ctr: 4.1 },
        { platform: 'Google Ads', ctr: 3.6 }
    ]);

    const [funnelData, setFunnelData] = useState({
        impressions: '788K',
        clicks: '32,662',
        conversions: '1,409',
        impToClick: '4.14%',
        clickToConv: '4.31%'
    });

    const [campaigns, setCampaigns] = useState([
        { name: 'Shopee Flash Sale Campaign', platform: 'Shopee', impressions: '245K', clicks: '9,310', ctr: '3.8%', conversions: '487', spend: '$4,200', revenue: '$24,500', roas: '5.83x' },
        { name: 'TikTok Live Shopping Event', platform: 'TikTok Shop', impressions: '189K', clicks: '9,828', ctr: '5.2%', conversions: '392', spend: '$3,800', revenue: '$19,600', roas: '5.16x' },
        { name: 'Instagram Stories Promo', platform: 'Instagram', impressions: '156K', clicks: '6,396', ctr: '4.1%', conversions: '218', spend: '$2,900', revenue: '$13,400', roas: '4.62x' },
        { name: 'Tokopedia Banner Ads', platform: 'Tokopedia', impressions: '198K', clicks: '7,128', ctr: '3.6%', conversions: '312', spend: '$3,500', revenue: '$15,600', roas: '4.46x' }
    ]);

    // ==========================================
    // 2. SIMULASI INTEGRASI BACKEND LARAVEL
    // ==========================================
    useEffect(() => {
        axios.get('http://localhost:8000/api/campaign-performance')
            .then(response => {
                // setSummaryCards(response.data.summary);
                // setAdSpendRevenue(response.data.spend_revenue);
                // setCtrPlatform(response.data.ctr_platform);
                // setFunnelData(response.data.funnel);
                // setCampaigns(response.data.campaigns);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Menggunakan data mockup campaign.", error.message);
                setIsLoading(false);
            });
    }, []);

    return (
        <Layout>
            {/* TITEL HALAMAN */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1 text-gray-800">Marketing & Ads Analytics</h1>
                <p className="text-sm text-gray-500">Track campaign performance across all advertising platforms</p>
            </div>

            {/* --- 5 KARTU METRIK ATAS --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-medium text-gray-400">Total Impressions</span>
                        <div className="w-6 h-6 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center text-xs">👁️</div>
                    </div>
                    <p className="text-2xl font-bold text-gray-800 mb-1">{summaryCards.impressions.value}</p>
                    <p className="text-xs text-[#22C55E] font-medium">{summaryCards.impressions.growth}</p>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-medium text-gray-400">Total Clicks</span>
                        <div className="w-6 h-6 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center text-xs">🖱️</div>
                    </div>
                    <p className="text-2xl font-bold text-gray-800 mb-1">{summaryCards.clicks.value}</p>
                    <p className="text-xs text-[#22C55E] font-medium">{summaryCards.clicks.growth}</p>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-medium text-gray-400">Avg CTR</span>
                        <div className="w-6 h-6 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center text-xs">🎯</div>
                    </div>
                    <p className="text-2xl font-bold text-gray-800 mb-1">{summaryCards.ctr.value}</p>
                    <p className="text-xs text-[#22C55E] font-medium">{summaryCards.ctr.growth}</p>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-medium text-gray-400">Conversions</span>
                        <div className="w-6 h-6 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center text-xs">📈</div>
                    </div>
                    <p className="text-2xl font-bold text-gray-800 mb-1">{summaryCards.conversions.value}</p>
                    <p className="text-xs text-[#22C55E] font-medium">{summaryCards.conversions.growth}</p>
                </div>

                {/* Kartu Ungu ROAS */}
                <div className="bg-[#635BFF] text-white rounded-2xl p-5 shadow-md shadow-indigo-100">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-medium opacity-80">Avg ROAS</span>
                        <div className="w-6 h-6 bg-white/20 text-white rounded-lg flex items-center justify-center text-xs font-bold">$</div>
                    </div>
                    <p className="text-2xl font-bold mb-1">{summaryCards.roas.value}</p>
                    <p className="text-xs opacity-90">{summaryCards.roas.growth}</p>
                </div>
            </div>

            {/* --- AREA GRAFIK TENGAH --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Kiri: Ad Spend vs Revenue */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-sm font-bold text-gray-800 mb-1">Ad Spend vs Revenue</h2>
                    <p className="text-xs text-gray-400 mb-6">Investment and returns comparison</p>
                    <div className="h-[230px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={adSpendRevenue} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11}} />
                                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                <Legend iconType="circle" wrapperStyle={{fontSize: '11px', paddingTop: '10px'}} />
                                <Line type="monotone" dataKey="adSpend" name="Ad Spend" stroke="#1E3A8A" strokeWidth={2.5} dot={{r: 3}} />
                                <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#0EA5E9" strokeWidth={2.5} dot={{r: 3}} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Kanan: CTR by Platform */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-sm font-bold text-gray-800 mb-1">Click-Through Rate by Platform</h2>
                    <p className="text-xs text-gray-400 mb-6">CTR performance comparison</p>
                    <div className="h-[230px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ctrPlatform} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="platform" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11}} />
                                <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                <Legend iconType="square" wrapperStyle={{fontSize: '11px', paddingTop: '10px'}} />
                                <Bar dataKey="ctr" name="CTR (%)" fill="#3B82F6" radius={[3, 3, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* --- MARKETING FUNNEL COMPONENT --- */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                <h2 className="text-sm font-bold text-gray-800 mb-1">Marketing Funnel</h2>
                <p className="text-xs text-gray-400 mb-6">Journey from impressions to conversions</p>
                
                {/* Bentuk Balok Funnel Tingkat */}
                <div className="flex flex-col gap-3 max-w-4xl mx-auto mb-6">
                    <div className="bg-gradient-to-r from-[#4285F4] to-[#60A5FA] rounded-xl p-5 text-white flex justify-between items-center shadow-sm">
                        <span className="text-sm font-bold tracking-wide">Impressions</span>
                        <span className="text-2xl font-black">{funnelData.impressions}</span>
                    </div>
                    <div className="bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] rounded-xl p-4 text-white flex justify-between items-center shadow-sm w-[85%] mx-auto">
                        <span className="text-sm font-bold tracking-wide">Clicks</span>
                        <span className="text-xl font-black">{funnelData.clicks}</span>
                    </div>
                    <div className="bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] rounded-xl p-3 text-white flex justify-between items-center shadow-sm w-[70%] mx-auto">
                        <span className="text-sm font-bold tracking-wide">Conversions</span>
                        <span className="text-lg font-black">{funnelData.conversions}</span>
                    </div>
                </div>

                {/* Persentase Konversi Bawah */}
                <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto text-center mt-4">
                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                        <p className="text-xs text-gray-400 font-medium">Impression to Click</p>
                        <p className="text-base font-bold text-gray-700 mt-0.5">{funnelData.impToClick}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                        <p className="text-xs text-gray-400 font-medium">Click to Conversion</p>
                        <p className="text-base font-bold text-gray-700 mt-0.5">{funnelData.clickToConv}</p>
                    </div>
                </div>
            </div>

            {/* --- TABEL: ACTIVE CAMPAIGNS --- */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                <h2 className="text-sm font-bold text-gray-800 mb-1">Active Campaigns</h2>
                <p className="text-xs text-gray-400 mb-6">Detailed performance metrics for each campaign</p>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 text-xs font-bold text-gray-400">
                                <th className="py-3 px-2 w-[25%]">Campaign</th>
                                <th className="py-3 px-2 text-center">Impressions</th>
                                <th className="py-3 px-2 text-center">Clicks</th>
                                <th className="py-3 px-2 text-center">CTR</th>
                                <th className="py-3 px-2 text-center">Conversions</th>
                                <th className="py-3 px-2 text-center">Spend</th>
                                <th className="py-3 px-2 text-center">Revenue</th>
                                <th className="py-3 px-2 text-right">ROAS</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs">
                            {campaigns.map((item, index) => (
                                <tr key={index} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/40 transition-colors">
                                    <td className="py-4 px-2">
                                        <h4 className="font-bold text-gray-800">{item.name}</h4>
                                        <p className="text-[10px] text-gray-400 mt-0.5">{item.platform}</p>
                                    </td>
                                    <td className="py-4 px-2 text-center text-gray-600 font-medium">{item.impressions}</td>
                                    <td className="py-4 px-2 text-center text-gray-600 font-medium">{item.clicks}</td>
                                    <td className="py-4 px-2 text-center text-gray-600 font-medium">{item.ctr}</td>
                                    <td className="py-4 px-2 text-center text-gray-600 font-medium">{item.conversions}</td>
                                    <td className="py-4 px-2 text-center text-gray-600 font-medium">{item.spend}</td>
                                    <td className="py-4 px-2 text-center text-gray-800 font-bold">{item.revenue}</td>
                                    <td className="py-4 px-2 text-right">
                                        <span className="bg-[#E6FDF9] text-[#00BFA6] font-bold px-2 py-1 rounded">
                                            {item.roas}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}