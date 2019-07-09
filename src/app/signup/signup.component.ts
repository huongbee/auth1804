import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  message: string;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.signUpForm = this.fb.group({
      email: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
  }

  onSignUp() {
    const { email, name, password, repassword } = this.signUpForm.value;
    if (password !== repassword) {
      this.message = 'Password must match!';
    }
    else {
      this.userService.userRegister(email, password, name)
      .catch(err => {
        return this.message = err.message;
      });
    }
    // this.signUpForm.reset();
    this.signUpForm.get('password').setValue('');
    this.signUpForm.get('repassword').setValue('');
  }
}
