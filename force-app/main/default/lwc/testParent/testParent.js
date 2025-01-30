import { LightningElement, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex'
import getAllAccounts from '@salesforce/apex/challengeController.getAllAccounts';

export default class TestParent extends LightningElement {

// Modify the parent component used in challenge 8/9. ​
// Add an LDS form to create new Account records. The parent component should be refreshed so that the new record will appear. ​
//Update the child component so that it uses a record edit form so that we may view/edit each individual record. 
    // objectApiName = Account;

    @wire(getAllAccounts)
    accs;

    handleChildEvent(){
      refreshApex(this.accs);
    }

    handleSuccess(){
        refreshApex(this.accs);
    }
}