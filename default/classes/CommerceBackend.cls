public with sharing class CommerceBackend {
    public String pdfContent { get; set; }
    @AuraEnabled(cacheable=true)
    public static String getAllProducts(){
        try {
            String endpoint = 'https://fakestoreapi.com/products';
            
            HttpRequest request = new HttpRequest();
            request.setEndpoint(endpoint);
            request.setMethod('GET');
            
            Http http = new Http();
            HttpResponse response = http.send(request);
            
            if (response.getStatusCode() == 200) {
                return response.getBody();
            } else {
                System.debug('Failed to get response. Status code: ' + response.getStatusCode());
                return 'Failed to get response. Status code: ' + response.getStatusCode();
            } 
        } catch (System.CalloutException e) {
            System.debug('Callout Exception: ' + e.getMessage());
            return 'Failed to get response due to callout exception: ' + e.getMessage();
        } catch (Exception e) {
            System.debug('Exception: ' + e.getMessage());
            throw e;
        }
    }
    @AuraEnabled(cacheable=true)
    public static string fetchCategoryProducts(String CategoryName){
        if(CategoryName=='main'){
            try {
                String endpoint = 'https://fakestoreapi.com/products';
                
                HttpRequest request = new HttpRequest();
                request.setEndpoint(endpoint);
                request.setMethod('GET');
                
                Http http = new Http();
                HttpResponse response = http.send(request);
                
                if (response.getStatusCode() == 200) {
                    return response.getBody();
                } else {
                    System.debug('Failed to get response. Status code: ' + response.getStatusCode());
                    return 'Failed to get response. Status code: ' + response.getStatusCode();
                } 
            } catch (System.CalloutException e) {
                System.debug('Callout Exception: ' + e.getMessage());
                return 'Failed to get response due to callout exception: ' + e.getMessage();
            } catch (Exception e) {
                System.debug('Exception: ' + e.getMessage());
                throw e;
            }    
        }
        else{
            try {
                String endpoint = 'https://fakestoreapi.com/products/category/'+CategoryName;
                System.debug(endpoint);
                
                HttpRequest request = new HttpRequest();
                request.setEndpoint(endpoint);
                request.setMethod('GET');
                
                Http http = new Http();
                HttpResponse response = http.send(request);
                
                if (response.getStatusCode() == 200) {
                    return response.getBody();
                } else {
                    System.debug('Failed to get response. Status code: ' + response.getStatusCode());
                    return 'Failed to get response. Status code: ' + response.getStatusCode();
                } 
            } catch (System.CalloutException e) {
                System.debug('Callout Exception: ' + e.getMessage());
                return 'Failed to get response due to callout exception: ' + e.getMessage();
            } catch (Exception e) {
                System.debug('Exception: ' + e.getMessage());
                throw e;
            }
        }
    }
    @AuraEnabled
    public static void addingToCart(Integer ID,String title,Decimal Price,String imageUrl,ID currentOwnerID){
        try {
            Ecom_Cart__c item =new Ecom_Cart__c(Title__c=title,Price__c=Price,ID_According_to_API__c=ID,Image_URL__c=imageUrl,OwnerId=currentOwnerID);
            insert item;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static List<Ecom_Cart__c> getOwnerItems(ID currentOwnerID){
        try {
            return [SELECT Title__c,Price__c,ID_According_to_API__c,Image_URL__c FROM Ecom_Cart__c WHERE OwnerId=:currentOwnerID];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static Void deleteCartItem(Integer requiredId){
        try {
            System.debug('hi');
            System.debug(requiredId);
            List<Ecom_Cart__c> dataToDelete=[SELECT Title__c,Price__c,ID_According_to_API__c,Image_URL__c FROM Ecom_Cart__c WHERE ID_According_to_API__c=:requiredId];
            System.debug(dataToDelete);
            delete dataToDelete;
            System.debug('successfully Deleted');
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static list<All_Orders__c> getAllOrders(){
        try {
            list<All_Orders__c> listofallOrders =  [SELECT Id,Name,Amount__c,No_of_items__c,Payment_Mode__c FROM All_Orders__c];
            return listofallOrders;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    } 
    @AuraEnabled
    public static List<All_Orders__c> getorderDetails(String orderID){
        try {
            return [SELECT Id,Name,Amount__c,Payment_Mode__c,No_of_items__c,Order_Status__c,(select Title__c,Price__c,ImageURL__c FROM Product_Order_info__r) FROM All_Orders__c where Name=:orderID];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());     
        }
    }
    @AuraEnabled
    public static string generatePDF(String data){
        try {
            this.pdfContent=data;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
