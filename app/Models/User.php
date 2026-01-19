<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Casts\Attribute;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'nip',
        'jabatan_id',
        'divisi_id',
        'status_aktif',
    ];
    protected $casts = ['jumlah' => 'array'];
    protected $with = ['jabatan', 'divisi:id,nama_divisi'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function jabatan(): BelongsTo
    {
        return $this->belongsTo(Jabatan::class, 'jabatan_id');
    }

    /**
     * User ini masuk di divisi mana?
     */
    public function divisi(): BelongsTo
    {
        return $this->belongsTo(Divisi::class, 'divisi_id');
    }

    /**
     * Daftar data akuisisi yang diinput oleh user ini
     */
    public function akuisisi(): HasMany
    {
        return $this->hasMany(Akuisisi::class, 'user_id');
    }

    // Relasi tambahan untuk mendukung Verifikasi & Target
    public function target()
    {
        return $this->hasOne(Target::class, 'user_id');
    }

    public function targets()
    {
        return $this->hasMany(Target::class, 'user_id');
    }

    public function transaksi()
    {
        return $this->hasMany(Transaksi::class);
    }


    public function verifikasiAkuisisi()
    {
        return $this->hasMany(Akuisisi::class, 'verifikator_id'); // Khusus aktor Supervisor
    }

    public function scopeRole($query, $namaRole)
    {
        return $query->whereHas('jabatan', function ($q) use ($namaRole) {
            $q->where('nama_jabatan', $namaRole);
        });
    }

    public function hasRole($namaRole)
    {
        return $this->jabatan && $this->jabatan->nama_jabatan === $namaRole;
    }

    public function scopeIsAdmin($query)
    {
        return $query->whereHas('jabatan', function ($q) {
            $q->where('nama_jabatan', 'Administrator');
        });
    }

    protected function isAdmin(): Attribute
    {
        return Attribute::make(
            get: function () {
                // Cek relasi jabatan, pake null coalescing (??) biar ga error kalo jabatan kosong
                return ($this->jabatan->nama_jabatan ?? '') === 'Administrator';
            }
        );
    }


    public function scopeFilter($query, array $filters): void
    {
        $query->when(
            $filters['search'] ?? false,
            fn($query, $search) =>
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                    ->orWhere('nip', 'like', '%' . $search . '%');
            })
        );

        // filter berdasarkan nama jabatan
        $query->when(
            $filters['byJabatan'] ?? false,
            fn($query, $byJabatan) =>
            $query->whereHas('jabatan', function ($q) use ($byJabatan) {
                $q->where('nama_jabatan', 'like', "%{$byJabatan}%");
            })
        );

        // filter berdasarkan nama divisi
        $query->when(
            $filters['byDivisi'] ?? false,
            fn($query, $byDivisi) =>
            $query->whereHas('divisi', function ($q) use ($byDivisi) {
                $q->where('nama_divisi', 'like', "%{$byDivisi}%");
            })
        );

        $query->when(
            $filters['byStatus'] ?? false,
            fn($query, $byStatus) =>
            $query->where('status_aktif', '>=', $byStatus)
        );
    }


    public function scopeMyTeam($query, $currentUser)
    {
        return $query->where(function ($q) use ($currentUser) {

            // --- LOGIC 1: STRUKTURAL ---
            // Satu Divisi AND Jabatan Pegawai (ID 4)
            $q->where('divisi_id', $currentUser->divisi_id)
                ->where('jabatan_id', 4) // Cukup pakai ->where lagi (otomatis AND)

                // --- LOGIC 2: FUNGSIONAL ---
                // ATAU (OR) user yang ditargetkan oleh supervisor ini (bisa lintas divisi/jabatan)
                ->orWhereHas('targets', function ($targetQuery) use ($currentUser) {
                    $targetQuery->where('supervisor_id', $currentUser->id);
                });
        });
    }
}
