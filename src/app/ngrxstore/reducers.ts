import { User } from '../types';

export function userReducer(state: User = null, action: any): User{
    if(action.type === 'INIT_USER') return action.user;
    return state;
}