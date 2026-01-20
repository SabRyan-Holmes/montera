import { Link, Head } from "@inertiajs/react";
export default function GuestLayout({
    children,
    title,
    auth,
    activeTab,
    setActiveTab,
}) {
    return (
        <>
            <Head title={title} />

            <link
                href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
                rel="stylesheet"
            />

            <style>{`
                body { font-family: 'Plus Jakarta Sans', sans-serif; background: #fafbff; }
                .glass { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.3); }
                .text-gradient { background: linear-gradient(135deg, #001f3f 0%, #004d99 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .bento-card { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
                .bento-card:hover { transform: translateY(-8px); box-shadow: 0 25px 50px -12px rgba(0, 31, 63, 0.15); }
                .blob { position: absolute; width: 500px; height: 500px; background: linear-gradient(135deg, rgba(197, 160, 89, 0.15) 0%, rgba(0, 31, 63, 0.1) 100%); filter: blur(80px); border-radius: 50%; z-index: -1; }
            `}</style>

            <div className="relative flex flex-col min-h-screen overflow-x-hidden">
                <div className="blob -top-20 -right-20"></div>
                <div className="blob top-1/2 -left-20"></div>

                <nav className="fixed top-0 z-50 w-full px-8 py-4">
                    <div className="flex items-center justify-between px-8 py-3 mx-auto shadow-sm max-w-7xl glass rounded-2xl">
                        <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => setActiveTab("dashboard")}
                        >
                            <div className="w-10 h-10 bg-[#001f3f] rounded-xl flex items-center justify-center">
                                <span className="text-[#c5a059] font-black text-xl">
                                    X
                                </span>
                            </div>
                            <span className="text-xl font-extrabold tracking-tight text-[#001f3f]">
                                Bank <span className="text-[#c5a059]">XYZ</span>
                            </span>
                        </div>

                        <div className="items-center hidden gap-10 md:flex">
                            <button
                                onClick={() => setActiveTab("dashboard")}
                                className={`text-sm font-bold transition-all ${activeTab === "dashboard" ? "text-[#c5a059]" : "text-[#001f3f] hover:text-[#c5a059]"}`}
                            >
                                Dashboard
                            </button>
                            <button
                                onClick={() => setActiveTab("produktivitas")}
                                className={`text-sm font-semibold transition-all ${activeTab === "produktivitas" ? "text-[#c5a059] font-bold" : "text-slate-500 hover:text-[#001f3f]"}`}
                            >
                                Produktivitas
                            </button>
                            <button
                                onClick={() => setActiveTab("laporan")}
                                className={`text-sm font-semibold transition-all ${activeTab === "laporan" ? "text-[#c5a059] font-bold" : "text-slate-500 hover:text-[#001f3f]"}`}
                            >
                                Laporan
                            </button>
                        </div>

                        <div className="flex items-center gap-4">
                            {auth?.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="bg-[#001f3f] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-blue-900/20 transition-all active:scale-95"
                                >
                                    My Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={route("login")}
                                    className="bg-[#001f3f] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-blue-900/20 transition-all active:scale-95"
                                >
                                    Login Portal
                                </Link>
                            )}
                        </div>
                    </div>
                </nav>

                <main className="flex-grow">{children}</main>

                <footer className="px-8 py-16 mt-auto bg-white border-t border-slate-100">
                    <div className="flex flex-col items-center justify-between gap-8 mx-auto max-w-7xl md:flex-row">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#001f3f] rounded-lg flex items-center justify-center">
                                <span className="text-[#c5a059] font-black text-sm">
                                    X
                                </span>
                            </div>
                            <span className="text-lg font-bold text-[#001f3f]">
                                Bank XYZ
                            </span>
                        </div>
                        <p className="text-sm font-medium text-slate-400">
                            © 2026 PT. Bank XYZ (Persero) Tbk. All Rights
                            Reserved.
                        </p>
                        <div className="flex gap-6">
                            <div className="flex items-center justify-center w-10 h-10 transition-all rounded-full cursor-pointer bg-slate-50 hover:bg-blue-50">
                                <span className="text-xs font-bold text-[#001f3f]">
                                    LN
                                </span>
                            </div>
                            <div className="flex items-center justify-center w-10 h-10 transition-all rounded-full cursor-pointer bg-slate-50 hover:bg-blue-50">
                                <span className="text-xs font-bold text-[#001f3f]">
                                    TW
                                </span>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
