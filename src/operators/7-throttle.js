import {title, add} from '../helpers';
import {interval} from 'rxjs';
import {throttle, take} from 'rxjs/operators';

title('throttle()');

// throttle - allows us to sample over time a stream of data;
// it is completely useful because it allows us not to get inundated with an overload of data.


interval(10)
    .pipe(
        throttle(() => interval(1000)),
        take(10),
    )
    .subscribe(add.li);


