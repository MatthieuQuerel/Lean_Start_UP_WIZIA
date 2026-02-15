<?php
// Test de connexion à la base de données
$host = getenv('DB_HOST') ?: 'db';
$port = getenv('DB_PORT') ?: '3306';
$db   = getenv('DB_DATABASE') ?: 'wizia';
$user = getenv('DB_USERNAME') ?: 'root';
$pass = getenv('DB_PASSWORD') ?: '';

echo "Trying to connect to $host:$port/$db as $user...\n";

// Test réseau
$sock = @fsockopen($host, (int)$port, $errno, $errstr, 5);
if ($sock) {
    echo "TCP OK: port $port reachable\n";
    fclose($sock);
} else {
    echo "TCP FAIL: $errstr ($errno)\n";
}

// Test PDO
try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$db", $user, $pass, [
        PDO::ATTR_TIMEOUT => 5,
    ]);
    echo "PDO OK: connected!\n";
} catch (Exception $e) {
    echo "PDO ERROR: " . $e->getMessage() . "\n";
}
