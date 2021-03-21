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

function applyInput(key){
  let num = parseFloat(current);  

  if( key.classList.contains('undo') && fallbackValues.length >= 1 ){    
    let temp = fallbackValues.pop();
    current = temp[1];      
    previously = temp[0];
    lastTypeEntered = temp[2];
    openParens = temp[3];    
    previouslyEntered.textContent = previously.join(' ');
    currentEntry.textContent = current;    
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
    if(current){previously.push(current);}
    previously.push(key.textContent);    
    previouslyEntered.textContent = previously.join(' ');
    current = '';
    currentEntry.textContent = current;
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
    openParens = false;    
  }
  if( key.textContent === '=' && !openParens && lastTypeEntered !== 'operator'){
    previously.push(current);
    previouslyEntered.textContent = previously.join(' ');
    currentEntry.textContent = Number.parseFloat(eval(previously.join(''))).toFixed(6);
    previously = [];    
    current = currentEntry.textContent;    
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
  if( key.classList.contains('square') && num ){
    current = '' + (num*num);
    currentEntry.textContent = current;
  }
  if( key.classList.contains('sqrt') && num ){
    
    if( num < 0 ){
      alert('Cannot take sqrt of a negative number');
    }else{
      current = '' + Math.sqrt(num);
      currentEntry.textContent = current;
    }
  }    
}