
const rCount = document.querySelector("#count");

const p1Score = document.querySelector(".player1Score");
const p2Score = document.querySelector(".player2Score");

const p1Btn = document.querySelector(".player1");
const p2Btn = document.querySelector(".player2");

const resetBtn = document.querySelector(".reset");

let p1Value = 0; // parseInt(p1Score.innerText);
let p2Value = 0; //parseInt(p2Score.innerText);
let rValue = 0;

rCount.addEventListener("change", () => {
    resetFunc();
    rValue = parseInt(rCount.value);
});


// player1 score update
p1Btn.addEventListener("click", (p1Event) => {
    p1Value += 1;
    p1Score.innerText = `${p1Value}`;

    if(p1Value === rValue)
    {
        changeColor(p1Value,p2Value,rValue);
    }
});

// player2 score update
p2Btn.addEventListener("click", (p2Event) => {
    p2Value += 1;
    p2Score.innerText = `${p2Value}`;

    if(p2Value === rValue)
    {
        changeColor(p1Value,p2Value,rValue);
    }
});


resetBtn.addEventListener("click", resetFunc);

function resetFunc(){
    // enabling the score update buttons
    p1Btn.disabled = false;
    p2Btn.disabled = false;

    // changing back colors
    changeBackColor();

    // resetting the score
    p1Value = 0;
    p1Score.innerText = `${p1Value}`;

    p2Value = 0;
    p2Score.innerText = `${p2Value}`;

}


function changeColor(p1,p2,value)
{
    // either player1 score value or player2 score value is equal to rValue
    if(p1 === value)
    {
        p1Score.style.color = "green";
        p2Score.style.color = "red";
    }
    if(p2 === value)
    {
        p2Score.style.color = "green";
        p1Score.style.color = "red";
    }

    // disable the score update buttons
    p1Btn.disabled = true;
    p2Btn.disabled = true;
}

function changeBackColor()
{
    p1Score.style.color = "black";
    p2Score.style.color = "black";
}