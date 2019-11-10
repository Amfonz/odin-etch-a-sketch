/*
todo: implement draw on mousehold
      fix resizing bug for big values
*/

/**
 * if useClick and e.buttons == 1 or !useClick
 * 
 * 
 * 
 */
var useClick = false;
var Size = 20;
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
    //intial color white
    newDiv.style.backgroundColor = "rgb(255,255,255)";
    container.appendChild(newDiv);
  } 
  applyDefaultMode();
}
function clearGrid(){
  //remove tiles from the grid
  let grid = document.querySelector("#grid-container");
  let children = [...grid.childNodes];
  children.forEach(child =>{
    grid.removeChild(child);
  });
}

function applyDefaultMode(){
  let tiles = [...document.querySelector("#grid-container").childNodes];
    tiles.forEach(tile=>{
      tile.onmouseover = tile.onmousedown = (e)=>{
      if(useClick && e.buttons == 1 || !useClick){
        e.target.style.backgroundColor = "rgb(0,0,0)";
      }
    };
  });
};

function applyShadeMode(){
  let tiles = [...document.querySelector("#grid-container").childNodes];
  tiles.forEach((tile)=>{
    tile.onmouseover = tile.onmousedown = (e)=>{
      if(useClick && e.buttons == 1 || !useClick){
        let rgbArray = e.target.style.backgroundColor.match(/\d+/g);
        rgbArray = rgbArray.map(x=>{
        return  +x-26 < 0 ? 0 : +x-26; 
        });
        e.target.style.backgroundColor = `rgb(${rgbArray[0]},${rgbArray[1]},${rgbArray[2]})`;
      }
    };
  });
}
function applyEraseMode(){
  let tiles = [...document.querySelector("#grid-container").childNodes];
  tiles.forEach((tile)=>{
    tile.onmouseover = tile.onmousedown = (e)=>{
      if(useClick && e.buttons == 1 || !useClick){
        e.target.style.backgroundColor = 'white';
      }
    };
  });
}

function applyRandomMode(){
  let tiles = [...document.querySelector("#grid-container").childNodes];
  tiles.forEach((tile)=>{
    tile.onmouseover = tile.onmousedown = (e)=>{
      if(useClick && e.buttons == 1 || !useClick){
      r = Math.random() * 256;
      g = Math.random() * 256;
      b = Math.random() * 256;
      e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
      }
    };
  })
}

document.querySelector("#useClick").onclick = ()=>{useClick = !useClick;};
document.querySelector("#random-mode").onclick = applyRandomMode;
document.querySelector("#shade-mode").onclick = applyShadeMode;
document.querySelector("#erase-mode").onclick = applyEraseMode;
document.querySelector("#default-mode").onclick = applyDefaultMode;
document.querySelector("#clear-button").addEventListener('click',()=>{
  let oldSize = Size;
  do{
    Size = Number(prompt("Specify the new dimensions a x a"));
  }while(Number.isNaN(Size));
  if(!Size) Size = oldSize //chose cancel
  clearGrid();
  initializeGrid();
});
initializeGrid();
function setSize(newSize){
  Size = newSize;
}