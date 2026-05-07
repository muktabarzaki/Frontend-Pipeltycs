import { Link } from "react-router-dom";
import { useState } from "react";
import IconUser from '../icon/icondashboard/UserPutih.svg';
import IconGlobe from '../icon/icondashboard/Globe.svg';
import IconMoon from '../icon/icondashboard/Moon.svg';
import IconSun from '../icon/icondashboard/Sun.svg';
import IconNotifikasi from '../icon/icondashboard/Notifikasi.svg';
import IconDashboard from '../icon/icondashboard/Dashboard.svg';
import IconSales from '../icon/icondashboard/TrendingSales.svg';
import IconComparasion from '../icon/icondashboard/Comparasion.svg';
import IconProduct from '../icon/icondashboard/Product.svg';
import IconShopping from '../icon/icondashboard/Shopping.svg';
import IconSetting from '../icon/icondashboard/Setting.svg';

export default function Dashboard() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    return(
        <div className={`flex flex-col h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-[#F8F9FA] text-gray-900'}`}>
            <header className={`h-16 border-b flex items-center justify-between px-6 z-10 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                {/*Logo Kiri*/} 
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-b from-[#6155F5] to-[#4C71F6] rounded-lg flex items-center justify-center text-white font-bold text-lg">P</div>
                    <span className="text-xl font-bold text-[#635BFF]">Pipeltycs</span>
                </div>

                {/*Profil & Setting*/}
                <div className="flex items-center gap-6 text-sm text-gray-600 font-medium">
                    <div className={`flex items-center transition-colors ${isDarkMode ? 'text-gray-200 hover:text-white' : 'text-gray-600 hover:text-[#635BFF]'}`}>
                        <img src={IconGlobe} alt="IconGlobe" className={`w-4 h-4 mr-1 object-contain ${isDarkMode ? 'invert' : ''}`} />
                        <select className={`bg-transparent text-sm font-medium border-none focus:ring-0 cursor-pointer outline-none p-0 pr-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>
                            <option value="en" className="text-black">English</option>
                            <option value="id" className="text-black">Indonesia</option>
                        </select>
                    </div>
                    <div className={`flex items-center transition-colors ${isDarkMode ? 'text-gray-200 hover:text-white' : 'text-gray-600 hover:text-[#635BFF]'}`}>
                        <select className={`bg-transparent text-sm font-medium border-none focus:ring-0 cursor-pointer outline-none p-0 pr-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>
                            <option value="usd" className="text-black">$ USD</option>
                            <option value="idr" className="text-black">Rp IDR</option>
                            <option value="eur" className="text-black">€ EUR</option>
                        </select>
                    </div>
                    <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                        {isDarkMode ? (
                            <img src={IconMoon} alt="Dark Mode" className="w-5 h-5 object-contain" />
                        ) : (
                            <img src={IconSun} alt="Light Mode" className="w-5 h-5 object-contain" />  
                        )}
                    </button>
                    <div className="{`relative p-1.5 rounded-lg cursor-pointer transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}">
                        <img src={IconNotifikasi} alt="Notification" className={`w-5 h-5 object-contain ${isDarkMode ? 'invert' : ''}`} />
                        <span className="absolute top-2 right-2 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                    </div>
                    <div className={`flex items-center gap-2 pl-5 border-l cursor-pointer ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                        <div className="w-8 h-8 bg-[#635BFF] rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                            <img src={IconUser} alt="IconUser" className="w-4 h-4 object-contain" />
                        </div>
                        <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Admin</span>
                    </div>
                </div>
            </header>
            {/*Bar Side Kiri*/}
            <div className="flex flex-1 overflow-hidden bg-white shadow-sm">
                <aside className={`w-64 flex flex-col py-6 z-10 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 shadow-[4px_0_24px_rgba(0,0,0,0.3)]' : 'bg-white shadow-[4px_0_24px_rgba(0,0,0,0.04)] border-r border-gray-50'}`}>
                    <div className="flex flex-col gap-2 px-4">
                        <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium cursor-pointer transition-colors border border-transparent ${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:bg-gray-50 hover:border-gray-100 hover:text-gray-800'}`}>
                            <img src={IconDashboard} alt="Dashboard" className={`w-5 h-5 object-contain transition-all ${isDarkMode ? 'opacity-100' : 'invert opacity-60'}`} />
                            <span className="text-sm">Dashboard</span>
                        </div>
                        <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium cursor-pointer transition-colors border border-transparent ${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:bg-gray-50 hover:border-gray-100 hover:text-gray-800'}`}>
                            <img src={IconSales} alt="Sales" className={`w-5 h-5 object-contain transition-all ${isDarkMode ? 'opacity-100' : 'invert opacity-60'}`} />
                            <span className="text-sm">Sales Insigth</span>
                        </div>
                        <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium cursor-pointer transition-colors border border-transparent ${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:bg-gray-50 hover:border-gray-100 hover:text-gray-800'}`}>
                            <img src={IconComparasion} alt="Comparasion" className={`w-5 h-5 object-contain transition-all ${isDarkMode ? 'opacity-100' : 'invert opacity-60'}`} />
                            <span className="text-sm">Platform Comparasion</span>
                        </div>
                        <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium cursor-pointer transition-colors border border-transparent ${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:bg-gray-50 hover:border-gray-100 hover:text-gray-800'}`}>
                            <img src={IconProduct} alt="Product" className={`w-5 h-5 object-contain transition-all ${isDarkMode ? 'opacity-100' : 'invert opacity-60'}`} />
                            <span className="text-sm">Product Analiyst</span>
                        </div>
                        <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium cursor-pointer transition-colors border border-transparent ${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:bg-gray-50 hover:border-gray-100 hover:text-gray-800'}`}>
                            <img src={IconShopping} alt="Shopping" className={`w-5 h-5 object-contain transition-all ${isDarkMode ? 'opacity-100' : 'invert opacity-60'}`} />
                            <span className="text-sm">Campaign Performence</span>
                        </div>
                        <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium cursor-pointer transition-colors border border-transparent ${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:bg-gray-50 hover:border-gray-100 hover:text-gray-800'}`}>
                            <img src={IconSetting} alt="Setting" className={`w-5 h-5 object-contain transition-all ${isDarkMode ? 'opacity-100' : 'invert opacity-60'}`} />
                            <span className="text-sm">Settings</span>
                        </div>
                    </div>
                </aside>
                <main className={`flex-1 overflow-auto p-8 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-[#F8F9FA] text-gray-900'}`}>
                        <h1 className="text-2xl font-bold mb-6">Sales Overview</h1>
                </main>
            </div>
        </div>
    )
}