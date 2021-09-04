const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQtBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQuotes= [];

// Show New Quote
function newQuote(){
    showLoading();
    // Pick a random quote from apiQuotes Array
    const quote = apiQuotes[(Math.floor(Math.random() * apiQuotes.length))];
    // Check if Author is blank and replace it with 'Unknown'
    authorText.textContent = quote.author?quote.author:'Unknown';
    // Check quote length to determine the styling
    if(quote.text.length>120){
        quoteText.classList.add('long-quote');
    } else{
        quoteText.classList.remove('long-quote');
    }
    //Show Quote and Hide Loader
    quoteText.textContent = quote.text;
    hideLoading();
}
// Get Quotes from API
async function getQuotes(){
    showLoading();
    const apiUrl='https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch(error){
        //Catch Error Here
    }
}

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}
// Show Loader
function showLoading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// Hide Loader
function hideLoading(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}
// Add Event Listeners to Button
newQtBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click', tweetQuote);
// On Load

getQuotes();
