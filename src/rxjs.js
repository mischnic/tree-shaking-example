import { range } from 'rxjs';
import { map, filter } from 'rxjs/operators';

export let answer = [];

range(1, 200).pipe(
  filter(x => x % 2 === 1),
  map(x => x + x)
).subscribe(x => answer.push(x));

answer = answer.join(',');
