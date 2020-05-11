import {title, add} from '../helpers';
import {ReplaySubject, interval} from 'rxjs';
import {take} from 'rxjs/operators';

title('Replay Subject');

// ReplaySubject - replays all the stream events on the second subscribe call.

const nums$ = new ReplaySubject();
// const nums$ = new ReplaySubject(1); // replays only the last event

interval(1000).subscribe(
    value => nums$.next(value)
);

setTimeout(() => {
    nums$.pipe(take(5))
        .subscribe(
            value => {
                add.li(`first: ${value}`);
            }
        );
}, 6000);

nums$.pipe(take(5))
    .subscribe(
        value => {
            add.li(`second: ${value}`);
        }
    );
