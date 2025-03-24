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
const getBusinessInfo = (business) => {
    const divBusinessInfo = document.createElement('div');
    const ulBusinessInfo = document.createElement('ul');
    
    const idLi = document.createElement('li');
    const nameLi = document.createElement('li');    
    const ownerIdLi = document.createElement('li');    
    const productsAmount = document.createElement('li');    
    const totalMoney = document.createElement('li');    
    let ownerName;
    for(let person of economics.people){
        if(person.id === business.ownerId){
            ownerName = person.name;
        }
    }

    idLi.textContent = `Id: ${business.id}`;
    nameLi.textContent = `Name: ${business.name}`;
    ownerIdLi.textContent = `Owner: ${ownerName}`;
    productsAmount.textContent = `Total products amount: ${business.productsAmount.toLocaleString('de-DE')}`;
    totalMoney.textContent = `Total money amount: \$${Math.round(business.totalMoney).toLocaleString('de-DE')}`;
    
    // ulBusinessInfo.appendChild(idLi);
    ulBusinessInfo.appendChild(nameLi);
    ulBusinessInfo.appendChild(ownerIdLi);
    ulBusinessInfo.appendChild(productsAmount);
    ulBusinessInfo.appendChild(totalMoney);
    divBusinessInfo.appendChild(ulBusinessInfo);
    return divBusinessInfo;
}
const getPersonInfo = (person) => {
    const divPersonInfo = document.createElement('div');
    const ulPersonInfo = document.createElement('ul');

    const idLi = document.createElement('li');
    const jobLi = document.createElement('li');    
    const totalMoneyLi = document.createElement('li');    
    const yearIncomeLi = document.createElement('li');    
    const ownedBusinessesLi = document.createElement('li');    
    const happinessLi = document.createElement('li');    

    idLi.textContent = `Id: ${person.id}`;
    jobLi.textContent = `Name: ${person.name}`;
    totalMoneyLi.textContent = `Total amount of money: \$${Math.round(person.totalMoney).toLocaleString('de-DE')}`;
    yearIncomeLi.textContent = `Annual income: \$${person.yearIncome.toLocaleString('de-DE')}`;
    ownedBusinessesLi.textContent = `Amount of owned businesses: ${person.ownedBusinesses}`;
    happinessLi.textContent = `Happiness: ${person.happiness}`;
    
    // ulPersonInfo.appendChild(idLi);
    ulPersonInfo.appendChild(jobLi);
    ulPersonInfo.appendChild(totalMoneyLi);
    ulPersonInfo.appendChild(yearIncomeLi);
    ulPersonInfo.appendChild(ownedBusinessesLi);
    ulPersonInfo.appendChild(happinessLi);
    divPersonInfo.appendChild(ulPersonInfo);
    return divPersonInfo;
}

const renderAllBusinesses = () => {
    if(allBusinessesShown === false){
        const sectionBusinesses = document.createElement('section');
        const divEconomics = document.getElementById('div-economics');
        divEconomics.appendChild(sectionBusinesses);
        const ulBusilesses = document.createElement('ul');
        sectionBusinesses.appendChild(ulBusilesses);
        for(let business of economics.businesses){
            const businessLi = document.createElement('li');
            businessLi.textContent = business.name;
            ulBusilesses.appendChild(businessLi);
            businessLi.addEventListener('click', () => {
                let existingInfo = businessLi.querySelector('.business-info');
                if(!existingInfo){
                    const businessInfoDiv = getBusinessInfo(business);
                    businessInfoDiv.classList.add('business-info');
                    businessLi.appendChild(businessInfoDiv);
                } else {
                    existingInfo.remove();
                }                
                })
        }
        allBusinessesShown = true;
    }
}
const renderAllPeople = () => {
    if(allPeopleShown === false){
        const sectionPeople = document.createElement('section');
        const divEconomics = document.getElementById('div-economics');
        divEconomics.appendChild(sectionPeople);
        const ulPeople = document.createElement('ul');
        sectionPeople.appendChild(ulPeople);
        for(let person of economics.people){
        const personLi = document.createElement('li');
        personLi.textContent = person.name;
        ulPeople.appendChild(personLi);
        personLi.addEventListener('click', () => {
            let existingInfo = personLi.querySelector('.person-info');
            if(!existingInfo){
                const personInfoDiv = getPersonInfo(person);
                personInfoDiv.classList.add('person-info');
                personLi.appendChild(personInfoDiv);
            } else {
                existingInfo.remove();
            }                
            })
        }
        allPeopleShown = true;
    }
}


// add button for running multiple cycles at a time

buttonShowAllPeople.addEventListener('click', renderAllPeople)
buttonShowAllBusinesses.addEventListener('click', renderAllBusinesses)

