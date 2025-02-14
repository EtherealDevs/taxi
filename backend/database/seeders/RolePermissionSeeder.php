<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    public function run()
    {
        // Create roles
        $adminRole = Role::create(['name' => 'admin']);
        $userRole = Role::create(['name' => 'user']);

        // Create permissions
        $accessAdmin = Permission::create(['name' => 'access admin']);

        $adminRole->givePermissionTo($accessAdmin);
        $admin = User::where('email', 'nelsonolivera.viajes@gmail.com')->first();
        $admin->assignRole('admin');

        // Assign role to user
        $admin = User::where('name', '=', env('ADMIN_NAME'))->first();
        if (Hash::check(env('ADMIN_PASS'), $admin->password)) {
            $admin->assignRole('admin');
        }
    }
}
