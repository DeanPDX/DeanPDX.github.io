---
layout: post
title:  "Getting Started With ASP.NET Core 1.0 From Scratch"
date:   2016-07-19 14:05:22
excerpt: "ASP.NET running on MacOS at blazing fast speeds? This isn't a dream; it is .Net Core and it is the future.  Let's get started."
featured_image: /images/2016-hellocore/HelloCoreXS.png
---

It's an exciting time to be a developer.  The tools available to us are getting better and more platform-agnostic and Microsoft is embracing the Open Source community.  In this post, I am going to explore getting started with a ASP.NET Core app on Mac OS.  I'm using Visual Studio Code as my editor but you can use whatever editor you prefer.  Let's get started!

First off, let's create a directory and run `dotnet new` to create a new C# app.  I'm calling my app HelloCore:
{% highlight shell %}
Deans-MacBook-Pro:Projects deandavidson$ mkdir HelloCore
Deans-MacBook-Pro:Projects deandavidson$ cd HelloCore/
Deans-MacBook-Pro:HelloCore deandavidson$ dotnet new
Created new C# project in /Users/deandavidson/Documents/Projects/HelloCore.
{% endhighlight %}

So, what just happened?  Let's take a look at `project.json`:

{% highlight json %}
{
  "version": "1.0.0-*",
  "buildOptions": {
    "debugType": "portable",
    "emitEntryPoint": true
  },
  "dependencies": {},
  "frameworks": {
    "netcoreapp1.0": {
      "dependencies": {
        "Microsoft.NETCore.App": {
          "type": "platform",
          "version": "1.0.0"
        }
      },
      "imports": "dnxcore50"
    }
  }
}
{% endhighlight %}

As you can see, by default it imports `dnxcore50`.  Why?  This allows us to reference pre-RC1 .NET Core Preview libraries.  There is a lot of great info on Target Framework Monikers in [this blog post](https://blogs.msdn.microsoft.com/cesardelatorre/2016/06/28/running-net-core-apps-on-multiple-frameworks-and-what-the-target-framework-monikers-tfms-are-about/).  If you are unfamiliar with how .NET Core naming has changed, Hanselman does a really good job of explaining it here: [ASP.NET 5 is dead - Introducing ASP.NET Core 1.0 and .NET Core 1.0](http://www.hanselman.com/blog/ASPNET5IsDeadIntroducingASPNETCore10AndNETCore10.aspx) <- With a title like that, you basically don't even need to READ the post.

In addition to `project.json`, we also have an entry point in to our application in `Program.cs`:

{% highlight csharp %}
using System;

namespace ConsoleApplication
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
        }
    }
}
{% endhighlight %}

Next, let's restore dependencies using `dotnet restore`:

{% highlight shell %}
Deans-MacBook-Pro:HelloCore deandavidson$ dotnet restore
log  : Restoring packages for /Users/deandavidson/Documents/Projects/HelloCore/project.json...
log  : Lock file has not changed. Skipping lock file write. Path: /Users/deandavidson/Documents/Projects/HelloCore/project.lock.json
log  : /Users/deandavidson/Documents/Projects/HelloCore/project.json
log  : Restore completed in 939ms.
Deans-MacBook-Pro:HelloCore deandavidson$ 
{% endhighlight %}

And finally let's run the app using `dotnet run`:

![The App Runs!](/images/2016-hellocore/FirstRun.png)

It's nice that our app runs but it doesn't actually *do* anything.  Let's add the following dependencies to our `project.json` file's root-level dependencies property which was previously blank:

{% highlight json %}
  "dependencies": {
    "Microsoft.NETCore.App": {
      "version": "1.0.0",
      "type": "platform"
    },
    "Microsoft.AspNetCore.Mvc": "1.0.0",
    "Microsoft.AspNetCore.Diagnostics": "1.0.0",
    "Microsoft.AspNetCore.Server.Kestrel": "1.0.0",
    "Microsoft.AspNetCore.StaticFiles": "1.0.0",
    "Microsoft.Extensions.Logging.Console": "1.0.0",
    "Microsoft.Extensions.Configuration.EnvironmentVariables": "1.0.0",
    "Microsoft.Extensions.Configuration.FileExtensions": "1.0.0",
    "Microsoft.Extensions.Configuration.Json": "1.0.0"
  }
{% endhighlight %}

Do a `dotnet restore` to load in the new dependencies.  For this app, I want to put my server-side code in a folder called `Api` and my client-side code in a folder called `Client`.  So, first off: let's create the `Api` folder and add a `Startup.cs` file with the following code:

{% highlight csharp %}
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;

namespace HelloCore.Api
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            // Set up our file server.
            app.UseFileServer(new FileServerOptions()
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), @"Client")),
                RequestPath = new PathString(""), // Our root path goes to the Client folder
                EnableDirectoryBrowsing = false // Don't allow users to browse directories
            });
            app.UseStaticFiles();
            app.UseMvc();
        }
    }
}
{% endhighlight %}

Our app isn't using this startup file yet or doing anything really.  So, let's change that by modifying our `Program.cs` file to configure and run our ASP.NET app:

{% highlight csharp %}
using System.IO;
using Microsoft.AspNetCore.Hosting;
using HelloCore.Api;

namespace HelloCore
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                .UseKestrel() // Since we are on Mac OS, we are using kestrel
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseStartup<Startup>() // Use our Startup class in /App/
                .Build();
            host.Run(); // Actually run the app
        }
    }
}
{% endhighlight %}

We can't currently run the app because the `Client` folder doesn't exist so our file server doesn't work.  Let's create the `Client` folder and add `Index.html` to it with the following content:

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Hello Core</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7"
        crossorigin="anonymous">
    <!-- Bootstrap Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r"
        crossorigin="anonymous">
    <!-- Bootstrap JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS"
        crossorigin="anonymous"></script>
    <!-- jquery -->
    <script   src="https://code.jquery.com/jquery-3.1.0.min.js"   integrity="sha256-cCueBR6CsyA4/9szpPfrX3s49M9vUU5BgtiJj06wt/s="   crossorigin="anonymous"></script>
    <!-- Our main app javascript -->
    <script src="/Scripts/App.js"></script>
</head>
<body>
    <div class="container">
        <h1>Hello Core!</h1>
        <button id="btn-get-contacts" class="btn btn-primary">Get Contacts</button>
        <div id="contacts"></div>
    </div>
</body>
</html>
{% endhighlight %}

Note that this file references `/Scripts/App.js` which doesn't exist yet.  Before we create our script, let's create a route that it can call to get some contact data.  Create a `Controllers` folder under `/Api/` and add `ContactsController.cs` with the following self-deprecating code:

{% highlight csharp %}
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace HelloCore.Api.Controllers
{
    [Route("api/[controller]")]
    public class ContactsController : Controller 
    {
        // Note: for the sake of demo brevity we are just creating an
        // inner class but don't do this in the real world.
        public class ContactModel 
        {
            // Nobody gets middle names around these parts...
            public string FirstName { get; set; }
            public string LastName { get; set; }
        }

        // GET api/contacts
        [HttpGet]
        public List<ContactModel> Get()
        {
            // Our data access layer, seen here, is the height of elegance.
            return new List<ContactModel>() {
                new ContactModel() { FirstName = "Dean", LastName = "Davidson" },
                new ContactModel() { FirstName = "Scott", LastName = "Gu" },
                new ContactModel() { FirstName = "Other", LastName = "Scott" },
                new ContactModel() { FirstName = "John", LastName = "Doe" }
            };
        }
    }
}
{% endhighlight %}

Now that we have a `api/contacts` route, we can add `App.js` to `/Client/Scripts/` (create the `Scripts` folder):

{% highlight javascript %}
$(document).ready(function() { 
    // When the user clicks the "get contacts" button, retrieve contacts from our web API and display them.
    $('#btn-get-contacts').click(function() {
        $.get('/api/contacts', function(data) {
            // Note: don't really do this either.  Use a templating engine or SPA framework
            $('#contacts').html('<ul id="contacts-group" class="list-group"></ul>');
            var contactsGroup = $('#contacts-group');
            for (var i = 0; i < data.length; i++) {
                contactsGroup.append('<li class="list-group-item"><span class="glyphicon glyphicon-user"></span> ' + data[i].firstName + ' ' + data[i].lastName + '</li>');
            }
        });
    });
});
{% endhighlight %}

Now, if we do a dotnet run and navigate to `http://localhost:5000/`, we should be able to press our button and get data back from our API:

![Core App Running In Chrome](/images/2016-hellocore/HelloCoreRunning.png)

## Conclusion
This is a very basic example but it will familiarize you with the building blocks of an ASP.NET Core web app.  You can download/fork the source for this post [here](https://github.com/DeanPDX/HelloCore).  As usual, let me know if you have any questions and I will be happy to help.