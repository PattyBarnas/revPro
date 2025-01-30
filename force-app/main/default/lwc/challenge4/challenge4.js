import { LightningElement } from 'lwc';

export default class Challenge4 extends LightningElement {
    bands =[
        {
            id: 1,
            name: 'Queen',
            image:  'https://upload.wikimedia.org/wikipedia/en/6/67/Pink_Floyd_-_Dark_Side_of_the_Moon.png',
            description: 'a super cool bad'
        },
        {
            id: 2,
            name:'Red Hot Chili Peppers',
            image: 'img',
            description: 'this band was also cool'
        },
        {
            id: 3,
            name: 'Metallica',
            image: 'img',
            description: 'this band was cool'
        },
        {
            id: 4,
            name: 'AC/DC',
            image: 'img',
            description: 'something different'
        },
    ]
    selectedDesc = '';

    handleShowDesc(event){
        this.selectedDesc = event.detail;
    }
}