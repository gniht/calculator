
let currentEntry = document.querySelector('.currentEntry');
let previouslyEntered = document.querySelector('.previouslyEntered');
let bezel = document.querySelector('.bezel');

currentEntry.textContent = '0';
let current = '';
let previously = [];
let lastTypeEntered = '';
let fallbackValues = [];
let openParens = false;




bezel.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  let keyPushed;  
  if(!e.target.classList.contains('key')){
    return;        
  }else{
    keyPushed = e.target;
  }  
  applyInput(keyPushed);
});

/*
  1. get user input
  2. discern what type of input the user entered
     this falls into 5 general classes:
     number, operator, delimiter, transform, clear
  3. perform the appropriate action based on the input
*/

function applyInput(key){
  let num = parseFloat(current); 

  if( key.classList.contains('undo') ){
    if(fallbackValues.length >= 1){
      let temp = fallbackValues.pop();
      current = temp[1];      
      previously = temp[0];
      lastTypeEntered = temp[2];
      console.log('previously: '+ temp[0] + ' || current: ' + temp[1]);
      previouslyEntered.textContent = previously.join(' ');
      currentEntry.textContent = current;
    }
  }else{    
    fallbackValues.push([[...previously], current, lastTypeEntered, openParens]);
  }    
     
  if( key.classList.contains('number') || key.textContent === '.' ){
    current += key.textContent;
    currentEntry.textContent = current;    
    lastTypeEntered = 'input';
  }
  if( key.textContent === '(' && !openParens ){
    openParens = true;
    previously.push(key.textContent);
    previouslyEntered.textContent = previously.join(' ');    
  }else if( key.textContent === '(' && openParens ){
    alert('Nested parenthesis not supported.');
  }
  if( key.textContent === ')' && openParens ){
    openParens = false;
    previously.push(current);
    previously.push(key.textContent);
    fallbackValues.push([[...previously], current, lastTypeEntered, openParens]);
    previouslyEntered.textContent = previously.join(' ');
    current = '';
  }
  if( key.classList.contains('operator') && lastTypeEntered !== 'operator' && lastTypeEntered){    
    previously.push(current);
    previously.push(key.textContent);
    previouslyEntered.textContent = previously.join(' ');
    current = '';
    lastTypeEntered = 'operator';
  }
  if( key.classList.contains('clear') ){
    currentEntry.textContent = '0';
    previouslyEntered.textContent = '';
    current = '';
    previously = [];
    lastTypeEntered = 'clear';    
  }
  if( key.textContent === '=' && !openParens && lastTypeEntered !== 'operator'){
    previously.push(current);
    previouslyEntered.textContent = previously.join(' ');
    currentEntry.textContent = doTheMath(previously);
    current = '';
    lastTypeEntered = 'equals';    
  }
  if( key.textContent === '=' && openParens ){
    alert('Parenthesis must be closed for calculation to proceed.');
  }
  if( key.textContent === '=' && lastTypeEntered === 'operator' ){
    alert('The last entry must be a valid operand to proceed.');
  }
  if( key.classList.contains('negate') && num ){        
    current = '' + (-1*num);
    currentEntry.textContent = current;        
  }
  if( key.classList.contains('inverse') && num && num !== 0){
    current = '' + (1/num);
    currentEntry.textContent = current;   
  }  
}

function doTheMath(strArr){
  // parse the str, do the math
  return 'some result';
}