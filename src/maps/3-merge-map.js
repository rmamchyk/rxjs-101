import {title, add} from '../helpers';
import {interval} from 'rxjs';
import {mergeMap, map, take, tap} from 'rxjs/operators';

title('mergeMap()');


interval(2000)
    .pipe(
        take(3),
        map(value => `${value * 100}`),
        mergeMap(x => {
            return interval(1000).pipe(
                take(3),
                map(value => `inner(${value}), outer(${x})`)
            )
        })
    )
    .subscribe(value => add.li(`Emitted Value: ${value}`));
