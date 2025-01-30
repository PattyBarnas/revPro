import { LightningElement, api, wire } from 'lwc';
import getContact from '@salesforce/apex/challengeController.getContact';

export default class ContactInfo extends LightningElement {
    @api recordId; // The recordId is passed in from the parent component or page

    contact;
    error;

    // Wire the Apex method to get contact info
    @wire(getContact)
    wiredContact({ error, data }) {
        if (data) {
            console.log('Contact data:', data);  // Log the fetched data
            this.contact = data;
            this.error = undefined;
        } else if (error) {
            console.error('Error fetching contact data:', error);  // Log the error
            this.error = error;
            this.contact = undefined;
        }
    }

    // Getter to check if data is available
    get isDataAvailable() {
        return this.contact !== undefined;
    }
}
