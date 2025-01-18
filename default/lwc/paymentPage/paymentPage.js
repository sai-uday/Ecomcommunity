import { LightningElement ,track} from 'lwc';
import getQR from '@salesforce/apex/Payment.getQR';
import Id from "@salesforce/user/Id";
import getOwnerItems from '@salesforce/apex/CommerceBackend.getOwnerItems';
import purchased from '@salesforce/apex/Purchase.purchased'
// import purchased from '@salesforce/apex/CommerceBackend.purchased';
// import { CurrentPageReference } from 'lightning/navigation';

export default class PaymentPage extends LightningElement {
    userId = Id;
    loading=true;
    sum=0.0;
    activeSectionMessage = '';
    qrCodeImage;
    connectedCallback(){
        this.gettingOwnerItems()
    }
     fetchQRCode(){
         getQR({amount:this.sum}).then((result) => {
             this.loading=false;
             this.qrCodeImage = result;
            console.log(result,"13")
            const divElement = this.template.querySelector('.region-for-qr');
            if (divElement) {
                // divElement.innerHTML='';
                // divElement.appendChild('teset')
                divElement.innerHTML = '';
                divElement.innerHTML=this.qrCodeImage;
                const buttonElement = document.createElement('lightning-button');
                buttonElement.variant = "success";
                buttonElement.label = "check status";
                console.log(buttonElement);
                divElement.appendChild(buttonElement);

            }
           
        })
        .catch((error) => {
            console.error('Error fetching QR Code:', error);
        });
    }
    async gettingOwnerItems(){
        await getOwnerItems({currentOwnerID:this.userId}).then((data)=>{
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
    redirectToOrders(event){
        console.log("hi")
        console.log(event.target.dataset.name);
        purchased({type:event.target.dataset.name}).then((result)=>{
            console.log("hi")
            console.log(result);
            window.location="https://cunning-koala-l7eh90-dev-ed.trailblaze.my.site.com/commercetest/s/order-detail-page?orderid="+result
        }).catch((error)=>{
            console.log("error occured",error);
        })
        
    }

    generateQR(){
        this.fetchQRCode();
    }
    

    handleToggleSection(event) {
        this.activeSectionMessage =
            'Open section name:  ' + event.detail.openSections;
        
    }

    handleSetActiveSectionC() {
        const accordion = this.template.querySelector('.example-accordion');
        accordion.activeSectionName = 'C';
    }
}