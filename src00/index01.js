const { of, interval } = require('rxjs');
const { tap, map, filter, take, combineAll } = require('rxjs/operators');

const source00$ = interval(1000).pipe(take(5));
const result00$ = source00$.pipe(
	map(num00 => interval(500).pipe(
		map(num01 => `Main num: ${num00} - Sec num: ${num01}`),
		take(2)
	)),
	combineAll()
);
const source01$ = interval(500).pipe(take(5));
const result01$ = source01$.pipe(
	map(num00 => interval(1000).pipe(
		map(num01 => `Main num: ${num00} - Sec num: ${num01}`),
		take(2)
	)),
	combineAll()
);
result01$.subscribe(console.log);
