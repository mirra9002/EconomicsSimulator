import { getRandomNumber } from "../utils.js";

export class Person{
    constructor(){
        this.id = getRandomNumber(1, 1000000),
        this.name = this.generateRandomName(),
        this.age = getRandomNumber(14, 100),
        this.job = this.generateRandomJob(),
        this.totalMoney = getRandomNumber(100, 1000),
        this.yearIncome = getRandomNumber(15000, 25000),
        this.ownedBusinesses = 0
        this.happiness = getRandomNumber(20, 100);
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

