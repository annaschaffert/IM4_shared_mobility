<?php

require_once 'config.php';

try {
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query = "SELECT time, DAYNAME(time) AS weekday, SUM(station_status_num_vehicle_available) AS total_num_vehicles FROM Shared_Mobility GROUP BY time";
    $stmt = $pdo->prepare($query);
    $stmt->execute();

    $data = []; // Initialize an empty array to store the data

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $time = $row['time'];
        $weekday = $row['weekday'];
        $totalNumVehicles = $row['total_num_vehicles'];

        // Create an associative array with the desired structure
        $entry = [
            'weekday' => $weekday,
            'time' => $time,
            'total_num_vehicles' => $totalNumVehicles
        ];

        // Add the entry to the data array
        $data[] = $entry;
    }

    // Convert the data array to JSON
    $jsonData = json_encode($data);

    // Do something with the JSON data
    // For example, you can echo it
    echo $jsonData;
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

