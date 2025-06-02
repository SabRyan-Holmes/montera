<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\LogAktivitas;
use Carbon\Carbon;

class CleanUpOldLogs extends Command
{
    protected $signature = 'logs:clean';
    protected $description = 'Hapus log aktivitas yang lebih dari 90 hari';

    public function handle()
    {
        $deleted = LogAktivitas::where('created_at', '<', Carbon::now()->subDays(90))->delete();
        $this->info("Berhasil menghapus $deleted log yang lebih dari 90 hari.");
    }
}
