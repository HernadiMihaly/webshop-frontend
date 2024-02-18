import { Component } from '@angular/core';
import { User } from '../../../service/user/user';
import { UserService } from '../../../service/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  message: string | undefined;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  register(){
    if (this.registerForm.valid) {
      this.userService.addRegistration(this.mapFormToUser())
          .pipe(
            catchError((error: HttpErrorResponse) => {
              if (error.status == 409) {
                this.message = 'Ön már fel van iratkozva!';
              } else {
                this.message = 'Érvénytelen e-mail cím!';
              }
              return throwError(error);
            })
          )
          .subscribe(() => {
            this.message = 'Sikeres feliratkozás! Köszönjük!';
          });
      }
  }

  mapFormToUser(){
    let user = new User();

    user.firstName = this.registerForm.get('firstName')?.value;
    user.lastName = this.registerForm.get('lastName')?.value;
    user.email = this.registerForm.get('email')?.value;
    user.password = this.registerForm.get('password')?.value;

    return user;
  }

}
