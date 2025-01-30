public with sharing class challengeController {
    public challengeController() {

    }


    @AuraEnabled
    public static Contact getContactRecord(){
        try {
            Contact con = [SELECT Id,Name,Phone, Email FROM Contact];
            return con;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static Contact getContact(String searchKey){
        try {
            Contact contact = [SELECT Id, Name, Phone, Department FROM Contact WHERE Name LIKE :('%' + searchKey + '%') LIMIT 1];
            return contact;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

// Class Challenges

    @AuraEnabled(cacheable=true)
    public static List<Account> getAllAccounts(){
        try {
           return [SELECT Name, AnnualRevenue, ParentId FROM Account LIMIT 50];

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