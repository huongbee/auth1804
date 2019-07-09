import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;
  loading = true;

  constructor(private store: Store<User>) {
    this.store.select('user').subscribe(user=>{
      if(user !== null){
        this.loading = false;
        this.user = user;
      }
    })
  }

  ngOnInit() {
  }

}
