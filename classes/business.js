import { getRandomNumber } from "../utils.js";

export class Business{
    constructor(ownerId){
        this.id = getRandomNumber(1, 1000000);
        this.name = Business.generateRandomName(),
        this.ownerId = ownerId,
        this.productsAmount = getRandomNumber(1, 1000);
        this.totalMoney = getRandomNumber(1000, 1000000);
        
    }

    static generateRandomName(){
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

    printBusinessData(ulBusilesses, economics){
        const businessLi = document.createElement('li');
        businessLi.textContent = this.name;
        ulBusilesses.appendChild(businessLi);
        businessLi.addEventListener('click', () => {
            let existingInfo = businessLi.querySelector('.business-info');
            if(!existingInfo){
                const businessInfoDiv = this.getBusinessInfo(economics);
                businessInfoDiv.classList.add('business-info');
                businessLi.appendChild(businessInfoDiv);
            } else {
                existingInfo.remove();
            }                
        })
    }

    getBusinessInfo(economics){
        const divBusinessInfo = document.createElement('div');
        const ulBusinessInfo = document.createElement('ul');
        
        const idLi = document.createElement('li');
        const nameLi = document.createElement('li');    
        const ownerIdLi = document.createElement('li');    
        const productsAmount = document.createElement('li');    
        const totalMoney = document.createElement('li');    
        let ownerName;
        for(let person of economics.people){
            if(person.id === this.ownerId){;
                ownerName = person.name;
                person.totalMoney = this.totalMoney
            }
        }

        idLi.textContent = `Id: ${this.id}`;
        nameLi.textContent = `Name: ${this.name}`;
        ownerIdLi.textContent = `Owner: ${ownerName}`;
        productsAmount.textContent = `Total products amount: ${this.productsAmount.toLocaleString('de-DE')}`;
        totalMoney.textContent = `Total money amount: \$${Math.round(this.totalMoney).toLocaleString('de-DE')}`;
        
        // ulBusinessInfo.appendChild(idLi);
        ulBusinessInfo.appendChild(nameLi);
        ulBusinessInfo.appendChild(ownerIdLi);
        ulBusinessInfo.appendChild(productsAmount);
        ulBusinessInfo.appendChild(totalMoney);
        divBusinessInfo.appendChild(ulBusinessInfo);
        return divBusinessInfo;
    }
}
