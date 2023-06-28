import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/shared/services/message.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private userSvc: UserService,
    private messageSvc: MessageService,
    private router: Router
  ) { }

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
            localStorage.setItem('token', response.token);
            localStorage.setItem('userId', response.user.id);
            localStorage.setItem('userName', response.user.email);
            // afficher un message de succès ('Vous êtes connecté(e)!')
            this.messageSvc.show('Vous êtes connecté(e)', 'success')
            // rediriger l'utilisateur vers la page list
            this.router.navigate(['/'])
          }
        })
    }
  }

}
