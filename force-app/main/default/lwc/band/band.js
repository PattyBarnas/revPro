import { api, LightningElement } from 'lwc';

export default class Band extends LightningElement {

    @api band;

    handleBtnClick(){
        const event = new CustomEvent('showdescription', {
            detail: this.band.description,
            bubbles: true, 
            composed: true
        })

        this.dispatchEvent(event);
    
    }

}