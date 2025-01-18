import { LightningElement } from 'lwc';
import Id from "@salesforce/user/Id";
import getOwnerItems from '@salesforce/apex/CommerceBackend.getOwnerItems';
import getAllOrders from '@salesforce/apex/CommerceBackend.getAllOrders';
import getorderDetails from '@salesforce/apex/CommerceBackend.getorderDetails'

export default class OrderDetailPage extends LightningElement {
    userId = Id;
    items;
    sum=0;
    orderdata;
    itemsdata;
    reqdata
    connectedCallback(){
        const currentpageurl=window.location.href;
        const orderId=currentpageurl.split("=")[1];
        console.log(orderId);
        getorderDetails({orderID:orderId}).then((data)=>{
            this.itemsdata =data[0];
            this.reqdata=this.itemsdata.Product_Order_info__r;   
            this.orderdata=data;
            console.log(this.orderdata);
        }).catch((error)=>{
            console.log("error occured",error)
        })
        // getOwnerItems({currentOwnerID:this.userId}).then((data)=>{
        
        //     this.items = (data);
           
        //     this.sum=0;
           
        //     for(let i=0;i<this.items.length;i++){    
        //         this.sum += (this.items[i].Price__c)
        //     }
        //     this.sum=this.sum.toFixed(2)
        // }).catch((error)=>{
        //     console.log(error)
        // })
        // getAllOrders()
    }
    generateInvoice(){
        console.log("clicked")
        const data=this.template.querySelector(".datatopdf");
        
    }
}