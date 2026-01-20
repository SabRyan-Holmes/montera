<?php

namespace App\Traits;

trait HasSelectOptions
{
    /**
     * Helper untuk generate { value, label } list buat frontend
     *
     * @param string $labelColumn Nama kolom yang mau dijadikan label (text)
     * @param string $keyColumn Nama kolom yang mau dijadikan value (id)
     * @param callable|null $queryCallback Optional: buat filter tambahan (misal where active)
     */
    public static function getOptions(string $labelColumn = 'name', string $keyColumn = 'id', ?callable $queryCallback = null)
    {
        $query = self::query();

        // Jika ada filter tambahan (misal: where('status', 'aktif'))
        if ($queryCallback) {
            $queryCallback($query);
        }

        return $query->select($keyColumn, $labelColumn)
            ->get()
            ->map(fn($item) => [
                'value' => $item->$keyColumn,
                'label' => $item->$labelColumn,
            ]);
    }
}
