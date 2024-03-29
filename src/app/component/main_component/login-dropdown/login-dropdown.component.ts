import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-dropdown',
  templateUrl: './login-dropdown.component.html',
  styleUrl: './login-dropdown.component.css'
})
export class LoginDropdownComponent implements OnInit {
  title = 'bootstrap-popup';
  loginForm!: FormGroup;
  constructor() { }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }
  get emailField(): any {
    return this.loginForm.get('email');
  }
  get passwordField(): any {
    return this.loginForm.get('password');
  }
  loginFormSubmit(): void {
    console.log(this.loginForm.value);
  }
}
