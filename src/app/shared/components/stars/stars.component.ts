import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent {

  @Input() score!: number;
  scoreArr: Array<number> = []

  ngOnInit() {
    this.score = Math.round(this.score / 2)
    this.scoreArr = new Array(this.score).fill(0); // [0,0,0] si score=3

  }

}
