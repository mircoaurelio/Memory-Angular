import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MemoryCard } from './memory-card.model'; 
 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
 
export class AppComponent implements OnInit {
  title = 'angular-edenred-memory';
  cardsId = Array.from({length: 6}, () => Math.floor(Math.random() *100).toString());

  cardClikedCount = 0;

  gameEnded = false;

  time = false;

  cards: MemoryCard[] = [];

  uncoveredCards: MemoryCard[] = [];

  findedCardCount = 0;
 

  mix(anArray: any[]): any[] {
    return anArray.map(a => [Math.random(), a])
      .sort((y, z) => y[0] - z[0])
      .map(y => y[1]);
  }

  constructor(private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.startingGame();
  }

  startingGame(): void {
    this.cards = [];
    this.cardsId.forEach((card) => {
      const memoryCard: MemoryCard = {
        cardId: card,
        state: 'covered'
      };

      this.cards.push({ ...memoryCard });
      this.cards.push({ ...memoryCard });

    });

    this.cards = this.mix(this.cards);
  }
  showAll() {
    this.cards.forEach((element) => {  
       element.state = "covered" ? 'uncovered' : 'covered';       
    }); 
  }
  cardClicked(index: number): void {
    this.cardClikedCount++;
    
    const cardDetails = this.cards[index];
    if (this.uncoveredCards.length == 0) {  
      cardDetails.state = 'uncovered'; 
      this.uncoveredCards.push(cardDetails); 
    }
    
    if (cardDetails.state === 'covered' && this.uncoveredCards.length == 1) {  
      cardDetails.state = 'uncovered'; 
      this.uncoveredCards.push(cardDetails); 
      this.time = true;
      setTimeout(() => { if(this.time) this.checkForCardMatch();   }, 5000);
     
    } 
    if (cardDetails.state === 'covered' && this.uncoveredCards.length > 1) {
      this.checkForCardMatch();  
      setTimeout(() => { cardDetails.state = 'uncovered'; }, 100);
      setTimeout(() => {  this.uncoveredCards.push(cardDetails);  }, 300);
    
    }  
  }
  checkForCardMatch(): void {
    setTimeout(() => {
      const firstMatch = this.uncoveredCards[0];
      const secondMatch = this.uncoveredCards[1];
      const flip = firstMatch.cardId === secondMatch.cardId ? 'finded' : 'covered'; 
      firstMatch.state = secondMatch.state = flip;
      if ( this.uncoveredCards.length == 2) {
         this.uncoveredCards = [];
      }
      this.time = false;
      if (flip === 'finded') {
        this.findedCardCount++;

        if (this.findedCardCount === this.cardsId.length) {
          this.gameEnded = true;  
        }
      }

    }, 280);
  }
  

  restart(): void {
    this.findedCardCount = 0;
    this.startingGame();
  }

}