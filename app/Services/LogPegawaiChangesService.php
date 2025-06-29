<?php

namespace App\Services;

use App\Models\RiwayatKarir;
use Illuminate\Support\Facades\Auth;

class LogPegawaiChangesService
{
    public function logChanges(array $pegawaiOld, array $pegawaiNew): void
    {
        $fields = array_keys($pegawaiOld);

        foreach ($fields as $field) {
            if (in_array($field, ['id', 'created_at', 'updated_at', 'Nama', 'NIP', 'Jenis Kelamin', 'Tempat/Tanggal Lahir', 'Nomor Seri Karpeg'])) {
                continue;
            }

            $oldRaw = $pegawaiOld[$field] ?? null;
            $newRaw = $pegawaiNew[$field] ?? null;

            // Skip kalau tidak berubah
            if ($oldRaw === $newRaw) {
                continue;
            }

            // Format tampilan
            $oldDisplay = ($oldRaw === '' || $oldRaw === null) ? '-' : $oldRaw;
            $newDisplay = ($newRaw === '' || $newRaw === null) ? '-' : $newRaw;

            RiwayatKarir::create([
                'pegawai_nip'       => $pegawaiOld['NIP'],
                'updated_by'        => auth_sso()->nip,
                'tanggal_perubahan' => now(),
                'jenis_perubahan'   => $field,
                'nilai_lama'        => $oldDisplay,
                'nilai_baru'        => $newDisplay,
                'keterangan'        => "Mengubah {$field} dari {$oldDisplay} menjadi {$newDisplay}",
            ]);
        }
    }
}
