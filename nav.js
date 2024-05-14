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


async function fetchDataFromPHP() {
    try {
        const response = await fetch('mobility.php');
        if (!response.ok) {
            throw new Error('Failed to fetch data from PHP');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function main() {
    const total_num_vehicles = await fetchDataFromPHP();

    const ctx = document.getElementById("myChart").getContext("2d");

    const data = {
        labels: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
        datasets: total_num_vehicles.map((entry, index) => ({
            label: entry.weekday,
            data: entry.total_num_vehicles,
            backgroundColor: "rgba(30, 144, 255, 0.2)", // Blau
            borderColor: "rgba(30, 144, 255, 1)", // Blau
            borderWidth: 1,
            hidden: ![0, 1, 2].includes(index), // Verstecke Montag, Dienstag, Mittwoch standardmäßig
        })),
    };

    const options = {
        scales: {
            r: {
                angleLines: {
                    display: false
                },
                suggestedMin: 0,
                suggestedMax: 50 // Maximalwert anpassen
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

main();



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
    
