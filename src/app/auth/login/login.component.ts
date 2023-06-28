import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private userSvc: UserService) { }

  loginForm!: FormGroup;
  isSubmitted: boolean = false;

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmitLoginForm() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      // poster les data au back-end
      this.userSvc.login(this.loginForm.value)
        .subscribe({
          next: (response) => {
            console.log('response', response);
            localStorage.setItem('token', response.token)
          },
          error: (err) => {
            console.log('error', err)
            if (err instanceof HttpErrorResponse) {
              if (err.status == 400) {
                console.log('Email ou mot de passe invalide')
              }
            }
          },
          complete: () => { console.log('complete') }
        })
    }
  }

}
