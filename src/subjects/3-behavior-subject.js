import {title, add} from '../helpers';
import {BehaviorSubject, interval} from 'rxjs';
import {take} from 'rxjs/operators';

title('Behavior Subject');

// BehaviorSubject can be initialized with an initial value.

const nums$ = new BehaviorSubject(100);

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
}, 5000);

nums$.pipe(take(5))
    .subscribe(
        value => {
            add.li(`second: ${value}`);
        }
    );
