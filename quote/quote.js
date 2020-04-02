function randomSentence() {
        var allPosts = [{% for post in site.quotes %}
          "{{ post.excerpt }}"{% unless post.previous == nil %},{% endunless %}
        {% endfor %}];
    
        var randomQuote = allPosts[Math.floor(Math.random() * allPosts.length)]; i++;
        document.getElementById('quote').innerHTML = randomQuote;
    }
    
    document.getElementById('quote2').innerHTML = "Hello World";
}
  
randomSentence();