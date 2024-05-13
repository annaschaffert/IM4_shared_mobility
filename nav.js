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
        // Process the fetched data here
        console.log(data);
    } catch (error) {
        // Handle any errors that occur during the fetch
        console.error(error);
    }
}
async function main() {
    let data = await fetchData(); 
    let time = data.time;
    let weekday = data.weekday;
    let total_num_vehicles = data.total_num_vehicles; 

const ctx = document.getElementById("myChart").getContext("2d");

const myChart = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
        {
            label: "Total Number of Vehicles",
            data: total_num_vehicles,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
        },
    ],
};

const options = {
    scale: {
        ticks: {
            beginAtZero: true,
            max: Math.max(...total_num_vehicles) + 10,
        },
    },
};

const radarChart = new Chart(ctx, {
    type: "radar",
    data: data,
    options: options,
});

}


console.log(data);

main();
