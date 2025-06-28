<?php

use App\Models\RiwayatPAK;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
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

        Log::info(">> MIGRATION STARTED <<");

        try {
            $total = RiwayatPAK::count();
            Log::info(">> TOTAL ROWS: $total");

            if ($total === 0) {
                Log::warning(">> DATA RIWAYAT_PAK KOSONG, MIGRASI BERHENTI.");
                return;
            }

            RiwayatPAK::without('pegawai', 'pengusulan_pak')->chunk(50, function ($records) use ($mapper) {
                Log::info(">> CHUNK LOADED, COUNT: " . $records->count());
                foreach ($records as $record) {
                    try {
                        Log::info(">> PROCESSING ID: " . $record->id);
                        $updates = [];

                        foreach (['tebusan1', 'tebusan2', 'tebusan3'] as $field) {
                            $oldData = $record->{$field};

                            if (is_string($oldData) && $oldData !== '') {
                                $decoded = json_decode($oldData, true);
                                if (json_last_error() === JSON_ERROR_NONE) {
                                    $oldData = $decoded;
                                } else {
                                    Log::warning(">> JSON DECODE ERROR on ID {$record->id}, field {$field}");
                                    continue;
                                }
                            }

                            if (!is_array($oldData)) {
                                Log::warning(">> SKIPPING ID {$record->id} FIELD {$field}: Not array");
                                continue;
                            }

                            if (isset($oldData[0]['pihak_tebusan'])) {
                                Log::info(">> ID {$record->id} FIELD {$field}: Already formatted");
                                continue;
                            }

                            $newFormat = [];
                            foreach ($mapper as $key => $label) {
                                $newFormat[] = [
                                    'pihak_tebusan' => $label,
                                    'checked' => $oldData[$key] ?? false,
                                ];
                            }

                            $updates[$field] = $newFormat;
                        }

                        if (!empty($updates)) {
                            $record->update($updates);
                            Log::info(">> UPDATED ID: " . $record->id);
                        } else {
                            Log::info(">> NOTHING TO UPDATE ID: " . $record->id);
                        }
                    } catch (\Throwable $e) {
                        Log::error(">> ERROR on ID {$record->id}: " . $e->getMessage());
                    }
                }
            });
        } catch (\Throwable $e) {
            Log::error(">> MIGRATION ERROR (outer): " . $e->getMessage());
        }

        Log::info(">> MIGRATION ENDED <<");
    }

    public function down(): void
    {
        //
    }
};
