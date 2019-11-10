/*
todo: figure out mode switching (changin event listeners)
implement shade mode

*/

const Size = 20;
function initializeGrid(){
  let container = document.querySelector("#grid-container");
  for(let i=0; i<Size*Size; i++){
    //determine length, create div and append to containing element
    let width = (container.offsetWidth - 2)/Size + 'px';
    let newDiv = document.createElement('div');
    newDiv.style.width = width;
    //squares so same h and w
    newDiv.style.height = width;
    newDiv.style.display = "inline-block";
    container.appendChild(newDiv);
  } 
  applyDefaultMode();
}

function applyDefaultMode(){
  let tiles = [...document.querySelector("#grid-container").childNodes];
  tiles.forEach((tile)=>{
    tile.onmouseover = (e)=>{
      e.target.style.backgroundColor = "rgb(0,0,0)";
    };
  });
}
function applyShadeMode(){
  let tiles = [...document.querySelector("#grid-container").childNodes];
  tiles.forEach((tile)=>{
    tile.onmouseover = (e)=>{
      e.target.style.backgroundColor = 'hsl(100,10%,79%';///
    };
  });
}
function applyEraseMode(){
  let tiles = [...document.querySelector("#grid-container").childNodes];
  tiles.forEach((tile)=>{
    tile.onmouseover = (e)=>{
      e.target.style.backgroundColor = 'white';
    };
  });
}

function applyRandomMode(){
  let tiles = [...document.querySelector("#grid-container").childNodes];
  tiles.forEach((tile)=>{
    tile.onmouseover = (e)=>{
      r = Math.random() * 256;
      g = Math.random() * 256;
      b = Math.random() * 256;
      e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
    };
  })
}
document.querySelector("#random-mode").onclick = applyRandomMode;
document.querySelector("#shade-mode").onclick = applyShadeMode;
document.querySelector("#erase-mode").onclick = applyEraseMode;
document.querySelector("#default-mode").onclick = applyDefaultMode;

initializeGrid();
function setSize(newSize){
  Size = newSize;
}