---
title: Source - Android
sidebar: platform_sidebar
---

## Getting Started with Astronomer Clickstream - Android

Using our analytics-android library, you can start sending customer data from your app to Astronomer, giving you valuable user data that yields actionable insights for your business. Follow the instructions below to get started in only a few minutes!

### Create an Android Source in the Astronomer UI

After logging in with your Astronomer credentials, add a new `Source → Android`. Give your source a friendly name and copy that `Source ID` for the next step.

### Install the SDK

We recommend installing the library for Android with a build system like Gradle to make upgrading versions and adding destinations simple. The library is distributed via [Maven Central](http://search.maven.org/). 

Just add the `analytics` module to your `build.gradle` with:
```
dependencies {
  compile 'io.astronomer.analytics.android:analytics:4.+'
}
```

### Initialize the Client

We recommend initializing the client in your `Application` subclass.
```
// Create an analytics client with the given context and Astronomer Source ID.
Analytics analytics = new Analytics.Builder(context, YOUR_APP_ID)
  .trackApplicationLifecycleEvents() // Enable this to record certain application events automatically!
  .recordScreenViews() // Enable this to record screen views automatically!
  .build();

// Set the initialized instance as a globally accessible instance.
Analytics.setSingletonInstance(analytics);
```

**Notes:**

* Automatically tracking lifecycle events (`Application Opened`, `Application Installed`, `Application Updated`) is optional, but we highly recommending doing so to ensure you get the most out of Astronomer Clickstream!
* This only installs the Astronomer destination, meaning all your data will be sent server side to tools.

### Add Permissions

Ensure that the necessary permissions are declared in your application’s `AndroidManifest.xml`.
```
 <!-- Required for internet. -->
<uses-permission android:name="android.permission.INTERNET"/>
```

### Identify Your Users

The `identify` method helps you associate your users and their actions to a unique and recognizable `userID` and any optional `traits` that you know about them. We recommend calling an `identify` a single time - when the user's account is first created and only again when their traits change.

It's up to you to call `identify` based on how your users are authenticated, but doing it in the `onCreate` method of your Application class is the most common (as long as you know who your user is). IF your user is still anonymous, you should skip this step and we'll attribute the subsequent events to an ``anonymousID` instead.

For example, a simple `identify` looks something like this:
```
Analytics.with(context).identify("123456", new Traits().putName("Dagny Smith").putEmail("dagny@astronomer.io").putRole("buyer"));
```

This call is identifying a user by her unique `userID` (from your database) and associating her with `name`, `email`, and `role` traits.

Once you have the `identify` call implemented, you're ready to move on to the `track` call.

### Track Your Users' Actions

To get to a more complete event tracking analytics setup, you can add a `track` call to your app. This will tell Astronomer which actions users are performing in your app. With `track`, each user action triggers an “event”, which can also have associated properties.

To start, our SDK can automatically track a few common events (e.g. Application_Installed, Application_Opened, and Application_Updated) - you will just need to enable this option during initialization.
```
Analytics analytics = new Analytics.Builder(context, appID)
  .trackApplicationLifecycleEvents()
  .build();
```

 In addition to these, you will likely want to track some events that are success indicators for your app - like Viewed Product, Email Sign Up, Item Purchased, etc. You can always add more of these later!

 For example, here's a sample `track` call that records when a user signs up:
```
 Analytics.with(context).track("Signed up", new Properties().putValue("plan", "Enterprise"));
```

This `track` just tells us that your user just triggered the Signed Up event and chose your hypothetical 'Enterprise' plan. Properties are simple key-value pairs that can be anything you want to record, for example:
```
Analytics.with(context).track("Viewed Product", new Properties()
  .putValue("item", "Cat Feather Toy")
  .putValue("category", "Pet Supplies")
  .putValue("revenue", "9.99"));
  ```

You have now successfully implemented your Android app! Now you're ready to head back to the Astronomer Clickstream UI and start switching on some destinations.
