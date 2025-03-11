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

    public function __construct() {
        $this->apiUrl ="http://localhost:11434/api/generate";
        $this->model = "llama3.2";
        $this->stream =false;
    }
    public function generatprompt($promptClient){
        $this ->prompt = $promptClient;
        $data = json_encode([
            "model" => $this->model,
            "prompt" => $this ->prompt,
            "stream"=> $this->stream,
        ]);
        $ch = curl_init($this->apiUrl);

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Content-Type: application/json"
        ]);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

        $response = curl_exec($ch);
        curl_close($ch);

        $decodeJson = json_decode($response, true);
        return $decodeJson['response'] ?? "Erreur : reponse introuvable";
    }
}
