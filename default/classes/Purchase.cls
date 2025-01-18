public class Purchase {
   @AuraEnabled
   public static string purchased(String type){
    try {
       list<Order_items_info__c> orderlist=new list<Order_items_info__c>();
       List<Ecom_Cart__c> listofcart=[SELECT Title__c,Price__c,Image_URL__c FROM Ecom_Cart__c];
       All_Orders__c acc = new All_Orders__c();
       insert acc;
       Integer Count=0;
       Decimal sumOfAmount=0;
       for(Ecom_Cart__c item: listofcart){
        count=count+1;
        sumOfAmount=sumOfAmount+item.Price__c;
        Order_items_info__c order = new Order_items_info__c();
        order.All_Orders__c=acc.Id;
        order.Title__c=item.Title__c;
        order.Price__c=item.Price__c;
        order.ImageURL__c=item.Image_URL__c;
        orderlist.add(order);
       } 
       acc.Payment_Mode__c=type;
       acc.No_of_items__c=count;
       acc.Amount__c=sumOfAmount.setScale(2);
       acc.Order_Status__c='Order Placed';
       update acc;
       All_Orders__c con=[SELECT Name FROM All_Orders__c WHERE Id=:acc.Id];
       if(orderlist.size()>0){
        insert orderlist;
       }
       delete listofcart;
       return con.Name;
    } 
     catch (Exception e) {
         System.debug(e.getMessage());
        throw new AuraHandledException(e.getMessage());
    }
   }
}