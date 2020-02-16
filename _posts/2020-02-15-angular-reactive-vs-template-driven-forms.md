---
layout: post
title:  "Angular - Reactive Forms VS Template-Driven Forms"
date:   2020-02-15 12:24:24
excerpt: "After building line of business apps with Angular for years, here's my take on reactive vs template-driven forms."
featured_image: /images/2020-angular-forms/ReactiveVsTemplateDrivenForms.png
---

Reactive VS Template-Driven forms is a hotly-debated topic, with people writing titles like [Why It’s Time to Say Goodbye to Angular Template-Driven Forms](https://netbasal.com/why-its-time-to-say-goodbye-to-angular-template-driven-forms-350c11d004b) and Ward Bell's [excellent rebuttal to this post](https://link.medium.com/tnXhrH1AJ2) where he suggests developers **only** use template-driven forms. Netanel Basal's post is sensational and demonstrates a clear bias. The examples are contrived and incomplete in such a way that it favors reactive; like showing the template for template-driven, then comparing that to the component logic for initializing a `FormGroup` in reactive, ignoring the fact that reactive **also** requires a template.

After using Angular since prior to the initial release on many projects I am, generally speaking, in the Ward Bell camp on this issue. But let's dig deeper...

![Angular Reactive VS Template-Driven Forms](/images/2020-angular-forms/ReactiveVsTemplateDrivenForms.png)

## The Angular Forms Party Line

You will see the same points repeated all over the place. This is from [the official docs](https://angular.io/guide/forms-overview#introduction-to-forms-in-angular):

> * **Reactive forms** are more robust: they're more scalable, reusable, and testable. If forms are a key part of your application, or you're already using reactive patterns for building your application, use reactive forms.
> * **Template-driven forms** are useful for adding a simple form to an app, such as an email list signup form. They're easy to add to an app, but they don't scale as well as reactive forms. If you have very basic form requirements and logic that can be managed solely in the template, use template-driven forms.

Template-driven forms don't scale well. Reactive forms are more "robust" (what does that even *mean* in this context?). Everybody's saying it so it must be true, right? Except it's not true at all in my experience. I don't think reactive is *all* bad but I dislike the over-simplified bullet points that everybody is parroting without seemingly having a lot of real-world experience.

## Boilerplate Code Sucks

I really dislike boilerplate / overly verbose code. I spent 5 hellish years of my life building a monolithic [WPF](https://en.wikipedia.org/wiki/Windows_Presentation_Foundation) app and every time I have to write excessive boilerplate code, it reminds me of those dark times. Is creating a `FormGroup` as hard as debugging giant nightmarish chunks of XAML? No - but if you multiply the overhead involved by every form on your app, it starts to add up. Additionally, writing boilerplate code is not as exciting as solving real problems, and more code often means more bugs.

Excessive boilerplate can also turn new potential Angular developers off. I think anybody with web experience can look at the docs and see the value of two-way databiding using `[(ngModel)]` right away. One of the main reasons my team stopped using [Knockout](https://knockoutjs.com/index.html) many years ago in favor of [AngularJS](https://angularjs.org/) was Knockout's `Observable` syntax. Knockout was great for its' time but AngularJS' change-detection didn't require you to do **anything** to make it work; you just used plain old JavaScript objects and let the framework work its' magic. Was AngularJS perfect? Not at all, but that type of ease of use wins teams over.


## Compile-Time Model Checking

`ngModel` binding has compile-time checking. So, if you remove a property from a given model, you can catch errors like this before runtime:

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

## Optional Nested Fields

This is something that happens a lot: our user checks something (let's say "use custom address" on an order form) and the form changes based on their input. We need to add/remove controls based on what the user has selected. Here's one of the areas where template-driven forms saves you a lot of time because it tracks the `FormControls` for you and updates their validity and state. With template-driven:

```html
<h1>Template-Driven Form</h1>
<form (ngSubmit)="submitTemplate()" #templateForm="ngForm">
    <label>First Name: <input type="text" name="firstName" [(ngModel)]="firstName" required></label>
    <label>Last Name: <input type="lastName" name="name" [(ngModel)]="lastName" required></label>
    <label>Custom Address?: <input type="checkbox" name="useCustomAddress" [(ngModel)]="useCustomAddress"></label>
    <div *ngIf="useCustomAddress === true">
        <label>Address 1: <input type="text" name="address1" [(ngModel)]="address1" required></label>
    </div>
    <button [disabled]="templateForm.invalid">Submit</button>
</form>
```

And here's our component:

```typescript
export class FormsTestComponent {
  firstName = '';
  lastName = '';
  address1 = '';
  useCustomAddress = false;
  
  // Literally nothing to do because the framework handles
  // it for us and everything just works.
  constructor() { }

  submitTemplate() {
  }
}
```

Here's the same form built with reactive forms:

```html
<h1>Reactive Form</h1>
<form [formGroup]="myForm" (ngSubmit)="submitReactive()">
    <label>First Name: <input type="text" formControlName="firstName" required></label>
    <label>Last Name: <input type="text" formControlName="lastName" required></label>
    <label>Custom Address?: <input type="checkbox" formControlName="useCustomAddress"></label>
    <div *ngIf="myForm.get('useCustomAddress').value === true">
        <label>Address 1: <input type="text" formControlName="address1"></label>
    </div>
    <button [disabled]="myForm.invalid">Submit</button>
</form>
```

And here's our reactive component:

```typescript
export class FormsTestComponent implements OnInit {
  myForm: FormGroup;
  constructor() { 
    this.myForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      address1: new FormControl(''),
      useCustomAddress: new FormControl(false)
    });
    // We need to watch form changes to enable/disable validation
    // on our nested fields. Another approach is to add/remove the
    // nested fields completely here. I usually add/remove because
    // nested field are usually a complex type with multiple fields,
    // not just a string.
    this.myForm.get('useCustomAddress').valueChanges.subscribe(value => {
      let address1 = this.myForm.get('address1');
      if (value == true) {
        address1.setValidators([Validators.required])
      } else {
        address1.clearValidators();
      }
      // Failing to call updateValueAndValidity results in
      // expression changed after it has been checked error.
      // The documentation mentions this so it's not a huge
      // deal but something to consider.
      address1.updateValueAndValidity();
    });
  }

  submitReactive() {

  }
}
```

Is the reactive forms paradigm a deal-breaker? Not really - but you can see how it's nice to not have to worry about it and let the framework take care of things for us. You can play with both approaches in this [live example](https://stackblitz.com/edit/angular-m9qnhp).

## How Do Developers Create Forms in the First Place?

This might be controversial (I hope it's not) but I usually initially attack form design from the side of the template. I might go so far as to mock up a form in pure HTML as my first step. **Why?** Because creating a complicated form that all users can intuitively use across multiple devices (mobile, tablet, PC) is hard! You are almost always going to have to do some sort of validation/transformation step before passing your form data along to an API anyway, so it makes sense to think about your forms as forms, not object graphs.

I recently redesigned a login form for a client of mine. The problems were as follows:

* The mobile experience was **terrible**.
* There was no option to recover your username/email.
* Emphasis on password recovery was lacking, leading too many users to call the help desk to recover passwords.

Where do you think I spent most of my time? And where do you think I will spend my time when you are working on a form with, say, 30 fields and nested sub-forms? Representing the data as an object graph is simple. Making a form that actually makes sense and doesn't suck is hard. What I'm getting at here is: when it comes to forms, I have a template-first approach and thus using template-driven forms makes a lot of sense to me.

## Templates Shouldn't Know About Validations!

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

## Can You Use Both?

I don't buy the line that you **need** to choose one or the other. Once you have some Angular experience under your belt, you will have zero problems switching between reactive and template-driven; and I think it's important to understand both if you're a professional Angular developer. You will almost certainly encounter both in your career and it isn't always practical to remove any form you come across that isn't your preferred type.

#### But What About Bundle Size?

I created a brand new test project using Ivy. Then I added reactive forms, and I created a form just to make sure tree-shaking wouldn't optimize the module out. Then I added template-driven forms to the project and created a template-driven form. Here's how it affected my prod build size:

| App                               | es5    | es2015 | Total  |
|-----------------------------------|--------|--------|--------|
| Hello World                       | 250 KB | 139 KB | 389 KB |
| With reactive forms only          | 316 KB | 193 KB | 509 KB |
| With reactive and template-driven | 324 KB | 199 KB | 524 KB |
|                                   |        |        |        |

Most [browsers worth their salt support es2015](https://kangax.github.io/compat-table/es6/) so we will go ahead and use those numbers. Adding reactive forms added *54 KB* to our bundle size. Adding template-driven forms on top of that only added *6 KB*. So, adding both forms modules to your project will result in a negligible increase in bundle size. **Why?** Because whether you use reactive or template-driven, your project is going to be using `FormGroup`, `FormControl` et al., and adding both modules will result in a tree-shaken bundle that is a sane size.

## Conclusion

Don't believe black and white arguments that say one is vastly better than the other with no downsides. There are compromises to both approaches and anyone who says differently is selling something. I am currently using a mixture of reactive and template-driven depending on the project.

React doesn't have reactive forms. Vue doesn't have reactive forms. People have somehow managed to build apps with both of those frameworks. For me (and a lot of other people), template-driven is usually the easiest way to solve a given problem.