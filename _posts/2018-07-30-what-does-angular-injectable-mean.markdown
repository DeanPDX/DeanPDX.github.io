---
layout: post
title:  "What Does Angular's @Injectable Decorator Mean?"
date:   2018-07-30 19:33:15
excerpt: "You might assume that the Angular docs on @Injectable are correct. They are not. Here's everything you (probably don't) need to know!"
featured_image: /images/2018-angular-injectable/angular-docs.png
---
I have been using the `@Injectable` decorator since 2016 with the understanding that it was to indicate that the component/service I am decorating with `@Injectable` is able to be injected in to other services and components. The [Angular Documentation on Injectable](https://angular.io/api/core/Injectable) says it is "*A marker metadata that marks a class as available to `Injector` for creation*". The documentation goes on to say:

> `Injector` will throw an error when trying to instantiate a class that does not have `@Injectable` marker, as shown in the example below.

And here is their example that should throw an error:

{% highlight typescript %}
class UsefulService {}

class NeedsService {
  constructor(public service: UsefulService) {}
}

expect(() => ReflectiveInjector.resolveAndCreate([NeedsService, UsefulService])).toThrow();
{% endhighlight %}

It seems straightforward, right? **Wrong**. The documentation is incorrect and that isn't what `Injectable` means at all. Take a look at [this issue on GitHub](https://github.com/angular/angular/issues/12098). The important part is [this comment by Pawel Kozlowski](https://github.com/angular/angular/issues/12098#issuecomment-251801431):

> Yes, the documentation should be fixed. `@Injectable` is needed if you want to inject things **into** a service.

## Let's Test It Ourselves
Let's arrange a test that the documentation said should throw an exception. First, we create a `UsefulService` that does **not** have the `@Injectable` decorator:

{% highlight typescript %}
export class UsefulService {
  public message: string = 'Hello from UsefulService!';
}
{% endhighlight %}

Then add a provider to my `AppModule`:

{% highlight typescript %}
providers: [ UsefulService ]
{% endhighlight %}

And next, inject it into my `AppComponent`:

{% highlight typescript %}
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messageFromUsefulService: string = '';
  // According to Angular docs, injecting `UsefulService` should throw an 
  // exception due to the fact that it doesn't have the @Injectable decorator.
  constructor(private usefulService: UsefulService) {
    this.messageFromUsefulService = usefulService.message;
  }
}
{% endhighlight %}

No exception. Our service was injected just fine. And just to be sure nothing untoward happened during injection, I am using a string from the service in my component. Next, I wanted to see if I could get an exception to be thrown if I tried to inject `UsefulService` into another service:

{% highlight typescript %}
export class Service2 {
  public message: string = 'Bonjour from Service 2!';
  constructor(private usefulService: UsefulService) {
  }
}
{% endhighlight %}

That code throws the following error:

> Error in .../@angular/compiler@6.0.0/bundles/compiler.umd.js (301:17)
> Can't resolve all parameters for Service2: (?).

You can test this yourself using a [StackBlitz I created](https://stackblitz.com/edit/angular-injectable-example?file=src%2Fapp%2Fapp.component.ts).

So, why does injection work in `AppComponent`? Because the [@Component](https://angular.io/api/core/Component) decorator inherits from the [@Directive](https://angular.io/api/core/Directive) decorator, which itself has an `injector`. The fact that we set up a `provider` is the important bit here because that means anything downstream from our main `@NgModule` will be able to have our class injected as long as it has an `injector`. From [the docs](https://angular.io/guide/glossary#injector):

> Injectors are created for NgModules automatically as part of the bootstrap process and are inherited through the component hierarchy.

You can also inject your service using `@Inject` in your constructor without decorating your class with `@Injectable` like this:

{% highlight typescript %}
export class MyService {
  constructor(@Inject(UsefulService) usefulService:UsefulService) {
  }
}
{% endhighlight %}

## So What about Their Example Test?
The documentation references [this test](https://github.com/angular/angular/blob/c8a1a14b87e5907458e8e87021e47f9796cb3257/packages/examples/core/di/ts/metadata_spec.ts#L80):

{% highlight typescript %}
it('throws without Injectable', () => {
  // #docregion InjectableThrows
  class UsefulService {}

  class NeedsService {
    constructor(public service: UsefulService) {}
  }

  expect(() => ReflectiveInjector.resolveAndCreate([NeedsService, UsefulService])).toThrow();
  // #enddocregion
});
{% endhighlight %}

That code does throw an exception. But not because `UsefulService` doesn't have the `@Injectable` decorator. It throws because `NeedsService` doesn't have an `Injector` that provides `UsefulService`. In fact, in that same suite of tests they have [a test](https://github.com/angular/angular/blob/c8a1a14b87e5907458e8e87021e47f9796cb3257/packages/examples/core/di/ts/metadata_spec.ts#L31) to verify that you **can** inject a service that **does not** have the `@Injectable` decorator:

{% highlight typescript %}
it('works without decorator', () => {
  // #docregion InjectWithoutDecorator
  class Engine {}

  @Injectable()
  class Car {
    constructor(public engine: Engine) {
    }  // same as constructor(@Inject(Engine) engine:Engine)
  }

  const injector = ReflectiveInjector.resolveAndCreate([Engine, Car]);
  expect(injector.get(Car).engine instanceof Engine).toBe(true);
  // #enddocregion
});
{% endhighlight %}

## Wrapping Up
`@Injectable` still has use in configuring injection in the context of [providers](https://angular.io/guide/dependency-injection#injectable-providers) and scoping. And of course it allows injection into your services (if you aren't using the `@Inject` syntax instead). Hopefully the Angular docs will be fixed and that test updated or removed.