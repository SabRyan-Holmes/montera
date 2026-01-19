import Authenticated from "@/Layouts/AuthenticatedLayout";
import { FilterSearchCustom, Pagination } from "@/Components";
import moment from "moment/min/moment-with-locales";
import ShowModal from "./Show";
export default function Index({
    auth,
    targets,
    title,
    isPegawai,
    subTitle,
    filtersReq,
    filtersList,
}) {
    moment.locale("id");
    return (
        <Authenticated user={auth.user} title={"Daftar" + title}>
            {}
            <div className="w-full pb-10 mx-auto phone:h-screen laptop:h-full laptop:px-7 max-w-screen-desktop ">
                <section className="flex items-end justify-between gap-4">
                    <div className="flex-1">
                        <FilterSearchCustom
                            routeName={`/pegawai/target`}
                            initialFilters={{
                                byTipeSatuan: filtersReq.tipe,
                                byStatus: filtersReq.status,
                            }}
                            filtersConfig={[
                                {
                                    name: "byTipeSatuan",
                                    label: "Tipe Target ",
                                    options: filtersList.tipe_target,
                                },
                                {
                                    name: "byPeriode",
                                    label: "Periode ",
                                    options: filtersList.periode,
                                },
                            ]}
                            searchConfig={{
                                name: "search",
                                label: "Nama Produk",
                                placeholder: "Ketik Nama Produk..",
                                initialValue: filtersReq.search,
                            }}
                        />
                    </div>
                </section>

                <section className="pt-3 overflow-no-scroll">
                    {subTitle && (
                        <div className="my-4">
                            <strong className="text-2xl font-bold text-gray-600">
                                {subTitle}
                            </strong>
                        </div>
                    )}

                    {targets.data.length > 0 ? (
                        <>
                            <div className="w-full mb-4 overflow-x-auto bg-white border border-gray-200 shadow-sm rounded-xl">
                                <table className="table text-xs text-center min-w-max table-bordered">
                                    <thead className="text-sm font-medium text-white bg-primary">
                                        <tr className="text-center">
                                            <th
                                                scope="col"
                                                width="5%"
                                                className="py-3"
                                            >
                                                No
                                            </th>
                                            <th scope="col" className="py-3">
                                                Nama Produk
                                            </th>
                                            <th scope="col" className="py-3">
                                                Kategori
                                            </th>
                                            <th scope="col" className="py-3">
                                                Satuan
                                            </th>
                                            <th scope="col" className="py-3">
                                                Nilai Target
                                            </th>
                                            <th scope="col" className="py-3">
                                                Tipe Target
                                            </th>
                                            <th scope="col" className="py-3">
                                                Periode
                                            </th>
                                            <th scope="col" className="py-3">
                                                Tahun
                                            </th>
                                            <th scope="col" className="py-3">
                                                Tanggal Mulai
                                            </th>
                                            <th scope="col" className="py-3">
                                                Tanggal Selesai
                                            </th>
                                            <th scope="col" className="py-3">
                                                Deadline Pencapaian
                                            </th>
                                        </tr>
                                    </thead>

                                    {}
                                    <tbody>
                                        {targets.data?.map((target, i) => (
                                            <tr
                                                key={target.id}
                                                onClick={() => {
                                                    document
                                                        .getElementById(
                                                            `Show-${target.id}`,
                                                        )
                                                        .showModal();
                                                }}
                                                className="border-b border-gray-100 hover:bg-secondary/10 hover:cursor-pointer"
                                            >
                                                <td className="py-3 text-center">
                                                    <ShowModal
                                                        isPegawai = {isPegawai}
                                                        target={target}
                                                    />
                                                    {i +
                                                        1 +
                                                        (targets.meta?.from ||
                                                            1) -
                                                        1}
                                                </td>
                                                <td className="relative px-2 py-3 text-left group ">
                                                    <span className="block font-semibold">
                                                        {target.produk
                                                            ?.nama_produk ??
                                                            "-"}
                                                    </span>
                                                    <span className="badge-xs-accent">
                                                        {
                                                            target.produk
                                                                ?.kode_produk
                                                        }
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="block mb-1">
                                                        {
                                                            target.produk
                                                                ?.kategori_produk
                                                        }
                                                    </span>
                                                </td>
                                                <td>{target.produk?.satuan}</td>
                                                <td className="py-3">
                                                    <span className="block font-medium">
                                                        {target.nilai_target}
                                                    </span>
                                                </td>
                                                <td className="py-3">
                                                    <span className="block capitalize">
                                                        {target.tipe_target}
                                                    </span>
                                                </td>
                                                <td className="py-3">
                                                    <span className="block capitalize">
                                                        {target.periode}
                                                    </span>
                                                </td>
                                                <td className="py-3">
                                                    <span className="block">
                                                        {target.tahun}
                                                    </span>
                                                </td>
                                                <td className="py-3 whitespace-nowrap">
                                                    <span className="block">
                                                        {moment(
                                                            target.tanggal_mulai,
                                                        ).format("LL")}
                                                    </span>
                                                </td>
                                                <td className="py-3 whitespace-nowrap">
                                                    <span className="block">
                                                        {moment(
                                                            target.tanggal_selesai,
                                                        ).format("LL")}
                                                    </span>
                                                </td>
                                                <td className="py-3 whitespace-nowrap">
                                                    <span className="block font-medium text-red-500">
                                                        {moment(
                                                            target.deadline_pencapaian,
                                                        ).format("LL")}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination
                                datas={targets}
                                urlRoute={`/pegawai/target`}
                                filters={{
                                    search: filtersReq.search,
                                    byTipeSatuan: filtersReq.tipe_target,
                                    byPeriode: filtersReq.periode,
                                }}
                            />
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-96">
                            <h2 className="text-2xl font-bold text-gray-600">
                                {!subTitle
                                    ? "Belum Ada Data Target Terbaru Untuk Saat Ini"
                                    : "Tidak Ditemukan"}
                            </h2>
                        </div>
                    )}
                </section>
            </div>
        </Authenticated>
    );
}
