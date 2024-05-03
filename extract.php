<?php

/* Einbettung API Link */
$url = "https://api.sharedmobility.ch/v1/sharedmobility/identify?Geometry=8.72296,47.49883&Tolerance=500&offset=0&geometryFormat=esrijson&filters=ch.bfe.sharedmobility.vehicle_type=E-Scooter&filters=ch.bfe.sharedmobility.provider.id=tier_winterthur";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$output = curl_exec($ch);
curl_close($ch);

/* Dekodiere das JSON Ergebnis und speichere id, available und geometry in Variablen und gib sie aus */
$result = json_decode($output, true);



// Speichere alle Daten in Variablen
$shared_mobility_data = [];
foreach ($result as $item) {
    $id = $item['id'];
    $station_status_num_vehicle_available = $item['attributes']['station_status_num_vehicle_available'];
    $station_name = $item['attributes']['station_name'];

    if (empty($station_status_num_vehicle_available)) {
        $station_status_num_vehicle_available = 0;
    }

// Daten in Array speichern
   $shared_mobility_data[] = [
        "id_vehicle" => $id,
        "station_status_num_vehicle_available" => $station_status_num_vehicle_available,
       "station_name" => $station_name
    ];
}




// Ausgabe des Ergebnisses
print_r($shared_mobility_data);

?>
