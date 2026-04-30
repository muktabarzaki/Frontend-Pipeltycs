import shopeeImg from '../icon/shopee.png';
import tokpedImg from '../icon/tokopedia.png';
import tiktokImg from '../icon/tiktokshop.png';
import igImg from '../icon/Instagram.png';

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
                    <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center p-2 hover:-translate-y-1 transition-transfrom cursor-pointer">
                        <img src={shopeeImg} alt="Shopee" className="w-full h-full object-contain" />
                    </div>
                    <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center p-2 hover:-translate-y-1 transition-transfrom cursor-pointer">
                        <img src={tokpedImg} alt="Tokopedia" className="w-full h-full object-contain" />
                    </div>
                    <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center p-2 hover:-translate-y-1 transition-transfrom cursor-pointer">
                        <img src={tiktokImg} alt="TiktokShop" className="w-full h-full object-contain" />
                    </div>
                    <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center p-2 hover:-translate-y-1 transition-transfrom cursor-pointer">
                        <img src={igImg} alt="Instagram" className="w-full h-full object-contain" />
                    </div>
                </div>
            </div>

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl =-8">
                <h1>[Bagian kanan: Form Login]</h1>
            </div>
        </div>
    )

}