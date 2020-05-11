import { title, add } from '../helpers';
import { of, from, fromEvent } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap } from 'rxjs/operators';

title('from() & of()');

// from & of - are Observable/stream creators

const numbers = of(1, 2, 3, 4).subscribe(add.li);
const fruits = from(['apples', 'oranges', 'grapes']).subscribe(add.li);


const submit = document.getElementById('submit');
const clicks = fromEvent(submit, 'click').subscribe(
    () => add.li('clicked!')
);


const users = fromFetch('https://jsonplaceholder.typicode.com/users')
    .pipe(
        switchMap(response => response.json())
    )
    .subscribe(
        users => {
            users.forEach(u => add.li(u.name))
        }
    );