import { api, LightningElement } from 'lwc';
import deleteAccount from '@salesforce/apex/challengeController.deleteAccount';

export default class TestChild extends LightningElement {
    @api account;

    async handleDelete(e){
       
        await deleteAccount({ id: e.target.dataset.recordid });
        this.dispatchEvent(new CustomEvent('deleteevent'));
      
    }
    handleSuccess(event) {
        const updatedRecord = event.detail.fields;
        console.log('Record updated: ', updatedRecord);
    }
}