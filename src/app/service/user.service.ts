import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL, ServerResponse, User } from '../types';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<User>,
  ) { }

  async userRegister(email: string, password: string, name: string) {
    return this.http.post(
      `${URL}/user/register`,
      { email, password, name }
    ).toPromise()
    .then((result: ServerResponse) => {
      if (result.code === 1) {
        return this.router.navigateByUrl('/signin');
      }
      throw new Error('Email exist!');
    });
  }
  async signIn(email: string, password: string){
    return this.http.post(`${URL}/user/login`,{ email, password })
    .toPromise()
    .then((result: ServerResponse)=>{
      if(result.code === 1){
        // save user into store
        this.store.dispatch({
          type: 'INIT_USER',
          user: result.data.user
        })
        // save token
        localStorage.setItem('token', result.data.token)
        return this.router.navigateByUrl('/');
      }
      else{
        throw new Error('Email or password invalid!')
      }
    })
  }
  async check(){
    const token = localStorage.getItem('token')
    if(!token){
      return this.router.navigateByUrl('/signin');
    }
    const headers = new HttpHeaders({ token })
    return this.http.post(`${URL}/user/check`, {}, { headers } )
    .toPromise()
    .then((result: ServerResponse)=>{
      if(result.code === 1){
        // save user into store
        this.store.dispatch({
          type: 'INIT_USER',
          user: result.data
        })
      }
      else{
        // invalid token
        localStorage.removeItem('token');
        return this.router.navigateByUrl('/signin');
      }
    })
  }
}
