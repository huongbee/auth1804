import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  message: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [ Validators.required, Validators.minLength(6) ]]
    })
  }

  ngOnInit() {
  }

  onSignIn(){
    const { email, password } = this.signInForm.value;
    this.userService.signIn(email, password)
    .catch(error=>{
      this.message = error.message
      this.signInForm.get('password').setValue('');
    })
  }
}
