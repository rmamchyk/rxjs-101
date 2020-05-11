import {title, add} from '../helpers';
import {interval, fromEvent} from 'rxjs';
import {concatAll, map, tap, take} from 'rxjs/operators';

title('concatAll()');

// concatAll - converts a higher-order Observable into a first-order Observable
// by concatenating the inner Observables in order.


const button = document.getElementById('submit');
const clicks$ = fromEvent(button, 'click');

const source$ = clicks$.pipe(
    tap(() => add.li('click')),
    map(
        // inner observable
        () => interval(1000).pipe(take(3))
    )
);

source$.pipe(
    concatAll()
).subscribe(add.li)
