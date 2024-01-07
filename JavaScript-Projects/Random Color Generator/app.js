const h1 = document.querySelector("h1");
const button = document.querySelector("button");

function nameh1(r,g,b)
{
    h1.innerText = `rgb(${r},${g},${b})`;
}

button.addEventListener('click', () => {
    let r = Math.floor(Math.random()*256)+0;
    let g = Math.floor(Math.random()*256)+0;
    let b = Math.floor(Math.random()*256)+0;

    const body = document.querySelector(".wrapper");
    body.style.backgroundColor = `rgb(${r},${g},${b})`;
    h1.innerText = `rgb(${r},${g},${b})`;

    // nameh1(r,g,b);

});

