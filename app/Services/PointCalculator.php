<?php
namespace App\Services;
use Illuminate\Support\Facades\Log;
class PointCalculator
{
    /**
     * Hitung Poin menggunakan Logic dari File External
     */
    public static function calculate($pegawai, $produk)
    {
        $path = storage_path('app/rumus-poin.php');
        if (file_exists($path)) {
            try {
                $calculator = include $path;
                if (is_callable($calculator)) {
                    return $calculator($pegawai, $produk);
                }
            } catch (\Exception $e) {
                Log::error("Error pada file rumus-poin.php: " . $e->getMessage());
            }
        }
        $namaDivisi = strtolower($pegawai->divisi->nama_divisi ?? '');
        $isKredit = str_contains($namaDivisi, 'kredit');
        if ($isKredit) {
            return $produk->bobot_kredit ;
        } else {
            return $produk->bobot_frontliner;
        }
    }
}
