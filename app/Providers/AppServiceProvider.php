<?php

namespace App\Providers;

use Carbon\Carbon;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Nonaktifkan foreign key checks saat migrate:fresh
        // if (app()->runningInConsole()) {
        //     DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        // }

        // config(['app.locale' => 'id']);
        Carbon::setLocale('id');

        // Custom Blade directive formatTanggal
        Blade::directive('formatTanggal', function ($expression) {
            return "<?php echo (new \Carbon\Carbon($expression))->translatedFormat('d F Y'); ?>";
        });

        // Custom Blade directive for bulan
        Blade::directive('bulan', function ($expression) {
            return "<?php echo (new class {
                    public function getBulan(\$month) {
                        \$months = [
                            1 => 'Januari',
                            2 => 'Februari',
                            3 => 'Maret',
                            4 => 'April',
                            5 => 'Mei',
                            6 => 'Juni',
                            7 => 'Juli',
                            8 => 'Agustus',
                            9 => 'September',
                            10 => 'Oktober',
                            11 => 'November',
                            12 => 'Desember',
                        ];
                        return \$months[\$month] ?? 'Invalid month';
                    }
                })->getBulan($expression); ?>";
        });

        Validator::extend('image64', function ($attribute, $value, $parameters, $validator) {
            $type = explode('/', explode(':', substr($value, 0, strpos($value, ';')))[1])[1];
            if (in_array($type, $parameters)) {
                return true;
            }
            return false;
        });

        Validator::replacer('image64', function ($message, $attribute, $rule, $parameters) {
            return str_replace(':values', join(",", $parameters), $message);
        });
    }
}
