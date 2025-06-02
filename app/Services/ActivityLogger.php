<?php
namespace App\Services;

use App\Models\LogAktivitas;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class ActivityLogger
{
    public static function log($aktivitas, $keterangan = null, $entityType = null, $entityId = null, $pegawaiNip = null)
    {
        LogAktivitas::create([
            'user_nip' => Auth::user()->nip ?? null,
            'pegawai_nip' => $pegawaiNip,
            'aktivitas' => $aktivitas,
            'keterangan' => $keterangan,
            'entity_type' => $entityType,
            'entity_id' => $entityId,
            'ip_address' => Request::ip(),
        ]);
    }
}
