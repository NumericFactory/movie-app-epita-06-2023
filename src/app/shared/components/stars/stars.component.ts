import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-stars',
  template: `
  <!-- Template score "editable=false" -->
  <div *ngIf="!editable" [innerHTML]="iconsStr"></div>

  <!-- Template score "editable=true" -->
  <div *ngIf="editable">
  <!-- (click)="onClickStar($event,i)" (mouseover)="onMouseoverStar(i)" (mouseout)="onMouseoutStar()"  -->
    <i 
    [class.fas]="i+1<=this.selectedScore" 
    *ngFor="let item of scoreArray; 
    let i=index" class="far fa-star"
    (click)="onClickStar($event,i)" (mouseover)="onMouseoverStar(i)" (mouseout)="onMouseoutStar()"
    ></i>
  </div>

  `,
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent {
  // score en entrée
  @Input() score!: number;
  iconsStr: string = '';

  // component editable ou non
  @Input() editable: boolean = false;
  @Output() selectedScoreEvent = new EventEmitter();
  selectedScore: number = 0;
  scoreArray: Number[] = [];


  ngOnInit() {

    /*
      Si le component est éditable (l'utilisateur peut sélectionner une note)
      > On set le score à 0 au démarrage
    *
      Si le component n'est pas éditable (l'utilisateur ne peut pas selectionner une note)
      > On set le score avec la valeur passée en Input() (ex : <app-stars score="3"></app-stars>)
    */
    if (this.editable) {
      this.score = 0
    }
    else {
      this.score = Math.round(this.score / 2)
    }

    // Affichage des icones Stars
    for (let i = 0; i < this.score; i++) {
      this.iconsStr += '<i class="fas fa-star"></i>'
    }
    for (let i = this.score; i < 5; i++) {
      this.iconsStr += '<i class="far fa-star"></i>'
    }

    // if editable == true
    this.scoreArray = new Array(5).fill(0);
  }

  /*
    Au survol sur 1 étoile si le component est éditable
  */
  onMouseoverStar(index: number) {
    this.selectedScore = index + 1
  }

  // /*
  //   A la sortie du survol sur 1 étoile si le component est éditable
  // */
  onMouseoutStar() {
    this.selectedScore = 0
  }

  /*
    Au click sur une étoile, si le component est editable
    > on emet un evenement selectedScoreEvent(selectedScore)
      (le component parent peut alors récupérer la valeur selectedScore)
  */
  onClickStar(event: MouseEvent, index: number) {
    event.stopPropagation()
    console.log(index + 1)
    this.selectedScore = index + 1;
    this.selectedScoreEvent.emit(this.selectedScore);
  }



}

