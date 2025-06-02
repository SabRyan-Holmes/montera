<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Builder;

use Illuminate\Database\Eloquent\Model;

class ArsipDokumen extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function pegawai_data()
    {
        return $this->belongsTo(Pegawai::class, 'user_nip', 'NIP');
    }

    public function scopeFilter(Builder $query, array $filters): void
    {
        // Search By Nama & NIP
        $query->when(
            $filters['search'] ?? false,
            fn($query, $search) =>
            $query->where('title', 'like', '%' . $search . '%')
                ->orWhere('folder_name', 'like', '%' . $search . '%')
        );
    }

    public static function byUser($user)
    {
        return static::where(function ($query) use ($user) {
            $query->where('user_nip', $user->nip ?? null);
        });
    }

    public static function folderListByUser($user)
    {
        return static::byUser($user)
            ->selectRaw('folder_name, COUNT(*) as count')
            ->groupBy('folder_name')
            ->get();
    }
}
