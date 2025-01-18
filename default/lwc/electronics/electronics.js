import { LightningElement, wire, track } from 'lwc';
import fetchCategoryProducts from '@salesforce/apex/CommerceBackend.fetchCategoryProducts';
import addingToCart from '@salesforce/apex/CommerceBackend.addingToCart';
import Id from "@salesforce/user/Id";
import getOwnerItems from '@salesforce/apex/CommerceBackend.getOwnerItems';
import deleteCartItem from '@salesforce/apex/CommerceBackend.deleteCartItem';



export default class Electronics extends LightningElement {
    isLoading = false;
    @track freshdata;
    categoryType;
    @track requiredDatatoDisplay
    userId = Id;
    cartItems;
    @track requiredData;
    connectedCallback() {
        this.isLoading = true;
        var pathname = window.location.pathname;
        var segments = pathname.split('/');
        var lastSegment = segments[segments.length - 1];
        this.categoryType = lastSegment;
        if (this.categoryType === 'mens-clothing') {
            this.categoryType = 'men\'s%20clothing';
        }
        else if (this.categoryType === 'womens-clothing') {
            this.categoryType = 'women\'s%20clothing';
        }
        else if (this.categoryType === "") {
            console.log("empty")
            this.categoryType = 'main';
        }
        this.getData();
        setTimeout(() => {
            this.checkCart();
        }, 1000);

    }
    async getData() {
        await fetchCategoryProducts({ CategoryName: this.categoryType }).then((data) => {
            this.requiredData = JSON.parse(data);
            // console.log('bsdisdhd')
            // console.log(JSON.stringify(this.requiredData), "hihi");
            this.isLoading = false;

        }).catch((error) => {
            console.log(error);
            this.isLoading = false;
        })
    }
     checkCart() {
         getOwnerItems({ currentOwnerID: this.userId }).then((data) => {
            console.log("hi"); 
            this.cartItems = (data);
            console.log(this.cartItems);
            for (let i = 0; i < this.requiredData.length; i++) {
                for (let j = 0; j < this.cartItems.length; j++) {
                    // console.log(JSON.stringify(this.requiredData[i]), "wdbjkwbd", (this.cartItems[j]))
                    if (this.requiredData[i].id == this.cartItems[j].ID_According_to_API__c) {
                        this.requiredData[i].isIteminCart = true;
                        break
                    }
                }
            }
            this.requiredDatatoDisplay=this.requiredData
            this.isLoading = false;
        }).catch((error) => {
            console.log("error", error);
            this.isLoading = false;
        }) 
    }
    async addingToCart(event) {
        console.log(event.target.dataset.id)
        console.log(event.target.dataset.title)
        console.log(event.target.dataset.price)
        console.log(event.target.dataset.imageurl)
        await addingToCart({ ID: event.target.dataset.id, title: event.target.dataset.title, Price: event.target.dataset.price, imageUrl: event.target.dataset.imageurl, currentOwnerID: this.userId }).then((
            () => {
                console.log("success")
                //SalesforceInteractions.setLoggingLevel(5); // For debugging purposes
              
                SalesforceInteractions.sendEvent({
                  interaction: {
                    name: 'View Catalog Object',
                    catalogObject: {
                      type: 'Product',
                      id: "test",
                      attributes: {
                        name: "nkdv",
                        sku: "nks"
                      }
                    }
                  }
                });
                this.checkCart();
            }
        )).catch((error) => {
            console.log("error occured", error)
        })
    }
    async handleAlertClick(event) {
        console.log(event.target.dataset.id);
        await deleteCartItem({ requiredId: parseInt(event.target.dataset.id) })
            .then(() => {
                this.getData();
                
                    this.checkCart();
                console.log("deletion successful");
            })
            .catch((error) => {
                console.log("error occurred in deletion", error);
            })
    }
    
    

}