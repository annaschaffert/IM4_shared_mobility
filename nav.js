document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".hamburger");
    const menu = document.querySelector(".dropdown");
  
    menuToggle.addEventListener("click", function (event) {
        menu.classList.toggle("open");
    });
  
    const menuItems = document.querySelectorAll(".dropdown a");
    menuItems.forEach(function (item) {
        item.addEventListener("click", function (event) {
            event.preventDefault();
  
            const targetSectionId = item.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetSectionId);
  
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: "smooth",
                });
            }
  
            menu.classList.remove("open");
        });
    });

    main(); // Hier einmal main() aufrufen, um sicherzustellen, dass es nur einmal ausgeführt wird
});


async function fetchData() {
    try {
        const randomData = [];
        for (let day = 0; day < 7; day++) { // Für jeden Wochentag
            for (let i = 0; i < 24; i++) { // 24 Stunden im Tag
                let randomNumber;
                if (i >= 0 && i < 9) {
                    randomNumber = Math.floor(Math.random() * (40 - 30 + 1)) + 30;
                } else if (i >= 9 && i < 17) {
                    randomNumber = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
                } else {
                    randomNumber = Math.floor(Math.random() * (40 - 2 + 1)) + 2;
                }
                randomData.push(randomNumber);
            }
        }
        return randomData;
    } catch (error) {
        console.error(error);
        return [];
    }
}


async function main() {
    const total_num_vehicles = await fetchData();
    console.log(total_num_vehicles);

    const ctx = document.getElementById("myChart").getContext("2d");

    // Die generierten Zufallsdaten werden nun verwendet
    const formattedData = total_num_vehicles;

    const weekdays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

    const hoursOfDay = [0, 3, 6, 9, 12, 15, 18, 21];
    const data = {
        labels: hoursOfDay.map(hour => hour + " Uhr"),
        datasets: [],
    };

    const colors = [
        "rgba(4, 104, 139, 0.2)",    // Dunkelblau
        "rgba(30, 144, 255, 0.2)", // Blau
        "rgba(0, 191, 255, 0.2)",  // Mittelblau
        "rgba(135, 206, 235, 0.2)",// Hellblau
        "rgba(173, 216, 230, 0.2)",// Hellblau
        "rgba(176, 224, 230, 0.2)",// Hellblau
        "rgba(240, 248, 255, 0.2)" // Azurblau
    ];    
    
    
    weekdays.forEach((weekday, index) => {
        const dataset = {
            label: weekday,
            data: formattedData.slice(index * hoursOfDay.length, (index + 1) * hoursOfDay.length),
            backgroundColor: colors[index % colors.length], // Use a different color from the array for each dataset
            borderColor: colors[index % colors.length],
            borderWidth: 1,
            hidden: !["Montag", "Dienstag", "Mittwoch"].includes(weekday), // Verstecke Datasets außer Montag, Dienstag und Mittwoch
        };
        data.datasets.push(dataset);
    });
    

    const options = {
        scales: {
            r: {
                angleLines: {
                    display: false
                },
                suggestedMin: 0,
                suggestedMax: 20
            }
        }
    };
    

    const radarChart = new Chart(ctx, {
        type: "radar",
        data: data,
        options: options,
    });

    // Eventlistener zum Ein- und Ausblenden von Datasets hinzufügen
    const legend = radarChart.legend;
    legend.legendItems.forEach(item => {
        item.textEl.addEventListener("click", function () {
            const datasetIndex = item.datasetIndex;
            const dataset = radarChart.data.datasets[datasetIndex];
            dataset.hidden = !dataset.hidden; // Umkehren Sie den aktuellen Status
            radarChart.update(); // Aktualisiere die Chartansicht
        });
    });
}

    // co2 barometer _________________________________________________________


    document.addEventListener("DOMContentLoaded", function () {
        const autoCO2 = 125; // Gramm CO2 pro Kilometer für Auto
        const escooterCO2 = 20; // Gramm CO2 pro Kilometer für E-Scooter

        const rangeInput = document.getElementById('range');
        const fill = document.getElementById('fill');
        const distanceText = document.getElementById('distance-text');
        const savingsText = document.getElementById('savings-text');

        function calculateCO2Savings() {
            const distance = parseFloat(rangeInput.value);
            const savings = (autoCO2 - escooterCO2) * distance;

            // Begrenze die Einsparung auf 100% (für den Fall, dass sie negativ wird)
            const percentage = Math.max(0, Math.min(savings, autoCO2 * distance)) / (autoCO2 * distance) * 100;

            fill.style.width = percentage + '%';
            distanceText.textContent = 'Strecke: ' + distance + ' km';
            savingsText.textContent = 'CO2-Einsparung: ' + Math.round(savings) + ' g';
        }

        // Initialberechnung
        calculateCO2Savings();

        // Event Listener hinzufügen
        rangeInput.addEventListener('input', calculateCO2Savings);
    });
    
