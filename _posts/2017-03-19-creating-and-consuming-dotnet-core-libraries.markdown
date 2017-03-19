---
layout: post
title:  "Creating and Consuming Dotnet Core 1.1 NuGet Packages Locally"
date:   2017-03-19 11:29:52
excerpt: "This is a quick-start guide to creating and consuming a Dotnet Core 1.1 class library locally as a NuGet package. You can then publish your package to the NuGet Gallery. For the purposes of this demo, we will create a library called MathLib to help us identify prime numbers."
featured_image: /images/2017-core-library/EditNugetConfig.png
---
This is a quick-start guide to creating and consuming a Dotnet Core 1.1 class library locally as a NuGet package. You can then publish your package to the [NuGet Gallery](https://www.nuget.org/). For the purposes of this demo, we will create a library called MathLib to help us identify prime numbers.

## Creating the Library
You might be used to running `dotnet new -t lib` to create an empty class library but that has been deprecated and you can now just pass in the template name as a switch-free argument. We will use the `classlib` template with the `-f netcoreapp1.1` switch to let Dotnet know we are targeting Core 1.1. Let's create a new folder and create our project:

{% highlight bash %}
Deans-MacBook-Pro:Projects deandavidson$ mkdir MathLib
Deans-MacBook-Pro:Projects deandavidson$ cd MathLib
Deans-MacBook-Pro:MathLib deandavidson$ dotnet new classlib -f netcoreapp1.1
Content generation time: 30.7377 ms
The template "Class library" created successfully.
{% endhighlight %}

Let's restore dependencies using `dotnet restore`:

{% highlight bash %}
Deans-MacBook-Pro:MathLib deandavidson$ dotnet restore
  Restoring packages for /Users/deandavidson/Documents/Projects/MathLib/MathLib.csproj...
  Generating MSBuild file /Users/deandavidson/Documents/Projects/MathLib/obj/MathLib.csproj.nuget.g.props.
  Generating MSBuild file /Users/deandavidson/Documents/Projects/MathLib/obj/MathLib.csproj.nuget.g.targets.
  Writing lock file to disk. Path: /Users/deandavidson/Documents/Projects/MathLib/obj/project.assets.json
  Restore completed in 870.27 ms for /Users/deandavidson/Documents/Projects/MathLib/MathLib.csproj.
  
  NuGet Config files used:
      /Users/deandavidson/.nuget/NuGet/NuGet.Config
  
  Feeds used:
      https://api.nuget.org/v3/index.json
{% endhighlight %}

If you open your project folder in Visual Studio Code it should look something like this:

![After Creation Opening Folder in Visual Studio Code](/images/2017-core-library/AfterCreation.png)

Let's rename `Class1.cs` to `MathHelper.cs` and implement the following method to check for prime numbers:

{% highlight csharp %}
namespace MathLib
{
    public static class MathHelper
    {
        public static bool IsPrimeNumber(int numberToCheck)
        {
            for (int i = 2; i < numberToCheck; i++) 
            {
                if (numberToCheck % i == 0)
                {
                    return false;
                }
            }
            return true;
        }
    }
}
{% endhighlight %}

Now if we run `dotnet pack`, we will get a DLL and a NuGet package:

{% highlight bash %}
Deans-MacBook-Pro:MathLib deandavidson$ dotnet pack
Microsoft (R) Build Engine version 15.1.548.43366
Copyright (C) Microsoft Corporation. All rights reserved.

  MathLib -> /Users/deandavidson/Documents/Projects/MathLib/bin/Debug/netcoreapp1.1/MathLib.dll
  Successfully created package '/Users/deandavidson/Documents/Projects/MathLib/bin/Debug/MathLib.1.0.0.nupkg'.
{% endhighlight %}

Note that I'm not running `dotnet build` because `dotnet pack` by default first builds the project. You can trigger a pack without a build by passing the `--no-build` option in to the command line.

## Referencing the Package as a Dependency
Now that we have a library with a NuGet package, let's create a console app that references it:

{% highlight bash %}
Deans-MacBook-Pro:Projects deandavidson$ mkdir MathApp
Deans-MacBook-Pro:Projects deandavidson$ cd MathApp
Deans-MacBook-Pro:MathApp deandavidson$ dotnet new console
Deans-MacBook-Pro:MathApp deandavidson$ dotnet restore
{% endhighlight %}

I omitted the dotnet Core CLI console output for brevity. Let's open our `.csproj` file and add a package reference to `MathLib`:

{% highlight xml %}
<ItemGroup>
  <PackageReference Include="MathLib" Version="1.0.0" />
</ItemGroup>
{% endhighlight %}

If we try to restore, we will now get an error:

{% highlight bash %}
Deans-MacBook-Pro:MathApp deandavidson$ dotnet restore
  Restoring packages for /Users/deandavidson/Documents/Projects/MathApp/MathApp.csproj...
/usr/local/share/dotnet/sdk/1.0.1/NuGet.targets(97,5): error : Unable to resolve 'MathLib (>= 1.0.0)' for '.NETCoreApp,Version=v1.1'. [/Users/deandavidson/Documents/Projects/MathApp/MathApp.csproj]
  Lock file has not changed. Skipping lock file write. Path: /Users/deandavidson/Documents/Projects/MathApp/obj/project.assets.json
  Restore failed in 615.19 ms for /Users/deandavidson/Documents/Projects/MathApp/MathApp.csproj.
  
  Errors in /Users/deandavidson/Documents/Projects/MathApp/MathApp.csproj
      Unable to resolve 'MathLib (>= 1.0.0)' for '.NETCoreApp,Version=v1.1'.
  
  NuGet Config files used:
      /Users/deandavidson/.nuget/NuGet/NuGet.Config
  
  Feeds used:
      https://api.nuget.org/v3/index.json
{% endhighlight %}

Note the config file used (in my case `/Users/deandavidson/.nuget/NuGet/NuGet.Config`) because you will want to edit that to reference a local feed. Create a folder to host your local packages and copy your package from `/MathLib/bin/debug` to the newly-created folder under the subfolder `MathLib`. It should look something like this:

![Packages Folder](/images/2017-core-library/PackagesFolder.png)

Now that we have a local packages folder, let's edit our global NuGet.Config to search this folder for packages. Simply add a `PackageSource` with the key of your choice that points to your newly-created folder:

![Edited NuGet Config File](/images/2017-core-library/EditNugetConfig.png)

If you don't want to edit your global config you can edit your project-level config instead. [Read this](https://docs.microsoft.com/en-us/nuget/consume-packages/configuring-nuget-behavior) for more information on configuring NuGet. With our packages folder created and NuGet config updated, we should be able to run `dotnet restore` and see the following:

{% highlight bash %}
Deans-MacBook-Pro:MathApp deandavidson$ dotnet restore
  Restoring packages for /Users/deandavidson/Documents/Projects/MathApp/MathApp.csproj...
  Installing MathLib 1.0.0.
  Generating MSBuild file /Users/deandavidson/Documents/Projects/MathApp/obj/MathApp.csproj.nuget.g.props.
  Writing lock file to disk. Path: /Users/deandavidson/Documents/Projects/MathApp/obj/project.assets.json
  Restore completed in 678.52 ms for /Users/deandavidson/Documents/Projects/MathApp/MathApp.csproj.
  
  NuGet Config files used:
      /Users/deandavidson/.nuget/NuGet/NuGet.Config
  
  Feeds used:
      /Users/deandavidson/Documents/Projects/MyNuGetPackages/
      https://api.nuget.org/v3/index.json
  
  Installed:
      1 package(s) to /Users/deandavidson/Documents/Projects/MathApp/MathApp.csproj
{% endhighlight %}

Now we can reference our MathLib project. Let's change the contents of Program.cs to the following:

{% highlight csharp %}
using System;
using MathLib;

namespace MathApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Showing prime numbers...");
            for (int i = 3; i < 1000; i++)
            {
                if (MathHelper.IsPrimeNumber(i)){
                    Console.WriteLine(i);
                }
            }
        }
    }
}
{% endhighlight %}

If we run our app we should get the following:

{% highlight bash %}
Deans-MacBook-Pro:MathApp deandavidson$ dotnet run
Showing prime numbers...
3
5
7
11
13
17
...
{% endhighlight %}

## Final Thoughts
Hopefully this blog post was useful to you. If you truly just want to reference another local project and don't care about NuGet packages, the Project Reference syntax might be easier (`<ProjectReference Include="..\MyOtherProject\MyOtherProject.csproj" />`). See [Microsoft's Documentation on the subject](https://docs.microsoft.com/en-us/dotnet/articles/core/tools/project-json-to-csproj#dependency-type) for more info.