import getTheAnswer from "./helpers";
import cube, { foo, graph } from './helpers'

const answer = getTheAnswer();
const wizard = 'Radagast';

console.log(`The answer is ${answer}, ${wizard}`);
console.log(cube(2))
console.log(foo, graph)