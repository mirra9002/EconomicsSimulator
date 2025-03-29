import { getRandomNumber } from "../utils.js";
import { formatNumber } from "../utils.js";
import { getRandomFloat } from "../utils.js";

export class Person{
    constructor(){
        this.id = getRandomNumber(1, 1000000),
        this.name = Person.generateRandomName(),
        this.age = getRandomNumber(14, 100),
        this.job = Person.generateRandomJob(),
        this.totalMoney = getRandomNumber(100, 1000),
        this.yearIncome = getRandomNumber(15000, 25000),
        this.ownedBusinesses = [],
        this.happiness = getRandomNumber(20, 100);
        this.isAlive = true;
        this.transactions = [];
        this.jobs = [];
        this.businesses = [];
    }


    static generateRandomName(){
        const firstNames = [
            "James", "Mary", "John", "Patricia", "Robert",
            "Jennifer", "Michael", "Linda", "William", "Elizabeth",
            "David", "Barbara", "Richard", "Susan", "Joseph",
            "Jessica", "Charles", "Sarah", "Thomas", "Karen"
          ];
          
          const lastNames = [
            "Smith", "Johnson", "Williams", "Brown", "Jones",
            "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
            "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson",
            "Thomas", "Taylor", "Moore", "Jackson", "Martin"
          ];
          
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

    die(economics){
        for(let p of economics.people){
            if(p.id === this.id){
                const idx = economics.people.indexOf(p);
                economics.people.splice(idx, 1);
            }
        }
        console.log('DIED ', this.name);
    }

    increaseAge(){
        this.age++;
    }

    decreaseIncome(){
        this.yearIncome = Math.round(this.yearIncome*getRandomFloat(0.5, 1));
    }

    increaseIncome(){
        this.yearIncome = Math.round(this.yearIncome*getRandomFloat(1, 1.2));
    }

    earnMoney(amount){
        this.totalMoney = this.totalMoney + amount;
        this.transactions.push(amount);
    }

    spendMoney(amount){
        this.totalMoney = this.totalMoney - amount;
        if(amount != 0){
            this.transactions.push(amount * (-1));
        }
    }

    startBusiness(business){
        this.ownedBusinesses.push(business);
        this.businesses.push(business);
    }

    editHappiness(amount){
        this.happiness = this.happiness + amount;
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
        const ageLi = document.createElement('li');
        const jobLi = document.createElement('li');
        const totalMoneyLi = document.createElement('li');    
        const yearIncomeLi = document.createElement('li');    
        const ownedBusinessesLi = document.createElement('li');    
        const happinessLi = document.createElement('li');    
        const checkPersonHistory = document.createElement('li')

        idLi.textContent = `Id: ${this.id}`;
        nameLi.textContent = `Name: ${this.name}`;
        ageLi.textContent = `Age: ${this.age}`;
        jobLi.textContent = `Job: ${this.job}`;
        totalMoneyLi.textContent = `Total amount of money: \$${Math.round(this.totalMoney).toLocaleString('de-DE')}`;
        yearIncomeLi.textContent = `Annual income: \$${this.yearIncome.toLocaleString('de-DE')}`;
        ownedBusinessesLi.textContent = `Amount of owned businesses: ${this.ownedBusinesses.length}`;
        happinessLi.textContent = `Happiness: ${this.happiness}%`;
        checkPersonHistory.innerHTML = `<i> - Check person's info - </i>`
        
        ulPersonInfo.appendChild(nameLi);
        ulPersonInfo.appendChild(ageLi);
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
        const divTitle = document.createElement('h2');
        divTitle.textContent = 'Person detailed history'
        
        const nameLi = document.createElement('li');
        const earnedMoneyLi = document.createElement('li');
        const transactionsLi = document.createElement('li');
        const businessesLi = document.createElement('li');

        nameLi.textContent = `Name: ${this.name}`;
        let totalMoneyEarned;
        if(this.transactions.length>0){
            const positiveTransactions = this.transactions.filter(a => a>=0)
            totalMoneyEarned = positiveTransactions.reduce((a,b) => a+b);
        } else {
            totalMoneyEarned = this.totalMoney
        }
        earnedMoneyLi.textContent = `Total money earned: $${Math.round(totalMoneyEarned).toLocaleString('de-DE')}`;
            let transactionsFormatted = this.transactions.map(t => formatNumber(t));
        transactionsLi.textContent = `Transactions: ${transactionsFormatted.join('; ')}`;
        const businsessOwned = this.businesses.map(b => b.name);
        businessesLi.textContent = `Businesses (ever owned): ${businsessOwned.join('; ')}`;

        personHistoryDiv.append(divTitle)
        personHistoryUl.appendChild(nameLi)
        personHistoryUl.appendChild(earnedMoneyLi)
        personHistoryUl.appendChild(transactionsLi);
        personHistoryUl.appendChild(businessesLi);

        
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

