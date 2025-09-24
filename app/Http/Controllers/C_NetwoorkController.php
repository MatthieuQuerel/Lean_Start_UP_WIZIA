<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Posts;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class C_NetwoorkController extends Controller
{
  public function createAndPublishPostFacebook(Request $request)
  {
    

    $postData = $request->input('post');

    $userId = Auth::id() ?? 1;

    if ($request->input('date') === null && $request->input('now') === true) {
      $date = new DateTime();
      $date = $date->format('Y-m-d');
    } else {
      $date = $request->input('date');
    }

    Posts::create([
      "datePost" => $date,
      "idUser" => $userId,
      "idPieceJointe" => 0,
      "post" => $postData
    ]);


    if ($request->input('date') === null && $request->input('now') === true) {

      $data = [
        "post" => $postData
      ];

      // Envoyer ces données directement à Make.com
      $url = 'https://hook.eu2.make.com/umhsf8kaax437qklfxrf7oechd4hp3qk';
      $response = Http::withHeaders([
        'Content-Type' => 'application/json', // Utiliser JSON pourrait être plus simple
        'Accept' => 'application/json',
      ])->post($url, $data);

      return response()->json([
        'status' => $response->status(),
        'body' => $response->body(),
      ]);
    } else {
      return response()->json([
        'status' => 200,
        'message' => 'Post correctement plannifié',
      ]);
    }
  }// 3T-QSYRS-FUfssc
  public function createAndPublishPostInstagramePicture(Request $request){
    $request->validate([
      'post' => 'required',
      'file' => 'required',
      'date' => 'required',
      'now' => 'required'
    ]);

    $postData = $request->input('post');
    $filsData = $request->input('file');

    $userId = Auth::id() ?? 1;

    if ($request->input('date') === null && $request->input('now') == true) {
      $date = new DateTime();
      $date = $date->format('Y-m-d');
    } else {
      $date = $request->input('date');
    }

    Posts::create([
      "datePost" => $date,
      "idUser" => $userId,
      "idPieceJointe" => 0,
      "post" => $postData,
    ]);

    if ( $request->input('now') == true) {  // ajouter $request->input('date') === null &&

      $data = [
        "Post" => $postData,
        "File" => $filsData
      ];
       
      // Envoyer ces données directement à Make.com
      $url = 'https://hook.eu2.make.com/gj0upuefvv5a4u23c6jhjmukkzju2md2';
      $response = Http::withHeaders([
        'Content-Type' => 'application/json',
        'Accept' => 'application/json',
        'x-make-apikey' => env("KeyMake")
      ])->post($url, $data);

      return response()->json([
        'status' => $response->status(),
        'body' => $response->body(),
      ]);
    } else {
      return response()->json([
        'status' => 200,
        'message' => 'Post correctement plannifié',
      ]);
    }
  }
  public function createAndPublishPostLinkeding(Request $request)
{
  $request->validate([
      'post' => 'required',
      'date' => 'required',
      'now' => 'required'
      
    ]);
    $postData = $request->input('post');
    $userId = Auth::id() ?? 1;

    // Gestion de la date
    if ($request->input('date') === null && $request->input('now') === true) {
        $date = now()->format('Y-m-d');
    } else {
        $date = $request->input('date');
    }

    // Enregistrer le post
    Posts::create([
        "datePost" => $date,
        "idUser" => $userId,
        "idPieceJointe" => 0,
        "post" => $postData
    ]);

    // Si on doit publier maintenant
    if ($request->input('now') === true) {
        $data = [
            "Post" => $postData
        ];

        $url = 'https://hook.eu2.make.com/8wla3eo601n8ii146jwuoezmja07vs3r';
        $response = Http::withHeaders([
            'Content-Type' => 'application/json', 
            'Accept' => 'application/json',
            'x-make-apikey' => env("KeyMake")
        ])->post($url, $data);

        return response()->json([
            'status' => $response->status(),
            'body' => $response->body(),
        ]);
    }

    return response()->json([
        'status' => 200,
        'message' => 'Post correctement plannifié',
    ]);
}
public function createAndPublishPostPictureLinkeding(Request $request)
{
  $request->validate([
      'post' => 'required',
      'file' => 'required',
  
      'titre_post' => 'required',
      'date' => 'required',
      'now' => 'required'
    ]);

    
    $FileData = $request->input('file');
    $Titre_PostData = $request->input('titre_post');
    $postData = $request->input('post');
    $userId = Auth::id() ?? 1;

    // Gestion de la date
    if ($request->input('date') === null && $request->input('now') == true) {
        $date = now()->format('Y-m-d');
    } else {
        $date = $request->input('date');
    }


    // Enregistrer le post
    Posts::create([
        "datePost" => $date,
        "idUser" => $userId,
        "post" => $postData
    ]);

    // Si on doit publier maintenant
    if ($request->input('now') == "true") {
       $data = [

            "Titre_Post" => $Titre_PostData,
            "File" => $FileData,
            "Post" => $postData,
        ];
        $url = 'https://hook.eu2.make.com/hifthnguoljpbwu3hfbripma447f2f8k';
        $response = Http::withHeaders([
            'Content-Type' => 'application/json', 
            'Accept' => 'application/json',
            'x-make-apikey' => env("KeyMake")
        ])->post($url, $data);

        return response()->json([
            'status' => $response->status(),
            'body' => $response->body(),
            'data' => $data
            
        ]);
        
    }

    return response()->json([
        'status' => 200,
        'message' => 'Post correctement plannifié ',
    ]);
}

public function ListerPosts(Request $request)
{
  $request->validate([
      'idUser' => 'required|integer'
  ]);

  $userId = Auth::id() ?? 1;
  $posts = Posts::where('idUser', $userId)->get();
  dd($posts);
  return response()->json($posts);
 }
}
