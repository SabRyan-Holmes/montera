MONTERA (Monitoring Target, Evaluasi & Realisasi Akuisisi)

# Cara Menjalankan Project (Laravel + React)

## Prasyarat
- PHP >= 8.1
- Composer
- Node.js >= 18
- npm
- MySQL / PostgreSQL
- Git

## Langkah Menjalankan Project

1. Clone repository dan masuk ke folder project
   git clone https://github.com/SabRyan-Holmes/montera.git
   cd nama-repo

2. Install dependency backend (Laravel)
   composer install

3. Install dependency frontend (React)
   npm install

4. Copy file environment
   cp .env.example .env

5. Edit file .env dan sesuaikan database
   APP_NAME="Nama Aplikasi"
   APP_ENV=local
   APP_KEY=
   APP_DEBUG=true
   APP_URL=http://localhost

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=nama_database
   DB_USERNAME=root
   DB_PASSWORD=

   Pastikan database sudah dibuat di DBMS.

6. Generate application key
   php artisan key:generate

7. Jalankan migration dan seeder
   php artisan migrate --seed

   Jika ingin reset database:
   php artisan migrate:fresh --seed

8. Buat storage link (jika ada upload file)
   php artisan storage:link

9. Jalankan server Laravel
   php artisan serve

10. Jalankan frontend (Vite / React)
    npm run dev

Aplikasi dapat diakses di:
http://127.0.0.1:8000

## Troubleshooting (jika error)
php artisan cache:clear
php artisan route:clear
php artisan config:clear
php artisan view:clear
php artisan optimize:clear

