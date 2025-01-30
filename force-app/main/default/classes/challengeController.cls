public with sharing class challengeController {
    public challengeController() {

    }

    @AuraEnabled(cacheable=true)
    public static Contact getContact(){
        try {
            Contact contact = [SELECT Id, Name, Phone, Department FROM Contact WHERE Department = 'Salesforce'];
            System.debug('Contact Data: ' + contact);
            return contact;
        } catch (Exception e) {
            System.debug('Error: ' + e.getMessage());
            throw new AuraHandledException(e.getMessage());
        }
    }




// Class Challenges

    @AuraEnabled(cacheable=true)
    public static List<Account> getAllAccounts(){
        try {
           return [SELECT Name, AnnualRevenue, ParentId FROM Account];

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


    @AuraEnabled
    public static void deleteAccount(String id){
        try {
            Account acc = [SELECT Id, Name, AnnualRevenue FROM Account WHERE Id = :id LIMIT 1];
            delete acc;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}