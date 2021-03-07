class Carousel {

    constructor(options) {
        this.options = options;
        this.chunkSize = 5;
        this.initCarousel();
    }

    /* Generate and display carousel header info and all cards inside this.options.container */
    initCarousel() {
        let hoverModifier = '<style>#' + this.options.container + ' .button { display: none;} #' + 
            this.options.container + ':hover .button { display: inline-block } </style>'
        let content = hoverModifier + '<div class="carouselHeader">';
        content += '    <span class="material-icons">' + this.options.icon + '</span>';
        content += '    <div>';
        content += '        <h4>' + this.options.title + '</h4>';
        content += '        <p>' + this.options.subtitle + '</p>';
        content += '    </div>';
        content += '</div>';
        content += '<div class="carouselContainer" id="' + this.options.container + '-carousel">';
        content += '</div>';
        
        document.getElementById(this.options.container).innerHTML = content;
        // Add mocked card cards inside proper container
        document.getElementById(this.options.container + '-carousel').innerHTML = this.showMockedCards();
        // Wait a random time between 1000 and 3000 millisecond (to simulate remote call)
        sleep(getRndInteger(1000,3000)).then(() => {
            // Substitute mocked cards with generated cards
            document.getElementById(this.options.container + '-carousel').innerHTML = this.getCardsContent();
        });
    }

    /* Generate each card given by fetchCard function */
    getCardsContent() {
        let cards = this.options.fetchCards(this.chunkSize);
        let card;
        let cardsContent = '';
        for (card of cards) {
            let cardContent = '<div class="cardContent">'; 
            cardContent += '    <div class="cardImage" style="background-image:url(\'' + card.image + '\')" />';
            cardContent += '        <span>' + card.type + '</span>';
            cardContent += '        <span>' + timeConvert(card.duration) + '</span>';
            cardContent += '    </div>';
            cardContent += '    <div class="cardTitle">';
            cardContent += '        <h5>' + card.title + '</h5>';
            cardContent += '    </div>';
            if (card.cardinality === 'collection') {
                cardContent += '    <div class="collection">';
                cardContent += '    </div>';
                cardContent += '    <div class="collection2">';
                cardContent += '    </div>';
            }
            cardContent += '</div>';
            cardsContent += cardContent;
        }

        return cardsContent;
    }

    showMockedCards() {
        let i;
        let cardsContent = '';
        for (i = 0; i<this.chunkSize; i++) {
            let cardContent = '<div class="cardContent" >'; 
            cardContent += '    <div class="cardImage placeholder" > </div>';
            cardContent += '    <div class="cardTitle">';
            cardContent += '        <div class="text-placeholder placeholder" style="width: 80%;" > </div>';
            cardContent += '        <div class="text-placeholder placeholder" style="width: 40%;" > </div>';
            cardContent += '    </div>';
            cardContent += '</div>';
            cardsContent += cardContent;
        }
        return cardsContent;
    }

}