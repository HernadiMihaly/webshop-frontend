import { Component } from '@angular/core';
import { User } from '../../../service/user/user';
import { UserService } from '../../../service/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: User = new User();
  message: string | undefined;

  constructor(private userService: UserService){}

  register(user: User){
    this.userService.addRegistration(user)
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
