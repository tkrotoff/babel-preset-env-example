import 'babel-polyfill';

import './index.html';


// Example taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

const object1 = {
  a: 1,
  b: 2,
  c: 3
};

const object2 = Object.assign({c: 4, d: 5}, object1);

console.log(object2.c, object2.d);


// Example taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

var promise1 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 100, 'foo');
});

console.log(promise1);
