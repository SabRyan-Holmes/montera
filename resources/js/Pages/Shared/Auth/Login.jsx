import { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { InputError } from "@/Components";
import { IoArrowBack } from "react-icons/io5"; // Import Icon Back

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        login: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <>
            <Head>
                <title>Login Portal | Bank XYZ</title>
                <link
                    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <style>{`
                body { font-family: 'Plus Jakarta Sans', sans-serif; }
                .glass-login {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }
                .bg-bank {
                    background: linear-gradient(135deg, #001f3f 0%, #003366 100%);
                }
            `}</style>

            <div className="flex min-h-screen bg-white">

                {/* --- BAGIAN KIRI (BRANDING / BACKGROUND) --- */}
                <div className="relative items-center justify-center hidden p-12 overflow-hidden lg:flex lg:w-1/2 bg-bank">
                    <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-[#c5a059] opacity-10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-400 opacity-10 rounded-full blur-3xl"></div>

                    <div className="relative z-10 w-full max-w-lg">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="flex items-center justify-center w-12 h-12 bg-white shadow-2xl rounded-2xl">
                                <span className="text-[#001f3f] font-black text-2xl">X</span>
                            </div>
                            <span className="text-3xl font-bold tracking-tight text-white">Bank <span className="text-[#c5a059]">XYZ</span></span>
                        </div>

                        <h2 className="text-5xl font-extrabold leading-tight text-white">
                            Secure Access to <br /> <span className="text-[#c5a059]">Performance Data.</span>
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-blue-100">
                            Silakan masuk ke portal sistem kinerja <strong>MONTERA</strong> untuk memantau akuisisi produk dan laporan produktivitas secara real-time.
                        </p>

                        <div className="mt-12 glass-login p-8 rounded-[32px]">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#c5a059] rounded-full flex items-center justify-center text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-white">Keamanan Terenkripsi</p>
                                    <p className="text-sm text-blue-200">Sesi Anda dilindungi dengan enkripsi standar perbankan.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- BAGIAN KANAN (FORM LOGIN) --- */}
                <div className="relative flex items-center justify-center w-full p-8 lg:w-1/2 md:p-16 bg-slate-50 lg:bg-white">
                    {/* TOMBOL BACK ABSOLUTE DI POJOK KANAN ATAS (MOBILE) ATAU KIRI ATAS (DESKTOP) */}
                    <Link
                        href={route('welcome')}
                        className="absolute top-8 left-8 lg:left-auto lg:right-12 flex items-center gap-2 text-slate-400 hover:text-[#001f3f] transition-all font-semibold text-sm group"
                    >
                        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-[#001f3f] transition-all shadow-sm">
                            <IoArrowBack className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        </div>
                        <span>Kembali</span>
                    </Link>

                    <div className="w-full max-w-md">
                        <div className="mb-10">
                            <h3 className="text-3xl font-black text-[#001f3f]">Selamat Datang</h3>
                            <p className="mt-2 font-medium text-slate-500">Masukkan kredensial Anda untuk melanjutkan.</p>

                            {status && (
                                <div className="p-3 mt-4 text-sm font-bold text-green-700 bg-green-100 rounded-xl">
                                    {status}
                                </div>
                            )}
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Input Login */}
                            <div>
                                <label htmlFor="login" className="block text-sm font-bold text-[#001f3f] mb-2">Username / NIP</label>
                                <input
                                    id="login"
                                    type="text"
                                    name="login"
                                    value={data.login}
                                    onChange={(e) => setData("login", e.target.value)}
                                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#001f3f] transition-all font-medium"
                                    placeholder="Contoh: 19901234"
                                    autoComplete="username"
                                />
                                <InputError message={errors.login} className="mt-2 text-sm font-medium text-red-500" />
                                <InputError message={errors.email} className="mt-2 text-sm font-medium text-red-500" />
                                <InputError message={errors.nip} className="mt-2 text-sm font-medium text-red-500" />
                            </div>

                            {/* Input Password */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label htmlFor="password" class="block text-sm font-bold text-[#001f3f]">Password</label>
                                    {canResetPassword && (
                                        <Link href={route("password.request")} className="text-sm font-bold text-[#c5a059] hover:underline">
                                            Lupa Password?
                                        </Link>
                                    )}
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData("password", e.target.value)}
                                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#001f3f] transition-all font-medium"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                />
                                <InputError message={errors.password} className="mt-2 text-sm font-medium text-red-500" />
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData("remember", e.target.checked)}
                                    className="w-5 h-5 border-slate-300 rounded text-[#001f3f] focus:ring-[#001f3f]"
                                />
                                <label htmlFor="remember" className="ml-3 text-sm font-semibold text-slate-600">Ingat perangkat ini</label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className={`w-full bg-[#001f3f] text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-900/20 hover:bg-[#003366] active:scale-[0.98] transition-all ${processing ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {processing ? 'Memproses...' : 'Masuk ke Dashboard'}
                            </button>
                        </form>

                        <div className="mt-12 text-center">
                            <p className="text-sm font-medium text-slate-400">
                                Copyright @ 2026 Bank XYZ
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
