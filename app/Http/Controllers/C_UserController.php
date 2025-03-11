<?php


namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class C_UserController extends Controller
{
    // Récupérer un utilisateur par ID
    public function getUser($id)
    {
        try {
            $user = User::find($id);
            if (!$user) {
                return response()->json(['message' => 'Utilisateur non trouvé'], 404);
            }
            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de la récupération de l\'utilisateur'], 500);
        }
    }

    // Ajouter un utilisateur
    public function addUser(Request $request)
    {
        try {
            $user = new User();
            $user->surname = $request->surname;
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->number = $request->number;
            $user->save();

            return response()->json(['id' => $user->id], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de l\'ajout de l\'utilisateur'], 500);
        }
    }

    // Mettre à jour un utilisateur
    public function updateUser(Request $request, $id)
    {
        try {
            $user = User::find($id);
            if (!$user) {
                return response()->json(['message' => 'Utilisateur non trouvé'], 404);
            }

            $user->surname = $request->surname;
            $user->name = $request->name;
            $user->email = $request->email;
            $user->number = $request->number;
            $user->save();

            return response()->json(['message' => 'Utilisateur mis à jour avec succès']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de la mise à jour de l\'utilisateur'], 500);
        }
    }

    // Supprimer un utilisateur
    public function deleteUser($id)
    {
        try {
            $user = User::find($id);
            if (!$user) {
                return response()->json(['message' => 'Utilisateur non trouvé'], 404);
            }

            $user->delete();
            return response()->json(['message' => 'Utilisateur supprimé avec succès']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de la suppression de l\'utilisateur'], 500);
        }
    }
    // public function index(){
    //             $users = User::all();
    //             dd($users);
    //         }
        
}

// namespace App\Http\Controllers;

// use App\Http\Controllers\Controller;
// use Illuminate\Http\Request;
// use App\Models\User;

// class UserController extends Controller
// {
//     public function index(){
//         // $users = User::all();
//         // dd($users);
//     }
// }
