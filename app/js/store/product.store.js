const productList = [];
productList.push( {
    id: 1,
    title: 'Apple MacBook Pro 13" Retina',
    description: 'Den er raskere og kraftigere enn før, men likevel oppsiktsvekkende mye tynnere og lettere. Den har den mest fargerike og kystallklare skjermen som noen gang har eksistert på en bærbar Mac.',
    image: 'img/store/store-item-pc.jpg',
    amount: 0,
    cost: 17187
} );
productList.push( {
    id: 2,
    title: 'Miele Scout RX 1 robotstøvsuger',
    description: 'Scout RX1 fra Miele er en smart hjelper som er i stand til å rengjøre huset ditt mens du er borte. Med et smart navigeringssystem og gyrosensorer vil Scout RX1 finne frem i rommet, uten problemer',
    image: 'img/store/store-item-robot.jpg',
    amount: 0,
    cost: 3290
} );
productList.push( {
    id: 3,
    title: 'Samsung 55" LED Smart TV',
    description: 'Samsung Full HD TV gir en mer virkelighetstro og omsluttende opplevelse enn noen gang. Se dine favorittprogrammer og filmer på en ny måte. Ultra Clean View analyserer bildeinnholdet og filtrerer vekk og reduserer bildestøy.',
    image: 'img/store/store-item-tv.jpg',
    amount: 0,
    cost: 6490
} );
productList.push( {
    id: 4,
    title: 'DJI Phantom 3 Standard RTF',
    description: 'Phantom 3 Standard er en rimeligere utgave enn Pro og Advanced, men byr fortsatt på en imponerede liste egenskaper. 2.7K filming, 12MP foto, 3-akse stabilisert kamera, livevisning/kamerakontroll til din smarttelefon, Return To Home og opp til 25min flytid!',
    image: 'img/store/store-item-drone.jpg',
    amount: 0,
    cost: 4790
} );

export default class ProductStore {
    static get productList() {
        return productList;
    }
}