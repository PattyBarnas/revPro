import { LightningElement, api, wire } from 'lwc';
import getContact from '@salesforce/apex/challengeController.getContact';

export default class ContactInfo extends LightningElement {
    @api recordId; 

    contact;
    error;

    
    @wire(getContact)
    wiredContact({ error, data }) {
        if (data) {
            console.log('Contact data:', data); 
            this.contact = data;
            this.error = undefined;
        } else if (error) {
            console.error('Error fetching contact data:', error); 
            this.error = error;
            this.contact = undefined;
        }
    }

    get isDataAvailable() {
        return this.contact !== undefined;
    }
}
