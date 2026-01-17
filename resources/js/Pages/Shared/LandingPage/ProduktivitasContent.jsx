import Chart from "react-apexcharts";
import {
    HiTrendingUp,
    HiUserGroup,
    HiLightningBolt,
    HiChartBar,
    HiOutlinePresentationChartBar,
    HiOutlineOfficeBuilding
} from "react-icons/hi";

export default function ProduktivitasContent({ productivityData }) {

    // Fallback Data biar gak error
    const kpi = productivityData?.kpi || { total_volume: 0, active_ratio: '0%', growth_rate: '0%', satisfaction: '0' };
    const units = productivityData?.top_units || [];

    // --- 1. CONFIG CHART: AREA TREND (Grafik Utama) ---
    const areaOptions = {
        chart: {
            type: 'area',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            toolbar: { show: false },
            zoom: { enabled: false }
        },
        colors: ['#c5a059'], // Gold Theme
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.1,
                stops: [0, 90, 100]
            }
        },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 3 },
        xaxis: {
            categories: productivityData?.trend_labels || [],
            labels: { style: { colors: '#94a3b8', fontSize: '12px' } },
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        yaxis: { show: false },
        grid: { show: true, borderColor: '#f1f5f9', strokeDashArray: 4 },
        tooltip: { theme: 'light', y: { formatter: (val) => val + " Trx" } }
    };

    // --- 2. CONFIG CHART: RADAR KATEGORI ---
    const categoryLabels = productivityData?.category_dist?.map(c => c.kategori_produk) || [];
    const categoryValues = productivityData?.category_dist?.map(c => c.total) || [];

    const radarOptions = {
        chart: { type: 'radar', fontFamily: 'Plus Jakarta Sans, sans-serif', toolbar: { show: false } },
        labels: categoryLabels,
        colors: ['#001f3f'],
        stroke: { width: 2, colors: ['#001f3f'] },
        fill: { opacity: 0.2 },
        markers: { size: 4, colors: ['#c5a059'], strokeWidth: 0 },
        yaxis: { show: false },
        xaxis: {
            labels: {
                style: {
                    colors: ['#64748b', '#64748b', '#64748b', '#64748b', '#64748b'],
                    fontSize: '11px',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontWeight: 600
                }
            }
        }
    };

    return (
        <section className="px-8 py-32 bg-white border-t border-slate-200">
            <div className="mx-auto space-y-16 max-w-7xl">

                {/* --- HEADER --- */}
                <div className="text-center">
                    <span className="px-4 py-2 text-xs font-bold tracking-widest text-blue-600 uppercase border border-blue-100 rounded-full bg-blue-50">
                        Performance Analytics
                    </span>
                    <h2 className="text-4xl font-black text-[#001f3f] mt-6">
                        Pusat Data Produktivitas
                    </h2>
                    <p className="max-w-2xl mx-auto mt-4 text-lg leading-relaxed text-slate-500">
                        Menyajikan metrik pertumbuhan bisnis secara komprehensif. Kami mengutamakan budaya kerja berbasis data untuk hasil yang presisi.
                    </p>
                </div>

                {/* --- SECTION 1: KPI CARDS (4 Grid) --- */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {/* Card 1 */}
                    <div className="p-6 transition-all border bg-slate-50 rounded-2xl border-slate-100 hover:shadow-md group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 transition-transform bg-white shadow-sm rounded-xl group-hover:scale-110">
                                <HiLightningBolt className="w-6 h-6 text-[#c5a059]" />
                            </div>
                            <span className="px-2 py-1 text-xs font-bold text-green-600 bg-green-100 rounded-lg">High</span>
                        </div>
                        <h4 className="text-3xl font-black text-[#001f3f]">{kpi.total_volume}</h4>
                        <p className="mt-1 text-sm font-medium text-slate-500">Total Volume Transaksi</p>
                    </div>

                    {/* Card 2 */}
                    <div className="p-6 transition-all border bg-slate-50 rounded-2xl border-slate-100 hover:shadow-md group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 transition-transform bg-white shadow-sm rounded-xl group-hover:scale-110">
                                <HiUserGroup className="w-6 h-6 text-blue-600" />
                            </div>
                            <span className="px-2 py-1 text-xs font-bold text-blue-600 bg-blue-100 rounded-lg">Stable</span>
                        </div>
                        <h4 className="text-3xl font-black text-[#001f3f]">{kpi.active_ratio}</h4>
                        <p className="mt-1 text-sm font-medium text-slate-500">Rasio Pegawai Aktif</p>
                    </div>

                    {/* Card 3 */}
                    <div className="p-6 transition-all border bg-slate-50 rounded-2xl border-slate-100 hover:shadow-md group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 transition-transform bg-white shadow-sm rounded-xl group-hover:scale-110">
                                <HiTrendingUp className="w-6 h-6 text-green-600" />
                            </div>
                            <span className="px-2 py-1 text-xs font-bold text-green-600 bg-green-100 rounded-lg">MoM</span>
                        </div>
                        <h4 className="text-3xl font-black text-[#001f3f]">{kpi.growth_rate}</h4>
                        <p className="mt-1 text-sm font-medium text-slate-500">Pertumbuhan Bulanan</p>
                    </div>

                    {/* Card 4 */}
                    <div className="p-6 transition-all border bg-slate-50 rounded-2xl border-slate-100 hover:shadow-md group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 transition-transform bg-white shadow-sm rounded-xl group-hover:scale-110">
                                <HiChartBar className="w-6 h-6 text-purple-600" />
                            </div>
                            <span className="px-2 py-1 text-xs font-bold text-purple-600 bg-purple-100 rounded-lg">Score</span>
                        </div>
                        <h4 className="text-3xl font-black text-[#001f3f]">{kpi.satisfaction}</h4>
                        <p className="mt-1 text-sm font-medium text-slate-500">Indeks Kualitas Data</p>
                    </div>
                </div>

                {/* --- SECTION 2: BIG CHART (PRODUCTIVITY VELOCITY) --- */}
                <div className="bg-white rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
                    <div className="flex flex-col items-center justify-between gap-4 p-8 border-b border-slate-100 md:flex-row">
                        <div>
                            <h3 className="text-xl font-bold text-[#001f3f] flex items-center gap-2">
                                <HiOutlinePresentationChartBar className="w-6 h-6 text-[#c5a059]" />
                                Tren Produktivitas Nasional
                            </h3>
                            <p className="mt-1 text-sm text-slate-400">Grafik pergerakan volume akuisisi selama 6 bulan terakhir.</p>
                        </div>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 text-xs font-bold rounded-lg bg-slate-100 text-slate-600">Volume</span>
                            <span className="px-3 py-1 text-xs font-bold bg-white border rounded-lg border-slate-200 text-slate-400">Efisiensi</span>
                        </div>
                    </div>
                    <div className="p-4 h-[350px]">
                        <Chart options={areaOptions} series={[{ name: 'Total Akuisisi', data: productivityData?.trend_values || [] }]} type="area" height="100%" />
                    </div>
                </div>

                {/* --- SECTION 3: SPLIT VIEW (LEADERBOARD & RADAR) --- */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

                    {/* COL LEFT: UNIT LEADERBOARD (Kompetisi) */}
                    <div className="bg-gradient-to-br from-[#001f3f] to-[#003366] rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 -mt-16 -mr-16 bg-white rounded-full pointer-events-none opacity-5 blur-3xl"></div>

                        <div className="relative z-10">
                            <h3 className="flex items-center gap-2 mb-2 text-xl font-bold">
                                <HiOutlineOfficeBuilding className="text-[#c5a059]" />
                                Top Performing Units
                            </h3>
                            <p className="mb-8 text-sm text-blue-200">Unit kerja dengan skor produktivitas tertinggi bulan ini.</p>

                            <div className="space-y-6">
                                {units.map((unit, idx) => (
                                    <div key={idx}>
                                        <div className="flex justify-between mb-2 text-sm font-bold">
                                            <span>{idx + 1}. {unit.name}</span>
                                            <span className="text-[#c5a059]">{unit.score} Pts</span>
                                        </div>
                                        <div className="w-full h-2 rounded-full bg-blue-900/50">
                                            <div
                                                className="bg-gradient-to-r from-[#c5a059] to-yellow-300 h-2 rounded-full shadow-[0_0_10px_rgba(197,160,89,0.5)]"
                                                style={{ width: `${Math.max(10, (unit.score / (units[0]?.score || 1)) * 100)}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-[10px] text-blue-300 mt-1 text-right">{unit.staff_count} Pegawai Aktif</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* COL RIGHT: FOKUS KATEGORI (Radar Chart) */}
                    <div className="bg-white rounded-[32px] border border-slate-200 shadow-lg p-8 flex flex-col items-center justify-center relative">
                        <div className="mb-4 text-center">
                            <h3 className="text-xl font-bold text-[#001f3f]">Fokus Produk</h3>
                            <p className="text-sm text-slate-400">Distribusi kategori produk yang paling diminati.</p>
                        </div>

                        <div className="w-full max-w-sm h-[300px]">
                            <Chart options={radarOptions} series={[{ name: 'Volume', data: categoryValues }]} type="radar" height="100%" />
                        </div>

                        <div className="absolute left-0 w-full text-center bottom-6">
                            <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                Market Insights
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
