
const btn = document.querySelector(".clickMe");
btn.addEventListener('click', dadJokes);

async function dadJokes()
{
    const config = {
        headers: {
            Accept: 'application/json'
        }
    };

    const res = await axios.get('https://icanhazdadjoke.com/', config);
    console.log(res.data.joke);

    addDadJokes(res.data.joke);
}

function addDadJokes(joke)
{
    const newLi = document.createElement("li");
    newLi.innerText = joke;
    
    const ul = document.querySelector(".jokeList");
    ul.appendChild(newLi);

}