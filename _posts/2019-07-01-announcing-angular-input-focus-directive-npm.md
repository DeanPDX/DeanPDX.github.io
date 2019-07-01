---
layout: post
title:  "Announcing Angular Input Focus Directive on NPM"
date:   2019-07-01 15:31:39
excerpt: "An easy to use input focus directive for Angular 8 that's safe to use with server-side rendering."
featured_image: /images/2019-angular-input-focus/Angular-Input-Focus.png
---

Dealing with focus is something I have had to do in nearly every Angular project I've worked on. There are a few directives out there to accomplish this but none that allowed event-driven focus and were safe for server-side rendering. I'm happy to announce [angular-input-focus](https://www.npmjs.com/package/angular-input-focus) on the NPM. To get started, install the library in your project:

```bash
npm install angular-input-focus --save
```

Next, add it to your list of imports:

```typescript
import { AngularInputFocusModule } from 'angular-input-focus';

@NgModule({
  imports: [AngularInputFocusModule]
})
```

For autofocus-like functionality, you can set `libFocus` to true (or a condition):

```html
<!-- Focus First name when control is rendered -->
First name: <input type="text" name="fname" [libFocus]="true">
Last name: <input type="text" name="lname">
```

You can also pass an `EventEmitter<boolean>` to the `setFocus` input. Imagine a component called `MyComponent`:

```typescript
export class MyComponent {
    // We will pass this to the directive in our view
    focusEvent = new EventEmitter<boolean>();
    // When called, will set the focus on our input
    setFocus() {
        this.focusEvent.emit(true);
    }
}
```

And the template for `MyComponent`:

```html
<input [libFocus]="false" [setFocus]="focusEvent">`
```

Whenever your `focusEvent` emits a value, your element will focus/blur depending on whether the emitted value is `true` or `false`.

## Project Status
I have tested this directive in most major browsers / OSes. I have also been using similar code in production apps for years. As of the time of this writing, I have 100% code coverage and up-to-date dependencies:

[![NPM](https://img.shields.io/npm/v/angular-input-focus.svg)](https://www.npmjs.com/package/angular-input-focus)
[![Build Status](https://img.shields.io/appveyor/ci/DeanPDX/angular-input-focus.svg)](https://ci.appveyor.com/project/DeanPDX/angular-input-focus)
[![Test Status](https://img.shields.io/appveyor/tests/DeanPDX/angular-input-focus.svg)](https://ci.appveyor.com/project/DeanPDX/angular-input-focus/build/tests)
[![Code Coverage](https://img.shields.io/codecov/c/github/DeanPDX/angular-input-focus.svg)](https://codecov.io/gh/DeanPDX/angular-input-focus)
[![Dependencies Status](https://img.shields.io/david/DeanPDX/angular-input-focus.svg)](https://david-dm.org/DeanPDX/angular-input-focus)
[![License](https://img.shields.io/github/license/DeanPDX/angular-input-focus.svg)](https://github.com/DeanPDX/angular-input-focus/blob/master/LICENSE)

## What's Next?

Head over to the [project page on GitHub](https://github.com/DeanPDX/angular-input-focus). Do you run in to a bug? Have ideas for improvement? Want to collaborate? [Submit an issue](https://github.com/DeanPDX/angular-input-focus/issues)!