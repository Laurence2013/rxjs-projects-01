const { of, interval } = require('rxjs');
const { tap, map, filter, take } = require('rxjs/operators');

const source00$ = interval(1000).pipe(take(5));
const result00$ = source00$.pipe(
	map(dat00 => dat00 * 2)
);
result00$.subscribe(console.log);
