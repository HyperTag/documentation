---
collectionKey: sources

navText: .NET

path: '/sources/dot-net/'

tags: [sources]
---

# .NET

## Getting Started

This library lets you record analytics data from your ASP.NET, C#, F#, and Visual Basic code. Just pop this library into your web server controller code and it will take care of hitting our servers so that we can route your data to an analytics service of your choice.

### Step 1

To start, you must install our client-side library, Analytics.js, to your ASP.NET master page. Follow the steps outlined in our [Analytics.js doc](/sources/analytics-js/) and place your snippet directly in your ASP.NET Site.master. This will allow you to use `page` calls.

### Step 2

Next, you'll want to install our .net library to start using the `identify` and `track` calls. We recommend using [NuGet](https://docs.microsoft.com/en-us/nuget/tools/package-manager-console) to do this.

```
Install-Package Analytics
```

You can also doing this by navigating through Visual Studio: **Tools > Library Package Manager > Package Manager Console**

Now you need to initialize the .NET library so that it knows where to send data. Do this with your **Source ID**, which can be found in your MetaRouter UI once you've created a server-side source. Then you can use the `Analytics` singleton in any controller you want:

```csharp
<%@ Application Language="C#" %>
<%@ Import Namespace="ASP.NET_Example" %>
<%@ Import Namespace="System.Web.Optimization" %>
<%@ Import Namespace="System.Web.Routing" %>
<%@ Import Namespace="Astronomer" %>

<script runat="server">

    void Application_Start(object sender, EventArgs e)
    {
        RouteConfig.RegisterRoutes(RouteTable.Routes);
        BundleConfig.RegisterBundles(BundleTable.Bundles);
        // this is your project's Source ID
        Astronomer.Analytics.Initialize("1234qwerty", new Config()
            .SetHost("https://e.metarouter.io");
        );
    }

</script>
```

Now, initialize the project:

```csharp
Analytics.Initialize("YOUR_SOURCE_ID");
```

You will only need to perform this initialization once.

## Calls in .NET

Check out the below calls and their use cases to determine the calls that you need to make. We have also included examples of how you'd call specific objects in .NET.

### Identify

The `identify` method helps you associate your users and their actions to a unique and recognizable `userID` and any optional `traits` that you know about them. We recommend calling an `identify` a single time - when the user's account is first created and only again when their traits change.

```csharp
Analytics.Client.Identify("1234qwerty", new Traits() {
    { "name", "#{ user.name }" },
    { "email", "#{ user.email }" },
    { "fingers", 10 }
});
```

### Track

To get to a more complete event tracking analytics setup, you can add a `track` call to your website. This will tell MetaRouter which actions you are performing on your site. With `track`, each user action triggers an “event,” which can also have associated properties.

```csharp
Analytics.Client.Track("1234qwerty", "Add to Cart", new Properties() {
    { "price", 50.00 },
    { "size", "Medium" }
});
```

### Page

The `page` method allows you to record page views on your website. It also allows you to pass addtional information about the pages people are viewing.

```csharp
Analytics.Client.Page("1234qwerty", "Login", new Properties() {
    { "path", "/login" },
    { "title", "MetaRouter Login" }
});
```

### Group

The `group` method associates an identified user with a company, organization, project, etc.

```csharp
Analytics.Client.Group("userId", "groupId", new Traits() {
    { "name", "MetaRouter" },
    { "website", "www.metarouter.io" }
});
```

### Alias

The `alias` method combines two unassociated User IDs.

```csharp
Analytics.Client.Alias("previousId", "userId")
```
