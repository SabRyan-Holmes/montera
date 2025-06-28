<?php

namespace App\Services;

use App\Models\RiwayatKarir;
use Illuminate\Support\Facades\Auth;

class LogPegawaiChangesService
{
    public function logChanges(array $pegawaiOld, array $pegawaiNew): void
    {
        // Ambil semua kolom yang ingin dibandingkan
        $fields = array_keys($pegawaiOld);

        foreach ($fields as $field) {
            // Abaikan field tertentu (optional)
            if (in_array($field, ['id', 'created_at', 'updated_at'])) {
                continue;
            }

            $oldValue = (!isset($pegawaiOld[$field]) || $pegawaiOld[$field] === '' || $pegawaiOld[$field] === null) ? '-' : $pegawaiOld[$field];
            $newValue = (!isset($pegawaiNew[$field]) || $pegawaiNew[$field] === '' || $pegawaiNew[$field] === null)
                ? '-' : $pegawaiNew[$field];

            if ($oldValue !== $newValue && !is_null($newValue)) {
                $user = auth_sso();

                RiwayatKarir::create([
                    'pegawai_nip' => $pegawaiOld['NIP'],
                    'updated_by' => $user->nip,
                    'tanggal_perubahan' => now(),
                    'jenis_perubahan' => $field, // langsung pakai nama field dari tabel
                    'nilai_lama' => $oldValue,
                    'nilai_baru' => $newValue,
                    'keterangan' => "Mengubah {$field} dari {$oldValue} menjadi {$newValue}",
                ]);
            }
        }
    }
}
