import {title, add} from '../helpers';
import {interval, fromEvent} from 'rxjs';
import {mergeAll, map, tap, take} from 'rxjs/operators';

title('mergeAll()');

// mergeAll - converts a higher-order Observable into a first-order Observable
// which concurrently delivers all values that are emitted on the inner Observables.


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
    mergeAll()
    // mergeAll(1) // the same as concatAll() - having 1 concurrent emmition at a time
).subscribe(add.li)
