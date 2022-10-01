const Order = require("./assignment1Order");


const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    ITEM: Symbol("Item"),
    Item_1:   Symbol("Item_1"),
    Item_2:   Symbol("Item_2"),
    DIP:      Symbol("Dip"),
    BASE_TYPE: Symbol("BaseType"),
    CHOCLATE_FUDGE:  Symbol("Chocolate")
});

module.exports = class ShwarmaOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sToppings = "";
        this.sChocolateFudge = "";
        this.sItem = "";
        this.sOrderCost = "";

    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.ITEM;
                aReturn.push("Welcome to Harsimrat 's Food Court:");
                aReturn.push("Type 1 for Chicken Soup and  Type 2 for Tea Biscuit ");
                break;
            case OrderState.ITEM:
                if(sInput==1){
                        this.stateCur=OrderState.Item_1
                        this.sItem = "Chicken Soup";
                        this.sOrderCost= 5;
                    aReturn.push("What size would you like to have?");
                    aReturn.push("small | medium | large");
                    }
                    else if(sInput==2){
                        this.stateCur=OrderState.Item_2
                        this.sItem = "Tea Biscuit";
                        this.sOrderCost= 12;
                        aReturn.push("What size would you like to have?");
                        aReturn.push("small | medium | large");  
                    }   
                    break;  
                case OrderState.Item_1:
                    if(sInput=="small"){
                        this.stateCur = OrderState.DIP
                        this.sSize = this.sInput;
                        this.sOrderCost= this.sOrderCost + 5;
                        aReturn.push("What kind of Dip is needed");}
                        else if(sInput=="medium"){
                            this.stateCur = OrderState.DIP
                            this.sSize = this.sInput;
                            this.sOrderCost= this.sOrderCost + 10;
                            aReturn.push("What kind of dip is needed");}
                            else if(sInput=="large"){
                                this.stateCur = OrderState.DIP
                                this.sSize = this.sInput;
                                this.sOrderCost= this.sOrderCost + 15;
                                aReturn.push("What kind of Dip is needed");}
                    break;  
                case OrderState.Item_2:
                    if(sInput=="small"){
                        this.stateCur = OrderState. BASE_TYPE
                        this.sSize = this.sInput;
                        this.sOrderCost= this.sOrderCost + 5;
                        aReturn.push("What Base type would you like to have ");}
                        else  if(sInput=="medium"){
                            this.stateCur = OrderState. BASE_TYPE
                            this.sSize = this.sInput;
                            this.sOrderCost= this.sOrderCost + 10;
                            aReturn.push("What Base type would you like to have ");}
                            if(sInput=="large"){
                                this.stateCur = OrderState. BASE_TYPE
                                this.sSize = this.sInput;
                                this.sOrderCost= this.sOrderCost + 15;
                                aReturn.push("What Base type would you like to have ");}
                    break;   
            case OrderState.DIP:
                this.stateCur = OrderState.CHOCLATE_FUDGE
                this.sToppings = sInput;
                this.sOrderCost= this.sOrderCost + 3;
                aReturn.push("Would you like Chocolate Fudge with that? ");
                break;
            case OrderState. BASE_TYPE:
                this.stateCur = OrderState.CHOCLATE_FUDGE
                this.sToppings = sInput;
                this.sOrderCost= this.sOrderCost + 3;
                aReturn.push("Would you like Chocolate Fudge with that? ");
                break;
            case OrderState.CHOCLATE_FUDGE:
                this.isDone(true);
                if(sInput.toLowerCase() != "no" || sInput!= "No"){
                    this.sChocolateFudge = "Chocolate Fudge";
                    this.sOrderCost= this.sOrderCost + 5;
                }
                else{
                    this.sChocolateFudge = "No Chocolate Fudge";
                    
                }
                aReturn.push("Thank-you for your order of:-");
                aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings} and`);
                if(this.sChocolateFudge){
                    aReturn.push(`${this.sChocolateFudge}`);
                }

                aReturn.push(`Total Order Cost = $${this.sOrderCost}`);

                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}