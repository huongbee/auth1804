import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../types';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  formUpload: FormGroup;
  image: File;

  constructor(
    private store: Store<User>,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.store.select('user').subscribe(u=>this.user = u)
    this.formUpload = this.fb.group({
      // avatar: 
    })
  }

  ngOnInit() {
  }
  getFileInfo(file: any){
    this.image = file.target.files[0];
  }
  onChangeAvatar(){
    const formData: FormData = new FormData;
    formData.append('avatar', this.image, this.image.name); // avatar: name send to server
    console.log(formData)
    this.userService.uploadFile(formData)
    .catch(err=>console.log(err))
  }

}
