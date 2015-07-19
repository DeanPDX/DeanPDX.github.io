---
layout: post
title:  "Getting Started With Material Design Lite"
date:   2015-07-19 12:40:22
---

Google recently released [Material Design Lite](http://www.getmdl.io/) and it looks modern and promising.  Plus, it's not Bootstrap so it has that going for it (go ahead and throw your rotten veggies at me now but know this: I have used and loved Bootstrap on many a project but am ready for some new options).  That having been said, it's still new and thus not without its' flaws so you should proceed with caution if you are using it in production.

##MDL Address Entry Form
Let's keep it simple and build an Address entry form with a busy indicator and a fake submit button.  This assumes you have links to MDL stylesheets, scripts and jquery referenced in your head tag.

I decided to use `mdl-grid` to handle my form layout.  MDL's grid system is really easy to use.  Here are the upshot of the cell column widths:

* `4` will be 100% width on phone
* `8` will be 100% width on tablet
* `12` will be 100& on desktop
* You can target devices using the following class declaration: 
  * `class="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet"` <- 8 (or 100% width) on tablet, 6 (or 50% width) on desktop

Without further ado, here is our HTML:

{% highlight html %}
<div class="mdl-grid">
  <div class="mdl-typography--headline mdl-cell mdl-cell--12-col">Billing Address</div>
  <div class="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--4-col">
    <input class="mdl-textfield__input" type="text" id="firstname" />
    <label class="mdl-textfield__label" for="firstname">First Name</label>
  </div>
  <div class="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--4-col">
    <input class="mdl-textfield__input" type="text" id="firstname" />
    <label class="mdl-textfield__label" for="lastname">Last Name</label>
  </div>
  <div class="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--4-col">
    <input class="mdl-textfield__input" type="text" id="address1" />
    <label class="mdl-textfield__label" for="address1">Address 1</label>
  </div>
  <div class="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--4-col">
    <input class="mdl-textfield__input" type="text" id="address2" />
    <label class="mdl-textfield__label" for="address2">Address 2</label>
  </div>
  <div class="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--4-col">
    <input class="mdl-textfield__input" type="text" id="city" />
    <label class="mdl-textfield__label" for="city">City</label>
  </div>
  <div class="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--4-col">
    <input class="mdl-textfield__input" type="text" id="state" />
    <label class="mdl-textfield__label" for="state">State</label>
  </div>
  <div class="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--4-col">
    <input class="mdl-textfield__input" type="text" id="zip" />
    <label class="mdl-textfield__label" for="zip">Zip</label>
  </div>
</div>
<button id="placeOrder" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
  Place Order
</button>
{% endhighlight %}

Let's add the following CSS:

{% highlight css %}
#placeOrder {
  margin-left: 15px;
}

#orderBusyIndicator.is-active {
  position: relative;
  top: 10px;
}
{% endhighlight %}

And some JavaScript to do something when the user presses the "place order" button:

{% highlight javascript %}
$('#placeOrder').click(function() {
  // Add busy indicator
  $('#orderBusyIndicator').addClass('is-active');
  // Disable button to prevent multiple clicks
  $(this).prop("disabled", true);
  // Here you would do some sort of API call...
  setTimeout(function() {
    $('#placeOrder').prop("disabled", false);
    $('#orderBusyIndicator').removeClass('is-active');
  }, 2000);
});
{% endhighlight %}

... and that's it.  Here is our form up and running:

<iframe height='475' scrolling='no' src='/misc/2015-07-19/standalone.html' frameborder='no' allowtransparency='true' style='width: 100%;'>
</iframe>

I have also included all of this in a [Pen](http://codepen.io/DeanPDX/pen/QbBzJv) for your viewing pleasure.  Questions, comments, rants or raves?  Let me know!