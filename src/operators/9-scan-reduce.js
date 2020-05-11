import {title, add} from '../helpers';
import {interval, from} from 'rxjs';
import {scan, reduce, take, concatMap} from 'rxjs/operators';

title('scan() & reduce()');


// scan =========================================
// emits a value every time whenever source observable emits a value.

// const fibonacci$ = interval(1000)
//     .pipe(
//         take(10),
//         scan((acc, value) => {
//             const n = value + 1;
//             const last = acc[n];
//             const beforeLast = acc[n-1];

//             return [...acc, last + beforeLast]
//         }, [0, 1])
//     )
//     .subscribe(add.li);



// reduce =========================================
// waits for when source completes, and then emits a value.
// it is used in order to emit only the final accumulation.

const fibonacci$ = interval(100)
    .pipe(
        take(10),
        reduce((acc, value) => {
            const n = value + 1;
            const last = acc[n];
            const beforeLast = acc[n-1];

            return [...acc, last + beforeLast]
        }, [0, 1])
    )
    .subscribe(add.li);
