class Carousel {

    constructor(options) {
        this.options = options;
        this.chunkSize = this.getCorrectChunkSize();
        this.initCarousel();
    }

    getCorrectChunkSize() {
        return window.innerWidth <= 1210 ? 3 : 5;
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
        this.loadNewCards();
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
            } else {
                cardContent += '    <div class="fake-collection">';
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

    loadNewCards() {
        const {container : carouselId} = this.options
        let buttonLeft = '<div class="button button-left" id="' + carouselId + '-button-left"><span class="material-icons">keyboard_arrow_left</span></div>';
        let buttonRight = '<div class="button button-right" id="' + carouselId + '-button-right"><span class="material-icons">keyboard_arrow_right</span></div>';
        
        // Add mocked card cards inside proper container
        document.getElementById(carouselId + '-carousel').innerHTML = buttonLeft + buttonRight + this.showMockedCards();
        // Wait a random time between 1000 and 3000 millisecond (to simulate remote call)
        sleep(getRndInteger(1000,3000)).then(() => {
            // Substitute mocked cards with generated cards
            document.getElementById(carouselId + '-carousel').innerHTML = buttonLeft + buttonRight + this.getCardsContent();
            // Add listener to prevoius / next buttons
            document.getElementById(carouselId + '-button-left').addEventListener("click", () => { this.loadNewCards() });
            document.getElementById(carouselId + '-button-right').addEventListener("click", () => { this.loadNewCards() });
        });
    }

}