<?php

// include transform.php
include 'transform.php';

// require once config.php
require_once 'config.php';

// Versuche eine Verbindung zur Datenbank herzustellen
try {
    // Erstellt eine neue PDO-Instanz mit der Konfiguration aus config.php
    $pdo = new PDO($dbname, $username, $password, $options);

// SQL-Query mit Platzhaltern für das Einfügen von Daten
$sql = "INSERT INTO shared_mobility (id, featureId, available, geometry, provider_timezone, vehicle_status_disabled, vehicle_status_reserved, usage_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

// Bereitet die SQL-Anweisung vor
$stmt = $pdo->prepare($sql);

// Fügt jedes Element im Array in die Datenbank ein
foreach ($shared_mobility_data as $item) {
    $stmt->execute([
        $item['id'],
        $item['featureId'],
        $item['available'],
        $item['geometry'],
        $item['provider_timezone'],
        $item['vehicle_status_disabled'],
        $item['vehicle_status_reserved'],
        // Füge hier den korrekten Zeitstempel für die Nutzungzeit ein
        $item['usage_time']
    ]);
}

echo "Daten erfolgreich eingefügt.";
} catch (PDOException $e) {
die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}
?>