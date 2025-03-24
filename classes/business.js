import { getRandomNumber } from "../utils.js";

export class Business{
    constructor(ownerId){
        this.id = getRandomNumber(1, 1000000);
        this.name = this.generateRandomName(),
        this.ownerId = ownerId,
        this.productsAmount = getRandomNumber(1, 1000);
        this.totalMoney = getRandomNumber(1000, 1000000);
        
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
