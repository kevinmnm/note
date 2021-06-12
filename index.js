'use strict';

const customizer = (objArr) => {
   objArr.forEach( obj => {
      const { current, replace, tooltip } = obj;
      document.body.innerHTML = document.body.innerHTML.replaceAll(current, replace);
      
   });
}

const objArr = [
   {
      current: ``,
      replace: ``,
      tooltip: ``,
   },
];