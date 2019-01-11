---
layout: post
title:  "Code Comments, Readability and Self-Documenting Code"
date:   2016-11-27 10:45:22
excerpt: ""
featured_image: /images/2016-comments/CodeComments.png
---
At some point in the distant past, I submitted a pull request that included a lot of comments. My esteemed former colleague [Dave Bettin](https://twitter.com/dbettin) asked me to delete one of them. I said something along the lines of "Delete a comment? No way!" which triggered a (very polite) pull request flame war. In the end, I had to concede that the comment in question really didn't add anything to the readability of the code and I deleted it.

## Why Not What
The #1 thing that Dave said that stuck with me was this: your comments should explain *why* you are doing things and avoid documenting *what* you are doing. What you are doing should be evident if you are writing clean code. This seems obvious but it is really easy to fall in to the habit of documenting your code with pseudocode when the actual code is as easy to read.  Look at this code for example:

{% highlight csharp %}
public IReport GenerateUserListReport(List<User> users)
{
    // Iterate over our user objects
    foreach (User user in users)
    {
        if (user.IsPrivate) 
        {
            // Clear values.
            user.FirstName = string.Empty;
            user.MiddleInitial = string.Empty;
            user.LastName = string.Empty;
        }
    }
    // Return a user list report
    return new UserListReport(users);
}
{% endhighlight %}

It seems OK because we are writing comments in our code but we are actually documenting all of the wrong things. The most egregious offense here might be `Iterate over our user objects` right before  `foreach (User user in users)`. It's obvious we are iterating over the user objects. We can also see that we are anonymizing some users, but it's not clear why we are doing that.

This is a better way to express our intent:

{% highlight csharp %}
public IReport GenerateUserListReport(List<User> users)
{
    // Some users have requested to have their names excluded from the 
    // user list report. We will still include them but anonymize 
    // their names.
    foreach (User user in users)
    {
        if (user.IsPrivate) 
        {
            AnonymizeUserName(user);
        }
    }
    return new UserListReport(users);
}
public void AnonymizeUserName(User user)
{
    user.FirstName = string.Empty;
    user.MiddleInitial = string.Empty;
    user.LastName = string.Empty;
}
{% endhighlight %}

Note that I extracted our user anonymization in to a separate method. It's easy to read that method name and understand exactly what it does. I've also explained why I am anonymizing those users. And finally, I deleted the comment about returning our user list report object because it added nothing.

Start looking through your favorite open source projects. What comments strike you as the most helpful? This [snippet from the Visual Studio Code project](https://github.com/Microsoft/vscode/blob/master/src/main.js#L130-L135) perfectly illustrates a great comment in my opinion:

![Visual Studio Code](/images/2016-comments/VSCodeExample.png)

Without it, you could easily see what that code was doing but would have no idea why it was doing it.

## Documenting Risky Stuff
Do you have a const in your app that, if somebody were to change it, would cause your entire system to explode? First off: you should probably fix that. But if you can't, explain why it is there and warn future developers about it in an all-caps red-light-flashing type way:

{% highlight csharp %}
/* WARNING: Do not, under any circumstances, change this *
 * value unless you absolutely know what you are doing!  */
private const string ThisStringMakesTheWholeAppRun = "1234";
{% endhighlight %}

## XML Documentation Comments
If you are working on a .NET project, add [XML Documentation Comments](https://msdn.microsoft.com/en-us/library/b2s063f7(v=vs.140).aspx) to methods and classes. You can generate documentation automatically that will make managers everywhere happy. Your coworkers will get intellisense on the methods you write which will make them happy. Basically, everybody will be happy.

Here's an example of the `AnonymizeUserName` method above with XML documentation added:

{% highlight csharp %}
/// <summary>
/// Anonymizes the first, middle initial and last name of a user.
/// </summary>
/// <param name="user">The user you wish to anonymize.</param>
public void AnonymizeUserName(User user)
...
{% endhighlight %}

And now when I call that method, Intellisense gives me information about it (using Visual Studio Code in this case):

![Well That's Handy!](/images/2016-comments/IntellisenseHelp.png)

## Don't Listen to a Word I Say
Your code is a form of personal expression. Do you like the way your pseudocode comments break up your code visually? Go ahead and disregard the bit about superfluous comments and make them anyway. It's better to have too many comments than too few. But try to think about why you are making the comment. What piece of information are you trying to convey to your future self and other developers that is not obvious?

## Conclusion
This is a pretty broad topic and I have just scratched the surface of it. To sum things up you should: 

* Try to think from the perspective of future developers who will look at your code.
* Explain why you are doing things not what you are doing.
  * Unless what you are doing is not obvious.
* Refactor in to smaller methods/functions to render certain comments unneeded.
* Document pitfalls and oddities that are useful to know about.
* If this is a .NET project, use XML Documentation Comments.
* If you want to, ignore my advice about superfluous comments.
* Engage in flame wars about comments in pull requests (but not really!).