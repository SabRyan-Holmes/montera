<?php

use App\Models\RiwayatPAK;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $mapper = [
            'kepala_reg' => 'Kepala Kantor Regional VII BKN',
            'sekretaris' => 'Sekretaris Tim Penilai Yang Bersangkutan',
            'kepala_bps' => 'Kepala BPS Kabupaten/Kota',
            'kepala_biro' => 'Kepala Biro SDM BPS',
            'pns' => 'PNS Bersangkutan',
            'arsip' => 'Arsip',
        ];

        RiwayatPAK::chunk(200, function ($records) use ($mapper) {
            foreach ($records as $record) {
                $updates = [];

                foreach (['tebusan1', 'tebusan2', 'tebusan3'] as $field) {
                    $oldData = $record->{$field};

                    // Cek kalau belum dalam format array of object
                    if (!isset($oldData[0]['pihak_tebusan'])) {
                        $newFormat = [];

                        foreach ($mapper as $key => $label) {
                            $newFormat[] = [
                                'pihak_tebusan' => $label,
                                'checked' => $oldData[$key] ?? false,
                            ];
                        }

                        $updates[$field] = $newFormat; // tanpa json_encode
                    }
                }

                if ($updates) {
                    $record->update($updates);
                }
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
