import {title, add, counter} from '../helpers';
import {interval} from 'rxjs';
import {tap, map, take} from 'rxjs/operators';

title('tap()');


const counter$ = interval(1000);

counter$.pipe(
    take(10),
    tap(x => add.li('before x2: ' + x)),
    map(x => Math.pow(x, 2)),
    tap(x => add.li('after x2: ' + x)),
    map(x => Math.sqrt(x))
).subscribe(add.li);
