import { LightningElement } from 'lwc';
import getAllProducts from '@salesforce/apex/CommerceBackend.getAllProducts';
export default class Products extends LightningElement {
    reqdata;
    isLoading=false;
    connectedCallback() {
        this.isLoading=true
        getAllProducts().then((data) => {
            this.reqdata=JSON.parse(data); 
            this.isLoading=false
        }).catch((error)=>{
            console.log(error)
            this.isLoading=false
        })
    }
}