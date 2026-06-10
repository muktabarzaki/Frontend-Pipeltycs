import shopeeImg from '../icon/iconlogin/shopee.png';
import tokpedImg from '../icon/iconlogin/tokopedia.png';
import tiktokImg from '../icon/iconlogin/tiktokshop.png';
import igImg from '../icon/iconlogin/Instagram.png';
import IkonEmail from '../icon/iconlogin/IkonEmail.svg';
import LogoKunci from '../icon/iconlogin/LogoKunci.svg';
import LogoGoogle from '../icon/iconlogin/Google.svg';

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import api from '../lib/axios';

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // AUTO REDIRECT JIKA SUDAH LOGIN
    

    // HANDLE LOGIN
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', { email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/dashboard');
        } catch (error) {
            alert(error.response?.data?.message || 'Login gagal');
        }
    };

    return(
        <div className="min-h-screen bg-[#F9FBFD] flex items-center justify-center p-8 gap-20">

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

                    <div className="w-24 py-3 bg-white rounded-xl shadow-md flex flex-col items-center justify-center p-2 hover:-translate-y-1 transition-transform cursor-pointer">
                        <img src={shopeeImg} alt="Shopee" className="w-10 h-10 object-contain" />
                        <span className='text-xs font-small text-gray-600'>Shopee</span>
                    </div>

                    <div className="w-24 py-3 bg-white rounded-xl shadow-md flex flex-col items-center justify-center p-2 hover:-translate-y-1 transition-transform cursor-pointer">
                        <img src={tokpedImg} alt="Tokopedia" className="w-10 h-10 object-contain" />
                        <span className='text-xs font-small text-gray-600'>Tokopedia</span>
                    </div>

                    <div className="w-24 py-3 bg-white rounded-xl shadow-md flex flex-col items-center justify-center p-2 hover:-translate-y-1 transition-transform cursor-pointer">
                        <img src={tiktokImg} alt="TiktokShop" className="w-10 h-10 object-contain" />
                        <span className='text-xs font-small text-gray-600'>TiktokShop</span>
                    </div>

                    <div className="w-24 py-3 bg-white rounded-xl shadow-md flex flex-col items-center justify-center p-2 hover:-translate-y-1 transition-transform cursor-pointer">
                        <img src={igImg} alt="Instagram" className="w-10 h-10 object-contain" />
                        <span className='text-xs font-small text-gray-600'>Instagram</span>
                    </div>

                </div>
            </div>

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

                <div className='text-center mb-8'>

                    <h2 className='text-2xl font-bold text-gray-800'>
                        Welcome Back
                    </h2>

                    <p className='text-gray-500 text-sm mt-1'>
                        Sign in to your account to continue
                    </p>

                </div>

                <form onSubmit={handleLogin} className='space-y-5'>

                    <div>

                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Email
                        </label>

                        <div className='relative'>

                            <img
                                src={IkonEmail}
                                alt="IkonEmail"
                                className='absolute left-3 top-3.5 w-5 h-5 opacity-50'
                            />

                            <input
                                type="email"
                                placeholder='your@gmail.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all'
                                required
                            />

                        </div>
                    </div>

                    <div>

                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Password
                        </label>

                        <div className='relative'>

                            <img
                                src={LogoKunci}
                                alt="LogoKunci"
                                className='absolute left-3 top-3.5 w-5 h-5 opacity-50'
                            />

                            <input
                                type="password"
                                placeholder='********'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all'
                                required
                            />

                        </div>
                    </div>

                    <div className='flex items-center justify-between text-sm'>

                        <label className='flex items-center gap-2 cursor-pointer'>

                            <input
                                type="checkbox"
                                className='rounded border-gray-300 text-[#635BFF] focus:ring-[#635BFF]'
                            />

                            <span className='text-gray-600'>
                                Remember me
                            </span>

                        </label>

                        <Link
                        to="/forgot-password"
                        className='text-medium bg-gradient-to-r from-[#6155F5] to-[#CB30E0] bg-clip-text text-transparent hover:text-[#c038d6] font-medium'
                        >
                        forgot password
                        </Link>

                    </div>

                    <button
                        type='submit'
                        className='w-full flex justify-center items-center bg-gradient-to-r from-[#6155F5] to-[#CB30E0] hover:opacity-90 text-white font-semibold py-2.5 rounded-lg transition-opacity mt-4'
                    >
                        Login
                    </button>

                    <div className='relative flex items-center justify-center mt-3 mb-3'>

                        <div className='absolute inset-x-0 h-px bg-gray-200'></div>

                    </div>

                    <p className="text-center text-sm text-gray-600 mt-6">

                        Don't have an account?

                        <Link
                            to="/register"
                            className="text-[#635BFF] hover:underline font-medium ml-1"
                        >
                            Create Account
                        </Link>

                    </p>

                </form>
            </div>
        </div>
    )
}