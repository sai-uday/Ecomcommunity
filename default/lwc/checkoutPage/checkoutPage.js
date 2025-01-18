import { LightningElement,wire } from 'lwc';
import Id from "@salesforce/user/Id";
import getOwnerItems from '@salesforce/apex/CommerceBackend.getOwnerItems';
import deleteCartItem from '@salesforce/apex/CommerceBackend.deleteCartItem';
import { CurrentPageReference } from 'lightning/navigation';

export default class CheckoutPage extends LightningElement {
    userId = Id;
    items;
    sum=0;
    len;

    connectedCallback(){
        this.gettingOwnerItems();
    }
    callPaymentPage(){
        console.log("called");
        window.location="https://cunning-koala-l7eh90-dev-ed.trailblaze.my.site.com/commercetest/s/payment-page"
        console.log("redirected")
    }
    gettingOwnerItems(){
        getOwnerItems({currentOwnerID:this.userId}).then((data)=>{
            console.log(data,"data")
            this.items = (data);
            console.log(data.length,"fdji");
            this.sum=0;
           
            for(let i=0;i<this.items.length;i++){
                this.sum += (this.items[i].Price__c)
            }
            this.sum=this.sum.toFixed(2)
            console.log(JSON.stringify(this.sum),"iam sim")
            console.log(JSON.stringify(this.items))
        }).catch((error)=>{
            console.log(error)
        })
    }
    async handleAlertClick(event) {
        console.log(parseInt(event.target.dataset.id));
        await deleteCartItem({ requiredId: parseInt(event.target.dataset.id) })
            .then(() => {
                this.gettingOwnerItems();
                console.log("deletion successful");
            })
            .catch((error) => {
                console.log("error occurred in deletion", error);
            })
    }
}