import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-stars',
  template: `
  <!-- <i *ngFor="let item of scoreArr" class="fas fa-star"></i> -->
  <div [innerHTML]="iconsStr"></div>
  `,
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent {

  @Input() score!: number;
  iconsStr: string = '';
  //scoreArr: Array<number> = []

  ngOnInit() {

    this.score = Math.round(this.score / 2)
    //this.scoreArr = new Array(this.score).fill(0); // [0,0,0] si score=3
    for (let i = 0; i < this.score; i++) {
      this.iconsStr += '<i style="color:orange" class="fas fa-star"></i>'
    }
    for (let i = this.score; i < 5; i++) {
      this.iconsStr += '<i style="color:orange"class="far fa-star"></i>'
    }
  }

}
