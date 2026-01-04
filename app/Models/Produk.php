<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;

class Produk extends Model
{
    protected $guarded = ['id'];

    public function akuisisi(): HasMany
    {
        return $this->hasMany(Akuisisi::class, 'produk_id');
    }

    /**
     * Relasi ke Target (One to Many)
     */
    public function targets(): HasMany
    {
        return $this->hasMany(Target::class, 'produk_id');
    }

    public function indikators(): HasMany
    {
        return $this->hasMany(Indikator::class);
    }

    public function scopeFilter($query, array $filters): void
    {
        // 1. Search berdasarkan Nama Produk atau Kode Produk
        $query->when(
            $filters['search'] ?? false,
            fn($query, $search) =>
            $query->where(function ($q) use ($search) {
                $q->where('nama_produk', 'like', '%' . $search . '%')
                    ->orWhere('kode_produk', 'like', '%' . $search . '%');
            })
        );

        // 2. Filter Berdasarkan Kategori (Tabungan, Kredit, Asuransi)
        $query->when(
            $filters['byKategori'] ?? false,
            fn($query, $byKategori) =>
            $query->where('kategori', $byKategori)
        );

        // 3. Filter Berdasarkan Status Produk (Aktif/Non-aktif)
        $query->when(
            $filters['byStatus'] ?? false,
            fn($query, $byStatus) =>
            $query->where('status', $byStatus)
        );

        // 4. Filter Berdasarkan Range Harga/Komisi (Opsional untuk Analisis BI)
        $query->when(
            $filters['minPoin'] ?? false,
            fn($query, $minPoin) =>
            $query->where('komisi_poin', '>=', $minPoin)
        );
    }

    public static function getEnumValues($column)
    {
        // 1. Ambil nama tabel secara dinamis
        $instance = new static;
        $table = $instance->getTable();

        // 2. Jalankan query untuk melihat struktur kolom
        // Kita gunakan DB::select langsung dengan string untuk menghindari error PDO
        $results = DB::select("SHOW COLUMNS FROM {$table} WHERE Field = ?", [$column]);

        if (count($results) > 0) {
            $type = $results[0]->Type; // Contoh: enum('tabungan','kredit','asuransi')

            // 3. Ekstrak nilai di dalam kurung enum
            preg_match('/^enum\((.*)\)$/', $type, $matches);

            $enum = [];
            foreach (explode(',', $matches[1]) as $value) {
                $enum[] = trim($value, "'");
            }
            return $enum;
        }

        return [];
    }
}
