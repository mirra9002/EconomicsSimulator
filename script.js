const buttonRunCycle = document.getElementById('btn-cycle');
const buttonStartTimerCycle = document.getElementById('btn-timer-cycle');
const buttonResetEconomics = document.getElementById('btn-reset-economics')
const buttonShowAllPeople = document.getElementById('btn-show-all-people');
const buttonShowAllBusinesses = document.getElementById('btn-show-all-businesses');
const buttonShowAllTransactions = document.getElementById('btn-show-transactions');


import { Economics } from "./classes/economics.js";
import { Person } from "./classes/person.js";
import { Business } from "./classes/business.js";

let economics = new Economics([], [], 0);
economics.render({});

let allPeopleShown = false;
let sectionPeople;
let allBusinessesShown = false;
let sectionBusinesses;
let transactionsShown = false;
let sectionTransactions;

buttonRunCycle.addEventListener('click', () => {
    const cycleResults = economics.runCycle();
    economics.render(cycleResults);
    allPeopleShown = false;
    allBusinessesShown = false;
    transactionsShown = false;
    buttonShowAllPeople.textContent = 'Show All People'
    buttonShowAllBusinesses.textContent = 'Show All Businesses'
    buttonShowAllTransactions.textContent = 'Show All Transactions'
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
    allPeopleShown = false;
    allBusinessesShown = false;
    transactionsShown = false;
    buttonShowAllPeople.textContent = 'Show All People'
    buttonShowAllBusinesses.textContent = 'Show All Businesses'
    buttonShowAllTransactions.textContent = 'Show All Transactions'
})

const renderAllBusinesses = () => {
    if(allBusinessesShown === false){
        sectionBusinesses = document.createElement('section');
        sectionBusinesses.id = 'section-business';
        const sectionTitle = document.createElement('h2');
        sectionTitle.textContent = 'Businesses'
        sectionBusinesses.append(sectionTitle)
        const divEconomics = document.getElementById('div-economics');
        divEconomics.appendChild(sectionBusinesses);
        const ulBusilesses = document.createElement('ul');
        sectionBusinesses.appendChild(ulBusilesses);
        for(let business of economics.businesses){
            business.printBusinessData(ulBusilesses, economics)
        }
        allBusinessesShown = true;
        buttonShowAllBusinesses.textContent = 'Hide All Businesses';
    } else {
        sectionBusinesses.remove();
        allBusinessesShown = false
        buttonShowAllBusinesses.textContent = 'Show All Businesses';
    }
}
const renderAllPeople = () => {
    if(allPeopleShown === false){
        sectionPeople = document.createElement('section');
        sectionPeople.id = 'section-people';
        const sectionTitle = document.createElement('h2');
        sectionTitle.textContent = 'People'
        sectionPeople.append(sectionTitle)
        const divEconomics = document.getElementById('div-economics');
        divEconomics.appendChild(sectionPeople);
        const ulPeople = document.createElement('ul');
        sectionPeople.appendChild(ulPeople);
        for(let person of economics.people){
            person.printPersonData(ulPeople);
        }
        allPeopleShown = true;
        buttonShowAllPeople.textContent = 'Hide All People';
    } else {
        sectionPeople.remove();
        allPeopleShown = false;
        buttonShowAllPeople.textContent = 'Show All Businesses';
    }
}

const rendereAllTransactions = () => {
    if(!transactionsShown){
        const divEconomics = document.getElementById('div-economics');
        sectionTransactions = document.createElement('section');
        const sectionTitle = document.createElement('h2');
        sectionTransactions.id = 'section-transactions'
        
        const ulTransactions = document.createElement('ul');
        for(let transaction of economics.deals){
            if(transaction.cycle === economics.cycle){
                const transactionLi = document.createElement('li');
                // transactionLi.textContent = `Business: ${transaction.business}, person: ${transaction.person}, price: ${transaction.price}`;
                transactionLi.innerHTML = `<b>${transaction.person}</b> has bought <b>${transaction.itemsAmount}</b> items for <b>$${transaction.price}</b> from <b>${transaction.business}</b></b>`
                ulTransactions.appendChild(transactionLi)
            }
        }
        sectionTitle.textContent = 'Transactions of this year'
        sectionTransactions.append(sectionTitle)
        sectionTransactions.append(ulTransactions)
        divEconomics.append(sectionTransactions);
        transactionsShown = true;
        buttonShowAllTransactions.textContent = 'Hide All Transactions';
    } else {
        sectionTransactions.remove();
        transactionsShown = false;
        buttonShowAllTransactions.textContent = 'Show All Transactions';
    }
}

buttonShowAllPeople.addEventListener('click', renderAllPeople)
buttonShowAllBusinesses.addEventListener('click', renderAllBusinesses);
buttonShowAllTransactions.addEventListener('click', rendereAllTransactions)