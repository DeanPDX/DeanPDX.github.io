---
layout: post
title:  "Making an HTML Element Height Proportional to Width Using JQuery"
date:   2015-07-05 20:33:22
---

## Introduction
Recently, I needed to have a div element with height proportional to its width.  There are some modern ways of solving this problem (for example, [this](http://www.mademyday.de/css-height-equals-width-with-pure-css.html)) but I (unfortunately) had to support IE 7 in this case.  Here is that modern solution rendered in IE8 using IE7 mode:

![Modern Tricks Look Awesome in IE8](/images/2015-height-width/modern-solution.png)

## Solution
First, you will need JQuery. Since I'm supporting old versions of IE, I went with v1.11.3:

{% highlight html %}
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
{% endhighlight %}

Next, you will need some test HTML:

{% highlight html %}
<div id='test'>
  <p>Some Content</p>
</div>
{% endhighlight %}

Let's add some CSS to easily identify this test div:

{% highlight css %}
 #test {
  width: 50%;
  color: green;
  background-color: black;
 }
{% endhighlight %}

Now we are ready for our JavaScript:
{% highlight javascript %}
$(window).resize(function () {
    handleOffset();
});
function handleOffset() {
    var testDiv = $('#test');
    var divWidth = testDiv.width();
    var aspectRatio = 0.3; // Update as needed
    var divHeight = divWidth * aspectRatio;
    testDiv.height(divHeight);
}
handleOffset();
{% endhighlight %}

Let's see how it looks in EI8 running in IE7 compatibility mode:

![2006 Never Looked so Good](/images/2015-height-width/running-in-ie8.png)

As you can see, it looks pretty amazing.  If you are skeptical and want to check for yourself, you can see the whole thing [running in a single page](/misc/2015-07-05/test.html).  I have also created a [pen](http://codepen.io/DeanPDX/pen/rVdeJW) that you can copy + paste from.  But don't try running that pen using IE7 because CodePen apparently doesn't take kindly to geriatric browsers:

![CodePen IE7 Mode](/images/2015-height-width/code-pen.png)