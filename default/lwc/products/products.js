import { LightningElement } from 'lwc';
import getAllProducts from '@salesforce/apex/CommerceBackend.getAllProducts';
export default class Products extends LightningElement {
    reqdata;
    connectedCallback() {
        getAllProducts().then((data) => {
            this.reqdata=JSON.parse(data); 
        }).catch((error)=>{
            console.log(error)
        })
    }
}