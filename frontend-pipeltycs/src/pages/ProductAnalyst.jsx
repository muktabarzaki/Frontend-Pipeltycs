import { useState, useEffect } from 'react';
import api from '../lib/axios';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProductAnalyst() {
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useApp();

    const [alert, setAlert]       = useState({ show: false, message: '' });
    const [products, setProducts] = useState([]);
    const [heatmapData, setHeatmapData] = useState([]);
    const [summary, setSummary]   = useState({
        totalProducts: '', activeSkus: '', fastMoving: '',
        highDemand: '', lowStock: '', needRestocking: ''
    });

    useEffect(() => {
        api.get('/product-performance')
            .then(response => {
                setAlert(response.data.alert);
                setProducts(response.data.products);
                setHeatmapData(response.data.heatmap);
                setSummary(response.data.summary);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Gagal mengambil data:", error.message);
                setIsLoading(false);
            });
    }, []);

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
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1 text-gray-800">{t('productTitle')}</h1>
                <p className="text-sm text-gray-500">{t('productDesc')}</p>
            </div>

            {alert.show && (
                <div className="bg-[#FFF3E0] border border-[#FFE0B2] rounded-xl p-4 mb-8 flex items-center gap-4">
                    <div className="w-5 h-5 bg-[#FFB74D] rounded-sm flex-shrink-0"></div>
                    <div>
                        <h4 className="text-[#F57C00] font-semibold text-sm">{t('lowStock')}</h4>
                        <p className="text-[#F57C00] text-sm">{alert.message}</p>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                <h2 className="text-base font-bold text-gray-800 mb-1">{t('topSelling')}</h2>
                <p className="text-xs text-gray-500 mb-6">{t('completeBreakdown')}</p>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="py-4 px-2 text-sm font-bold text-gray-500">{t('productCol')}</th>
                                <th className="py-4 px-2 text-sm font-bold text-gray-500 text-center">{t('platform')}</th>
                                <th className="py-4 px-2 text-sm font-bold text-gray-500 text-center">{t('unitsSoldCol')}</th>
                                <th className="py-4 px-2 text-sm font-bold text-gray-500 text-center">{t('revenueCol')}</th>
                                <th className="py-4 px-2 text-sm font-bold text-gray-500 text-center">{t('trendCol')}</th>
                                <th className="py-4 px-2 text-sm font-bold text-gray-500 text-center">{t('statusCol')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-2">
                                        <div className="flex items-center gap-4">
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
                                       <span
    className="text-[10px] font-bold text-white px-3 py-1 rounded-full"
    style={{ backgroundColor: product.platformColor }}
>
    {product.platform}
</span>
                                    </td>
                                    <td className="py-4 px-2 text-sm text-gray-800 text-center font-medium">{product.sold}</td>
                                    <td className="py-4 px-2 text-sm text-gray-800 text-center font-medium">{product.revenue}</td>
                                    <td className={`py-4 px-2 text-sm font-bold text-center ${product.trend > 0 ? 'text-[#22C55E]' : 'text-red-500'}`}>
                                        {product.trend > 0 ? '↗' : '↘'} {Math.abs(product.trend)}%
                                    </td>
                                    <td className="py-4 px-2 text-center">
                                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${product.statusColor}`}>{product.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                <h2 className="text-base font-bold text-gray-800 mb-1">{t('heatmap')}</h2>
                <p className="text-xs text-gray-500 mb-6">{t('peakSellingTimes')}</p>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={heatmapData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="sales" fill="#3B82F6" barSize={50} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#4285F4] rounded-2xl p-6 text-white shadow-md">
                    <div className="w-10 h-10 mb-4 flex items-center text-3xl">📦</div>
                    <h3 className="text-lg font-bold mb-1">{t('totalProducts')}</h3>
                    <p className="text-4xl font-bold mb-2">{summary.totalProducts}</p>
                    <p className="text-sm opacity-90">{summary.activeSkus}</p>
                </div>
                <div className="bg-[#2DD4BF] rounded-2xl p-6 text-white shadow-md">
                    <div className="w-10 h-10 mb-4 flex items-center text-3xl">📈</div>
                    <h3 className="text-lg font-bold mb-1">{t('fastMoving')}</h3>
                    <p className="text-4xl font-bold mb-2">{summary.fastMoving}</p>
                    <p className="text-sm opacity-90">{summary.highDemand}</p>
                </div>
                <div className="bg-[#F97316] rounded-2xl p-6 text-white shadow-md">
                    <div className="w-10 h-10 mb-4 flex items-center text-3xl">⚠️</div>
                    <h3 className="text-lg font-bold mb-1">{t('lowStock')}</h3>
                    <p className="text-4xl font-bold mb-2">{summary.lowStock}</p>
                    <p className="text-sm opacity-90">{summary.needRestocking}</p>
                </div>
            </div>
        </Layout>
    );
}