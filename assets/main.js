// 随机摘录
function pickQuote() {
  var elements = document.querySelector('#random-quote');
  if (elements !== null) {
    var quoteData;

    var xhrPosts = new XMLHttpRequest();
    xhrPosts.onreadystatechange = function() {
        if (xhrPosts.readyState == 4 && xhrPosts.status == 200) {
            quoteData = xhrPosts.responseText;
            quoteData = quoteData.split("quote_split");
            randomQuotes(quoteData);                 
        }
    }
    xhrPosts.open('GET', '/quotes.json', true);
    xhrPosts.send(null);
  }
}

window.onload = function() {
  pickQuote();
}

function randomQuotes(quotes) {
  if (quotes.length > 0){
    var index = Math.floor(Math.random() * quotes.length);
    document.querySelector('#random-quote').innerHTML = quotes[index];
  }
}
