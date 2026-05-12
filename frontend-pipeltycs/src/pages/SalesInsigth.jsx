import { useState } from 'react';
import Layout from '../components/Layout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const initialChartData = [
  { tanggal: '01', penjualan: 4000, keuntungan: 2400 },
  { tanggal: '02', penjualan: 3000, keuntungan: 1398 },
  { tanggal: '03', penjualan: 2000, keuntungan: 9800 },
  { tanggal: '04', penjualan: 2780, keuntungan: 3908 },
  { tanggal: '05', penjualan: 1890, keuntungan: 4800 },
];

export default function SalesInsight() {
    const [chartData, setChartData] = useState(initialChartData);
    const [formData, setFormData] = useState({ platform: '', waktu: '', kategori: '', keuntungan: '',tanggal: '', namaProduk: '', jumlah: ''});
    const handleChange = (e) => {setFormData({ ...formData, [e.target.name]: e.target.value });};
    const handleSubmit = (e) => {e.preventDefault(); // Mencegah halaman reload
        if (!formData.tanggal || !formData.keuntungan || !formData.jumlah) {
            alert("Mohon isi minimal Tanggal, Jumlah, dan Keuntungan!"); return;}
    const tglPendek = formData.tanggal.slice(-2);
    const newData = {tanggal: tglPendek, penjualan: parseInt(formData.jumlah), keuntungan: parseInt(formData.keuntungan)};
    setChartData([...chartData, newData]);
    setFormData({platform: '', waktu: '', kategori: '', keuntungan: '',tanggal: '', namaProduk: '', jumlah: ''});
        };

    return (
        <Layout>
            <div className='mb-8'>
                <h1 className='text-2xl font-bold mb-1'>Sales Insight</h1>
                <p className='text-sm text-gray-500'>Your complete sales performance across all platforms</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                <div className='bg-[#635BFF] rounded-2xl p-6 text-white shadow-lg shadow-indigo-200/50'>
                    <h3 className="text-sm font-medium mb-4 opacity-90">Total Sales</h3>
                    <p className="text-4xl font-bold mb-1 tracking-tight">$400,000</p>
                    <p className="text-xs opacity-80">+12.5% from last month</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 mb-4">Sales Growth</h3>
                    <p className="text-4xl font-bold text-gray-800 mb-1 tracking-tight">18,4%</p>
                    <p className="text-xs text-[#22C55E] font-medium">+vs previous period</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 mb-4">Units Sold</h3>
                    <p className="text-4xl font-bold text-gray-800 mb-1 tracking-tight">1,237</p>
                    <p className="text-xs text-[#22C55E] font-medium">+8.2% this week</p>
                </div>
            </div>
        </Layout>
    );
}