import { useState, useEffect } from 'react';
import api from '../lib/axios';
import Layout from '../components/Layout';

import IconSettingUser from '../icon/icondashboard/UserPutih.svg';
import IconSettingGlobe from '../icon/icondashboard/Globe.svg';
import IconSettingDownload from '../icon/icondashboard/Product.svg';
// Tambah import useApp
import { useApp } from '../context/AppContext';

export default function Settings() {
    const { language, setLanguage, currency, setCurrency } = useApp();
    const [isLoading, setIsLoading] = useState(true);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

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

    const handlePreferenceChange = (e) =>
        setPreferences({ ...preferences, [e.target.name]: e.target.value });

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
            setSuccessMsg('Profil berhasil disimpan!');
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (err) {
            setErrorMsg(err.response?.data?.message || 'Gagal menyimpan perubahan');
        }
    };

    const ToggleSwitch = ({ checked, onChange }) => (
        <button
            type="button"
            onClick={onChange}
            className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors duration-300 ${checked ? 'bg-[#635BFF]' : 'bg-gray-200'}`}
        >
            <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
        </button>
    );

    if (isLoading) return (
        <Layout>
            <div className="flex justify-center items-center h-[300px]">
                <p className="text-gray-500">Loading...</p>
            </div>
        </Layout>
    );

    return (
        <Layout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-1 text-gray-800">Settings</h1>
                <p className="text-sm text-gray-500">Manage your account, integrations, and preferences</p>
            </div>

            <div className="max-w-4xl flex flex-col gap-8">

                {/* USER PROFILE */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-[#635BFF]/10 rounded-xl flex items-center justify-center">
                            <img src={IconSettingUser} alt="User Profile" className="w-6 h-6 object-contain filter invert-[.3] sepia-[.9] saturate-[30] hue-rotate-[240deg]" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-800">User Profile</h2>
                    </div>

                    {/* Notifikasi sukses/error */}
                    {successMsg && (
                        <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                            ✅ {successMsg}
                        </div>
                    )}
                    {errorMsg && (
                        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            ❌ {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleSaveProfile}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-2">Full Name</label>
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
                                <label className="block text-xs font-semibold text-gray-600 mb-2">Business Name</label>
                                <input
                                    type="text"
                                    name="businessName"
                                    value={profile.businessName}
                                    onChange={handleProfileChange}
                                    className="w-full bg-gray-50/50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-2">Phone</label>
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
                            <span className="text-lg">💾</span> Save Changes
                        </button>
                    </form>
                </div>

                {/* PREFERENCES */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                            <img src={IconSettingGlobe} alt="Preferences" className="w-6 h-6 object-contain filter invert-[.4] sepia-[1] saturate-[10] hue-rotate-[180deg]" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-800">Preferences</h2>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="border border-gray-100 rounded-xl p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-xl">🌐</span>
                                <h4 className="text-sm font-semibold text-gray-800">Language</h4>
                            </div>
                            {/* Language */}
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
                                <h4 className="text-sm font-semibold text-gray-800">Currency</h4>
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

                {/* EXPORT DATA */}

            </div>
        </Layout>
    );
}