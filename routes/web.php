<?php

use Inertia\Inertia;
use App\Http\Controllers\C_UserController;
use App\Http\Controllers\C_IAController;
use App\Http\Controllers\C_BillController;
use App\Http\Controllers\C_MailService;
use Illuminate\Support\Facades\Route;

    Route::group(['prefix'=>'/users'],function(){
        Route::name('api.')->controller(C_UserController::class)->group(function () {
        Route::get('/{id}', 'getUser')->name('getUser');
            //Route::get('/users/{id}', [C_UserController::class, 'getUser']);
        Route::post('/', 'addUser')->name('addUser');
        Route::put('/{id}', 'updateUser')->name('updateUser');
        Route::delete('/{id}', 'deleteUser')->name('deleteUser');
           
        });
    });
Route::group(['prefix'=>'/bill'],function(){
        Route::name('api.')->controller(C_BillController::class)->group(function () {
            Route::post('/generatebill', 'generateBill')->name('generateBill');
           
        }); 
    });
    Route::group(['prefix'=>'/ia'],function(){
        Route::name('api.')->controller(C_IAController::class)->group(function () {
           Route::post('/generateIA', 'generatprompt')->name('generatprompt');
        });
    });
Route::group(['prefix' => '/mail'], function () {
        Route::post('/send', 'send')->name('send');
        Route::post('/attachment', 'attachment')->name('attachment');
    });


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
