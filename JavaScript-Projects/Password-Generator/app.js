let passwordDisplay = document.querySelector(".password-display .password");
let passwordCopy = document.querySelector(".password-display .copy i");
let copyMsg = document.querySelector(".password-display .copy .copy-text");
let passwordLength = document.querySelector(".password-length p");
let slider = document.querySelector(".length-slider .slider");
let arrCheckbox = document.querySelectorAll('input[type="checkbox"]');
let uppercase = document.querySelector("#uppercase");
let lowercase = document.querySelector("#lowercase");
let number = document.querySelector("#number");
let symbol = document.querySelector("#symbol");
let strengthIndicator = document.querySelector(".strength .indicater");
let button = document.querySelector(".generate-button .generate-password");
let error = document.querySelector(".error-msg")


let checkbox = document.querySelector("#lowercase");

let symbols = "~!@#$%^&*(){}[]?/:;<>,.+-";

let password = "";

// length slider

slider.value = "10";

slider.addEventListener("input", sliderValue);

function sliderValue(){
   let value = parseInt(slider.value);
   passwordLength.innerText = value;
}


// generate random chars for password

function generateRandom(num1, num2){
   return Math.floor(Math.random()*(num2-num1+1))+num1;
}

function randomUppercase(){
   let value = generateRandom(65,90);
   return String.fromCharCode(value);

}

function randomLowercase(){
   let value = generateRandom(97,122);
   return String.fromCharCode(value);

}

function randomNumber(){
   return generateRandom(0,9);
}

function randomSymbol(){
   let value = generateRandom(0,symbols.length-1);
   return symbols[value];
}


// password generater button

button.addEventListener("click", ()=>{

   console.log("step-1");

   let val = countChecked();

   console.log("val = "+ val);

   if(val === 0){
      password = "";
      passwordDisplay.value = password;

      strengthIndicator.style.backgroundColor = "grey";
      
      errorMsg();

      return;
   }

   if(slider.value < val)
   {
      slider.value = val;
      sliderValue();
   }

   password = "";

   console.log("password = "+password);

   let arrFun = createCheckedArrFun();

   for(let curr of arrFun){
      password += curr();
   }

   let rest = slider.value - arrFun.length;

   for(let i=0 ; i<rest ; i++)
   {
      let index = generateRandom(0, arrFun.length-1);
      password += arrFun[index]();
   }

   let reqArr = [...password];
   let ansArr = randomize(reqArr);

   console.log(ansArr);

   password = ansArr.join("");

   console.log("password = "+password);
   
   passwordDisplay.value = password;

   checkStrength(password, arrFun);
   
});


function countChecked(){
   let res = 0;

   for(let curr of arrCheckbox){
      if(curr.checked){
         res += 1;
      }
   }

   return res;
}

async function errorMsg(){
   error.classList.add("copy-visible");

   await setTimeout( ()=>{
      error.classList.remove("copy-visible");
   }, 2000);
}

function createCheckedArrFun(){
   
   let arr = [];

   if(uppercase.checked)
   {
      arr.push(randomUppercase);
   }

   if(lowercase.checked)
   {
      arr.push(randomLowercase);
   }

   if(number.checked)
   {
      arr.push(randomNumber);
   }

   if(symbol.checked)
   {
      arr.push(randomSymbol);
   }

   return arr;
}


function randomize(arr){
 
    // Start from the last element and swap 
    // one by one. We don't need to run for 
    // the first element that's why i > 0 
   for (let i = arr.length - 1; i > 0; i--){
     
        // Pick a random index from 0 to i inclusive
      let j = Math.floor(Math.random() * (i + 1)); 
 
        // Swap arr[i] with the element 
        // at random index 
      [arr[i], arr[j]] = [arr[j], arr[i]];
   } 

   return arr;
}


function checkStrength(password, arrFun){
   let len = password.length;
   let arrLen = arrFun.length;
   
   if( (len <= 4) || (len > 4 && len <= 6 && arrLen < 3) || (arrLen <= 2) ){
      strengthIndicator.style.backgroundColor = "red";
   }
   else if(len > 4 && len <= 6 && arrLen > 2 && arrLen <= 4){
      strengthIndicator.style.backgroundColor = "yellow";
   }
   else{
      strengthIndicator.style.backgroundColor = "green";
   }
}


// copy button

passwordCopy.addEventListener("click", async ()=>{
   if(password){
      try{
         await navigator.clipboard.writeText(passwordDisplay.value);
         displayCopyMsg();
      }
      catch(e){
         copyMsg.innerText = "Failed";
         displayCopyMsg();
      }
   }
   
});

async function displayCopyMsg(){
   copyMsg.classList.add("copy-visible");

   await setTimeout( ()=>{
      copyMsg.classList.remove("copy-visible");
   }, 2000);
}

