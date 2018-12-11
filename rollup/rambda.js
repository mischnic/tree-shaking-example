'use strict';

function filterObject(m,n){const q={};for(const r in n){if(m(n[r],r)){q[r]=n[r];}}return q;}function filter(s,t){if(arguments.length===1){return u=>filter(s,u);}if(t===void 0){return [];}if(!Array.isArray(t)){return filterObject(s,t);}let v=-1,w=0;const z=t.length,A=[];while(++v<z){const B=t[v];if(s(B,v)){A[w++]=B;}}return A;}function compose(...fns){return (...args)=>{const c1=fns.slice();if(c1.length>0){const fn=c1.pop();let e1=fn(...args);while(c1.length>0){e1=c1.pop()(e1);}return e1;}return void 0;};}function range(F4,G4){if(arguments.length===1)return H4=>range(F4,H4);const I4=[];for(let i=F4;i<G4;i++){I4.push(i);}return I4;}

function isOdd(x) {
  return x % 2 === 0;
}

function fn(x) {
  return compose(filter(isOdd), range(2))(x);
}

console.log(fn(10));
