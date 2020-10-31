const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('spin');

//Get quote from API
let apiQuotes = []  

//show that we are loading
function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true; 
}

//hide loading
function removeLoadingSpinner(){
    quoteContainer.hidden = false;
    loader.hidden= true;
}

// show new quote console.log(quote)
function newQuote() {
   showLoadingSpinner()
    //pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    if(!quote.author){
    authorText.textContent = "Author Unknown"
    }else {
        authorText.innerText = quote.author
    }

    //Check quote.length to dertimine styling
    if(quote.text.length > 70){
    quoteText.classList.add('long-quote')
    }else {
        quoteText.classList.remove('long-quote') 
    }

    //set the quote, hide loader
    quoteText.innerText = quote.text
   removeLoadingSpinner()
}

async function getQuote() {
    showLoadingSpinner()
    const apiUrl = " https://type.fit/api/quotes"
     try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        //console.log(apiQuotes)
        newQuote()
    } catch (error) {
        console.log("Woops, no quote",error);
    }
}

//Tweet quote
function tweetQuote() {
const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
window.open(twitterUrl, 'blank')
}

//eventListners
newQuoteBtn. addEventListener('click', newQuote)
twitterButton.addEventListener('click', tweetQuote)


//on load
getQuote();




//const proxyUrl = "https://mighty-fortress-47692.herokuapp.com/"