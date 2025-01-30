import { LightningElement } from 'lwc';

export default class Challenge2 extends LightningElement {
    header = 'This is my current text';
    isOpen = false;

    handleIsOpen(){
        this.isOpen = !this.isOpen;
    }

    handleHeaderChange(){
        this.header = this.refs.input.value;
    }
    

}