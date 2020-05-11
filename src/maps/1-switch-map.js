import {title, add} from '../helpers';
import {fromEvent} from 'rxjs';
import {map, switchMap, takeUntil, tap} from 'rxjs/operators';

title('switchMap()');


const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const moves$ = fromEvent(canvas, 'mousemove');
const down$ = fromEvent(canvas, 'mousedown');
const up$ = fromEvent(canvas, 'mouseup');

function brush(coords) {
    context.lineWidth = 5;
    context.lineTo(coords.x, coords.y);
    context.stroke();
}

down$.pipe(
    tap(e => {
        context.strokeStyle = 'purple';
        context.beginPath();
        context.moveTo(e.offsetX, e.offsetY)
    }),
    switchMap(() => {
        return moves$.pipe(
            map(e => ({ x: e.offsetX, y: e.offsetY })),
            takeUntil(up$)
        )
    })
).subscribe(coords => {
    brush(coords);
});
