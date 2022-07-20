import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MemoryCard } from '../memory-card.model';

@Component({
  selector: 'app-memory-card',
  templateUrl: './memory-card.component.html',
  styleUrls: ['./memory-card.component.css'],
   
})
export class MemoryCardComponent implements OnInit {

  @Input() data: MemoryCard;

  @Output() cardClicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}

