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
});

async function fetchData() {
    try {
        const response = await fetch("https://423521-10.web.fhgr.ch/mobility.php");
        const data = await response.json();
        return data;
    } catch (error) {
        // Handle any errors that occur during the fetch
        console.error(error);
    }
}

async function main() {
    const total_num_vehicles = await fetchData();
    console.log(total_num_vehicles);

    const ctx = document.getElementById("myChart").getContext("2d");

    const formattedData = total_num_vehicles.map(item => item.total_num_vehicles);

    console.log(formattedData);

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const hoursOfDay = [0, 3, 6, 9, 12, 15, 18, 21];
    const data = {
        labels: hoursOfDay,
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
        scale: {
            ticks: {
                beginAtZero: true
            },
        },
    };

    const radarChart = new Chart(ctx, {
        type: "radar",
        data: data,
        options: options,
    });

    // Create a line chart
    const lineCtx = document.getElementById("lineChart").getContext("2d");
    const lineData = {
        labels: [], // Labels will be updated based on selected time period
        datasets: [{
            label: 'Total Number of Vehicles',
            data: [], // Data will be updated based on selected time period
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    };
    const lineOptions = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    const lineChart = new Chart(lineCtx, {
        type: 'line',
        data: lineData,
        options: lineOptions
    });

    // Function to update line chart data based on selected time period
    function updateLineChart(startDate, endDate) {
        const selectedData = total_num_vehicles.filter(item => {
            const date = new Date(item.date);
            return date >= startDate && date <= endDate;
        });

        lineData.labels = selectedData.map(item => item.date);
        lineData.datasets[0].data = selectedData.map(item => item.total_num_vehicles);
        lineChart.update();
    }

    // Add event listener to datepicker to update line chart data
    const startDatePicker = document.getElementById('start_date');
    const endDatePicker = document.getElementById('end_date');

    startDatePicker.addEventListener('change', function () {
        const startDate = new Date(this.value);
        const endDate = new Date(endDatePicker.value);
        updateLineChart(startDate, endDate);
    });

    endDatePicker.addEventListener('change', function () {
        const startDate = new Date(startDatePicker.value);
        const endDate = new Date(this.value);
        updateLineChart(startDate, endDate);
    });
}

main();
