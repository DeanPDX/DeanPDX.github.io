---
layout: post
title:  "Angular 5 Forms Dynamic Validation Summary"
date:   2018-02-04 15:57:01
excerpt: "Learn to build your own dynamic Angular 5 Forms Validation Summary."
featured_image: /images/2018-angular-forms/validation-summary.png
---

**1/12/2019 UPDATE:** I expanded on this idea quite a bit and built a ready to use [library that you can download from the NPM](https://github.com/DeanPDX/angular-validation-summary). If you just want a control to use, download the library and give a try. The original article follows below.

At some point you will need to display validation messages in your app. The Angular docs site has a useful [section on form validation](https://angular.io/guide/form-validation) but it centers around hand-coding each validation message. We want to automate that process and display our messages in a standard way.

## Getting Started
Consider the following simple example component with a form:

{% highlight html %}
<div id="mainWrapper">
  <h1>Angular Forms Validation Summary</h1>

  <form id="mainForm" #userForm="ngForm" (ngSubmit)="createUser()">
    <label for="userName">User Name:</label>
    <input id="userName" name="User Name" [(ngModel)]="model.userName" required minlength="4" />

    <label for="emailAddress">Email Address:</label>
    <input id="emailAddress" name="Email Address" [(ngModel)]="model.emailAddress" required />

    <label for="password">Password:</label>
    <input id="password" name="Password" type="password" [(ngModel)]="model.password" required minlength="8" />

    <button type="submit" [disabled]="!userForm.form.valid">Submit</button>
  </form>

  <h2>Diagnostic Info</h2>
  <div [innerHtml]="diagnostic"></div>
</div>
{% endhighlight %}

The supporting module looks like this:

{% highlight typescript %}
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  model : UserModel = {
    userName: '',
    emailAddress: '',
    password: ''
  };
  get diagnostic() { return JSON.stringify(this.model); }
}

export class UserModel {
  userName : string;
  emailAddress: string;
  password: string;
}
{% endhighlight %}

I also added some simple CSS to beautify the form a bit but I am omitting it for brevity. At this point, our app looks like this:

![Simple Angular 5 User Form](/images/2018-angular-forms/angular-form-step-1.png)

## Validation Summary Control

Next we will build a validation summary to support the validations we are using so far (`required` and `minlength`). Let's create a new control called `validation-summary`. In order for our control to have access to the form, we will pass it our form template variable (which we captured with `<form id="mainForm" #userForm="ngForm" (ngSubmit)="createUser()">`). My `validation-summary` module looks like this:

{% highlight typescript %}
import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';

@Component({
  selector: 'validation-summary',
  templateUrl: './validation-summary.component.html',
  styleUrls: ['./validation-summary.component.css']
})
export class ValidationSummaryComponent implements OnInit {
  @Input() form: NgForm;
  errors: string[] = [];

  constructor() { }

  ngOnInit() {
    if (this.form instanceof NgForm === false) {
      throw new Error('You must supply the validation summary with an NgForm.');
    }
    this.form.statusChanges.subscribe(status => {
      this.resetErrorMessages();
      this.generateErrorMessages(this.form.control);
    });
  }

  resetErrorMessages() {
    this.errors.length = 0;
  }

  generateErrorMessages(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(controlName => {
      let control = formGroup.controls[controlName];
      let errors = control.errors;
      if (errors === null || errors.count === 0) {
        return;
      }
      // Handle the 'required' case
      if (errors.required) {
        this.errors.push(`${controlName} is required`);
      }
      // Handle 'minlength' case
      if (errors.minlength) {
        this.errors.push(`${controlName} minimum length is ${errors.minlength.requiredLength}.`);
      }
    });
  }
}
{% endhighlight %}

The first thing you might notice about this code is that I am throwing an error on `init` if the form property is not set to an instance of type `NgForm`. Why? Because I am trying to ensure that future developers have useful information in their consoles. Here's what happens if you try to use this control and don't set the `form` property:

![Angular Validation Summary Type Error](/images/2018-angular-forms/validation-summary-error.png)

This is more useful than failing silently or throwing a generic error.

We are subscribing to an observable called `statusChanges`. Via the [angular docs](https://angular.io/api/forms/AbstractControlDirective#statusChanges) you can see this observable emits an event every time the validation status of the control is re-calculated - which is exactly what we want. Next, we are iterating over the keys (which are based on the name attributes in our form) of our controls to search for errors. The signature for the [controls member](https://angular.io/api/forms/FormGroup#controls) looks like this:

{% highlight typescript %}
controls: {
    [key: string]: AbstractControl;
}
{% endhighlight %}

It's worth noting that the minlength error object also exposes a property called `minlength.requiredLength` which you could use in your validation summary if you want to. You can use developer tools to snoop around the validation objects to learn more:

![Angular Minlength Error Object](/images/2018-angular-forms/min-length-object.png)

I have created a simple template to display the errors in my validation summary module:

{% highlight html %}
<div *ngIf="errors?.length > 0" class="validation-summary">
  <p>Please fix the following errors:</p>
  <ul>
    <li *ngFor="let error of errors">{{ error }}</li>
  </ul>
</div>
{% endhighlight %}

And finally I added the validation summary to the main form with the following tag:

{% highlight html %}
<validation-summary [form]="userForm"></validation-summary>
{% endhighlight %}

When put together, it looks like this:

![Angular Validation Summary Example](/images/2018-angular-forms/validation-summary-example.gif)

## What About Custom Asynchronous Validators?

Let's implement a custom asynchronous validator and then extend our validation summary to handle it. Here's my new validator to make sure things aren't "bad":

{% highlight typescript %}
import { Directive, forwardRef } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customValidator]',
    providers: [{
        provide: NG_ASYNC_VALIDATORS,
        useExisting: forwardRef(() => CustomValidatorDirective), multi: true
    }]
})

export class CustomValidatorDirective implements AsyncValidator {

  constructor() { }
  
  validate(c: AbstractControl): Promise<ValidationErrors> {
        // NOTE: This would normally be observable but for
        // some reason I had trouble with observable.map in
        // stackblitz so I reverted to using a promise.
        // setTimeout is intended to imitate server latency.
        return new Promise<ValidationErrors>(resolve => {
        setTimeout(() => {
          if (c.value.includes('bad') === true) {
            resolve({ message : 'is bad' });
          } else {
            resolve(null);
          }
        }, 500);
    });
  }
}
{% endhighlight %}

As you can see, we are returning a `ValidationErrors` object with a message property. I'm delaying the response by 500ms to simulate a server response delay. Now all we need to do is check for that in our `validation-summary` module by adding the following to our `generateErrorMessages` function:

{% highlight typescript %}
}
  // Handle custom messages.
  if (errors.message){
    this.errors.push(`${controlName} ${errors.message}`);
}
{% endhighlight %}

I'll add my new validator to the password field:

{% highlight html %}
<input id="password" [...] customValidator />
{% endhighlight %}

If I enter a password > 8 characters long with the string "bad", you can see this custom validation in action:

![Angular Validation Summary Async Validator Example](/images/2018-angular-forms/validation-summary-async-validator-example.png)

## Summary
That's it. We have a flexible, custom starting point for a validation summary that you can edit/customize to your liking. It works with built-in validators as well as custom, async validators. You can [try it it yourself on stackblitz](https://stackblitz.com/edit/angular-validation-summary) and edit it to your liking.