import { LightningElement } from 'lwc';
import acdc from '@salesforce/resourceUrl/acdc';
import metallica from '@salesforce/resourceUrl/metallica';
import queen from '@salesforce/resourceUrl/queen';
import rhcp from '@salesforce/resourceUrl/rhcp';

export default class Challenge4 extends LightningElement {
    bands = [
        {
            id: 1,
            name: 'Queen',
            image:  queen,
            description: 'a super cool bad'
        },
        {
            id: 2,
            name:'Red Hot Chili Peppers',
            image: rhcp,
            description: 'this band was also cool'
        },
        {
            id: 3,
            name: 'Metallica',
            image: metallica,
            description: 'this band was cool'
        },
        {
            id: 4,
            name: 'AC/DC',
            image: acdc,
            description: 'something different'
        },
    ]
    selectedDesc = '';
    filteredBands = this.bands;


    handleShowDesc(event){
        this.selectedDesc = event.detail;
    }

    handleSearch(e){
        const searchTerm = e.target.value.toLowerCase();
        this.filteredBands = this.bands.filter((band) =>
            band.name.toLowerCase().includes(searchTerm)
        );

    }
}