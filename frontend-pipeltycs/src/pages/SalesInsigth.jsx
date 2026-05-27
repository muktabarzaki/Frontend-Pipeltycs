import { useState, useEffect } from 'react';
import api from '../lib/axios';
import Layout from '../components/Layout';
import {
    LineChart, Line, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

import IconSetting from '../icon/icondashboard/Setting.svg';

export default function SalesInsight() {

    // ==========================================
    // STATE TANPA DUMMY DATA
    // ==========================================
    const [isLoading, setIsLoading] = useState(true);

    const [metrics, setMetrics] = useState({
        avgOrderValue: '',
        aovGrowth: '',
        retention: '',
        retentionGrowth: '',
        repeatRate: '',
        repeatGrowth: '',
        growthRate: '',
        growthPeriod: ''
    });

    const [revenueData, setRevenueData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [retentionData, setRetentionData] = useState([]);
    const [tableData, setTableData] = useState([]);

    // ==========================================
    // FETCH DATA DARI API LARAVEL
    // ==========================================
    useEffect(() => {
        api.get('/sales-insights')
            .then(response => {

                setMetrics(response.data.metrics);
                setRevenueData(response.data.revenue);
                setCategoryData(response.data.category);
                setRetentionData(response.data.retention);
                setTableData(response.data.table);

                setIsLoading(false);
            })
            .catch(error => {
                console.error("Gagal mengambil data:", error.message);
                setIsLoading(false);
            });
    }, []);

    // ==========================================
    // LOADING STATE
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

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold mb-1 text-gray-800">
                        Sales Performance Insights
                    </h1>

                    <p className="text-sm text-gray-500">
                        Deep dive into your sales metrics and customer behavior
                    </p>
                </div>

                {/* FILTER */}
                <div className="flex items-center gap-4 mt-4 md:mt-0">

                    <div className="relative w-40">
                        <select className="w-full appearance-none bg-white border border-gray-200 rounded-full pl-4 pr-10 py-2 text-sm font-medium text-gray-600 focus:outline-none">

                            <option>All Platform</option>
                            <option>Shopee</option>
                            <option>Tokopedia</option>

                        </select>

                        <img
                            src={IconSetting}
                            alt="arrow"
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none opacity-50 rotate-90"
                        />
                    </div>

                    <div className="relative w-40">
                        <select className="w-full appearance-none bg-white border border-gray-200 rounded-full pl-4 pr-10 py-2 text-sm font-medium text-gray-600 focus:outline-none">

                            <option>Last 30 Days</option>
                            <option>This Month</option>
                            <option>Last Year</option>

                        </select>

                        <img
                            src={IconSetting}
                            alt="arrow"
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none opacity-50 rotate-90"
                        />
                    </div>

                </div>
            </div>

            {/* METRIC CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 mb-4">
                        Average Order Value
                    </h3>

                    <p className="text-4xl font-bold text-gray-800 mb-1">
                        ${metrics.avgOrderValue}
                    </p>

                    <p className="text-sm text-[#22C55E] font-medium">
                        {metrics.aovGrowth}
                    </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 mb-4">
                        Customer Retention
                    </h3>

                    <p className="text-4xl font-bold text-gray-800 mb-1">
                        {metrics.retention}%
                    </p>

                    <p className="text-sm text-[#22C55E] font-medium">
                        {metrics.retentionGrowth}
                    </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 mb-4">
                        Repeat Purchase Rate
                    </h3>

                    <p className="text-4xl font-bold text-gray-800 mb-1">
                        {metrics.repeatRate}%
                    </p>

                    <p className="text-sm text-[#22C55E] font-medium">
                        {metrics.repeatGrowth}
                    </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 mb-4">
                        Growth Rate
                    </h3>

                    <p className="text-4xl font-bold text-gray-800 mb-1">
                        {metrics.growthRate}%
                    </p>

                    <p className="text-sm text-[#22C55E] font-medium">
                        {metrics.growthPeriod}
                    </p>
                </div>

            </div>

            {/* REVENUE CHART */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">

                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={revenueData}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="week" />
                            <YAxis />
                            <Tooltip />

                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#8B5CF6"
                                strokeWidth={2}
                            />

                        </LineChart>
                    </ResponsiveContainer>
                </div>

            </div>

            {/* 2 CHART */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                {/* CATEGORY */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

                    <h2 className="text-base font-bold text-gray-800 mb-4">
                        Revenue by Category
                    </h2>

                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={categoryData}>

                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="category" />
                                <YAxis />
                                <Tooltip />

                                <Bar
                                    dataKey="revenue"
                                    fill="#9D8DF1"
                                />

                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                </div>

                {/* RETENTION */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

                    <h2 className="text-base font-bold text-gray-800 mb-4">
                        Customer Retention Trend
                    </h2>

                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={retentionData}>

                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />

                                <Line
                                    type="monotone"
                                    dataKey="rate"
                                    stroke="#A78BFA"
                                    strokeWidth={2}
                                />

                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                </div>

            </div>

            {/* TABLE */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">

                <h2 className="text-lg font-bold text-gray-800 mb-1">
                    Detailed Performance Metrics
                </h2>

                <p className="text-sm text-gray-500 mb-8">
                    Comprehensive breakdown of key indicators
                </p>

                <div className="overflow-x-auto">

                    <table className="w-full text-left border-collapse">

                        <thead>
                            <tr className="border-b border-gray-100">

                                <th className="py-4 px-2 text-sm font-bold text-gray-600">
                                    Metric
                                </th>

                                <th className="py-4 px-2 text-sm font-bold text-gray-600 text-center">
                                    This Month
                                </th>

                                <th className="py-4 px-2 text-sm font-bold text-gray-600 text-center">
                                    Last Month
                                </th>

                                <th className="py-4 px-2 text-sm font-bold text-gray-600 text-right">
                                    Change
                                </th>

                            </tr>
                        </thead>

                        <tbody>

                            {tableData.map((row, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-50"
                                >

                                    <td className="py-5 px-2 text-sm font-semibold text-gray-800">
                                        {row.metric}
                                    </td>

                                    <td className="py-5 px-2 text-sm text-center text-gray-800">
                                        {row.thisMonth}
                                    </td>

                                    <td className="py-5 px-2 text-sm text-center text-gray-800">
                                        {row.lastMonth}
                                    </td>

                                    <td className="py-5 px-2 text-sm text-right font-semibold text-[#22C55E]">
                                        {row.change}
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