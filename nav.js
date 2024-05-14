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
        // Anstatt Daten von der API abzurufen, generiere randomisierte Daten
        const randomData = [];
        for (let i = 0; i < 24; i++) { // 24 Stunden im Tag
            let randomNumber;
            if (i >= 0 && i < 9) {
                // Zufallszahlen zwischen 30 und 40 für die Stunden von 0 bis 9 Uhr
                randomNumber = Math.floor(Math.random() * (40 - 30 + 1)) + 30;
            } else if (i >= 9 && i < 17) {
                // Zufallszahlen zwischen 10 und 30 für die Stunden von 10 bis 16 Uhr
                randomNumber = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
            } else {
                // Zufallszahlen zwischen 2 und 40 für die Stunden von 17 bis 23 Uhr
                randomNumber = Math.floor(Math.random() * (40 - 2 + 1)) + 2;
            }
            randomData.push(randomNumber);
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

    weekdays.forEach((weekday, index) => {
        const dataset = {
            label: weekday,
            data: formattedData.slice(index * hoursOfDay.length, (index + 1) * hoursOfDay.length),
            backgroundColor: `rgba(75, 192, 192, ${index / weekdays.length})`,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
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
}

    // add a line chart

    const lineChartCtx = document.getElementById("lineChart").getContext("2d");
    const startDateInput = document.getElementById("start_date");
    const endDateInput = document.getElementById("end_date");

    function createLineChart(data) {
        const lineData = {
            labels: data.map(item => item.date),
            datasets: [
                {
                    label: "Total Number of Vehicles",
                    data: data.map(item => item.total_num_vehicles),
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                },
            ],
        };

        const lineOptions = {
            scales: {
                x: {
                    type: "time",
                    time: {
                        unit: "day",
                        displayFormats: {
                            day: "MMM D",
                        },
                    },
                    ticks: {
                        source: "auto",
                    },
                },
                y: {
                    beginAtZero: true,
                },
            },
        };

        const lineChart = new Chart(lineChartCtx, {
            type: "line",
            data: lineData,
            options: lineOptions,
        });
    }

    async function fetchLineChartData(startDate, endDate) {
        try {
            const response = await fetch("https://423521-10.web.fhgr.ch/mobility.php");
            const data = await response.json();
            const filteredData = data.filter(item => {
                const itemDate = new Date(item.date);
                return itemDate >= startDate && itemDate <= endDate;
            });
            return filteredData;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    function handleDateChange() {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        if (startDate && endDate) {
            fetchLineChartData(startDate, endDate)
                .then(data => {
                    createLineChart(data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    startDateInput.addEventListener("change", handleDateChange);
    endDateInput.addEventListener("change", handleDateChange);

