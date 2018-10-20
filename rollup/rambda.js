'use strict';

function filterObject(t,u){const v={};for(const w in u){if(t(u[w],w)){v[w]=u[w];}}return v;}function filter(z,A){if(arguments.length===1){return B=>filter(z,B);}if(A===void 0){return [];}if(!Array.isArray(A)){return filterObject(z,A);}let C=-1,D=0;const E=A.length,G=[];while(++C<E){const H=A[C];if(z(H)){G[D++]=H;}}return G;}function compose(...fns){return (...args)=>{const h1=fns.slice();if(h1.length>0){const fn=h1.pop();let j1=fn(...args);while(h1.length>0){j1=h1.pop()(j1);}return j1;}return void 0;};}function range(F4,G4){if(arguments.length===1)return H4=>range(F4,H4);const I4=[];for(let i=F4;i<G4;i++){I4.push(i);}return I4;}

function isOdd(x) {
  return x % 2 === 0;
}

function fn(x) {
  return compose(filter(isOdd), range(2))(x);
}

console.log(fn(10));
