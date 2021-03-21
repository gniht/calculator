
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

  if( key.classList.contains('undo') && fallbackValues.length >= 1 ){    
    let temp = fallbackValues.pop();
    current = temp[1];      
    previously = temp[0];
    lastTypeEntered = temp[2];
    openParens = temp[3];
    console.log('previously: '+ temp[0] + ' || current: ' + temp[1]);
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
    currentEntry.textContent = eval(previously.join(''));
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

/*
function doTheMath(strArr){  
  if(strArr.length === 1){
    return strArr[0];
  }
  if(strArr.length === 3){
    return doTheMath([operate(strArr)]);    
  }
  console.log('before: ' + strArr);  
  // parse the str, do the math
  // check for parens, process what's in them first
  // since nested parens aren't supported, open and closed will be in pairs
  let startParens = strArr.indexOf('(');
  let endParens = strArr.indexOf(')');
  
  if( startParens >= 0 ){
    let subArr = [];
    for(let i = startParens+1; i < endParens; i++){
      subArr.push(strArr[i]);
    }
    strArr.splice(startParens, endParens-startParens+1, doTheMath(subArr));    
    doTheMath(strArr);
  }
  //multiply and divide  
  let multIndex = strArr.indexOf('*');
  let divIndex = strArr.indexOf('/');
  let addIndex = strArr.indexOf('+');
  let subtractIndex = strArr.indexOf('-');
  let operationIndex;
  while(multIndex >= 1 || divIndex >= 1){
    if(multIndex >= 1 && divIndex >= 1){
      operationIndex = Math.min(multIndex, divIndex);
    }else if(divIndex < 0){
      operationIndex = multIndex;
    }else if(multIndex < 0){
      operationIndex = divIndex;
    }
    strArr.splice(operationIndex-1, 3, doTheMath([
      strArr[operationIndex-1],
      strArr[operationIndex],
      strArr[operationIndex+1]
    ]));
  }
  console.log('after: ' + strArr); 

}

function operate(arr){
  let a = parseFloat(arr[0]);
  let b = parseFloat(arr[2]);
  if( arr[1] === '*' ){
    return a*b;
  }
  if( arr[1] === '/' ){
    if( b === 0 ){
      alert('To tally the magnitude of your error would take an eternity.');
    }else{
      return a/b;
    }     
  }
  if( arr[1] === '+' ){
    return a+b;
  }
  if( arr[1] === '-' ){
    return a-b;
  }
}
console.log('final: ' + doTheMath(['5', '*', '(', '3', '-', '2', ')', '+', '1']) );
*/
