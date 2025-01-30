import { LightningElement, api, wire } from 'lwc';
import getContact from '@salesforce/apex/challengeController.getContact';

export default class ContactInfo extends LightningElement {
    contacts;
    error;
    userInput = ''


    async handleLoad(e){
        try {
            // this.isLoading = true;
            this.contacts = await getContact({searchKey: e.target.value});
            this.error = undefined;

        } catch (error) {
            this.contact = undefined;
            this.error = error;
            
        } 
    }
    
 

    get isDataAvailable() {
        return this.contacts !== undefined;
    }
}
