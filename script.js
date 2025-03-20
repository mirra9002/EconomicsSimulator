const buttonRunCycle = document.getElementById('btn-cycle');
const buttonStartTimerCycle = document.getElementById('btn-timer-cycle');
const buttonResetEconomics = document.getElementById('btn-reset-economics')
const buttonShowAllPeople = document.getElementById('btn-show-all-people');
const buttonShowAllBusinesses = document.getElementById('btn-show-all-businesses');

let allPeopleShown = false;
let allBusinessesShown = false;

class Person{
    constructor(){
        this.id = Math.floor(Math.random() * 100) + 1,
        this.name = this.generateRandomName(),
        this.age = Math.floor(Math.random() * 100) + 1,
        this.job = this.generateRandomJob(),
        this.totalMoney = Math.floor(Math.random() * (1000000 - 10000 + 1)) + 10000,
        this.yearIncome = Math.floor(Math.random() * (100000 - 15000 + 1)) + 15000,
        this.ownedBusinesses = 0
        this.happiness = Math.floor(Math.random() * (100 - 20 + 1)) + 20;
    }

    generateRandomName(){
        const firstNames = ["Alex", "Emma", "Liam", "Olivia", "Noah", "Sophia", "Mason", "Ava", "Ethan", "Isabella"];
        const lastNames = ["Smith", "Johnson", "Brown", "Williams", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];
        const firstNameIdx = Math.floor(Math.random() * firstNames.length);
        const lastNameIdx = Math.floor(Math.random() * lastNames.length);
        const firstName = firstNames[firstNameIdx];
        const lastName = lastNames[lastNameIdx];
        return `${firstName} ${lastName}`;
    }

    generateRandomJob(){
        const jobs = [
            "Software Engineer",
            "Doctor",
            "Teacher",
            "Electrician",
            "Graphic Designer",
            "Accountant",
            "Pilot",
            "Chef",
            "Photographer",
            "Journalist"
        ];
        const jobIdx = Math.floor(Math.random() * jobs.length);
        const job = jobs[jobIdx];
        return job;
    }

    die(){
        console.log(`Person ${this.id}: ${this.name} has passed away`);
        return null;
    }

    increaseAge(){
        this.age++;
        console.log(`Person ${this.id}: ${this.name} has increased it's age. Current age: ${this.age}`);
    }

    earnMoney(amount){
        this.totalMoney = this.totalMoney + amount;
        console.log(`Person ${this.id}: ${this.name} has earned ${amount}. Current total amount: ${this.totalMoney}`);
    }

    spendMoney(amount){
        this.totalMoney = this.totalMoney - amount;
        console.log(`Person ${this.id}: ${this.name} has spent ${amount}. Current total amount: ${this.totalMoney}`); 
    }

    startBusiness(business){
        this.ownedBusinesses.push(business);
        console.log(`Person ${this.id}: ${this.name} has started new business ${business}. Current businesses: ${this.ownedBusinesses}`);
    }

    editHappiess(amount){
        this.happiness = this.happiness + amount;
        if(amount >= 0){
            console.log(`Person ${this.id}: ${this.name} became happier on ${amount}. Current happiness: ${this.happiness}`);
        } else{
            console.log(`Person ${this.id}: ${this.name} became more sad on ${amount}. Current happiness: ${this.happiness}`);
        }
    }

}
class Business{
    constructor(){
        this.id = Math.floor(Math.random() * 100) + 1,
        this.name = this.generateRandomName(),
        this.ownerId = 0,
        this.productsAmount = Math.floor(Math.random() * 1000) + 1,
        this.totalMoney = Math.floor(Math.random() * (1000000 - 1000 + 1)) + 1000
    }

    generateRandomName(){
        const businessNames = [
            "Nike",
            "Adidas",
            "Apple",
            "McDonald's",
            "Microsoft",
            "Google",
            "Amazon",
            "Tesla",
            "Samsung",
            "Coca-Cola",
            "Pepsi",
            "Facebook",
            "Starbucks",
            "Toyota",
            "BMW",
            "Netflix",
            "Intel",
            "Sony",
            "Uber",
            "Airbnb"
        ];
        const nameIdx = Math.floor(Math.random() * businessNames.length);
        const name = businessNames[nameIdx];
        return name;
    }

    produce(quantity){
        this.productsAmount = this.productsAmount + quantity;
        console.log(`Business ${this.id}: ${this.name} produced ${quantity}. Current products amount: ${this.productsAmount}`); 
    }

    sellToAnotherOwner(newOwnerId, person){
        this.ownerId = newOwnerId;
        const deletedBusinessIdx = person.ownedBusinesses.findIndex(business => business.id === this.id);
        person.ownedBusinesses.splice(deletedBusinessIdx,1);
        console.log(`Business ${this.id}: ${this.name} has been sold to person with ID ${newOwnerId}`);
    }

    earnMoney(amount){
        this.totalMoney = this.totalMoney + amount;
        console.log(`Business ${this.id}: ${this.name} has earned ${amount}. Current total money: ${this.totalMoney}`);
    }
}

class Economics{
    constructor(people, businesses, cycle){
        this.people = people,
        this.businesses = businesses,
        this.totalMoney = 0;
        this.inflationRate = 1.02;
        this.cycle = cycle;
    }

    addPerson(person){
        this.people.push(person);
        this.totalMoney = this.totalMoney + person.totalMoney;
        console.log(`Economics has got new person: ${person.id} ${person.name}. Current people amoun: ${this.people.length}`);
    }

    addBusiness(business){
        this.businesses.push(business);
        this.totalMoney = this.totalMoney + business.totalMoney;
        console.log(`Economics has got new business: ${business.id} ${business.name}. Current people amoun: ${this.businesses.length}`);
    }

    runCycle(){
        this.cycle++;
        const peopleBorn = Math.floor(Math.random() * 10) + 1;
        const businessBorn = Math.floor(Math.random() * 2) + 1
        for(let i = 0; i<peopleBorn; i++){
            const person = new Person();
            this.addPerson(person);
        }
        for(let i = 0; i<businessBorn; i++){
            const business = new Business();
            this.addBusiness(business);
        }
        for(let person of this.people){
            person.increaseAge();
            person.earnMoney(person.yearIncome)
            person.spendMoney(person.yearIncome*0.8)
        }
        for(let business of this.businesses){
            business.produce(Math.floor(Math.random() * 100) + 1)
            business.earnMoney(business.totalMoney*0.1);
        }
        return {
            peopleBorn: peopleBorn,
            businessBorn: businessBorn,
            economicsCycle: this.cycle
        }
    }

    render(cycleResults){
        const divEconomics = document.getElementById('div-economics');
        divEconomics.innerHTML = '';
        const sectionCycle = document.createElement('section');
        sectionCycle.id = 'section-cycle';
        const pTotalMoney = document.createElement('p');
        const pTotalPeople = document.createElement('p');
        const pTotalBusinesses = document.createElement('p');
        const pPeopleBorn = document.createElement('p');
        const pBusinessesBorn = document.createElement('p');
        const pEconomicsCycle = document.createElement('p');
        pTotalMoney.innerText = `Total amount of money: ${this.totalMoney.toLocaleString('de-DE')}`;
        pTotalPeople.innerText = `Total amount of people: ${this.people.length}`;
        pTotalBusinesses.innerText = `Total amount of businesses: ${this.businesses.length}`;
        pPeopleBorn.innerText = `People born in this cycle: ${cycleResults.peopleBorn}`;
        pBusinessesBorn.innerHTML = `Businesses born in this cycle: ${cycleResults.businessBorn}`;
        pEconomicsCycle.innerHTML = `Current economics cycle: ${cycleResults.economicsCycle}`;

        sectionCycle.appendChild(pTotalMoney);
        sectionCycle.appendChild(pTotalPeople);
        sectionCycle.appendChild(pTotalBusinesses);
        sectionCycle.appendChild(pPeopleBorn);
        sectionCycle.appendChild(pBusinessesBorn);
        sectionCycle.appendChild(pEconomicsCycle);
        divEconomics.appendChild(sectionCycle);
    }
}

let economics = new Economics([], [], 0);
economics.render({});

buttonRunCycle.addEventListener('click', () => {
    const cycleResults = economics.runCycle();
    economics.render(cycleResults);
    allPeopleShown = false;
    allBusinessesShown = false;
});

let economicCycleInterval;
buttonStartTimerCycle.addEventListener('click', () => {
    if(!economicCycleInterval){
        economicCycleInterval = setInterval(() => {
            buttonStartTimerCycle.textContent = 'Pause cycle';
            const cycleResults = economics.runCycle();
            economics.render(cycleResults);
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
})
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
const getBusinessInfo = (business) => {
    const divBusinessInfo = document.createElement('div');
    const ulBusinessInfo = document.createElement('ul');
    
    const idLi = document.createElement('li');
    const nameLi = document.createElement('li');    
    const ownerIdLi = document.createElement('li');    
    const productsAmount = document.createElement('li');    
    const totalMoney = document.createElement('li');    
    
    idLi.textContent = `Id: ${business.id}`;
    nameLi.textContent = `Name: ${business.name}`;
    ownerIdLi.textContent = `Owner: ${business.ownerId}`;
    productsAmount.textContent = `Total products amount: ${business.productsAmount.toLocaleString('de-DE')}`;
    totalMoney.textContent = `Total money amount: \$${Math.round(business.totalMoney.toLocaleString('de-DE'))}`;
    
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


// add button for running multiple cycles at a time

buttonShowAllPeople.addEventListener('click', renderAllPeople)
buttonShowAllBusinesses.addEventListener('click', renderAllBusinesses)

