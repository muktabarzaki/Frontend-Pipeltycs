import shopeeImg from '../icon/iconlogin/shopee.png';
import tokpedImg from '../icon/iconlogin/tokopedia.png';
import tiktokImg from '../icon/iconlogin/tiktokshop.png';
import igImg from '../icon/iconlogin/Instagram.png';
import IkonEmail from '../icon/iconlogin/IkonEmail.svg';
import LogoKunci from '../icon/iconlogin/LogoKunci.svg';
import LogoGoogle from '../icon/iconlogin/Google.svg';
import { Link } from "react-router-dom";

export default function Login() {
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
                    <div className="w-24 py-3 bg-white rounded-xl shadow-md flex flex-col items-center justify-center p-2 hover:-translate-y-1 transition-transfrom cursor-pointer">
                        <img src={shopeeImg} alt="Shopee" className="w-10 h-10 object-contain" />
                        <span className='text-xs font-small text-gray-600'>Shopee</span>
                    </div>
                    <div className="w-24 py-3 bg-white rounded-xl shadow-md flex flex-col items-center justify-center p-2 hover:-translate-y-1 transition-transfrom cursor-pointer">
                        <img src={tokpedImg} alt="Tokopedia" className="w-10 h-10 object-contain" />
                        <span className='text-xs font-small text-gray-600'>Tokopedia</span>
                    </div>
                    <div className="w-24 py-3 bg-white rounded-xl shadow-md flex flex-col items-center justify-center p-2 hover:-translate-y-1 transition-transfrom cursor-pointer">
                        <img src={tiktokImg} alt="TiktokShop" className="w-10 h-10 object-contain" />
                        <span className='text-xs font-small text-gray-600'>TiktokShop</span>
                    </div>
                    <div className="w-24 py-3 bg-white rounded-xl shadow-md flex flex-col items-center justify-center p-2 hover:-translate-y-1 transition-transfrom cursor-pointer">
                        <img src={igImg} alt="Instagram" className="w-10 h-10 object-contain" />
                        <span className='text-xs font-small text-gray-600'>Instagram</span>
                    </div>
                </div>
            </div>


            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <div className='text-center mb-8'>
                    <h2 className='text-2xl font-bold text-gray-800'>Welcome Back</h2>
                    <p className='text-gray-500 text-sm mt-1'>Sign in to your account to continue</p>
                </div>
                <form className='space-y-5'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                        <div className='relative'>
                            <img src={IkonEmail} alt="IkonEmail" className='absolute left-3 top-3.5 w-5 h-5 opacity-50' />
                            <input type="email" placeholder='your@gmail.com' className='w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all'/>
                        </div>
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
                        <div className='relative'>
                            <img src={LogoKunci} alt="LogoKunci" className='absolute left-3 top-3.5 w-5 h-5 opacity-50'/>
                            <input type="password" placeholder='********' className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all'/>
                        </div>
                    </div>
                    <div className='flex items-center justify-between text-sm'>
                        <label className='flex items-center gap-2 cursor-pointer'>
                            <input type="checkbox" className='rounded border-gray-300 text-[#635BFF] focus:ring-[#635BFF]' />
                            <span className='text-gray-600'>Remember me</span>
                        </label>
                        <a href="#" className='text-medium bg-gradient-to-r from-[#6155F5] to-[#CB30E0] bg-clip-text text-transparent hover:text-[#c038d6] font-medium'>forgot password</a>
                    </div>
                    <button type='button' className='w-full bg-gradient-to-r from-[#635BFF] to-[#D946EF] hover:opacity-90 text-white font-semibold py-2.5 rounded-lg transition-opacity mt-2'>
                        Login
                    </button>
                    <div className='relative flex items-center justify-center mt-3 mb-3'>
                        <div className='absolute inset-x-0 h-px bg-gray-200'></div>
                        <span className='relative bg-white px-4 text-xs text-gray-500'>Or Contiune with</span>
                    </div>
                    <button type='button' className='w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-medium py-2.5 rounded-lg transition-colors'>
                            <img src={LogoGoogle} alt="Google" className='w-5 h-5 object-contain'/> 
                            <span className='flex-shrink-0'>Continue With Google</span>
                    </button>
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Don't have an account? <Link to="/register" className="text-[#635BFF] hover:underline font-medium">Create Account</Link>
                    </p>
                </form>
            </div>
        </div>
    )

}