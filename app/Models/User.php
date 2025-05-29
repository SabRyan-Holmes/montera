<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
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

    public function riwayat_pak()
    {
        return $this->hasMany(RiwayatPAK::class);
    }

    public function hasRole(string|array $roles): bool
    {
        $userRole = $this->role;

        if (is_array($roles)) {
            return in_array($userRole, $roles);
        }

        return $userRole === $roles;
    }

    public function isPimpinan(): bool
    {
        return $this->role === 'Pimpinan';
    }

    public function canValidate(): bool
    {
        return in_array($this->role, ['Pimpinan', 'Divisi SDM']);
    }
}
