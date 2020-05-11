import {title, add} from '../helpers';
import {interval} from 'rxjs';
import {map, filter, take} from 'rxjs/operators';

title('map() & filter()');


const numbers = ['zero', 'one', 'two', 'three', 'four'];
const counter$ = interval(1000).pipe(take(5));

counter$.pipe(
    filter(value => value % 2 === 0),
    map(value => numbers[value])
).subscribe(
    add.li
);
