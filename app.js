

let currentEntry = document.querySelector('.currentEntry');
let previouslyEntered = document.querySelector('.previouslyEntered');
let bezel = document.querySelector('.bezel');

currentEntry.textContent = '0';


bezel.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  let keyPushed;  
  if(!e.target.classList.contains('key')){
    return;        
  }else{
    keyPushed = e.target.textContent;
  }  
  console.log(keyPushed);
});