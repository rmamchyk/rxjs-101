import {title, add} from '../helpers';
import {from} from 'rxjs';
import {fromFetch} from 'rxjs/fetch';
import {switchMap} from 'rxjs/operators';

title('fromFetch()');

// Approach 1 =========================================================
// simply call the browser's 'fetch' api

// const getUsers = fetch('https://jsonplaceholder.typicode.com/users/')
// const users$ = from(getUsers);

// users$.pipe(
//     switchMap(res => res.json())
// )
// .subscribe(
//     data => {
//        data.forEach(user => add.li(user.name))
//     }
// )



// Approach 2 =========================================================
// use 'fromFetch' of RxJS

const users$ = fromFetch('https://jsonplaceholder.typicode.com/users/');

users$.pipe(
    switchMap(res => res.json())
)
.subscribe(
    data => {
       data.forEach(user => add.li(user.name))
    }
)