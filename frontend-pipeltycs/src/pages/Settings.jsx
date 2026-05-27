import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

// Placeholder untuk import ikon (Silakan sesuaikan path-nya dengan file SVG milikmu)
import IconSettingUser from '../icon/icondashboard/UserPutih.svg';
import IconSettingBell from '../icon/icondashboard/Setting.svg'; // Ganti dengan icon bell
import IconSettingGlobe from '../icon/icondashboard/Globe.svg'; 
import IconSettingDownload from '../icon/icondashboard/Product.svg'; // Ganti dengan icon download

export default function Settings() {
    const [isLoading, setIsLoading] = useState(true);

    // ==========================================
    // 1. WADAH DATA (STATE)
    // ==========================================
    
    // State User Profile
    const [profile, setProfile] = useState({
        fullName: 'Admin Pipeltycs',
        email: 'admin@pipeltycs.com',
        businessName: 'Pipeltycs Corp',
        phone: '+62 812-3456-7890'
    });

    // State Notifications
    const [notifications, setNotifications] = useState({
        emailAlerts: true,
        salesUpdates: true,
        inventoryAlerts: true,
        weeklyReports: false,
        marketingTips: true
    });

    // State Preferences
    const [preferences, setPreferences] = useState({
        darkMode: true,
        language: 'English',
        currency: 'US Dollar (USD)'
    });

    // ==========================================
    // 2. SIMULASI API KE LARAVEL
    // ==========================================
    useEffect(() => {
        // Simulasi mengambil data pengaturan dari database
        axios.get('http://localhost:8000/api/settings')
            .then(response => {
                // setProfile(response.data.profile);
                // setNotifications(response.data.notifications);
                // setPreferences(response.data.preferences);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Menggunakan data mockup karena backend belum siap.", error.message);
                setIsLoading(false);
            });
    }, []);

    // ==========================================
    // 3. HANDLER FUNGSI
    // ==========================================
    
    // Handler untuk input text (Profile & Preferences)
    const handleProfileChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
    const handlePreferenceChange = (e) => setPreferences({ ...preferences, [e.target.name]: e.target.value });

    // Handler khusus untuk Toggle Switch (Notifications)
    const toggleNotification = (key) => setNotifications({ ...notifications, [key]: !notifications[key] });
    const toggleDarkMode = () => setPreferences({ ...preferences, darkMode: !preferences.darkMode });

    // Fungsi submit
    const handleSaveProfile = (e) => {
        e.preventDefault();
        // axios.post('http://localhost:8000/api/settings/profile', profile)
        alert("Perubahan profil siap dikirim ke database!");
    };

    // Komponen Reusable untuk Toggle Switch
    const ToggleSwitch = ({ checked, onChange }) => (
        <button 
            type="button"
            onClick={onChange}
            className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors duration-300 ease-in-out ${checked ? 'bg-[#635BFF]' : 'bg-gray-200'}`}
        >
            <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
        </button>
    );

    // ==========================================
    // 4. TAMPILAN ANTARMUKA
    // ==========================================
    return (
        <Layout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-1 text-gray-800">Settings</h1>
                <p className="text-sm text-gray-500">Manage your account, integrations, and preferences</p>
            </div>

            <div className="max-w-4xl flex flex-col gap-8">
                
                {/* --- 1. USER PROFILE --- */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-[#635BFF]/10 rounded-xl flex items-center justify-center">
                            {/* Menggunakan tag img sesuai aturan (bukan svg) */}
                            <img src={IconSettingUser} alt="User Profile" className="w-6 h-6 object-contain filter invert-[.3] sepia-[.9] saturate-[30] hue-rotate-[240deg]" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-800">User Profile</h2>
                    </div>

                    <form onSubmit={handleSaveProfile}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-2">Full Name</label>
                                <input type="text" name="fullName" value={profile.fullName} onChange={handleProfileChange} className="w-full bg-gray-50/50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 transition-all" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-2">Email</label>
                                <input type="email" name="email" value={profile.email} onChange={handleProfileChange} className="w-full bg-gray-50/50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 transition-all" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-2">Business Name</label>
                                <input type="text" name="businessName" value={profile.businessName} onChange={handleProfileChange} className="w-full bg-gray-50/50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 transition-all" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-2">Phone</label>
                                <input type="tel" name="phone" value={profile.phone} onChange={handleProfileChange} className="w-full bg-gray-50/50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 transition-all" />
                            </div>
                        </div>
                        <button type="submit" className="bg-[#635BFF] hover:bg-indigo-600 text-white font-medium text-sm py-2.5 px-6 rounded-lg shadow-sm transition-all flex items-center gap-2">
                            <span className="text-lg">💾</span> Save Changes
                        </button>
                    </form>
                </div>

                {/* --- 3. PREFERENCES --- */}
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
                            <select name="language" value={preferences.language} onChange={handlePreferenceChange} className="w-full bg-gray-50/50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 cursor-pointer">
                                <option>English</option>
                                <option>Indonesia</option>
                            </select>
                        </div>

                        <div className="border border-gray-100 rounded-xl p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-xl font-bold text-gray-500 pl-1">$</span>
                                <h4 className="text-sm font-semibold text-gray-800">Currency</h4>
                            </div>
                            <select name="currency" value={preferences.currency} onChange={handlePreferenceChange} className="w-full bg-gray-50/50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 cursor-pointer">
                                <option>US Dollar (USD)</option>
                                <option>Indonesian Rupiah (IDR)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* --- 4. EXPORT DATA --- */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                            <img src={IconSettingDownload} alt="Export" className="w-6 h-6 object-contain filter invert-[.5] sepia-[1] saturate-[10] hue-rotate-[300deg]" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-800">Export Data</h2>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">Download your sales data and analytics reports</p>
                    
                    <div className="flex flex-wrap gap-4">
                        <button className="bg-[#635BFF] hover:bg-indigo-600 text-white font-medium text-sm py-2.5 px-6 rounded-lg shadow-sm transition-all">
                            Export as CSV
                        </button>
                        <button className="bg-[#8B5CF6] hover:bg-purple-600 text-white font-medium text-sm py-2.5 px-6 rounded-lg shadow-sm transition-all">
                            Export as Excel
                        </button>
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium text-sm py-2.5 px-6 rounded-lg shadow-sm transition-all">
                            Export as PDF
                        </button>
                    </div>
                </div>

            </div>
        </Layout>
    );
}