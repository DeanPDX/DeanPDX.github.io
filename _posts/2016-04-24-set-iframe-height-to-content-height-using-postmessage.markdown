---
layout: post
title:  "Set iframe Height to 100% of Content Height Using window.postMessage"
date:   2016-04-24 13:25:22
excerpt: "I recently needed to host an iframe with dynamic content and keep the iframe height at 100% of the content height. I solved it using postMessage and you can too."
featured_image: /images/2016-postMessage/postMessageWithKittens.png
---

I recently needed to host an iframe with dynamic content and keep the iframe height at 100% of the content height.  I decided to create a solution using `window.postMessage` to facilitate cross-domain communication.  If you are unfamiliar with `postMessage`, check out [the documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) before proceeding.

Anyway, my approach looks like this:

1. Parent window listens for messages that child iframe has updated height.  Whenever it gets a message, it changes the height of the iframe.
2. Parent window waits for child iframe to load and sends it a message.
3. iframe receives message and establishes two-way communication.  
4. iframe sends message to parent window with initial height.
5. When iframe content height changes, it sends message back to parent window with updated height.

## The iframe

Let's get started with the iframe itself.  I kept it simple for the purposes of my demo and created an iframe that performs the important task of adding a picture of a kitten to the page when the user clicks a button.  My HTML is very basic:

{% highlight html %}
<button id="btnAddCats">Make this page more awesome!</button>
<div id="log"></div>
<div id="cats"></div>
{% endhighlight %}

I made the width of that cats div 300px wide:

{% highlight css %}
#cats {
    width: 300px;
}
{% endhighlight %}

Here is my JavaScript:

{% highlight javascript %}
// Listen for postMessage events.
window.addEventListener("message", receiveMessage, false);

// A variable for storing our parent message event so we can
// establish two-way communication.
var parentMessageEvent;

function receiveMessage(event) {
    // Let's make sure the sender of this message is who we think it is.
    if (event.origin !== 'http://www.deanpdx.com') {
        return;
    }
    var object = JSON.parse(event.data);
    appendToLog('Received postMessage.');
    appendToLog('Origin: ' + event.origin);
    appendToLog('Event: ' + object.event);
    appendToLog('Message: ' + object.message);
    // Store parent message event for two-way communication
    parentMessageEvent = event;
    sendResizeToParentWindow();
}

function appendToLog(message) {
    $('#log').append('<p>' + message + '</p>');
}

function sendResizeToParentWindow() {
    if (parentMessageEvent != undefined) {
        // Note: Chrome is fine with sending JSON objects as the message data
        // but some browsers (*glares at IE*) don't like it.  So, to make this
        // work on all browsers I am stringifying my objects and JSON.parsing them
        // on the other side.
        parentMessageEvent.source.postMessage(JSON.stringify({
        event: 'resize',
        height: $(document).height()
        }), parentMessageEvent.origin);
    }
};

// When the user wants to make the page more awesome, you know what to do...
$('#btnAddCats').click(function() {
    var width = Math.floor((Math.random() * 300) + 100);
    var height = Math.floor((Math.random() * 300) + 100);
    $('<img src="https://placekitten.com/' + width + '/' + height + '" alt="Adorable kitten">').load(function() {
        $(this).appendTo('#cats');
        sendResizeToParentWindow();
    });
});
{% endhighlight %}

As you can see, our iframe is waiting for a message.  When it receives the message is shows some data to the user and prepares for two-way communication between itself and the parent window.  You can view the iframe raw [here](/misc/2016-04-24/iframe.html) and I also created a [Pen](http://codepen.io/DeanPDX/pen/vGaqxj) if you prefer.

## The Parent Window
In this case, we are housing the iframe on this blog post.  Here is my iframe tag:

{% highlight html %}
<iframe id="responsiveFrame" height="100" src='/misc/2016-04-24/iframe.html' frameborder='no' allowtransparency='true' style='width: 100%;'>
{% endhighlight %}

Now, all we need to do is listen for messages, wait for the frame to load and send it a message.  Here is my JavaScript to accomplish that:

{% highlight javascript%}
    window.addEventListener("message", receiveMessage, false);
    
    function receiveMessage(event) {
        // Let's make sure the sender of this message is who we think it is.
        if (event.origin !== 'http://www.deanpdx.com') {
            return;
        }

        var object = JSON.parse(event.data);
        if (object.event === 'resize') {
            $("#responsiveFrame").height(object.height);
        }
    };
    
    $('#responsiveFrame').load(function(){
        var iframe = document.getElementById("responsiveFrame").contentWindow;
        iframe.postMessage(
            JSON.stringify({
                event: 'establishCommunication',
                message: 'Hello, world!'
            }), 'http://www.deanpdx.com');
    });
{% endhighlight %}

## Putting It All Together
Both of these frames have an initial height of "100".  Here is the frame without using `postMessage` to keep the height in sync.  Go ahead and click "Make this page more awesome!" and see what happens:
<iframe id="iframe1" height='100' src='/misc/2016-04-24/iframe.html' frameborder='no' allowtransparency='true' style='width: 100%;'>
</iframe>

As you can see, we get scrollbars and it makes it extremely difficult to properly enjoy all of those glorious kittens.  The user suddenly realizes that your site is using iframes and they grow suspicious that you are going to have a `prompt()` for their name so you can greet them and they exit your site as quickly as possible.  Now, let's try that with our `postMessage` approach to keep the height in sync with the content:
<iframe id="responsiveFrame" height="100" src='/misc/2016-04-24/iframe.html' frameborder='no' allowtransparency='true' style='width: 100%;'>
</iframe>

Tentative estimates place this user experience at about a 100% improvement.

## Conclusion
Hopefully you don't have to worry about cross-domain iframes that change height on you in your day-to-day life.  If you do, consider this approach.  It is easy to implement and has [pretty good browser support](http://caniuse.com/#search=postMessage).

Have you solved this problem using a different approach?  Are there egregious errors in my post?  Let me know!

<script>        
    window.addEventListener("message", receiveMessage, false);
    
    function receiveMessage(event) {
        // Let's make sure the sender of this message is who we think it is.
        if (event.origin !== "http://www.deanpdx.com") {
            return;
        }
        
        if (event.data === "ping") {
            return;
        }

        var object = JSON.parse(event.data);
        if (object.event === 'resize') {
            $("#responsiveFrame").height(object.height);
        }
    };
    
    $('#responsiveFrame').load(function(){
        var iframe = document.getElementById("responsiveFrame").contentWindow;
        iframe.postMessage(
            JSON.stringify({
                event: 'establishCommunication',
                message: 'Hello, world!'
            }), 'http://www.deanpdx.com');
    });
</script>