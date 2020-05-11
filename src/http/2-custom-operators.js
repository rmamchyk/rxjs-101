import {title, add} from '../helpers';
import {of, pipe} from 'rxjs';
import {fromFetch} from 'rxjs/fetch';
import {switchMap, mergeMap, concatMap, delay} from 'rxjs/operators';

title('Custom Operators');


// Custom Operators
function getJSON() {
    return switchMap(res => res.json());
}

function emitEach(d) {
    return pipe(
        mergeMap(users => of(...users)),
        concatMap(user => of(user).pipe(delay(d)))
    )
}

const users$ = fromFetch('https://jsonplaceholder.typicode.com/users/');

users$.pipe(
    getJSON(),
    emitEach(1000)
)
.subscribe(user => add.li(user.name));
