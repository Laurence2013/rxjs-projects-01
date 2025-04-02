/*
 * id: 00
 * evernote-tag: rxjs-forkJoin()
 * note-00: Example 1: Fetching User Data and Posts
*/
const { of, forkJoin, throwError } = require('rxjs');
const { tap, map, catchError, delay, switchMap } = require('rxjs/operators');

//note-00
const getUserData = _ => of({id: 1, name: 'Alice'}).pipe(delay(1000));
const getUserPosts00 = userId => userId === 1 ? 
	of([{id: 101,title: 'Post 1'}, {id: 102,title: 'Post 2'}]) : throwError(_ => 'User not found').pipe(delay(1000));
const getUserPosts01 = userId => userId === 2 ? 
	of([{id: 101,title: 'Post 1'}, {id: 102,title: 'Post 2'}]) : throwError(_ => 'User not found').pipe(delay(1000));

const result00$ = forkJoin({
	user: getUserData(),
	post: getUserData().pipe(
		catchError(_ => of(undefined)),
		switchMap(user => getUserPosts01(user.id))
	)
})
result00$.subscribe({
	next: res => console.log('Result: ', res),
	error: err => console.error('Error:', err)
})

