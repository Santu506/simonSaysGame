let gameSeq = [];
let userSeq = [];
let color = ["yellow", "red","purple", "blue"];
let level = 0;
let started = false;
let highSore = 0;
let h3 =document.querySelector("h3");
let h2 =document.querySelector("h2");

let failAud = document.querySelector("#failAudio");
let sucAud = document.querySelector("#sucAudio");

  /* to  started the game */ 
document.addEventListener("keypress",()=> {
    if(started == false ){
        console.log("game is started");
        started = true;
        levelUp();
    }
})
        // level up the game sequence
function levelUp(){
    userSeq = [];
    level++;
    h3.innerText = ` level ${level}`;
    let ranIdx = Math.floor(Math.random() * 4);
    let ranCol = color[ranIdx];
    let fBtn = document.querySelector(`.${ranCol}`);
    gameSeq.push(ranCol);
    gameFlash(fBtn);
    console.log(gameSeq);
}
        //flash game sequence
function gameFlash(btn){
    btn.classList.add("gameFlash");
    setTimeout(() => {
        btn.classList.remove("gameFlash");  
    },200);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}
    //user btn press
function btnPress(){
    let btn = this;
    userFlash(btn);
    let col = btn.getAttribute("id");
    userSeq.push(col);

    checkAns(userSeq.length-1);

}
    //user flash
function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(()=>{
        btn.classList.remove("userFlash"); 
    },200);
}
    //find check the sequence
function checkAns(idx){
    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            sucAud.play();
            setTimeout(()=>{
                sucAud.pause();
                sucAud.currentTime = 0;
                levelUp();
                
            }, 500);
            
        }
    }else{

        h3.innerHTML = ` Game Over! your score is <b>${level}</b> <br>
         press enter to start the game .`;
         document.querySelector("body").style.backgroundColor = "red";
         failAud.play();
         setTimeout(()=>{
            failAud.pause();
            failAud.currentTime = 3;
            document.querySelector("body").style.backgroundColor = "white";
            resetGame();
         },500);
        
    }
}
        // reset your game
function resetGame(){
    gameSeq = [];
    if(level>highSore){
        highSore = level;
        h2.innerText = `high score: ${highSore}`;
    }
    level = 0;
    started = false;
}
