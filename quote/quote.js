function randomSentence() {
    quoteArr = []

	{% assign year_count = "" %}
	{% assign counter = 0 %}
	{% for post in site.quotes reversed %}
	  {% assign thisyear = post.date | date: "%Y" %}
	  {% assign prevyear = post.previous.date | date: "%Y" %}
	  {% assign counter = counter | plus: 1 %}
	  {% if thisyear != prevyear %}
		{% capture new_val %}{{ post.date | date: '%Y' }}_{{ counter }},{% endcapture %}
		{% assign year_count = year_count | append: new_val %}
		{% assign counter = 0 %}
	  {% endif %}
	{% endfor %}

	{% for post in site.quotes reversed %}
	  {% unless post.next %}
		{% assign temval = year_count | split: "," %}
		{% assign y = post.date | date: '%Y' %}
		{% for y_c in temval %}
		  {% if y_c contains y %}
			{% assign arr = y_c | split: "_" %}
			{% break %}
		  {% endif %}
		{% endfor %}
	  {% else %}
		{% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
		{% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
		{% if year != nyear %}
		  {% assign temval = year_count | split: "," %}
		  {% assign y = post.date | date: '%Y' %}
		  {% for y_c in temval %}
			{% if y_c contains y %}
			  {% assign arr = y_c | split: "_" %}
			  {% break %}
			{% endif %}
		  {% endfor %}
		{% endif %}
	  {% endunless %}
      quoteArr.push(post.excerpt)
	{% endfor %}}


    // document.getElementById('quote').innerHTML = quoteArr[Math.floor(Math.random() * quoteArr.length)];
    document.getElementById('quote').innerHTML = "Hello World";
}
  
randomSentence();