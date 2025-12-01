<?php

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
        Schema::table('projects', function (Blueprint $table) {
            // It's good practice to place new columns after existing related columns.
            // We'll add these after the 'role' column.
            $table->string('image_url')->nullable()->after('role');
            $table->string('url_repo')->nullable()->after('image_url');
            $table->string('url_web')->nullable()->after('url_repo');
            $table->string('url_ios')->nullable()->after('url_web');
            $table->string('url_android')->nullable()->after('url_ios');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn([
                'image_url',
                'url_repo',
                'url_web',
                'url_ios',
                'url_android',
            ]);
        });
    }
};
