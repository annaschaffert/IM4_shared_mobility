<?php
//include 'extract.php' - Verlinkung auf extract.php;
include 'extract.php';
echo "<br>";
echo "<br>";
echo "<br>";

// Funktion zur Ermittlung der Uhrzeit mit den meisten verfügbaren E-Scootern
function find_peak_usage_time($shared_mobility_data) {
    // Array zur Speicherung der Anzahl verfügbarer E-Scooter für jede Stunde des Tages
    $usage_count_per_hour = array_fill(0, 24, 0);

    // Iteration über die Daten, um die Anzahl der verfügbaren E-Scooter für jede Stunde zu zählen
    foreach ($shared_mobility_data as $item) {
        // Überprüfen, ob der Anbieter Tier ist und der E-Scooter verfügbar ist
        if (isset($item['attributes']) && $item['attributes']['provider_name'] === 'Tier WINTERTHUR' && isset($item['attributes']['available']) && $item['attributes']['available']) {
            // Extrahieren der Uhrzeit aus der Zeitzone des Anbieters
            $timestamp = strtotime($item['attributes']['provider_timezone']);
            $hour = date('G', $timestamp);

            // Inkrementieren des Zählers für diese Stunde
            $usage_count_per_hour[$hour]++;
        }
    }

    // Finden der Stunde mit den meisten verfügbaren E-Scootern
    $peak_hour = array_keys($usage_count_per_hour, max($usage_count_per_hour));

    // Rückgabe der Stunde mit den meisten verfügbaren E-Scootern
    return $peak_hour;
}

// Aufruf der Funktion zur Ermittlung der Spitzenzeit
$peak_hour = find_peak_usage_time($shared_mobility_data);

// Ausgabe der Spitzenzeit
echo "Die meisten E-Scooter von Tier werden am häufigsten um " . $peak_hour[0] . " Uhr benutzt.";
?>
