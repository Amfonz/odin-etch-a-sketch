/*
todo: 
      fix resizing bug for big values
*/


var useClick = false;
var Size = 20;
var mode = 'default-mode';
function initializeGrid(){
  let container = document.querySelector('#grid-container');
  for(let i=0; i<Size*Size; i++){
    //determine length, create div and append to containing element
    let width = (container.offsetWidth - 2)/Size + 'px';
    let newDiv = document.createElement('div');
    newDiv.style.width = width;
    //squares so same h and w
    newDiv.style.height = width;
    newDiv.style.display = 'inline-block';
    //intial color white
    newDiv.style.backgroundColor = 'rgb(255,255,255)';
    container.appendChild(newDiv);
  } 
  applyDefaultMode();
}
function clearGrid(){
  //remove tiles from the grid
  let grid = document.querySelector('#grid-container');
  let children = [...grid.childNodes];
  children.forEach(child =>{
    grid.removeChild(child);
  });
}

function applyDefaultMode(){
  mode = 'default-mode';
  let grid = document.querySelector('#grid-container');
  grid.onmouseover = grid.onmousedown = (e)=>{
    if(useClick && e.buttons == 1 || !useClick){
      e.target.style.backgroundColor = 'rgb(0,0,0)';
    }
  };
}

function applyShadeMode(){
  mode = 'shade-mode';
  let grid = document.querySelector('#grid-container');
  grid.onmouseover = grid.onmousedown = (e) => {
    if(useClick && e.buttons == 1 || !useClick){
      console.log(e.target.style.backgroundColor);
      let rgbArray = e.target.style.backgroundColor.match(/\d+/g);
      rgbArray = rgbArray.map(x=>{
      return  +x-26 < 0 ? 0 : +x-26; 
      });
      e.target.style.backgroundColor = `rgb(${rgbArray[0]},${rgbArray[1]},${rgbArray[2]})`;
    }
  };
}
function applyEraseMode(){
  mode = 'erase-mode';
  let grid = document.querySelector('#grid-container');
  grid.onmouseover = grid.onmousedown = (e)=>{
    if(useClick && e.buttons == 1 || !useClick){
      e.target.style.backgroundColor = 'rgb(255,255,255)';
    }
  };
}

function applyRandomMode(){
  mode = 'random-mode';
  let grid = document.querySelector('#grid-container');
  grid.onmouseover = grid.onmousedown = (e)=>{
    if(useClick && e.buttons == 1 || !useClick){
      r = Math.random() * 256;
      g = Math.random() * 256;
      b = Math.random() * 256;
      e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
    }
  };
}

document.querySelector('#useClick').onclick = (e)=>{
  useClick = !useClick;
  e.target.classList.toggle('selected');
};
document.querySelector('#random-mode').onclick = (e)=>{
  document.querySelector(`#${mode}`).classList.toggle('selected');
  e.target.classList.toggle('selected');
  applyRandomMode();
};
document.querySelector('#shade-mode').onclick = (e)=>{
  document.querySelector(`#${mode}`).classList.toggle('selected');
  e.target.classList.toggle('selected');
  applyShadeMode();
};
document.querySelector('#erase-mode').onclick = (e)=>{
  document.querySelector(`#${mode}`).classList.toggle('selected');
  e.target.classList.toggle('selected');
  applyEraseMode();
};
document.querySelector('#default-mode').onclick = (e)=>{
  document.querySelector(`#${mode}`).classList.toggle('selected');
  e.target.classList.toggle('selected');
  applyDefaultMode();
};
document.querySelector('#clear-button').addEventListener('click',()=>{
  let oldSize = Size;
  do{
    Size = Number(prompt('Specify the new dimensions a x a'));
  }while(Number.isNaN(Size));
  if(!Size) {
    Size = oldSize;//chose cancel
    return;
  }
  //grid gets set back to default, un highlight last switch
  document.querySelector(`#${mode}`).classList.toggle('selected');
  document.querySelector('#default-mode').classList.toggle('selected');
  clearGrid();
  initializeGrid();
});

function init(){
  document.querySelector('#default-mode').classList.toggle('selected');
  initializeGrid();
}
function setSize(newSize){
  Size = newSize;
}
init();