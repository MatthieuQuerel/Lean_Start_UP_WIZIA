<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class C_IAController extends Controller
{
    private $apiUrl;
    private $model;
    private $prompt;
    private $stream;
    private $keyApi;
    private $geminiApiUrl;

    public function __construct() {
        $this->apiUrl ="http://localhost:11434/api/generate";
        $this->model = "llama3.2";
        $this->stream =false;
        $this->keyApi=env('KEY_API_GEMINI'); // Pour GEMINI
        $this->geminiApiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" . $this->keyApi;
    }
    public function generatpromptgemini(Request $request)
{
    $request->validate([
        'prompt' => 'required|string',
    ]);

    $prompt = $request->prompt;

    $data = json_encode([
        "contents" => [
            [
                "parts" => [
                    ["text" => $prompt]
                ]
            ]
        ]
    ]);

    $ch = curl_init($this->geminiApiUrl); // Assure-toi que $this->geminiApiUrl contient bien l'URL complète avec clé si nécessaire

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Content-Type: application/json",
        "Authorization: Bearer VOTRE_CLÉ_API" // Remplace par ta vraie clé API
    ]);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        $error_msg = curl_error($ch);
        curl_close($ch);
        return response()->json(['error' => "Erreur cURL : $error_msg"], 500);
    }

    curl_close($ch);

    $decoded = json_decode($response, true);

    // Debug éventuel
    // dd($decoded);

    return $decoded['candidates'][0]['content']['parts'][0]['text'] ?? "Erreur de génération du prompt Gemini";
}

}
