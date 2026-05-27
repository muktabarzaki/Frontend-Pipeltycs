import { useState, useEffect } from 'react';
import api from '../lib/axios';
import Layout from '../components/Layout';
import {
    LineChart, Line, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function PlatformComparison() {

    // ==========================================
    // STATE KOSONG (TANPA DUMMY DATA)
    // ==========================================
    const [isLoading, setIsLoading] = useState(true);

    const [summaryCards, setSummaryCards] = useState({
        bestPlatform: {},
        highestConversion: {},
        bestGrowth: {}
    });

    const [revenueComparison, setRevenueComparison] = useState([]);
    const [conversionData, setConversionData] = useState([]);
    const [feesData, setFeesData] = useState([]);
    const [trafficRevenueData, setTrafficRevenueData] = useState([]);
    const [tableData, setTableData] = useState([]);

    // ==========================================
    // FETCH DATA DARI LARAVEL API
    // ==========================================
    useEffect(() => {
        api.get('/platform-comparison')
            .then(response => {
                setSummaryCards(response.data.summary);
                setRevenueComparison(response.data.revenue_comparison);
                setConversionData(response.data.conversion);
                setFeesData(response.data.fees);
                setTrafficRevenueData(response.data.traffic_revenue);
                setTableData(response.data.table_data);

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

    // ==========================================
    // UI
    // ==========================================
    return (
        <Layout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-1 text-gray-800">
                    Platform Comparison
                </h1>
                <p className="text-sm text-gray-500">
                    Compare performance across Shopee, Tokopedia, TikTok Shop, and Instagram
                </p>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                {/* CARD 1 */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 mb-4">
                        Best Platform Today
                    </h3>

                    <span className={`text-[11px] font-bold text-white px-3 py-1 rounded-full ${summaryCards.bestPlatform?.color}`}>
                        {summaryCards.bestPlatform?.platform}
                    </span>

                    <p className="text-3xl font-bold text-gray-800 mt-4 mb-1">
                        {summaryCards.bestPlatform?.value}
                    </p>

                    <p className="text-xs text-gray-400 font-medium">
                        {summaryCards.bestPlatform?.desc}
                    </p>
                </div>

                {/* CARD 2 */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 mb-4">
                        Highest Conversion
                    </h3>

                    <span className={`text-[11px] font-bold text-white px-3 py-1 rounded-full ${summaryCards.highestConversion?.color}`}>
                        {summaryCards.highestConversion?.platform}
                    </span>

                    <p className="text-3xl font-bold text-gray-800 mt-4 mb-1">
                        {summaryCards.highestConversion?.value}
                    </p>

                    <p className="text-xs text-gray-400 font-medium">
                        {summaryCards.highestConversion?.desc}
                    </p>
                </div>

                {/* CARD 3 */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 mb-4">
                        Best Growth Rate
                    </h3>

                    <span className={`text-[11px] font-bold text-white px-3 py-1 rounded-full ${summaryCards.bestGrowth?.color}`}>
                        {summaryCards.bestGrowth?.platform}
                    </span>

                    <p className="text-3xl font-bold text-gray-800 mt-4 mb-1">
                        {summaryCards.bestGrowth?.value}
                    </p>

                    <p className="text-xs text-gray-400 font-medium">
                        {summaryCards.bestGrowth?.desc}
                    </p>
                </div>
            </div>

            {/* LINE CHART */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                <h2 className="text-base font-bold text-gray-800 mb-1">
                    Revenue Comparison (Last 4 Weeks)
                </h2>

                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={revenueComparison}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="week" />
                            <YAxis />
                            <Tooltip />
                            <Legend />

                            <Line type="monotone" dataKey="Instagram" stroke="#A855F7" />
                            <Line type="monotone" dataKey="Shopee" stroke="#F87171" />
                            <Line type="monotone" dataKey="Tiktokshop" stroke="#38BDF8" />
                            <Line type="monotone" dataKey="Tokopedia" stroke="#FBBF24" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* BAR CHART */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                {/* CONVERSION */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-base font-bold text-gray-800 mb-4">
                        Conversion Rate by Platform
                    </h2>

                    <div className="h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={conversionData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="platform" />
                                <YAxis />
                                <Tooltip />
                                <Legend />

                                <Bar dataKey="rate" fill="#9D8DF1" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* FEES */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-base font-bold text-gray-800 mb-4">
                        Platform Fees Comparison
                    </h2>

                    <div className="h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={feesData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="platform" />
                                <YAxis />
                                <Tooltip />
                                <Legend />

                                <Bar dataKey="fee" fill="#FCA5A5" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* TRAFFIC VS REVENUE */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                <h2 className="text-base font-bold text-gray-800 mb-4">
                    Traffic vs Revenue Analysis
                </h2>

                <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={trafficRevenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="platform" />
                            <YAxis />
                            <Tooltip />
                            <Legend />

                            <Bar dataKey="Revenue" fill="#38BDF8" />
                            <Bar dataKey="Traffics" fill="#A3E635" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">

                <h2 className="text-base font-bold text-gray-800 mb-6">
                    Detailed Platform Metrics
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">

                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="py-4 px-2">Platform</th>
                                <th className="py-4 px-2">Revenue</th>
                                <th className="py-4 px-2">Orders</th>
                                <th className="py-4 px-2">Conversion</th>
                                <th className="py-4 px-2">AOV</th>
                                <th className="py-4 px-2">Growth</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tableData.map((row, index) => (
                                <tr key={index} className="border-b border-gray-50">

                                    <td className="py-4 px-2">
                                        {row.platform}
                                    </td>

                                    <td className="py-4 px-2">
                                        {row.revenue}
                                    </td>

                                    <td className="py-4 px-2">
                                        {row.orders}
                                    </td>

                                    <td className="py-4 px-2">
                                        {row.conversion}
                                    </td>

                                    <td className="py-4 px-2">
                                        {row.aov}
                                    </td>

                                    <td className="py-4 px-2 text-green-500 font-bold">
                                        {row.growth}
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