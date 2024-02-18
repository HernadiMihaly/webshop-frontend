import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginUser } from '../../../service/user/loginuser';
import { UserService } from '../../../service/user/user.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../service/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../register_component/register/register.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.userService.login(this.mapFormToUser())
          .pipe(
            catchError((error: HttpErrorResponse) => {
              console.log("valami nem ok");
              return throwError(error);
            })
          )
          .subscribe(() => {
            console.log("sikeres bejelentkezés!");
          });
    }
  }

  mapFormToUser(){
    let user = new User();

    user.email = this.loginForm.get('email')?.value;
    user.password = this.loginForm.get('password')?.value;

    return user;
  }
}
