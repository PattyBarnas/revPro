import { api, LightningElement } from 'lwc';
import deleteAccount from '@salesforce/apex/challengeController.deleteAccount';
import OBJECT_API_NAME from '@salesforce/schema/Account';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_ANNUAL_REVENUE from '@salesforce/schema/Account.AnnualRevenue';


export default class TestChild extends LightningElement {
    @api account;
    objectApiName = OBJECT_API_NAME;
    accName = ACCOUNT_NAME;
    accAnnualRevenue = ACCOUNT_ANNUAL_REVENUE;


    async handleDelete(e){
       
        await deleteAccount({ id: e.target.dataset.recordid });
        this.dispatchEvent(new CustomEvent('deleteevent'));
      
    }
    handleSuccess(event) {
        const updatedRecord = event.detail.fields;
        console.log('Record updated: ', updatedRecord);
    }
}