<?php

function randomTotalNumVehicles() {
    $total_num_vehicles = [];
    for ($i = 0; $i < 8; $i++) {
        $randomNumber;
        if ($i >= 0 && $i < 9) {
            // Zufallszahlen zwischen 30 und 40 für die Stunden von 0 bis 9 Uhr
            $randomNumber = rand(30, 40);
        } else if ($i >= 9 && $i < 17) {
            // Zufallszahlen zwischen 10 und 30 für die Stunden von 10 bis 16 Uhr
            $randomNumber = rand(10, 30);
        } else {
            // Zufallszahlen zwischen 2 und 40 für die Stunden von 17 bis 23 Uhr
            $randomNumber = rand(2, 40);
        }
        array_push($total_num_vehicles, $randomNumber);
    }
    return $total_num_vehicles;
}

// Generate random data for each day
$data = [];
$weekdays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
foreach ($weekdays as $weekday) {
    // $totalNumVehicles = $row['total_num_vehicles'];
    // Alternative wegen instabilder API, genehmigt von Samuel Rhyner
    $totalNumVehicles = randomTotalNumVehicles();
    $entry = [
        'weekday' => $weekday,
        'total_num_vehicles' => $totalNumVehicles
    ];
    array_push($data, $entry);
}

// Convert the data array to JSON
$jsonData = json_encode($data);

// Set the content type to JSON
header('Content-Type: application/json');

// Output the JSON data
echo $jsonData;
?>
