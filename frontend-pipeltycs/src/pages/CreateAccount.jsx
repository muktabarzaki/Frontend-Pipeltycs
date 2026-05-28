import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import IconStatistics from '../icon/iconcreateaccount/Statisticsicon.svg';
import IconGlobal from '../icon/iconcreateaccount/Global.svg';
import IconStack from '../icon/iconcreateaccount/Stack.svg';
import IconUser from '../icon/iconcreateaccount/User.svg';
import IconEmail from '../icon/iconcreateaccount/IkonEmail.svg';
import IconKategory from '../icon/iconcreateaccount/Kategory.svg';
import IconKunci from '../icon/iconcreateaccount/Kunci.svg';
import IconGoogle from '../icon/iconcreateaccount/Google.svg';

export default function CreateAccount() {

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);

    // STATE FORM
    const [name, setName] = useState("");
    const [storeName, setStoreName] = useState("");
    const [email, setEmail] = useState("");
    const [category, setCategory] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // HANDLE REGISTER
    const handleRegister = async (e) => {

        e.preventDefault();

        // VALIDASI PASSWORD
        if (password !== confirmPassword) {
            alert("Confirm password tidak sama");
            return;
        }

        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/api/register",
                {
                   name,
                   email,
                   password,
                   password_confirmation: confirmPassword
                }
            );

            console.log(response.data);

            // TAMPILKAN MODAL
            setShowModal(true);

        } catch (error) {

            console.log(error.response?.data);

            alert(
                error.response?.data?.message ||
                "Register gagal"
            );
        }
    };

    return(
        <div className='min-h-screen bg-[#F9FBFD] flex items-center justify-center p-8 gap-16'>

            <div className='flex flex-col items-center w-full max-w-sm text-center'>

                <div className='w-16 h-16 bg-[#635BFF] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-200'>
                    <span className='text-white text-3xl font-bold'>P</span>
                </div>

                <h1 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6155F5] to-[#CB30E0] mb-3'>
                    Join Pipeltycs
                </h1>

                <p className='text-gray-500 text-sm mb-10 px-4'>
                    Start tracking your sales across all platforms in one unified dashboard
                </p>

                <div className='flex flex-col gap-4 w-full px-4 mb-1'>

                    <div className='flex items-center gap-4 bg-white px-5 py-3.5 rounded-xl border border-gray-100 shadow-sm'>

                        <div className='w-8 h-8 flex-shrink-0 bg-orange-50 rounded-lg flex items-center justify-center'>
                            <img src={IconStatistics} alt="LogoStatistics" className="w-5 h-5 object-contain" />
                        </div>

                        <span className='text-sm font-medium text-gray-700 text-left'>
                            Real time analytics across all platform
                        </span>

                    </div>

                </div>

                <div className='flex flex-col gap-4 w-full px-4 mb-1'>

                    <div className='flex items-center gap-4 bg-white px-5 py-3.5 rounded-xl border border-gray-100 shadow-sm'>

                        <div className='w-8 h-8 flex-shrink-0 bg-orange-50 rounded-lg flex items-center justify-center'>
                            <img src={IconGlobal} alt="IconGlobal" className="w-5 h-5 object-contain" />
                        </div>

                        <span className='text-sm font-medium text-gray-700 text-left'>
                            AI Powered sales recommendations
                        </span>

                    </div>

                </div>

                <div className='flex flex-col gap-4 w-full px-4 mb-1'>

                    <div className='flex items-center gap-4 bg-white px-5 py-3.5 rounded-xl border border-gray-100 shadow-sm'>

                        <div className='w-8 h-8 flex-shrink-0 bg-orange-50 rounded-lg flex items-center justify-center'>
                            <img src={IconStack} alt="IconStack" className="w-5 h-5 object-contain" />
                        </div>

                        <span className='text-sm font-medium text-gray-700 text-left'>
                            Multi currency & multi languange support
                        </span>

                    </div>

                </div>
            </div>

            <div className='w-full max-w-md bg-white rounded-2xl shadow-xl p-8'>

                <div className='mb-6'>

                    <h2 className='text-2xl font-bold text-gray-800'>
                        Create Account
                    </h2>

                    <p className='text-gray-500 text-sm mt-1'>
                        Start your analytics journey today
                    </p>

                </div>

                <form onSubmit={handleRegister} className='space-y-4'>

                    <div>

                        <label className='block text-xs font-medium text-gray-700 mb-1'>
                            Full Name
                        </label>

                        <div className='relative'>

                            <img
                                src={IconUser}
                                alt="IkonUser"
                                className="absolute left-3 top-2.5 w-5 h-5 opacity-50 object-contain"
                            />

                            <input
                                type="text"
                                placeholder='Muktabar Zaki'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#635BFF] transition-colors'
                            />

                        </div>
                    </div>

                    <div>

                        <label className='block text-xs font-medium text-gray-700 mb-1'>
                            Nama Toko
                        </label>

                        <div className='relative'>

                            <img
                                src={IconUser}
                                alt="IkonUser"
                                className="absolute left-3 top-2.5 w-5 h-5 opacity-50 object-contain"
                            />

                            <input
                                type="text"
                                placeholder='Mainan Abah'
                                value={storeName}
                                onChange={(e) => setStoreName(e.target.value)}
                                className='w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#635BFF] transition-colors'
                            />

                        </div>
                    </div>

                    <div>

                        <label className='block text-xs font-medium text-gray-700 mb-1'>
                            Email
                        </label>

                        <div className='relative'>

                            <img
                                src={IconEmail}
                                alt="IkonEmail"
                                className="absolute left-3 top-2.5 w-5 h-5 opacity-50 object-contain"
                            />

                            <input
                                type="email"
                                placeholder='your@email.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#635BFF] transition-colors'
                            />

                        </div>
                    </div>

                    <div>

                        <label className='block text-xs font-medium text-gray-700 mb-1'>
                            Business Category
                        </label>

                        <div className='relative'>

                            <img
                                src={IconKategory}
                                alt="IkonKategory"
                                className="absolute left-3 top-2.5 w-5 h-5 opacity-50 object-contain"
                            />

                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className='w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#635BFF] transition-colors appearance-none text-gray-500'
                            >
                                <option value="">
                                    Select Category
                                </option>

                                <option value="retail">
                                    Retail
                                </option>

                                <option value="fnb">
                                    Food & Beverage
                                </option>

                                <option value="fashion">
                                    Fashion
                                </option>

                                <option value="other">
                                    Other
                                </option>

                            </select>

                        </div>
                    </div>

                    <div>

                        <label className='block text-xs font-medium text-gray-700 mb-1'>
                            Password
                        </label>

                        <div className='relative'>

                            <img
                                src={IconKunci}
                                alt="IkonKunci"
                                className="absolute left-3 top-2.5 w-5 h-5 opacity-50 object-contain"
                            />

                            <input
                                type="password"
                                placeholder='*******'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#635BFF] transition-colors'
                            />

                        </div>
                    </div>

                    <div>

                        <label className='block text-xs font-medium text-gray-700 mb-1'>
                            Confirm Password
                        </label>

                        <div className='relative'>

                            <img
                                src={IconKunci}
                                alt="IkonKunci"
                                className="absolute left-3 top-2.5 w-5 h-5 opacity-50 object-contain"
                            />

                            <input
                                type="password"
                                placeholder='*******'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#635BFF] transition-colors'
                            />

                        </div>
                    </div>

                    <div className='flex items-center gap-2 mt-2'>

                        <input
                            type="checkbox"
                            className='rounded border-gray-300 text-[#635BFF] focus:ring-[#635BFF] cursor-pointer'
                        />

                        <span className='text-[10px] text-gray-500 cursor-pointer'>
                            I agree to the Terms of Service and Privacy Policy
                        </span>

                    </div>

                    <button
                        type='submit'
                        className='w-full bg-gradient-to-r from-[#635BFF] to-[#D946EF] hover:opacity-90 text-white font-semibold py-2.5 rounded-lg transition-opacity mt-2'
                    >
                        Create Account
                    </button>

                    <div className='relative flex items-center justify-center mt-2 mb-4'>

                        <div className='absolute inset-x-0 h-px bg-gray-200'></div>

                        <span className='relative bg-white px-4 text-[10px] text-gray-500 font-medium'>
                            Or Continue With
                        </span>

                    </div>

                    <button
                        type='button'
                        className='w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 text-sm font-medium py-2 rounded-lg transition-colors'
                    >

                        <img
                            src={IconGoogle}
                            alt="IkonGoogle"
                            className="w-5 h-5 object-contain"
                        />

                        <span>
                            Continue With Google
                        </span>

                    </button>

                    <p className='flex items-center justify-center'>

                        Already have an account?

                        <Link
                            to="/"
                            className='text-[#635BFF] hover:underline font-semibold ml-1'
                        >
                            Login
                        </Link>

                    </p>

                </form>
            </div>

            {showModal && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all">

                    <div className="bg-white rounded-2xl shadow-2xl p-10 w-[350px] text-center flex flex-col items-center animate-bounce-short">

                        <h3 className="text-xl font-bold text-gray-800 mb-6 leading-relaxed">
                            Your Account
                            <br />
                            Successfully Created!
                        </h3>

                        <button
                            onClick={() => navigate("/")}
                            className="bg-gradient-to-r from-[#635BFF] to-[#D946EF] hover:opacity-90 text-white font-semibold py-2.5 rounded-lg transition-opacity w-full"
                        >
                            Login
                        </button>

                    </div>

                </div>
            )}

        </div>
    )
}