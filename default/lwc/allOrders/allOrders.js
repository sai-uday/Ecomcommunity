import { LightningElement } from 'lwc';
import getAllOrders from '@salesforce/apex/CommerceBackend.getAllOrders';

export default class AllOrders extends LightningElement {
    allOrders;
    connectedCallback(){
        getAllOrders().then(data => {
            this.allOrders = data.map(item => ({
                ...item,
                Payment_Mode__c: item.Payment_Mode__c === "Cash on Delivery" ? "COD" : "UPI"

            }))
        }).catch((error) => {
            console.log(JSON.stringify(this.allOrders));
        })
        .catch((error) => {
            console.error('Error fetching orders:', error);
        });
    }
    reditectoOrderDetail(event){
        console.log(event.target.dataset.id);
        const orderId = event.target.dataset.id;
       window.location="https://cunning-koala-l7eh90-dev-ed.trailblaze.my.site.com/commercetest/s/order-detail-page?orderid="+orderId;
    }
}