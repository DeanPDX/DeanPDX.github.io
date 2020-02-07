---
layout: post
title:  "Angular - Reactive Forms VS Template-Driven Forms"
date:   2020-01-01 12:24:24
excerpt: "After building line of business apps with Angular for years, here's my take on reactive vs template-driven forms."
featured_image: /images/2019-angular-input-focus/Angular-Input-Focus.png
---

Reactive VS Template-Driven forms is a hotly-debated topic, with people writing titles like [Why It’s Time to Say Goodbye to Angular Template-Driven Forms](https://netbasal.com/why-its-time-to-say-goodbye-to-angular-template-driven-forms-350c11d004b) and Ward Bell's [excellent rebuttal to this post](https://link.medium.com/tnXhrH1AJ2) where he suggests developers **only** use template-driven forms. Netanel Basal's post is sensational and demonstrates a clear bias. The examples are contrived and incomplete in such a way that it favors reactive; like showing the template for template-driven, then comparing that to the component logic for initializing a `FormGroup` in reactive, ignoring the fact that reactive **also** requires a template.

After using Angular since prior to the initial release on many projects I am, generally speaking, in the Ward Bell camp on this issue. But let's dig deeper...

## The Angular Forms Party Line

You will see the same points repeated all over the place. This is from [the official docs](https://angular.io/guide/forms-overview#introduction-to-forms-in-angular):

> * **Reactive forms** are more robust: they're more scalable, reusable, and testable. If forms are a key part of your application, or you're already using reactive patterns for building your application, use reactive forms.
> * **Template-driven forms** are useful for adding a simple form to an app, such as an email list signup form. They're easy to add to an app, but they don't scale as well as reactive forms. If you have very basic form requirements and logic that can be managed solely in the template, use template-driven forms.

Template-driven forms don't scale well. Reactive forms are more "robust" (what does that even *mean* in this context?). Everybody's saying it so it must be true. Except it's not true at all in my experience, and most of the people blogging this party line are, more or less, parrotting this commom misconception without a lot of thought. Here's a challenge for you: I want you to come up with a form that I can't build using template-driven forms. Seriously, try me. I will gladly change my stance on this. 

I don't think reactive is *all* bad (there are some areas where it is superior to template-driven and I'll get in to that later); I just dislike the over-simplified explanation that everybody is regurgitating without seemingly having a lot of real-world experience.

## Boilerplate Code Sucks

I really dislike boilerplate / overly verbose code. I spent 5 hellish years of my life building a monolithic [WPF](https://en.wikipedia.org/wiki/Windows_Presentation_Foundation) app and every time I have to write excessive boilerplate code, it reminds me of those dark times. Is creating a `FormGroup` as hard as debugging giant nightmarish chunks of XAML? No - but if you multiply the overhead involved by every form on your app, it starts to add up. Additionally, writing boilerplate code is not as exciting as solving real problems.

Excessive boilerplate can also turn new potential Angular developers off, and having many developers in the Angular ecosystem is vital to its' success. I think anybody with web experience can look at the docs and see the value of two-way databiding using `[(ngModel)]` right away. One of the main reasons my team stopped using [Knockout](https://knockoutjs.com/index.html) many years ago in favor of [AngularJS](https://angularjs.org/) was the `Observable` syntax. Knockout was great for its' time but AngularJS' change-detection didn't require you to do **anything** to make it work; you just used plain old JavaScript objects and let the framework work its' magic. Was AngularJS perfect? Not at all, but that type of ease of use wins teams over.

## How Do Developers Create Forms in the First Place?

This might be controversial (I hope it's not) but I usually initially attack form design from the side of the template. I might go so far as to mock up a form in pure HTML as my first step. **Why?** Because creating a complicated form that all users can intuitively use across multiple devices (mobile, tablet, PC) is hard! You are almost always going to have to do some sort of validation/transformation step before passing your form data along to an API anyway, so it makes sense to think about your forms as forms, not object graphs.

I recently redesigned a login form for a client of mine. The problems were as follows:

* The mobile experience was **terrible**.
* There was no option to recover your username/email.
* Emphasis on password recovery was lacking, leading too many users to call the help desk to recover passwords.

Where do you think I spent most of my time? And where do you think I will spend my time when you are working on a form with, say, 30 fields and nested sub-forms? Representing the data as an object graph is simple. Making a form that actually makes sense and doesn't suck is hard. What I'm getting at here is: when it comes to forms, I have a template-first approach and using template-driven forms makes a lot of sense for me.

## But Templates Shouldn't Know About Validations!

Using directives is bad because your template might know about validations, right? For example, your template shouldn't control whether or not something is required. Reactive forms to the rescue:

```html
<!-- Whew. No directives here! -->
<input id="name" class="form-control"
      formControlName="name" required >
<!-- Where did these validators get added to my 
form control? I have no clue... -->
<div *ngIf="name.invalid && (name.dirty || name.touched)"
    class="alert alert-danger">
  <div *ngIf="name.errors.required">
    Name is required.
  </div>
  <div *ngIf="name.errors.minlength">
    Name must be at least 4 characters long.
  </div>
  <div *ngIf="name.errors.forbiddenName">
    Name cannot be Bob.
  </div>
</div>
```

Except reactive forms creates a situation where your validation logic must exist in multiple places. You add the `required` attribute in your template. You add other validations in your component code. That's all fine, but your template still has to know about validations in order to display them. When you include validations as directives in the template, you can see what validation messages you're going to need to support:

```html
<input id="name" name="name" class="form-control"
      required minlength="4" appForbiddenName="bob"
      [(ngModel)]="hero.name" #name="ngModel">
<!-- Ahh; I see what I need to validate based on 
the input! Any changes can be self-contained in
the template. -->
<div *ngIf="name.invalid && (name.dirty || name.touched)"
    class="alert alert-danger">
  <div *ngIf="name.errors.required">
    Name is required.
  </div>
  <div *ngIf="name.errors.minlength">
    Name must be at least 4 characters long.
  </div>
  <div *ngIf="name.errors.forbiddenName">
    Name cannot be Bob.
  </div>
</div>
```

Even better yet is **model-driven validation** - because I *do* agree that templates shouldn't control / care about specific field validations. But my point here is: reactive has zero advantages over template-driven in this case. And if you're not going to roll your own model-driven validation system to abstract it completely from the template, I actually prefer to have things in **one** place rather than split between two.

## Compile-Time Model Checking

`ngModel` binding has compile-time checking. So, if you remove a property from a given model, you can catch it before runtime:

```html
<!-- Prod build will catch this and throw an error. -->
<input [(ngModel)]="myModel.deprecatedProperty">
```

Compare that to reactive forms:

```html
<!-- Compiler don't care, but runtime does. -->
<input formControlName="deprecatedProperty">
```

Your unit tests should catch these problems, so it's a minor complaint; but I like the additional security of compile-time model checking. I once inherited an app that was in production but in such bad shape the tests wouldn't even run. It was one of those cases where I had to hit the ground running and do some major refactoring immediately to meet client deadlines. It's not an ideal use case, but in the real world not all projects have pristine tests with a lot of coverage. Compile-time checking on `ngModel` saved me a few times.

## Optional Nested Forms

## Disabling Form Controls

## Watching Value Changes

## Can You Use Both?

I don't buy the line that you **need** to choose one or the other. New Angular devs already have a lot to learn though. When I first started learning Angular I was coming from AngularJS, I wasn't familiar with Typescript, and I had never used RxJS. Learning a framework, principles of reactive programming, and a superset of a language at the same time is tough; so, to start, I think it's better to stick to template-driven so you're not adding one more piece to an already-complicated puzzle. That said, I have zero problems switching between reactive and template-driven; and I think it's important to understand both if you're a professional Angular developer, because you will almost certainly encounter both in your career.

## Conclusion

Do you love reactive forms? That's fine. I am currently using reactive and template-driven depending on the project myself. I think it's a valid strategy for certain forms. But please, stop repeating the lie that reactive is the only valid way to build forms. React doesn't have reactive forms. Vue doesn't have reactive forms. People have somehow managed to build apps with both of those frameworks. For me (and a lot of other people), template-driven is usually the way to go.