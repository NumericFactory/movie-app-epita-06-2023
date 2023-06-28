import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent {

  commentForm!: FormGroup;
  isSubmitted: boolean = false;
  @Input() movieId!: number;


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.commentForm = this.fb.group({
      movieId: this.movieId,
      userId: localStorage.getItem('userId'),
      userName: localStorage.getItem('userName'),
      score: '1',
      content: ['', Validators.minLength(3)],
      date: Date.now()
    })
  }

  onSubmitCommentForm(ev: SubmitEvent) {
    ev.preventDefault();
    this.isSubmitted = true;
    console.log(this.commentForm.value)
  }

}
