import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Modal from "@/Components/Modal"; // Pastikan path ini sesuai dengan project Breeze kamu
import axios from "axios";
import {
    HiOutlineUserGroup,
    HiOutlineCurrencyDollar,
    HiOutlineChartBar,
    HiTrophy,
    HiEye,
    HiXMark
} from "react-icons/hi2";

export default function Team({ title, auth, teamMembers, teamStats }) {
    // --- STATE MANAGEMENT ---
    const [selectedPegawai, setSelectedPegawai] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // --- HELPER FUNCTIONS ---
    const formatRupiah = (val) => new Intl.NumberFormat("id-ID", {
        style: "currency", currency: "IDR", maximumFractionDigits: 0
    }).format(val);

    // --- EVENT HANDLERS ---
    const openDetail = async (member) => {
        // 1. Set data dasar pegawai & Buka Modal
        setSelectedPegawai(member);
        setTransactions([]); // Kosongkan data lama agar tidak flickering
        setIsModalOpen(true);
        setIsLoading(true);

        try {
            // 2. Request data transaksi ke Backend (Lazy Loading)
            // Pastikan route 'spv.team.transactions' sudah ada di web.php
            const response = await axios.get(route('spv.team.transactions', member.id));
            setTransactions(response.data);
        } catch (error) {
            console.error("Gagal mengambil data transaksi:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPegawai(null);
    };

    return (
        <AuthenticatedLayout user={auth.user} title={title}>
            <main className="w-full px-6 py-6 mx-auto">

                {/* === BAGIAN 1: STATISTIK HEADER === */}
                <div className="mb-8">
                    <h2 className="mb-4 text-2xl font-bold text-secondary">
                        Overview Divisi {auth.user.divisi?.nama_divisi || 'Tim'}
                    </h2>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {/* Card 1: Total Realisasi Tim */}
                        <div className="flex items-center p-6 bg-white border-l-4 shadow-sm border-primary rounded-xl">
                            <div className="p-3 mr-4 rounded-full bg-primary/10">
                                <HiOutlineCurrencyDollar className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                                    Total Realisasi Tim
                                </p>
                                <p className="text-xl font-black text-secondary">
                                    {formatRupiah(teamStats.total_realisasi_tim)}
                                </p>
                                <p className="text-xs text-gray-500">
                                    dari target {formatRupiah(teamStats.total_target_tim)}
                                </p>
                            </div>
                        </div>

                        {/* Card 2: Rata-rata Performa */}
                        <div className="flex items-center p-6 bg-white border-l-4 shadow-sm border-success rounded-xl">
                            <div className="p-3 mr-4 rounded-full bg-success/10">
                                <HiOutlineChartBar className="w-8 h-8 text-success" />
                            </div>
                            <div>
                                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                                    Rata-rata Capaian
                                </p>
                                <p className="text-xl font-black text-secondary">
                                    {Math.round(teamStats.rata_rata_capaian)}%
                                </p>
                                <div className="w-full h-2 mt-1 bg-gray-200 rounded-full">
                                    <div
                                        className="h-2 rounded-full bg-success"
                                        style={{ width: `${Math.min(teamStats.rata_rata_capaian, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Jumlah Personil */}
                        <div className="flex items-center p-6 bg-white border-l-4 shadow-sm border-secondary rounded-xl">
                            <div className="p-3 mr-4 rounded-full bg-secondary/10">
                                <HiOutlineUserGroup className="w-8 h-8 text-secondary" />
                            </div>
                            <div>
                                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                                    Anggota Aktif
                                </p>
                                <p className="text-xl font-black text-secondary">
                                    {teamStats.total_member} <span className="text-sm font-normal">Pegawai</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* === BAGIAN 2: LEADERBOARD PEGAWAI (TABEL) === */}
                <section className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                        <h3 className="flex items-center gap-2 text-lg font-bold text-secondary">
                            <HiTrophy className="text-yellow-500" />
                            Leaderboard Kinerja Pegawai
                        </h3>
                        <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-blue-100 text-blue-800">
                            Update Real-time
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase border-b bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3">Peringkat</th>
                                    <th className="px-6 py-3">Nama Pegawai</th>
                                    <th className="px-6 py-3">Progres Target</th>
                                    <th className="px-6 py-3">Nominal Realisasi</th>
                                    <th className="px-6 py-3 text-center">Status</th>
                                    <th className="px-6 py-3 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teamMembers.length > 0 ? (
                                    teamMembers.map((member, index) => (
                                        <tr key={member.id} className="transition-colors bg-white border-b hover:bg-gray-50">
                                            {/* Kolom Peringkat */}
                                            <td className="px-6 py-4 font-medium">
                                                {index + 1 === 1 ? (
                                                    <span className="flex items-center justify-center w-8 h-8 font-bold text-yellow-700 bg-yellow-100 border border-yellow-300 rounded-full">1</span>
                                                ) : index + 1 === 2 ? (
                                                    <span className="flex items-center justify-center w-8 h-8 font-bold text-gray-700 bg-gray-200 border border-gray-300 rounded-full">2</span>
                                                ) : index + 1 === 3 ? (
                                                    <span className="flex items-center justify-center w-8 h-8 font-bold text-orange-800 bg-orange-100 border border-orange-300 rounded-full">3</span>
                                                ) : (
                                                    <span className="ml-2 font-semibold text-gray-500">#{index + 1}</span>
                                                )}
                                            </td>

                                            {/* Kolom Nama */}
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center justify-center w-8 h-8 text-xs font-bold text-white rounded-full bg-secondary">
                                                        {member.name.substring(0,2).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{member.name}</div>
                                                        <div className="text-xs text-gray-400">Pegawai Tetap</div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Kolom Progres Bar */}
                                            <td className="w-1/4 px-6 py-4">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-xs font-medium text-gray-700">{member.persentase}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                    <div
                                                        className={`h-2.5 rounded-full ${
                                                            member.status === 'Excellent' ? 'bg-success' :
                                                            member.status === 'Good' ? 'bg-info' : 'bg-warning'
                                                        }`}
                                                        style={{ width: `${Math.min(member.persentase, 100)}%` }}
                                                    ></div>
                                                </div>
                                            </td>

                                            {/* Kolom Nominal */}
                                            <td className="px-6 py-4 font-bold text-gray-700">
                                                {formatRupiah(member.total_realisasi)}
                                                <div className="text-xs font-normal text-gray-400">
                                                    Target: {formatRupiah(member.total_target)}
                                                </div>
                                            </td>

                                            {/* Kolom Status Badge */}
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                                    member.status === 'Excellent'
                                                        ? 'bg-green-100 text-green-700 border-green-200'
                                                        : member.status === 'Good'
                                                            ? 'bg-blue-100 text-blue-700 border-blue-200'
                                                            : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                                                }`}>
                                                    {member.status}
                                                </span>
                                            </td>

                                            {/* Kolom Aksi */}
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => openDetail(member)}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                                                >
                                                    <HiEye className="w-4 h-4" />
                                                    Detail
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-10 text-center text-gray-400">
                                            Belum ada data anggota tim.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>

            {/* === MODAL DETAIL PEGAWAI === */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="2xl">
                {selectedPegawai && (
                    <div className="p-6">
                        {/* Header Modal */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-900">
                                Rincian Performa: <span className="text-primary">{selectedPegawai.name}</span>
                            </h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                                <HiXMark className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Summary Cards dalam Modal */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                                <p className="text-xs font-bold text-gray-500 uppercase">Total Realisasi</p>
                                <p className="text-lg font-black text-secondary">{formatRupiah(selectedPegawai.total_realisasi)}</p>
                            </div>
                            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                                <p className="text-xs font-bold text-gray-500 uppercase">Capaian Target</p>
                                <p className={`text-lg font-black ${
                                    selectedPegawai.persentase >= 100 ? 'text-success' : 'text-warning'
                                }`}>
                                    {selectedPegawai.persentase}%
                                </p>
                            </div>
                        </div>

                        {/* Tabel Transaksi dalam Modal */}
                        <h3 className="mb-3 text-sm font-bold text-gray-700 uppercase">
                            10 Transaksi Terakhir (Verified)
                        </h3>
                        <div className="overflow-hidden border border-gray-200 rounded-lg min-h-[150px]">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-xs font-medium text-left text-gray-500 uppercase">Tanggal</th>
                                        <th className="px-4 py-2 text-xs font-medium text-left text-gray-500 uppercase">Nasabah</th>
                                        <th className="px-4 py-2 text-xs font-medium text-left text-gray-500 uppercase">Produk</th>
                                        <th className="px-4 py-2 text-xs font-medium text-right text-gray-500 uppercase">Nominal</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {isLoading ? (
                                        // STATE LOADING
                                        <tr>
                                            <td colSpan="4" className="px-4 py-10 text-center">
                                                <div className="flex flex-col items-center justify-center">
                                                    <svg className="w-8 h-8 text-primary animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    <span className="mt-2 text-xs text-gray-500">Mengambil data terbaru...</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : transactions.length > 0 ? (
                                        // STATE ADA DATA
                                        transactions.map((trx, idx) => (
                                            <tr key={idx}>
                                                <td className="px-4 py-2 text-sm text-gray-600">{trx.tanggal}</td>
                                                <td className="px-4 py-2 text-sm font-medium text-gray-800">{trx.nasabah}</td>
                                                <td className="px-4 py-2 text-sm text-gray-600">{trx.produk}</td>
                                                <td className="px-4 py-2 text-sm font-bold text-right text-gray-700">
                                                    {formatRupiah(trx.nominal)}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        // STATE KOSONG
                                        <tr>
                                            <td colSpan="4" className="px-4 py-6 text-sm italic text-center text-gray-400">
                                                Belum ada transaksi yang diverifikasi.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer Modal */}
                        <div className="flex justify-end mt-6">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </AuthenticatedLayout>
    );
}
