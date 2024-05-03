<?php

// require once transform.php
require_once 'transform.php';

// require once config.php
require_once 'config.php';

// Versuche eine Verbindung zur Datenbank herzustellen
try {
    // Erstellt eine neue PDO-Instanz mit der Konfiguration aus config.php
    $pdo = new PDO($dsn, $username, $password, $options);

    // SQL-Query mit Platzhaltern für das Einfügen von Daten
    $sql = "INSERT INTO Shared_Mobility (id_vehicle, station_status_num_vehicle_available, station_name) VALUES (?, ?, ?)";

    // Bereitet die SQL-Anweisung vor
    $stmt = $pdo->prepare($sql);

    // Fügt jedes Element im Array in die Datenbank ein
    foreach ($shared_mobility_data as $item) {
        $stmt->execute([
            $item['id_vehicle'],
            $item['station_status_num_vehicle_available'],
            $item['station_name']
        ]);
    }

    echo "Daten erfolgreich eingefügt.";
} catch (PDOException $e) {
die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}
?>