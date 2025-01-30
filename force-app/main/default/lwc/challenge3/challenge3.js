import { LightningElement } from 'lwc';

import styles from './challenge3.css';

export default class Challenge3 extends LightningElement {

    static stylesheet = [styles];

    handleRedChange(){
        
        this.template.querySelector('div').style.backgroundColor = 'red'; 
    }

    handleGreenChange(){
        this.template.querySelector('div').style.backgroundColor = 'green'; 

    }

    handleBlueChange(){
        this.template.querySelector('div').style.backgroundColor = 'blue'; 

    }
}