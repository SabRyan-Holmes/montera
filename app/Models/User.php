<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

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
    ];
    protected $casts = ['jumlah' => 'array'];
    protected $with = ['jabatan'];

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
     * Relasi ke Divisi (Many to One)
     * User ini masuk di divisi mana?
     */
    public function divisi(): BelongsTo
    {
        return $this->belongsTo(Divisi::class, 'divisi_id');
    }

    /**
     * Relasi ke Akuisisi (One to Many)
     * Daftar data akuisisi yang diinput oleh user ini
     */
    public function akuisisi(): HasMany
    {
        return $this->hasMany(Akuisisi::class, 'user_id');
    }

    // Relasi tambahan untuk mendukung Verifikasi & Target
    public function targets()
    {
        return $this->hasMany(Target::class); // Untuk monitoring pencapaian vs target pribadi
    }

    public function inputAkuisisi()
    {
        return $this->hasMany(Akuisisi::class, 'user_id'); // Data yang diinput pegawai
    }

    public function verifikasiAkuisisi()
    {
        return $this->hasMany(Akuisisi::class, 'verifikator_id'); // Khusus aktor Supervisor
    }



    // public function hasRole(string|array $roles): bool
    // {
    //     $userRole = $this->role;

    //     if (is_array($roles)) {
    //         return in_array($userRole, $roles);
    //     }

    //     return $userRole === $roles;
    // }

    // public function isPimpinan(): bool
    // {
    //     return $this->role === 'Pimpinan';
    // }

    // public function canValidate(): bool
    // {
    //     return in_array($this->role, ['Pimpinan', 'Divisi SDM']);
    // }
}
