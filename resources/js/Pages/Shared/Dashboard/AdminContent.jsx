import {
    HiOutlineBuildingLibrary,
    HiOutlineUsers,
    HiOutlineDocumentText,
    HiOutlineBriefcase,
    HiOutlineCube,
    HiOutlineChartBar
} from "react-icons/hi2";
import { AkuisisiGraph } from "@/Components"; // Pastikan path benar
import UserDivisiGraph from "@/Components/Chart/UserDivisiGraph"; // Pastikan path benar

export default function AdminContent({ dataByRole }) {
    const { masterData, operationalData, akuisisiGraph, userDivisiGraph, recentActivities } = dataByRole;

    return (
        <main className="w-full px-6 py-8 mx-auto space-y-8">

            {/* BAGIAN 1: OPERATIONAL HIGHLIGHTS (Data yang bergerak cepat) */}
            <div>
                <h2 className="mb-4 text-lg font-bold text-gray-700">Aktivitas Operasional</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Card Akuisisi */}
                    <div className="relative p-6 overflow-hidden bg-white border border-l-4 border-blue-500 shadow-sm rounded-xl">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Total Akuisisi</p>
                                <h3 className="text-3xl font-black text-gray-800">{operationalData.total_akuisisi}</h3>
                            </div>
                            <div className="p-3 rounded-lg bg-blue-50">
                                <HiOutlineDocumentText className="w-8 h-8 text-blue-500" />
                            </div>
                        </div>
                    </div>

                    {/* Card Transaksi (Verified) */}
                    <div className="relative p-6 overflow-hidden bg-white border border-l-4 border-green-500 shadow-sm rounded-xl">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Transaksi Sah</p>
                                <h3 className="text-3xl font-black text-gray-800">{operationalData.total_transaksi}</h3>
                            </div>
                            <div className="p-3 rounded-lg bg-green-50">
                                <HiOutlineChartBar className="w-8 h-8 text-green-500" />
                            </div>
                        </div>
                    </div>

                    {/* Card Target Active */}
                    <div className="relative p-6 overflow-hidden bg-white border border-l-4 border-purple-500 shadow-sm rounded-xl">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Target Aktif</p>
                                <h3 className="text-3xl font-black text-gray-800">{operationalData.total_target}</h3>
                            </div>
                            <div className="p-3 rounded-lg bg-purple-50">
                                <HiOutlineCube className="w-8 h-8 text-purple-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* BAGIAN 2: MASTER DATA SUMMARY (Data Statis/Referensi) */}
            <div>
                <h2 className="mb-4 text-lg font-bold text-gray-700">Data Master & Referensi</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                    {/* Mini Card 1: User */}
                    <div className="flex items-center p-4 bg-white border rounded-lg shadow-sm">
                        <div className="p-2 mr-3 text-indigo-600 rounded-full bg-indigo-50">
                            <HiOutlineUsers className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xl font-bold text-gray-800">{masterData.user}</p>
                            <p className="text-xs text-gray-500">Users</p>
                        </div>
                    </div>

                    {/* Mini Card 2: Produk */}
                    <div className="flex items-center p-4 bg-white border rounded-lg shadow-sm">
                        <div className="p-2 mr-3 text-orange-600 rounded-full bg-orange-50">
                            <HiOutlineBuildingLibrary className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xl font-bold text-gray-800">{masterData.produk}</p>
                            <p className="text-xs text-gray-500">Produk</p>
                        </div>
                    </div>

                    {/* Mini Card 3: Divisi */}
                    <div className="flex items-center p-4 bg-white border rounded-lg shadow-sm">
                        <div className="p-2 mr-3 text-pink-600 rounded-full bg-pink-50">
                            <HiOutlineBriefcase className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xl font-bold text-gray-800">{masterData.divisi}</p>
                            <p className="text-xs text-gray-500">Divisi</p>
                        </div>
                    </div>

                    {/* Mini Card 4: Jabatan */}
                    <div className="flex items-center p-4 bg-white border rounded-lg shadow-sm">
                        <div className="p-2 mr-3 text-teal-600 rounded-full bg-teal-50">
                            <HiOutlineUsers className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xl font-bold text-gray-800">{masterData.jabatan}</p>
                            <p className="text-xs text-gray-500">Jabatan</p>
                        </div>
                    </div>

                    {/* Mini Card 5: Indikator */}
                    <div className="flex items-center p-4 bg-white border rounded-lg shadow-sm">
                        <div className="p-2 mr-3 text-yellow-600 rounded-full bg-yellow-50">
                            <HiOutlineChartBar className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xl font-bold text-gray-800">{masterData.indikator}</p>
                            <p className="text-xs text-gray-500">Indikator</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* BAGIAN 3: ANALYTICS CHARTS */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Grafik Status Akuisisi (Pie/Donut) */}
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                    <AkuisisiGraph data={akuisisiGraph} title="Rasio Status Verifikasi" />
                </div>

                {/* Grafik Sebaran Divisi (Bar) */}
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                    <div className="h-[300px]">
                        <UserDivisiGraph data={userDivisiGraph} />
                    </div>
                </div>
            </div>

            {/* BAGIAN 4: RECENT ACTIVITIES TABLE (Opsional tapi berguna) */}
            <div className="p-6 bg-white border shadow-sm rounded-xl">
                <h3 className="mb-4 text-lg font-bold text-gray-800">Aktivitas Terbaru Sistem</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">Waktu</th>
                                <th className="px-6 py-3">Pegawai</th>
                                <th className="px-6 py-3">Aktivitas</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentActivities && recentActivities.length > 0 ? (
                                recentActivities.map((log) => (
                                    <tr key={log.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4">{log.time}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{log.user}</td>
                                        <td className="px-6 py-4">Input Akuisisi: {log.produk}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                                                log.status === 'verified' ? 'bg-green-100 text-green-700' :
                                                log.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-red-100 text-red-700'
                                            }`}>
                                                {log.status.toUpperCase()}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center text-gray-400">Belum ada aktivitas.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </main>
    );
}
