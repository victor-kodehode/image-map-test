const img = document.getElementById("img");
const doors = document.getElementsByClassName("door");
const reset = document.getElementById("reset");
const winsEl = document.getElementById("wins");
const lossesEl = document.getElementById("losses");
// doorState
// 0 = unknown
// 1 = goat
// 2 = car
// selection
// 0 = unselected
// 1 = selected
// prizes
// 0 = empty
// 1 = goat
// 2 = car
const doorState = [0,0,0];
const selection = [0,0,0];
const prizes = [1,1,1];
let round = 0;
let car = Math.floor(3*Math.random());
prizes[car] = 2;
let wins = 0;
let losses = 0;
for (let i = 0; i < 3; i++) {
  doors[i].addEventListener("click",()=>updateGame(i));
}
function updateGame(door) {
  // selection
  if (round === 0) {
    for (let i = 0; i < 3; i++) {
      selection[i] = 0;
    }
    selection[door] = 1;
    // doorState
    if (car === door) {
      let arr = [0,1,2];
      arr.splice(arr.indexOf(door),1);
      let r = Math.floor(2*Math.random());
      doorState[arr[r]] = 1;
    }
    else {
      doorState[3-car-door] = 1;
    }
    round++;
    updateImage();
  }
  else if (round === 1) {
    let kake = 0;
    for (let i = 0; i < 3; i++) {
      if (doorState[i] === 1) {
        kake = i;
      }
    }
    if (door != kake) {
      for (let i = 0; i < 3; i++) {
        doorState[i] = 1;
        selection[i] = 0;
      }
      doorState[car] = 2;
      selection[door] = 1;
      if(car===door){
        wins++;
        winsEl.textContent = `Cars won: ${wins}`;
      }
      else {
        losses++;
        lossesEl.textContent = `Goats won: ${losses}`;
      }
      updateImage();
      round = 2;
    }
  }
  else if (round === 2) {
    replayFunc();
  }
}
function updateImage() {
  let x = `${doorState[0]}${doorState[1]}${doorState[2]}`;
  let y = `${selection[0]}${selection[1]}${selection[2]}`;
  img.src = `images/frame-${x}-${y}.png`;
}
function replayFunc() {
  for (let i = 0; i < 3; i++) {
    doorState[i] = 0;
    selection[i] = 0;
    prizes[i] = 1;
  }
  round = 0;
  car = Math.floor(3*Math.random());
  prizes[car] = 2;
  updateImage();
}
function resetFunc() {
  replayFunc();
  wins = 0;
  losses = 0;
  updateImage();
  winsEl.textContent = "Cars won: 0";
  lossesEl.textContent = "Goats won: 0";
}
replay.addEventListener("click",()=>{replayFunc()});
reset.addEventListener("click",()=>{resetFunc()});
