import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from '../lib/axios';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';

import IconSettingUser from '../icon/icondashboard/UserPutih.svg';
import IconSettingGlobe from '../icon/icondashboard/Globe.svg';
import IconSettingDownload from '../icon/icondashboard/Product.svg';

export default function Settings() {
    const { language, setLanguage, currency, setCurrency } = useApp();
    const navigate = useNavigate(); 
    
    const [isLoading, setIsLoading] = useState(true);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [exportLoading, setExportLoading] = useState(null); // 'csv' | 'excel' | 'pdf'
    const [logoutLoading, setLogoutLoading] = useState(false);
    
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const [profile, setProfile] = useState({
        fullName: '',
        email: '',
        businessName: '',
        phone: ''
    });

    // ==========================================
    // AMBIL DATA USER DARI BACKEND
    // ==========================================
    useEffect(() => {
        api.get('/settings')
            .then(response => {
                const user = response.data;
                setProfile({
                    fullName:     user.name          || '',
                    email:        user.email         || '',
                    businessName: user.business_name || '',
                    phone:        user.phone         || '',
                });
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Gagal ambil data settings:", error.message);
                setIsLoading(false);
            });
    }, []);

    const handleProfileChange = (e) =>
        setProfile({ ...profile, [e.target.name]: e.target.value });

    // ==========================================
    // SIMPAN KE DATABASE
    // ==========================================
    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setSuccessMsg('');
        setErrorMsg('');

        try {
            await api.put('/settings', {
                name:          profile.fullName,
                email:         profile.email,
                business_name: profile.businessName,
                phone:         profile.phone,
            });
            setSuccessMsg(language === 'id' ? 'Profil berhasil disimpan!' : 'Profile saved successfully!');
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (err) {
            setErrorMsg(err.response?.data?.message || (language === 'id' ? 'Gagal menyimpan perubahan' : 'Failed to save changes'));
        }
    };

    // ==========================================
    // EXPORT DATA 
    // ==========================================
    const handleExport = async (type) => {
        setExportLoading(type);
        setErrorMsg('');

        try {
            const endpointMap = {
                csv:   '/settings/export-csv',
                excel: '/settings/export-excel',
                pdf:   '/settings/export-pdf',
            };
            const filenameMap = {
                csv:   'pipelytcs-sales.csv',
                excel: 'pipelytcs-sales.xls',
                pdf:   'pipelytcs-report.html',
            };
            const mimeMap = {
                csv:   'text/csv',
                excel: 'application/vnd.ms-excel',
                pdf:   'text/html',
            };

            const response = await api.get(endpointMap[type], {
                responseType: 'blob',
            });

            const blob = new Blob([response.data], { type: mimeMap[type] });
            const url  = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href     = url;
            link.download = filenameMap[type];
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            setErrorMsg(language === 'id' ? 'Gagal mengunduh file. Silakan coba lagi.' : 'Failed to download file. Please try again.');
        } finally {
            setExportLoading(null);
        }
    };

    // ==========================================
    // LOGOUT SYSTEM
    // ==========================================
    const handleConfirmLogout = async () => {
        setShowLogoutModal(false); 
        setLogoutLoading(true);
        try {
            localStorage.removeItem('token');
            sessionStorage.clear();
            navigate('/login', { replace: true });
        } catch (err) {
            console.error("Gagal logout:", err);
            localStorage.removeItem('token');
            navigate('/login', { replace: true });
        } finally {
            setLogoutLoading(false);
        }
    };

    if (isLoading) return (
        <Layout>
            <div className="flex justify-center items-center h-[300px]">
                <p className="text-gray-500">Loading...</p>
            </div>
        </Layout>
    );

    return (
        <Layout>
            {/* ── HEADER PAGETITLE ── */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-1 text-gray-800">
                    {language === 'id' ? 'Pengaturan' : 'Settings'}
                </h1>
                <p className="text-sm text-gray-500">
                    {language === 'id' ? 'Kelola akun, integrasi, dan preferensi Anda' : 'Manage your account, integrations, and preferences'}
                </p>
            </div>

            <div className="max-w-4xl flex flex-col gap-8">

                {/* ── USER PROFILE ── */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-[#635BFF]/10 rounded-xl flex items-center justify-center">
                            <img src={IconSettingUser} alt="User Profile" className="w-6 h-6 object-contain filter invert-[.3] sepia-[.9] saturate-[30] hue-rotate-[240deg]" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-800">
                            {language === 'id' ? 'Profil Pengguna' : 'User Profile'}
                        </h2>
                    </div>

                    {successMsg && (
                        <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                            ✅ {successMsg}
                        </div>
                    )}
                    {errorMsg && !exportLoading && (
                        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            ❌ {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleSaveProfile}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-2">
                                    {language === 'id' ? 'Nama Lengkap' : 'Full Name'}
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={profile.fullName}
                                    onChange={handleProfileChange}
                                    className="w-full bg-gray-50/50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleProfileChange}
                                    className="w-full bg-gray-50/50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-2">
                                    {language === 'id' ? 'Nama Bisnis' : 'Business Name'}
                                </label>
                                <input
                                    type="text"
                                    name="businessName"
                                    value={profile.businessName}
                                    onChange={handleProfileChange}
                                    className="w-full bg-gray-50/50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-2">
                                    {language === 'id' ? 'Nomor Telepon' : 'Phone'}
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleProfileChange}
                                    className="w-full bg-gray-50/50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 transition-all"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="bg-[#635BFF] hover:bg-indigo-600 text-white font-medium text-sm py-2.5 px-6 rounded-lg shadow-sm transition-all flex items-center gap-2"
                        >
                            <span className="text-lg">💾</span> {language === 'id' ? 'Simpan Perubahan' : 'Save Changes'}
                        </button>
                    </form>
                </div>

                {/* ── PREFERENCES ── */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                            <img src={IconSettingGlobe} alt="Preferences" className="w-6 h-6 object-contain filter invert-[.4] sepia-[1] saturate-[10] hue-rotate-[180deg]" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-800">
                            {language === 'id' ? 'Preferensi' : 'Preferences'}
                        </h2>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="border border-gray-100 rounded-xl p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-xl">🌐</span>
                                <h4 className="text-sm font-semibold text-gray-800">
                                    {language === 'id' ? 'Bahasa' : 'Language'}
                                </h4>
                            </div>
                            <select
                                value={language}
                                onChange={e => setLanguage(e.target.value)}
                                className="w-full bg-gray-50/50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 cursor-pointer"
                            >
                                <option value="en">English</option>
                                <option value="id">Indonesia</option>
                            </select>
                        </div>

                        <div className="border border-gray-100 rounded-xl p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-xl font-bold text-gray-500 pl-1">$</span>
                                <h4 className="text-sm font-semibold text-gray-800">
                                    {language === 'id' ? 'Mata Uang' : 'Currency'}
                                </h4>
                            </div>
                            <select
                                value={currency}
                                onChange={e => setCurrency(e.target.value)}
                                className="w-full bg-gray-50/50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 cursor-pointer"
                            >
                                <option value="usd">US Dollar (USD)</option>
                                <option value="idr">Indonesian Rupiah (IDR)</option>
                                <option value="eur">Euro (EUR)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* ── EXPORT DATA ── */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center">
                            <img src={IconSettingDownload} alt="Export" className="w-6 h-6 object-contain" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">
                                {language === 'id' ? 'Ekspor Data' : 'Export Data'}
                            </h2>
                            <p className="text-xs text-gray-400 mt-0.5">
                                {language === 'id' ? 'Unduh data penjualan dan laporan analitik Anda' : 'Download your sales data and analytics reports'}
                            </p>
                        </div>
                    </div>

                    {errorMsg && exportLoading && (
                        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            ❌ {errorMsg}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* CSV */}
                        <div className="border border-gray-100 rounded-xl p-4 flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">📄</span>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">CSV</p>
                                    <p className="text-xs text-gray-400">
                                        {language === 'id' ? 'Format siap-spreadsheet' : 'Spreadsheet-ready format'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleExport('csv')}
                                disabled={exportLoading !== null}
                                className="w-full bg-[#635BFF] hover:bg-indigo-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                            >
                                {exportLoading === 'csv' ? (
                                    <><span className="animate-spin inline-block">⏳</span> {language === 'id' ? 'Mengunduh...' : 'Downloading...'}</>
                                ) : (
                                    <><span>⬇️</span> {language === 'id' ? 'Ekspor sebagai CSV' : 'Export as CSV'}</>
                                )}
                            </button>
                        </div>

                        {/* Excel */}
                        <div className="border border-gray-100 rounded-xl p-4 flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">📊</span>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">Excel</p>
                                    <p className="text-xs text-gray-400">Microsoft Excel (.xls)</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleExport('excel')}
                                disabled={exportLoading !== null}
                                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                            >
                                {exportLoading === 'excel' ? (
                                    <><span className="animate-spin inline-block">⏳</span> {language === 'id' ? 'Mengunduh...' : 'Downloading...'}</>
                                ) : (
                                    <><span>⬇️</span> {language === 'id' ? 'Ekspor sebagai Excel' : 'Export as Excel'}</>
                                )}
                            </button>
                        </div>

                        {/* PDF / HTML Report */}
                        <div className="border border-gray-100 rounded-xl p-4 flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">🧾</span>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">
                                        {language === 'id' ? 'Laporan' : 'Report'}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {language === 'id' ? 'Laporan HTML siap cetak' : 'Printable HTML report'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleExport('pdf')}
                                disabled={exportLoading !== null}
                                className="w-full bg-rose-500 hover:bg-rose-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                            >
                                {exportLoading === 'pdf' ? (
                                    <><span className="animate-spin inline-block">⏳</span> {language === 'id' ? 'Mengunduh...' : 'Downloading...'}</>
                                ) : (
                                    <><span>⬇️</span> {language === 'id' ? 'Ekspor sebagai PDF' : 'Export as PDF'}</>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── ACCOUNT SECURITY ── */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-red-100 mb-12">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-xl">
                                🔒
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">
                                    {language === 'id' ? 'Keamanan Akun' : 'Account Security'}
                                </h2>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    {language === 'id' ? 'Keluar dari sesi aktif Anda di perangkat ini' : 'Sign out of your active session on this device'}
                                </p>
                            </div>
                        </div>
                        {/* SEKARANG TOMBOL UTAMA INI SUDAH IKUT BERUBAH MENJADI "KELUAR" */}
                        <button
                            type="button"
                            onClick={() => setShowLogoutModal(true)}
                            disabled={logoutLoading}
                            className="bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white font-medium text-sm py-2.5 px-6 rounded-lg shadow-sm transition-all flex items-center gap-2"
                        >
                            {logoutLoading ? (
                                language === 'id' ? "Mengeluarkan..." : "Logging out..."
                            ) : (
                                <span>{language === 'id' ? 'Keluar' : 'Logout'}</span>
                            )}
                        </button>
                    </div>
                </div>

            </div>

            {/* ======================================================== */}
            {/* POP-UP MODAL KUSTOM */}
            {/* ======================================================== */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div 
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                        onClick={() => setShowLogoutModal(false)} 
                    />

                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 relative z-10 transform scale-100 transition-all duration-300">
                        <h2 className="text-xl font-bold text-gray-800 mb-3">
                            {language === 'id' ? 'Konfirmasi Keluar' : 'Confirm Logout'}
                        </h2>
                        
                        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                            {language === 'id' 
                                ? 'Apakah Anda yakin ingin keluar dari aplikasi?' 
                                : 'Are you sure you want to log out of the application?'}
                        </p>
                        
                        <div className="flex gap-3 justify-center">
                            {/* Tombol Cancel */}
                            <button
                                type="button"
                                onClick={() => setShowLogoutModal(false)}
                                className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                                {language === 'id' ? 'Batal' : 'Cancel'}
                            </button>
                            
                            {/* Tombol Konfirmasi Logout */}
                            <button
                                type="button"
                                onClick={handleConfirmLogout}
                                className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-red-500 hover:bg-red-600 shadow-md transition-colors"
                            >
                                {language === 'id' ? 'Keluar' : 'Logout'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}