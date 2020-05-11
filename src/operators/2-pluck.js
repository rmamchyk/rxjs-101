import {title, add, sampleData$} from '../helpers';
import {pluck, switchMap} from 'rxjs/operators';

title('pluck()');


sampleData$
    .pipe(
        pluck('company', 'name')
    )
    .subscribe(add.li)
