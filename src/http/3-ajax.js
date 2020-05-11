import {title, add} from '../helpers';
import {ajax} from 'rxjs/ajax';
import {repeat, retry} from 'rxjs/operators';

title('ajax()');


const users$ = ajax.getJSON('https://jsonplaceholder.typicode.com/users/');

users$
    .pipe(
        retry(3), // retry the request in case of errors
        // repeat(2)
    )
    .subscribe(data => {
        data.forEach(user => add.li(user.name))
    });
