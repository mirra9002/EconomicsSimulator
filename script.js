const buttonRunCycle = document.getElementById('btn-cycle');
const buttonStartTimerCycle = document.getElementById('btn-timer-cycle');
const buttonResetEconomics = document.getElementById('btn-reset-economics')
const buttonShowAllPeople = document.getElementById('btn-show-all-people');
const buttonShowAllBusinesses = document.getElementById('btn-show-all-businesses');
let moneyValuesX = [];
let moneyValueY = [];


import { Economics } from "./classes/economics.js";
import { Person } from "./classes/person.js";
import { Business } from "./classes/business.js";



let economics = new Economics([], [], 0);
economics.render({});

// let moneyChart = new Chart("money-chart", {
//     type: "line",
//     data: {
//       labels: moneyValuesX,
//       datasets: [{
//         backgroundColor:"rgba(0,0,255,1.0)",
//         borderColor: "rgba(0,0,255,0.1)",
//         pointRadius: 5,
//         pointBorderColor: "black",
//         pointBackgroundColor: "red", 
//         data: moneyValueY
//       }]
//     },
//     options:{}
//   });

// const moneyChartUpdate = () => {
//     moneyChart.data.labels = moneyValuesX;
//     moneyChart.data.datasets[0].data = moneyValueY;
//     moneyChart.update();
// }

let allPeopleShown = false;
let allBusinessesShown = false;



buttonRunCycle.addEventListener('click', () => {
    const cycleResults = economics.runCycle();
    economics.render(cycleResults);
    allPeopleShown = false;
    allBusinessesShown = false;
    // moneyChartUpdate();
});

let economicCycleInterval;
buttonStartTimerCycle.addEventListener('click', () => {
    if(!economicCycleInterval){
        economicCycleInterval = setInterval(() => {
            buttonStartTimerCycle.textContent = 'Pause cycle';
            const cycleResults = economics.runCycle();
            economics.render(cycleResults);
            // moneyChartUpdate();

        }, 1500)
    } else if(economicCycleInterval){
        buttonStartTimerCycle.textContent = 'Continue cycle';
        clearInterval(economicCycleInterval);
        economicCycleInterval = null;
    }
});

buttonResetEconomics.addEventListener('click', () => {
    economics = new Economics([], [], 0);
    economics.render({});
    buttonStartTimerCycle.textContent = 'Start new economics cycle';
    clearInterval(economicCycleInterval);
    economicCycleInterval = null;
    // moneyValueX = [];
    // moneyValueY = [];
    // moneyChart.options.scales.y.min = 0;  
    // moneyChart.options.scales.y.max = 10;
    // moneyChartUpdate();
})


const renderAllBusinesses = () => {
    if(allBusinessesShown === false){
        const sectionBusinesses = document.createElement('section');
        sectionBusinesses.id = 'section-business';
        const divEconomics = document.getElementById('div-economics');
        divEconomics.appendChild(sectionBusinesses);
        const ulBusilesses = document.createElement('ul');
        sectionBusinesses.appendChild(ulBusilesses);
        for(let business of economics.businesses){
            business.printBusinessData(ulBusilesses, economics)
        }
        allBusinessesShown = true;
    }
}
const renderAllPeople = () => {
    if(allPeopleShown === false){
        const sectionPeople = document.createElement('section');
        sectionPeople.id = 'section-people';
        const divEconomics = document.getElementById('div-economics');
        divEconomics.appendChild(sectionPeople);
        const ulPeople = document.createElement('ul');
        sectionPeople.appendChild(ulPeople);
        for(let person of economics.people){
            person.printPersonData(ulPeople);
        }
        allPeopleShown = true;
    }
}


buttonShowAllPeople.addEventListener('click', renderAllPeople)
buttonShowAllBusinesses.addEventListener('click', renderAllBusinesses)

