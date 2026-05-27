import { useState, useEffect } from 'react';
import api from '../lib/axios';
import Layout from '../components/Layout';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

export default function CampaignPerformance() {

    const [isLoading, setIsLoading] = useState(true);

    // ==========================================
    // STATE TANPA DUMMY DATA
    // ==========================================
    const [summaryCards, setSummaryCards] = useState({
        impressions: {},
        clicks: {},
        ctr: {},
        conversions: {},
        roas: {}
    });

    const [adSpendRevenue, setAdSpendRevenue] = useState([]);

    const [ctrPlatform, setCtrPlatform] = useState([]);

    const [funnelData, setFunnelData] = useState({
        impressions: '',
        clicks: '',
        conversions: '',
        impToClick: '',
        clickToConv: ''
    });

    const [campaigns, setCampaigns] = useState([]);

    // ==========================================
    // FETCH DATA API
    // ==========================================
    useEffect(() => {
        api.get('/campaign-performance')
            .then(response => {

                setSummaryCards(response.data.summary);
                setAdSpendRevenue(response.data.spend_revenue);
                setCtrPlatform(response.data.ctr_platform);
                setFunnelData(response.data.funnel);
                setCampaigns(response.data.campaigns);

                setIsLoading(false);
            })
            .catch(error => {
                console.error("Gagal mengambil data:", error.message);
                setIsLoading(false);
            });
    }, []);

    // ==========================================
    // LOADING
    // ==========================================
    if (isLoading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-[300px]">
                    <p className="text-gray-500">Loading data...</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>

            {/* HEADER */}
            <div className="mb-6">

                <h1 className="text-2xl font-bold mb-1 text-gray-800">
                    Marketing & Ads Analytics
                </h1>

                <p className="text-sm text-gray-500">
                    Track campaign performance across all advertising platforms
                </p>

            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">

                {/* IMPRESSIONS */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-medium text-gray-400">
                            Total Impressions
                        </span>

                        <div className="w-6 h-6 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center text-xs">
                            👁️
                        </div>
                    </div>

                    <p className="text-2xl font-bold text-gray-800 mb-1">
                        {summaryCards.impressions?.value}
                    </p>

                    <p className="text-xs text-[#22C55E] font-medium">
                        {summaryCards.impressions?.growth}
                    </p>

                </div>

                {/* CLICKS */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-medium text-gray-400">
                            Total Clicks
                        </span>

                        <div className="w-6 h-6 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center text-xs">
                            🖱️
                        </div>
                    </div>

                    <p className="text-2xl font-bold text-gray-800 mb-1">
                        {summaryCards.clicks?.value}
                    </p>

                    <p className="text-xs text-[#22C55E] font-medium">
                        {summaryCards.clicks?.growth}
                    </p>

                </div>

                {/* CTR */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-medium text-gray-400">
                            Avg CTR
                        </span>

                        <div className="w-6 h-6 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center text-xs">
                            🎯
                        </div>
                    </div>

                    <p className="text-2xl font-bold text-gray-800 mb-1">
                        {summaryCards.ctr?.value}
                    </p>

                    <p className="text-xs text-[#22C55E] font-medium">
                        {summaryCards.ctr?.growth}
                    </p>

                </div>

                {/* CONVERSIONS */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-medium text-gray-400">
                            Conversions
                        </span>

                        <div className="w-6 h-6 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center text-xs">
                            📈
                        </div>
                    </div>

                    <p className="text-2xl font-bold text-gray-800 mb-1">
                        {summaryCards.conversions?.value}
                    </p>

                    <p className="text-xs text-[#22C55E] font-medium">
                        {summaryCards.conversions?.growth}
                    </p>

                </div>

                {/* ROAS */}
                <div className="bg-[#635BFF] text-white rounded-2xl p-5 shadow-md shadow-indigo-100">

                    <div className="flex justify-between items-start mb-4">

                        <span className="text-xs font-medium opacity-80">
                            Avg ROAS
                        </span>

                        <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center text-xs font-bold">
                            $
                        </div>

                    </div>

                    <p className="text-2xl font-bold mb-1">
                        {summaryCards.roas?.value}
                    </p>

                    <p className="text-xs opacity-90">
                        {summaryCards.roas?.growth}
                    </p>

                </div>

            </div>

            {/* CHART SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

                {/* LINE CHART */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

                    <h2 className="text-sm font-bold text-gray-800 mb-1">
                        Ad Spend vs Revenue
                    </h2>

                    <p className="text-xs text-gray-400 mb-6">
                        Investment and returns comparison
                    </p>

                    <div className="h-[230px]">

                        <ResponsiveContainer width="100%" height="100%">

                            <LineChart data={adSpendRevenue}>

                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="week" />
                                <YAxis />
                                <Tooltip />
                                <Legend />

                                <Line
                                    type="monotone"
                                    dataKey="adSpend"
                                    stroke="#1E3A8A"
                                />

                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#0EA5E9"
                                />

                            </LineChart>

                        </ResponsiveContainer>

                    </div>

                </div>

                {/* BAR CHART */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

                    <h2 className="text-sm font-bold text-gray-800 mb-1">
                        Click-Through Rate by Platform
                    </h2>

                    <p className="text-xs text-gray-400 mb-6">
                        CTR performance comparison
                    </p>

                    <div className="h-[230px]">

                        <ResponsiveContainer width="100%" height="100%">

                            <BarChart data={ctrPlatform}>

                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="platform" />
                                <YAxis />
                                <Tooltip />
                                <Legend />

                                <Bar
                                    dataKey="ctr"
                                    fill="#3B82F6"
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            </div>

            {/* FUNNEL */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">

                <h2 className="text-sm font-bold text-gray-800 mb-1">
                    Marketing Funnel
                </h2>

                <p className="text-xs text-gray-400 mb-6">
                    Journey from impressions to conversions
                </p>

                <div className="flex flex-col gap-3 max-w-4xl mx-auto mb-6">

                    <div className="bg-gradient-to-r from-[#4285F4] to-[#60A5FA] rounded-xl p-5 text-white flex justify-between items-center">

                        <span className="text-sm font-bold">
                            Impressions
                        </span>

                        <span className="text-2xl font-black">
                            {funnelData.impressions}
                        </span>

                    </div>

                    <div className="bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] rounded-xl p-4 text-white flex justify-between items-center w-[85%] mx-auto">

                        <span className="text-sm font-bold">
                            Clicks
                        </span>

                        <span className="text-xl font-black">
                            {funnelData.clicks}
                        </span>

                    </div>

                    <div className="bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] rounded-xl p-3 text-white flex justify-between items-center w-[70%] mx-auto">

                        <span className="text-sm font-bold">
                            Conversions
                        </span>

                        <span className="text-lg font-black">
                            {funnelData.conversions}
                        </span>

                    </div>

                </div>

                {/* CONVERSION RATE */}
                <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">

                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-center">

                        <p className="text-xs text-gray-400">
                            Impression to Click
                        </p>

                        <p className="text-base font-bold text-gray-700">
                            {funnelData.impToClick}
                        </p>

                    </div>

                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-center">

                        <p className="text-xs text-gray-400">
                            Click to Conversion
                        </p>

                        <p className="text-base font-bold text-gray-700">
                            {funnelData.clickToConv}
                        </p>

                    </div>

                </div>

            </div>

            {/* TABLE */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">

                <h2 className="text-sm font-bold text-gray-800 mb-1">
                    Active Campaigns
                </h2>

                <p className="text-xs text-gray-400 mb-6">
                    Detailed performance metrics for each campaign
                </p>

                <div className="overflow-x-auto">

                    <table className="w-full text-left border-collapse">

                        <thead>

                            <tr className="border-b border-gray-100 text-xs font-bold text-gray-400">

                                <th className="py-3 px-2">
                                    Campaign
                                </th>

                                <th className="py-3 px-2 text-center">
                                    Impressions
                                </th>

                                <th className="py-3 px-2 text-center">
                                    Clicks
                                </th>

                                <th className="py-3 px-2 text-center">
                                    CTR
                                </th>

                                <th className="py-3 px-2 text-center">
                                    Conversions
                                </th>

                                <th className="py-3 px-2 text-center">
                                    Spend
                                </th>

                                <th className="py-3 px-2 text-center">
                                    Revenue
                                </th>

                                <th className="py-3 px-2 text-right">
                                    ROAS
                                </th>

                            </tr>

                        </thead>

                        <tbody className="text-xs">

                            {campaigns.map((item, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-50 last:border-0"
                                >

                                    <td className="py-4 px-2">

                                        <h4 className="font-bold text-gray-800">
                                            {item.name}
                                        </h4>

                                        <p className="text-[10px] text-gray-400 mt-0.5">
                                            {item.platform}
                                        </p>

                                    </td>

                                    <td className="py-4 px-2 text-center">
                                        {item.impressions}
                                    </td>

                                    <td className="py-4 px-2 text-center">
                                        {item.clicks}
                                    </td>

                                    <td className="py-4 px-2 text-center">
                                        {item.ctr}
                                    </td>

                                    <td className="py-4 px-2 text-center">
                                        {item.conversions}
                                    </td>

                                    <td className="py-4 px-2 text-center">
                                        {item.spend}
                                    </td>

                                    <td className="py-4 px-2 text-center font-bold">
                                        {item.revenue}
                                    </td>

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