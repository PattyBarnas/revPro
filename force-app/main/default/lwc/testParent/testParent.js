import { LightningElement, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex'
import getAllAccounts from '@salesforce/apex/challengeController.getAllAccounts';
import OBJECT_API_NAME from '@salesforce/schema/Account';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_ANNUAL_REVENUE from '@salesforce/schema/Account.AnnualRevenue';

export default class TestParent extends LightningElement {

  objectApiName = OBJECT_API_NAME;
  accName = ACCOUNT_NAME;
  accAnnualRevenue = ACCOUNT_ANNUAL_REVENUE;

  error;

    @wire(getAllAccounts)
    accs;

    wiredAccounts({errors, data}){
      if(data){
        this.accs = data;
        this.errors = undefined;
      } else if(error){
        this.errors = errors;
        this.accs = undefined;
      }
    }

    handleChildEvent(){
      refreshApex(this.accs);
    }

    handleSuccess(){
        refreshApex(this.accs);
    }
}