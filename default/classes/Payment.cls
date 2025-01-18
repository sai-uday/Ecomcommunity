public class Payment {
    @AuraEnabled
    public static string getQR(Decimal amount){
        System.debug(amount);
        Integer a=50;
        try {
        String endpoint = 'https://upiqr.in/api/qr';
        HttpRequest request = new HttpRequest();
        request.setEndpoint(endpoint);
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/json');
        String jsonBody = '{"name" : "ORDER PAYMENT", "vpa": "shop@paytm","amount":' + amount + '}';
        System.debug(jsonBody);
        request.setBody(jsonBody);
        
        Http http = new Http();
        Httpresponse response = http.send(request);
        if (response.getStatusCode() == 200 || response.getStatusCode() == 201) {
            System.debug(response.getBody());
            Blob imageBlob = response.getBodyAsBlob();
            return response.getBody();
        } else {
            throw new AuraHandledException('Error: ' + response.getStatus() + ' - ' + response.getStatusCode());
        }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}