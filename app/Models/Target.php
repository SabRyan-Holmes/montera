<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Target extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'nilai_target' => 'integer',
    ];
    protected $appends = ['nominal_formatted'];
    public function pegawai(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function divisi()
    {
        // Pastikan model Divisi sudah ada
        return $this->belongsTo(Divisi::class, 'divisi_id');
    }

    public function supervisor()
    {
        // Pastikan model Divisi sudah ada
        return $this->belongsTo(User::class, 'supervisor_id');
    }

    public function isDivisiTarget()
    {
        return !is_null($this->divisi_id);
    }

    public function produk(): BelongsTo
    {
        return $this->belongsTo(Produk::class, 'produk_id');
    }

    protected function nominalFormatted(): Attribute
    {
        return Attribute::make(
            get: function () {
                // Jika tipe target adalah NOA (Jumlah)
                if ($this->tipe_target === 'noa') {
                    // Coba ambil satuan dari relasi produk, kalau ga ada default ke 'Unit'
                    $satuan = $this->produk->satuan ?? 'Unit';

                    // Contoh Output: "15 Merchant", "20 Debitur", "100 User"
                    return number_format($this->nilai_target, 0, ',', '.') . ' ' . $satuan;
                }

                // Jika Nominal (Rupiah)
                return 'Rp ' . number_format($this->nilai_target, 0, ',', '.');
            }
        );
    }

    protected function totalTeamNominalFormatted(): Attribute
    {
        return Attribute::make(
            get: function () {
                if (!isset($this->total_team_nominal)) return null;

                return 'Rp ' . number_format($this->total_team_nominal, 0, ',', '.');
            }
        );
    }

    public function scopeByPegawai($query, $user)
    {
        return $query->where('user_id', $user->id);
    }

    public function scopeBySupervisor($query, $user)
    {
        return $query->where('supervisor_id', $user->id);
    }

    public function scopeToDivision($query, $user)
    {
        return $query->where('divisi_id', $user->divisi_id);
    }

    public function scopeFilter($query, array $filters): void
    {
        $query->when(
            $filters['search'] ?? false,
            fn($q, $search) =>
            $q->where(
                fn($sub) =>
                $sub->whereHas('pegawai', fn($k) => $k->where('name', 'like', "%$search%"))
                    ->orWhereHas('produk', fn($k) => $k->where('nama_produk', 'like', "%$search%"))
            )
        );

        // 3. Filter Tipe Target (Sasaran: Pegawai atau Divisi)
        $query->when($filters['byTipeTarget'] ?? false, function ($q, $sasaran) {
            if ($sasaran === 'pegawai') {
                // Target Pegawai = user_id ada isinya
                $q->whereNotNull('user_id');
            } elseif ($sasaran === 'divisi') {
                // Target Divisi = divisi_id ada isinya DAN user_id kosong (Target Tim)
                $q->whereNotNull('divisi_id')->whereNull('user_id');
            }
        });

        $query->when($filters['byTipeSatuan'] ?? false, fn($q, $t) => $q->where('tipe_target', $t));

        // Gabungkan filter periode & tahun di sini agar controller tidak perlu manual where lagi
        $query->when($filters['byPeriode'] ?? false, fn($q, $p) => $q->where('periode', $p));
        $query->when($filters['periode'] ?? false, fn($q, $p) => $q->where('periode', $p));
        $query->when($filters['tahun'] ?? false, fn($q, $y) => $q->where('tahun', $y));
    }



    // public function scopeTargetInDivision(Builder $query, $user)
    // {
    //     return $query->with([
    //             'pegawai:id,name,nip',
    //             'produk:id,nama_produk,kategori_produk,satuan'
    //         ])->whereHas('pegawai', function ($q) use ($user) {
    //             $q->where('divisi_id', $user->divisi_id);
    //         });
    // }
}
