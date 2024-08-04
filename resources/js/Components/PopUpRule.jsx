import React from "react";
import { useState } from "react";
import img1 from "@/../assets/rule_test.svg";
import { HashLink as Link } from 'react-router-hash-link';

export default function Modal({ openModal, setOpenModal, }) {
    const [input, setInput] = useState("");
    const [emailSend, setEmailSend] = useState(false);

    const sendEmail = () => {
        setEmailSend(true);
        setTimeout(() => {
            setOpenModal(false);
        }, 2000);
    };
    return (
        <>
            {!emailSend && (
                <div className="bg-white absolute z-50 rounded-2xl ">
                    <div className="modal-container overflow-scroll">
                        <h3 className="text-primary text-3xl text-center mx-auto mt-3 ">Tata Tertib Ujian </h3>
                        <img className="w-48 h-36 mx-auto " src={img1} />
                        <div>
                            <div className="modal-text whitespace-pre-wrap ">

                                <strong>Persiapan Peserta: </strong>
                                <br />
                                1. Pastikan perangkat dan koneksi internet stabil.
                                Pilih lingkungan tenang dan bebas gangguan.
                                Peralatan yang Diizinkan:
                                <br />
                                2. Gunakan hanya peralatan yang diizinkan.
                                Waktu dan Pengumpulan:

                                <br />
                                3. Mulai dan selesaikan ujian sesuai waktu yang ditentukan.
                                Submit jawaban sebelum batas waktu berakhir.
                                Kerja Independen:

                                <br />
                                4. Kerjakan ujian secara independen, hindari plagiat.
                                Konsultasi:

                                <br />
                                5. Hubungi pihak berwenang untuk pertanyaan atau bantuan.

                                <br />

                                <p className="mt-3 mb-2 font-bold"> Aturan Pelanggaran : </p>

                                1. Teknis dan Etika:
                                <span className="indent-3">
                                    <li> Laporkan masalah teknis </li>
                                    <li>Pelanggaran etika berakibat diskualifikasi.</li>
                                </span>

                                2. Pelanggaran Tata Tertib:
                                <li className="indent-3">
                                    Pelanggaran aturan dapat mengakibatkan pembatalan ujian.
                                </li>
                                3. Penipuan dan Gangguan:
                                <li className="indent-3">
                                    Tindakan penipuan atau gangguan berhadapan dengan sanksi serius.
                                </li>
                                4. Penggunaan Materi Tidak Diizinkan:

                                <li>Gunakan hanya materi yang diizinkan untuk mengerjakan ujian.
                                </li>
                            </div>
                        </div>

                        {/* <Link to="/home#subject"> */}
                        <button
                            className="large-primary-button font-bold text-lg"
                            to
                            onClick={() => {
                                setOpenModal(false);

                            }}
                        >
                            Saya Mengerti
                        </button>
                        {/* </Link> */}
                    </div>
                </div>
            )}
            {emailSend && (
                <div className="modal-container-sent">
                    {/* <img className="modal-image" src={img2} /> */}
                    <div className="modal-text">Email sent!</div>
                </div>
            )}
        </>
    );
};
