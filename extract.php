<?php

/* Einbettung API Link */
$url = "https://api.sharedmobility.ch/v1/sharedmobility/identify?filters=ch.bfe.sharedmobility.vehicle_type=E-Scooter&Geometry=8.72334,47.50024&Tolerance=500&offset=0&geometryFormat=esrijson";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$output = curl_exec($ch);
curl_close($ch);

// Ausgabe des Ergebnisses
echo $output;

/* Dekodiere das JSON Ergebnis und speichere id, available und geometry in Variablen und gib sie aus */
$result = json_decode($output, true);

// Iteriere über jeden Datensatz im Array
foreach ($result as $entry) {
    // Zugriff auf die gewünschten Daten
    $id = $entry['id'];
    $featureId = $entry['featureId'];
    $geometry = $entry['geometry'];
    $attributes = $entry['attributes'];

    // Zugriff auf spezifische Attribute und Überprüfung ihrer Existenz
    $available = isset($attributes['available']) ? $attributes['available'] : 'N/A';
    $provider_timezone = isset($attributes['provider_timezone']) ? $attributes['provider_timezone'] : 'N/A';
    $vehicle_status_disabled = isset($entry['vehicle_status_disabled']) ? ($entry['vehicle_status_disabled'] ? 'true' : 'false') : 'N/A';
    $vehicle_status_reserved = isset($entry['vehicle_status_reserved']) ? ($entry['vehicle_status_reserved'] ? 'true' : 'false') : 'N/A';

    // Ausgabe der Daten
    echo "ID: $id<br>";
    echo "Feature ID: $featureId<br>";
    echo "Geometry: " . json_encode($geometry) . "<br>";
    echo "Available: $available<br>";
    echo "Provider Timezone: $provider_timezone<br><br>";
    echo "Vehicle Status Disabled: $vehicle_status_disabled<br>";
    echo "Vehicle Status Reserved: $vehicle_status_reserved<br><br>";
}

// Speichere alle Daten in Variablen
$shared_mobility_data = [];
foreach ($result as $item) {
    $id = $item['id'];
    $featureId = $item['featureId'];
    $geometry = $item['geometry'];
    $attributes = $item['attributes'];
    
    // Spezifische Attribute

    $provider_timezone = $attributes['provider_timezone'];
    $available = isset($attributes['available']) ? $attributes['available'] : null;
    $vehicle_status_disabled = isset($attributes['vehicle_status_disabled']) ? $attributes['vehicle_status_disabled'] : null;
    $vehicle_status_reserved = isset($attributes['vehicle_status_reserved']) ? $attributes['vehicle_status_reserved'] : null;

    // Daten in Array speichern
    $shared_mobility_data[] = [
        "id" => $id,
        "featureId" => $featureId,
        "geometry" => $geometry,
        "available" => $available,
        "vehicle_status_disabled" => $vehicle_status_disabled,
        "vehicle_status_reserved" => $vehicle_status_reserved,
    ];
}

?>
