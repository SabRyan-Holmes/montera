<?php

namespace App\Services;

use App\Models\RiwayatKarir;
use Illuminate\Support\Facades\Auth;

class LogPegawaiChangesService
{
    protected $fieldsToTrack = [
        'Nomor Seri Karpeg' => 'No Seri Karpeg',
        'Pangkat/Golongan Ruangan/TMT' => 'Pangkat/Golru/TMT',
        'Jabatan/TMT' => 'Jabatan/TMT',
        'Tempat/Tanggal Lahir' => 'Tempat/Tanggal Lahir',
        'Jenis Kelamin' => 'Jenis Kelamin',
        'Pendidikan' => 'Pendidikan',
        'Unit Kerja' => 'Unit Kerja',
        'Masa Kerja Golongan' => 'Masa Kerja Golongan',
        'Daerah' => 'Daerah',
        'Gelar Tambahan' => 'Gelar Tambahan',
    ];

     public function logChanges(array $pegawaiOld, array $pegawaiNew): void
    {
        foreach ($this->fieldsToTrack as $field => $label) {
            $oldValue = $pegawaiOld[$field] ?? null;
            $newValue = $pegawaiNew[$field] ?? null;
            $user = auth_sso();
            // Hanya catat jika ada perubahan
            if ($oldValue !== $newValue && !is_null($newValue)) {
                RiwayatKarir::create([
                    'pegawai_nip' => $pegawaiOld['NIP'],
                    'updated_by' => $user->nip,
                    'tanggal_perubahan' => now(),
                    'jenis_perubahan' => $label,
                    'nilai_lama' => $oldValue,
                    'nilai_baru' => $newValue,
                    'keterangan' => "Mengubah {$label} dari {$oldValue} menjadi {$newValue}",
                ]);
            }
        }
    }
}

