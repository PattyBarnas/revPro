import getContactRecord from '@salesforce/apex/challengeController.getContactRecord';
import { api, LightningElement, wire } from 'lwc';
import CONTACT_NAME from "@salesforce/schema/Contact.Name";
import CONTACT_EMAIL from "@salesforce/schema/Contact.Email";
import CONTACT_PHONE from "@salesforce/schema/Contact.Phone";

export default class ContactRecord extends LightningElement {

    @api recordId;
    

    @wire(getContactRecord, { recordId: "$recordId", fields: [CONTACT_NAME, CONTACT_EMAIL, CONTACT_PHONE]})
    wiredContact({ error, data }) {
        if (data) {
          
            this.contact = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contact = undefined;
        }
    }
}