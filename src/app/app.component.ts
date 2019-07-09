import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from './types';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'auth1804';
  loading = true;
  user: User;

  constructor(
    private store: Store<User>,
    private userService: UserService
  ) {
    this.userService.check();
    this.store.select('user').subscribe(user=>{
      if(user !== null){
        this.loading = false;
        this.user = user;
      }
    })
  }
}
