import {title, add} from '../helpers';
import {range, off, of} from 'rxjs';
import {delay, concatMap} from 'rxjs/operators';

title('range()');


const numbers = range(50, 51); // emits 51 values starting from 50.
numbers
    .pipe(
        concatMap(value => of(value).pipe(delay(1000)))
    )
    .subscribe(add.li);

