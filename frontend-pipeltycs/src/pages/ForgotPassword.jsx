import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../lib/axios';

// Import icon sama seperti di Login.jsx
import IkonEmail from '../icon/iconlogin/IkonEmail.svg';
import LogoKunci from '../icon/iconlogin/LogoKunci.svg';
import shopeeImg from '../icon/iconlogin/shopee.png';
import tokpedImg from '../icon/iconlogin/tokopedia.png';
import tiktokImg from '../icon/iconlogin/tiktokshop.png';
import igImg from '../icon/iconlogin/Instagram.png';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await api.post('/reset-password', form);
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            const errors = err.response?.data?.errors;
            if (errors) {
                setError(Object.values(errors).flat().join(', '));
            } else {
                setError(err.response?.data?.message || 'Gagal reset password');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F9FBFD] flex items-center justify-center p-8 gap-20">

            {/* Popup sukses */}
            {success && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-2xl text-center shadow-xl">
                        <h2 className="text-xl font-bold mb-2">Password Berhasil Diubah!</h2>
                        <p className="text-gray-500">Mengalihkan ke halaman login...</p>
                    </div>
                </div>
            )}

            {/* Kiri - Logo & Platform */}
            <div className="flex flex-col items-center w-full max-w-sm text-center">
                <div className="w-20 h-20 bg-gradient-to-b from-[#6155F5] to-[#4C71F6] rounded-2xl flex items-center justify-center mb-5 shadow-lg">
                    <span className="text-white text-4xl">P</span>
                </div>
                <h1 className="text-4xl bg-gradient-to-r from-[#6358FF] to-[#D946EF] bg-clip-text text-transparent mb-3">
                    Pipeltycs
                </h1>
                <p className="text-gray-500 text-sm font-medium mb-10">
                    Unified Sales Analytics Across All Platforms
                </p>
                <div className="flex gap-4">
                    {[
                        { src: shopeeImg, label: 'Shopee' },
                        { src: tokpedImg, label: 'Tokopedia' },
                        { src: tiktokImg, label: 'TiktokShop' },
                        { src: igImg,     label: 'Instagram' },
                    ].map((p) => (
                        <div key={p.label} className="w-24 py-3 bg-white rounded-xl shadow-md flex flex-col items-center justify-center p-2 hover:-translate-y-1 transition-transform cursor-pointer">
                            <img src={p.src} alt={p.label} className="w-10 h-10 object-contain" />
                            <span className="text-xs text-gray-600">{p.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Kanan - Form */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Forgot Password</h2>
                    <p className="text-gray-500 text-sm mt-1">Reset it here to regain access to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <div className="relative">
                            <img src={IkonEmail} alt="email" className="absolute left-3 top-3.5 w-5 h-5 opacity-50" />
                            <input
                                type="email"
                                placeholder="your@email.com"
                                value={form.email}
                                onChange={e => setForm({...form, email: e.target.value})}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all"
                            />
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <div className="relative">
                            <img src={LogoKunci} alt="password" className="absolute left-3 top-3.5 w-5 h-5 opacity-50" />
                            <input
                                type="password"
                                placeholder="••••••••••"
                                value={form.password}
                                onChange={e => setForm({...form, password: e.target.value})}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all"
                            />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <div className="relative">
                            <img src={LogoKunci} alt="confirm" className="absolute left-3 top-3.5 w-5 h-5 opacity-50" />
                            <input
                                type="password"
                                placeholder="••••••••••"
                                value={form.password_confirmation}
                                onChange={e => setForm({...form, password_confirmation: e.target.value})}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all"
                            />
                        </div>
                    </div>

                    {/* Tombol */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-[#6155F5] to-[#CB30E0] hover:opacity-90 text-white font-semibold py-2.5 rounded-lg transition-opacity"
                    >
                        {loading ? 'Memproses...' : 'Change Password'}
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Sudah ingat password?
                        <Link to="/login" className="text-[#635BFF] hover:underline font-medium ml-1">
                            Login
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    );
}