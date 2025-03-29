import { Person } from "./person.js";
import { Business } from "./business.js";
import { getRandomNumber } from "../utils.js";
import { getRandomFloat } from "../utils.js";

export class Economics{
    constructor(people, businesses, cycle){
        this.people = people,
        this.businesses = businesses,
        this.totalMoney = 0;
        this.inflationRate = 1.02;
        this.cycle = cycle;
        this.deals = [];
    }

    addPerson(person){
        this.people.push(person);
        this.totalMoney = this.totalMoney + person.totalMoney;
    }

    addBusiness(business){
        this.businesses.push(business);
        this.totalMoney = this.totalMoney + business.totalMoney;
    }

    runCycle(){
        this.cycle++;
        const peopleBorn = getRandomNumber(1, 11);
        const businessBorn = getRandomNumber(1, 3);
        const startPopulation = this.people.length;
        for(let i = 0; i<peopleBorn; i++){
            const person = new Person();
            this.addPerson(person);
        }
        for(let i = 0; i<businessBorn; i++){
            let ownerIds = [];
            for(let person of this.people){
                ownerIds.push(person.id);
                console.log(ownerIds);
            }
            let minPersonIdx = 0;
            let maxPersonIdx = ownerIds.length - 1;
            let ownerIdIdx = getRandomNumber(minPersonIdx, maxPersonIdx + 1);
            let ownerId = ownerIds[ownerIdIdx];
            const business = new Business(ownerId);
            for(let person of this.people){
                if(person.id === ownerId){
                    person.startBusiness(business);
                    person.job = 'Businessman'
                    
                }
            }
            this.addBusiness(business);
        }
        for(let person of this.people){
            person.increaseAge();
            if(person.age >= 100*getRandomFloat(0.8, 1) || person.happiness <= 20){
                person.die(this)   
            } else {
                const luckIdx = getRandomNumber(1, 101);
                if(luckIdx >= 15){
                    person.increaseIncome();
                    person.happiness <= 99 ? person.editHappiness(Math.round(luckIdx*0.25)) : person.happiness = 99
                } else {
                    person.decreaseIncome();
                    person.happiness <= 99 ? person.editHappiness((Math.round(luckIdx*0.5)) * (-1)) : person.happiness = 99
                }
                person.earnMoney(person.yearIncome);
                for(let b of this.businesses){
                    const productsBought = Math.round(getRandomNumber(1, 21) * luckIdx/100);
                    if(person.totalMoney*0.9 > b.productCost*productsBought){
                        person.spendMoney(b.productCost*productsBought);
                        b.sellProduct(person,productsBought, productsBought*b.productCost);
                        const deal = {
                            business: b.name,
                            person: person.name,
                            price: b.productCost*productsBought,
                            itemsAmount: productsBought,
                            cycle: this.cycle
                        }
                        this.deals.push(deal);
                    }
                }
            }
        }
        const endPopulation = this.people.length;
        for(let business of this.businesses){
            business.produce(Math.floor(Math.random() * 100) + 1)
            business.totalMoney = business.calculateTotalMoney();
        }

        return {
            peopleBorn: peopleBorn,
            peopleDied: startPopulation + peopleBorn - endPopulation,
            businessBorn: businessBorn,
            economicsCycle: this.cycle,
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
        const pPeopleDied = document.createElement('p');
        pTotalMoney.innerHTML = `<strong>Total amount of money:</strong> $${this.totalMoney.toLocaleString('de-DE')}`;
        pTotalPeople.innerHTML = `<strong>Total amount of people:</strong> ${this.people.length}`;
        pTotalBusinesses.innerHTML = `<strong>Total amount of businesses:</strong> ${this.businesses.length}`;
        pPeopleBorn.innerHTML = `<strong>People born this year:</strong> ${cycleResults.peopleBorn}`;
        pBusinessesBorn.innerHTML = `<strong>Businesses born this year:</strong> ${cycleResults.businessBorn}`;
        pEconomicsCycle.innerHTML = `<strong>Current economics year:</strong> ${cycleResults.economicsCycle}`;
        pPeopleDied.innerHTML = `<strong>People died this year:</strong> ${cycleResults.peopleDied}`
        sectionCycle.appendChild(pTotalMoney);
        sectionCycle.appendChild(pTotalPeople);
        sectionCycle.appendChild(pTotalBusinesses);
        sectionCycle.appendChild(pPeopleBorn);
        sectionCycle.appendChild(pPeopleDied);
        sectionCycle.appendChild(pBusinessesBorn);
        sectionCycle.appendChild(pEconomicsCycle);
        divEconomics.appendChild(sectionCycle);
        console.log('render function has worked');
    }
}