<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class C_BillController extends Controller
{
    public function generateBill(Request $request)
    {
        $client = [
            'nom' => $request->input('nom'),
            'adresse' => $request->input('adresse'),
        ];

        $articles = $request->input('articles');

        $facture = new C_BillCreate();
        $facture->createBill($client, $articles);

        return response()->json(['message' => 'Facture générée avec succès']);
    }
}
