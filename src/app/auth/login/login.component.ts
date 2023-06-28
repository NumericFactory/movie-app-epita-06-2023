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
        .subscribe((response: any) => {
          // on sauvegarde le token dans le localStorage
          localStorage.setItem('token', response.token)
        })
    }
  }

}
