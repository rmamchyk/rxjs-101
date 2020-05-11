import {title, add} from '../helpers';
import {of, pipe, EMPTY, throwError} from 'rxjs';
import {fromFetch} from 'rxjs/fetch';
import {ajax} from 'rxjs/ajax';
import {switchMap, catchError} from 'rxjs/operators';

title('Errors');


// Custom Operators
function checkStatus() {
    return switchMap(res => res.status === 400 ? throwError('There was a problem') : of('Looks good'))
}

fromFetch('https://httpbin.org/status/400')
    .pipe(
        checkStatus(),
        // catchError(err => of('There was a problem'))
        // catchError(err => EMPTY)
        // catchError(err => throwError('There was a problem'))
    )
    .subscribe(
        res => add.li(res),
        err => console.error('Error: ', err)
    );
