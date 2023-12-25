import { Component } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { SubscribedUser } from '../../../service/subscribeduser';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-subscribe-panel',
  templateUrl: './subscribe-panel.component.html',
  styleUrls: ['./subscribe-panel.component.css']
})
export class SubscribePanelComponent {
  subForm: FormGroup;
  message: string = '';

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) {
    this.subForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submit() {
    const email = this.subForm.get('email');

    if (email && email.valid) {
      const user = new SubscribedUser();
      user.email = email.value;

      this.userService.addSubscription(user)
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

      this.router.navigate(['']);
    } else {
      this.message = 'Érvénytelen e-mail cím!';
    }
  }
}
