<?php

namespace App\Exports;

use App\Models\Pegawai; // Pastikan Anda mengimpor model yang benar
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithEvents;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Alignment;

class PegawaiExport implements FromCollection, WithHeadings, WithStyles
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return Pegawai::all(); // Ambil data dari model Pegawai
    }

    /**
     * @return array
     */
    public function headings(): array
    {
        return [
            'Nomor',
            'Nama',
            'NIP/NRP',
            'Nomor Seri Karpeg',
            'Pangkat/Golongan Ruangan/TMT',
            'Tempat/Tanggal Lahir',
            'Jenis Kelamin',
            'Pendidikan',
            'Jabatan/TMT',
            'Masa Kerja Golongan',
            'Unit Kerja',
            'Daerah',
        ];
    }

    /**
     * @param Worksheet $worksheet
     */
    public function styles(Worksheet $worksheet)
    {
        // Apply styles to the first row
        $worksheet->getStyle('1:1')->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setARGB('FFFF00'); // Yellow background
        $worksheet->getStyle('1:1')->getFont()->setBold(true);
        $worksheet->getStyle('1:1')->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN);

        // Apply border to all cells
        $worksheet->getStyle($worksheet->calculateWorksheetDimension())->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN);
    }
}
