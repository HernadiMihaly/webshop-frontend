import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css', '../../register_component/register/register.component.css']
})
export class ForgotPasswordComponent {
  passwordReminderForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.passwordReminderForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  
  onSubmit() {
    if (this.passwordReminderForm.valid) {
      // Küldjön e-mailt a jelszó visszaállításához
      console.log('Email küldése: ', this.passwordReminderForm.value.email);
    }
  }
}
