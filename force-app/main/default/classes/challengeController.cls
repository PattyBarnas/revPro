public with sharing class challengeController {
    public challengeController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Case> getOpenCases() {
        try {
            return [SELECT Id, AccountId, Status, Origin, Priority FROM Case WHERE Status != 'Closed' LIMIT 15];
        } catch (Exception e) {
            throw new AuraHandledException('Error fetching open cases: ' + e.getMessage());
        }
    }
    // Method to update cases
    @AuraEnabled
    public static void updateCases(List<Case> casesToUpdate) {
        try {
            update casesToUpdate;
        } catch (Exception e) {
            throw new AuraHandledException('Error updating cases: ' + e.getMessage());
        }
    }

    // Method to create a new case
    @AuraEnabled
    public static Case createCase(String accountId, String status, String origin, String priority) {
        try {
            Case newCase = new Case(AccountId = accountId, Status = status, Origin = origin, Priority = priority);
            insert newCase;
            return newCase;
        } catch (Exception e) {
            throw new AuraHandledException('Error creating case: ' + e.getMessage());
        }
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