
let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset");
let newbtn = document.querySelector("#new");
let msgcontainer = document.querySelector(".container-msg");
let msg = document.querySelector("#msg");


let turnO = true; // playerX , playerO
let count = 0; // to track Draw

const Winpatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () =>{ 
turnO = true;
count = 0;
enableBoxes();
    msgcontainer.classList.add("hide");

};

boxes.forEach((box) => {
  box.addEventListener("click",() => {
 if(turnO) {
    // player O
    box.innerText = "O";
    box.style.color = "red"; 
    turnO = false;
 } else {
    // player X
     box.innerText = "X";
      box.style.color = "green"; 
    turnO = true;
 }

 box.disabled  = true;
 count++;

  let isWinner = checkWinner();


  if( count === 9 && !isWinner){
    gameDraw();
  }
  });
});

const gameDraw = () => {
msg.innerText = `Game was a Draw.`;
msgcontainer.classList.remove("hide");
disableBoxes();
}

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};


const showWinner = (winner) =>{
   msg.innerText = `congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for ( let pattern of  Winpatterns){
        let post1val = boxes[pattern[0]].innerText;
        let post2val = boxes[pattern[1]].innerText;
        let post3val = boxes[pattern[2]].innerText;
   
        if(post1val !="" && post2val != "" && post3val != ""){
            if (post1val === post2val && post2val === post3val){
                showWinner(post1val);
                return true;
            }
        }
    }
};

newbtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);