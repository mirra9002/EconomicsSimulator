import { getRandomNumber } from "../utils.js";

export class Person{
    constructor(){
        this.id = getRandomNumber(1, 1000000),
        this.name = Person.generateRandomName(),
        this.age = getRandomNumber(14, 100),
        this.job = Person.generateRandomJob(),
        this.totalMoney = getRandomNumber(100, 1000),
        this.yearIncome = getRandomNumber(15000, 25000),
        this.ownedBusinesses = 0
        this.happiness = getRandomNumber(20, 100);
        this.isAlive = true;
        this.transactions = [];
        this.jobs = [];
    }


    static generateRandomName(){
        const firstNames = ["Alex", "Emma", "Liam", "Olivia", "Noah", "Sophia", "Mason", "Ava", "Ethan", "Isabella"];
        const lastNames = ["Smith", "Johnson", "Brown", "Williams", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];
        const firstNameIdx = Math.floor(Math.random() * firstNames.length);
        const lastNameIdx = Math.floor(Math.random() * lastNames.length);
        const firstName = firstNames[firstNameIdx];
        const lastName = lastNames[lastNameIdx];
        return `${firstName} ${lastName}`;
    }

    static generateRandomJob(){
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

    printPersonData(ulPeople){
        const personLi = document.createElement('li');
        personLi.textContent = this.name;
        ulPeople.appendChild(personLi);
        personLi.addEventListener('click', () => {
            if (event.target.closest('.person-info')) return;
            let existingInfo = personLi.querySelector('.person-info');
            if(!existingInfo){
                const personInfoDiv = this.getPersonInfo();
                personInfoDiv.classList.add('person-info');
                personLi.appendChild(personInfoDiv);
            } else {
                existingInfo.remove();
            }                
        })
    }

    getPersonInfo() {
        const divPersonInfo = document.createElement('div');
        const ulPersonInfo = document.createElement('ul');

        const idLi = document.createElement('li');
        const nameLi = document.createElement('li');    
        const jobLi = document.createElement('li');
        const totalMoneyLi = document.createElement('li');    
        const yearIncomeLi = document.createElement('li');    
        const ownedBusinessesLi = document.createElement('li');    
        const happinessLi = document.createElement('li');    
        const checkPersonHistory = document.createElement('li')

        idLi.textContent = `Id: ${this.id}`;
        nameLi.textContent = `Name: ${this.name}`;
        jobLi.textContent = `Job: ${this.job}`;
        totalMoneyLi.textContent = `Total amount of money: \$${Math.round(this.totalMoney).toLocaleString('de-DE')}`;
        yearIncomeLi.textContent = `Annual income: \$${this.yearIncome.toLocaleString('de-DE')}`;
        ownedBusinessesLi.textContent = `Amount of owned businesses: ${this.ownedBusinesses}`;
        happinessLi.textContent = `Happiness: ${this.happiness}%`;
        checkPersonHistory.innerHTML = `<i> - Check person's info - </i>`
        
        ulPersonInfo.appendChild(nameLi);
        ulPersonInfo.appendChild(jobLi)
        ulPersonInfo.appendChild(totalMoneyLi);
        ulPersonInfo.appendChild(yearIncomeLi);
        ulPersonInfo.appendChild(ownedBusinessesLi);
        ulPersonInfo.appendChild(happinessLi);
        divPersonInfo.appendChild(ulPersonInfo);
        divPersonInfo.appendChild(checkPersonHistory);

        checkPersonHistory.addEventListener('click', this.getPersonHistory.bind(this))

        return divPersonInfo;
    }

    getPersonHistory(){
        const personHistoryDiv = document.createElement('div');
        const personHistoryUl = document.createElement('ul');
        
        const nameLi = document.createElement('li');
        const earnedMoney = document.createElement('li');
        nameLi.textContent = `Name: ${this.name}`;
        console.log(nameLi.textContent);
        earnedMoney.textContent = `Total money earned: $${Math.round(this.totalMoney).toLocaleString('de-DE')}`;


        personHistoryUl.appendChild(nameLi)
        personHistoryUl.appendChild(earnedMoney)

        
        const closeOverlayButton = document.createElement('button');
        closeOverlayButton.textContent = 'Close';
        closeOverlayButton.addEventListener('click', () => {overlayDiv.classList.remove('visible')})

        personHistoryDiv.appendChild(personHistoryUl);
        personHistoryDiv.appendChild(closeOverlayButton);
        personHistoryDiv.classList.add('modal');

        const overlayDiv = document.getElementById('overlay');
        overlayDiv.innerHTML = ''; 
        overlayDiv.classList.toggle('visible');
        
        overlayDiv.appendChild(personHistoryDiv);
    }

}

