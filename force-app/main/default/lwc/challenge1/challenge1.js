import { LightningElement, track } from 'lwc';

export default class Challenge1 extends LightningElement {

   @track data = ['test','clean'];

    handleUserInput(){
        let input = this.refs.input.value;
        this.data.push(input);
    }
}