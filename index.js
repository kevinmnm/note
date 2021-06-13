'use strict';

const customizer = (objArr) => {
   objArr.forEach(obj => {
      const { current, replace } = obj;
      const regex = new RegExp('\\b'+current+'\\b', 'g');
      document.body.innerHTML = document.body.innerHTML.replaceAll(regex, replace);
   });

   objArr.forEach(obj => {
      const { current, tooltip } = obj;
      const elements = document.getElementsByClassName(current);
      [...elements].forEach(el => {
         el?.addEventListener('mouseenter', event => {
            // const position = event.target.getBoundingClientRect();
            const tooltipEl = document.querySelector('.tool-tip');
            tooltipEl.innerHTML = '';
            tooltipEl.innerHTML = tooltip;
            // tooltipEl.style.top = position.top + 'px';
            tooltipEl.style.top = event.pageY - 10 + 'px';
            tooltipEl.style.left = event.clientX + 15 + 'px';
            if (tooltip) {
               tooltipEl.style.display = 'block';
            }
         });

         el?.addEventListener('mouseleave', event => {
            const tooltipEl = document.querySelector('.tool-tip');
            tooltipEl.style.display = 'none';
         });
      });
   });

   const tooltipElement = document.querySelector('.tool-tip');
   tooltipElement.addEventListener('mouseenter', () => tooltipElement.style.display = 'block');
   tooltipElement.addEventListener('mouseleave', () => tooltipElement.style.display = 'none');
}

const objArr = [
   {
      current: ``,
      replace: ``,
      tooltip: ``,
   },
];

customizer(objArr);

const allPreTags = document.getElementsByTagName('pre');
[...allPreTags].forEach( pre => {
   const copyEl = document.createElement('DIV');
   copyEl.innerHTML = 'COPY';
   copyEl.classList.add('copy-button');
   pre.appendChild(copyEl);
   pre.querySelector('.copy-button').addEventListener('click', () => {
      try {const preRange = document.createRange();
         preRange.selectNode(pre);
         window.getSelection().removeAllRanges();
         window.getSelection().addRange(preRange);
         document.execCommand('copy');
         window.getSelection().removeAllRanges();
         triggerPopupMsg('Copied to clipboard!');
      } catch(err) {
         triggerPopupMsg(err);
         return;
      }
   });
});