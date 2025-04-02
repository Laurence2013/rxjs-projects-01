/*
 * id: 00
 * evernote-tag: rxjs-forkJoin()
 * note-00: Incorrect: Error handling outside forkJoin
 * note-01: Correct: Error handling inside the inner observable
*/
const { of, forkJoin, throwError } = require('rxjs');
const { tap, map, catchError } = require('rxjs/operators');

//note-00
const obs00$ = of(1,2,3,4,5);
const obs01$ = throwError(_ => 'Error');

const result00$ = forkJoin([obs00$, obs01$]);

result00$.subscribe({
	next: ([a, b]) => console.log(`Result: ${a} - ${b}`),
	error: err => console.error('Error: ', err)
});

//note-01
const catchObsErr$ = obs01$.pipe(catchError(_ => of(undefined)));
const result01$ = forkJoin([obs00$, catchObsErr$]);

result01$.subscribe({
	next: ([a, b]) => console.log(`Result: ${a} - ${b}`),
	error: err => console.error('Error: ', err)
});
