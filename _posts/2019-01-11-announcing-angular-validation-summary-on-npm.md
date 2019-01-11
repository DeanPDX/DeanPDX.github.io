---
layout: post
title:  "Announcing Angular Validation Summary on NPM"
date:   2019-01-11 09:25:26
excerpt: "Are you an Angular developer that longs for the days of ASP.Net MVC Validation Summaries? You are in luck, my friends!"
featured_image: /images/2019-angular-validation/validation.png
---

In February of 2018, I wrote [a blog post]({{ site.baseurl }}{% post_url 2018-02-04-angular-5-forms-dynamic-validation-summary %}) about creating a dynamic validation summary in Angular. I have since taken that concept, expanded upon it, and published a library to the NPM. I'm happy to announce [angular-validation-summary](https://github.com/DeanPDX/angular-validation-summary). To get started, try the summary out on my [test form](https://stackblitz.com/github/DeanPDX/angular-validation-summary?view=preview). Then head over to the [project page on GitHub](https://github.com/DeanPDX/angular-validation-summary) for documentation and examples.

## How to Publish an Angular Library to the NPM

While this was previously somewhat of a chore, [ng-packagr](https://github.com/ng-packagr/ng-packagr) is now built in to the angular CLI making things easy. If you want to know more, follow [this simple guide](https://github.com/angular/angular-cli/wiki/stories-create-library). To make my build/publish steps easier, I added the following scripts to my `package.json`:

```json
"build-lib": "ng build angular-validation-summary && npm run copy-license && npm run copy-readme",
"patch-version": "cd projects/angular-validation-summary && npm version patch && cd ../../",
"copy-license": "cp ./LICENSE ./dist/angular-validation-summary",
"copy-readme": "cp ./README.md ./dist/angular-validation-summary",
"publish-lib": "npm run patch-version && npm run build-lib && npm publish ./dist/angular-validation-summary"
```

This allows me to build, package, and publish my library to the NPM in a single step with `npm run publish-lib`. This also allows me to share my main readme/license with my library project located in `/projects/angular-validation-summary`.

## What's Next?

Do you need help? Have ideas for improvement? Want to collaborate? [Submit an issue](https://github.com/DeanPDX/angular-validation-summary/issues)!