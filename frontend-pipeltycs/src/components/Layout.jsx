import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import IconUser from '../icon/icondashboard/UserPutih.svg';
import IconGlobe from '../icon/icondashboard/Globe.svg';
import IconDashboard from '../icon/icondashboard/Dashboard.svg';
import IconSales from '../icon/icondashboard/TrendingSales.svg';
import IconComparasion from '../icon/icondashboard/Comparasion.svg';
import IconProduct from '../icon/icondashboard/Product.svg';
import IconShopping from '../icon/icondashboard/Shopping.svg';
import IconSetting from '../icon/icondashboard/Setting.svg';
import { useApp } from '../context/AppContext';


export default function Layout({children}) {
    const location = useLocation();
    const { currency, setCurrency, language, setLanguage } = useApp();
    return (
        
        <div className="flex flex-col h-screen font-sans bg-[#F8F9FA] text-gray-900">
            
            {/*HEADER*/}
            <header className="h-16 border-b flex items-center justify-between px-6 z-10 bg-white border-gray-200">
                
                {/*Logo Kiri*/} 
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-b from-[#6155F5] to-[#4C71F6] rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">P</div>
                    <span className="text-xl font-bold text-[#635BFF]">Pipeltycs</span>
                </div>

                {/* Profil & Setting */}
                <div className="flex items-center gap-6 text-sm text-gray-600 font-medium">
                    <div className="flex items-center text-gray-600 hover:text-[#635BFF] transition-colors">
                        <img src={IconGlobe} alt="IconGlobe" className="w-4 h-4 mr-1 object-contain opacity-90" />
                        <select
                         value={language}
                         onChange={e => setLanguage(e.target.value)}
                         className="bg-transparent text-sm font-medium border-none focus:ring-0 cursor-pointer outline-none p-0 pr-4 text-gray-600"
                         >
                        <option value="en" className="text-black">English</option>
                        <option value="id" className="text-black">Indonesia</option>
                        </select>

                    </div>
                    
                    <div className="flex items-center text-gray-600 hover:text-[#635BFF] transition-colors">
                       <select
                         value={currency}
                         onChange={e => setCurrency(e.target.value)}
                         className="bg-transparent text-sm font-medium border-none focus:ring-0 cursor-pointer outline-none p-0 pr-4 text-gray-600"
                     >
                        <option value="usd" className="text-black">$ USD</option>
                        <option value="idr" className="text-black">Rp IDR</option>
                        <option value="eur" className="text-black">€ EUR</option>
                        </select>
                    </div>
                    
                    <div className="flex items-center gap-2 pl-5 border-l border-gray-300 cursor-pointer">
                        <div className="w-8 h-8 bg-[#635BFF] rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                            <img src={IconUser} alt="IconUser" className="w-4 h-4 object-contain" />
                        </div>
                        <span className="text-sm font-semibold text-gray-800">Admin</span>
                    </div>
                </div>
            </header>

            {/*BAWAH (Sidebar & Main)*/}
            <div className="flex flex-1 overflow-hidden">
                
                {/* SIDEBAR */}
                <aside className="w-64 flex flex-col py-6 z-10 bg-white shadow-[4px_0_24px_rgba(0,0,0,0.04)] border-r border-gray-50">
                    <div className="flex flex-col gap-2 px-4">
                        
                        <Link to="/dashboard" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium cursor-pointer transition-colors ${location.pathname === '/dashboard' ? 'bg-[#635BFF] text-white shadow-md shadow-indigo-200/50' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800 border border-transparent'}`}>
                            <img src={IconDashboard} alt="Dashboard" className={`w-5 h-5 object-contain transition-all ${location.pathname === '/dashboard' ? 'opacity-100' : 'invert opacity-60'}`} />
                            <span className="text-sm">Dashboard</span>
                        </Link>

                        <Link to="/salesinsight" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium cursor-pointer transition-colors ${location.pathname === '/salesinsight' ? 'bg-[#635BFF] text-white shadow-md shadow-indigo-200/50' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800 border border-transparent'}`}>
                             <img src={IconSales} alt="SalesInsigth" className={`w-5 h-5 object-contain transition-all ${location.pathname === '/salesinsight' ? 'opacity-100' : 'invert opacity-60'}`} />
                             <span className="text-sm">Sales Insight</span>
                        </Link>

                        <Link to="/platform-comparison" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium cursor-pointer transition-colors ${location.pathname === '/platform-comparison' ? 'bg-[#635BFF] text-white shadow-md shadow-indigo-200/50' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800 border border-transparent'}`}>
                             <img src={IconComparasion} alt="Platform Comparison" className={`w-5 h-5 object-contain transition-all ${location.pathname === '/platform-comparison' ? 'opacity-100' : 'invert opacity-60'}`} />
                             <span className="text-sm">Platform Comparison</span>
                        </Link>

                        <Link to="/product-analyst" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium cursor-pointer transition-colors ${location.pathname === '/product-analyst' ? 'bg-[#635BFF] text-white shadow-md shadow-indigo-200/50' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800 border border-transparent'}`}>
                             <img src={IconProduct} alt="Product Analyst" className={`w-5 h-5 object-contain transition-all ${location.pathname === '/product-analyst' ? 'opacity-100' : 'invert opacity-60'}`} />
                             <span className="text-sm">Product Analyst</span>
                        </Link>

                        <Link to="/campaign-performance" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium cursor-pointer transition-colors ${location.pathname === '/campaign-performance' ? 'bg-[#635BFF] text-white shadow-md shadow-indigo-200/50' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800 border border-transparent'}`}>
                             <img src={IconShopping} alt="Campaign Performance" className={`w-5 h-5 object-contain transition-all ${location.pathname === '/campaign-performance' ? 'opacity-100' : 'invert opacity-60'}`} />
                             <span className="text-sm">Campaign Performance</span>
                        </Link>

                        <Link to="/settings" className={`flex items-center gap-3 px-4 py-2.5 mt-2 rounded-lg font-medium cursor-pointer transition-colors ${location.pathname === '/settings' ? 'bg-[#635BFF] text-white shadow-md shadow-indigo-200/50' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800 border border-transparent'}`}>
                             <img src={IconSetting} alt="Settings" className={`w-5 h-5 object-contain transition-all ${location.pathname === '/settings' ? 'opacity-100' : 'invert opacity-60'}`} />
                             <span className="text-sm">Settings</span>
                        </Link>

                    </div>
                </aside>

                {/*AREA KONTEN*/}
                <main className="flex-1 overflow-auto p-8 bg-[#F8F9FA] text-gray-900">
                    {children}
                </main>

            </div>
        </div>
    );
}