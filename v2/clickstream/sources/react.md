---
title: Source - React Native
sidebar: platform_sidebar
---

## Getting Started with MetaRouter - React Native

Using our analytics-react-native library, you can start sending customer data from your app to MetaRouter, giving you valuable user data that yields actionable insights for your business. Follow the steps below to get started in only a few minutes.

### Create an iOS Source in the MetaRouter UI

After logging in with your MetaRouter credentials, add a new `Source → Client-Side`. Give your source a friendly name and copy that `Source ID` for the next step.

### Prerequisite

### iOS

* CocoaPods

### Installing and configuring the SDK
Install the React Native library by running inside your project's directory:

```
yarn add @metarouter/analytics-react-native
yarn react-native link
```

Then change the current directory to ios:

```
cd ios
```

and run `pod install` to install the required dependences for iOS.

Then somewhere your application, setup the SDK like so:

```
await analytics.setup('YOUR_WRITE_KEY', {
  // Record screen views automatically!
  recordScreenViews: true,
  // Record certain application events automatically!
  trackAppLifecycleEvents: true
})
```

Don't forget to import the library in the files where you're going to use it:

```
import analytics from '@metarouter/analytics-react-native'
```

### Identify Your Users

The `identify` method helps you associate your users and their actions to a unique and recognizable `userID` and any optional `traits` that you know about them. We recommend calling an `identify` a single time - when the user's account is first created and only again when their traits change.

***Note**: Users are automatically assigned an anonymousID before you identify them. The userID is then what connects anonymous activity across mobile iOS devices.*

For example, a simple `identify` looks something like this:

```
analytics.identify("a user's id", {
  email: "a user's email address"
})
```

This call identifies a user by his unique User ID (the one you know him by in your database) and labels him with `name` and `email` traits.

***Note**: When you add an `identify` to your React Native app, you will need to replace all those hard-coded strings with details about the currently logged-in user.*

Once you have the `identify` call implemented, you're ready to move on to the `track` call.

### Track Your Users’ Actions

To get to a more complete event tracking analytics setup, you can add a `track` call to your app. This will tell MetaRouter which actions users are performing in your app. With `track`, each user action triggers an “event”, which can also have associated properties.

To start, our SDK can automatically track a few common events (e.g. Application_Installed, Application_Opened, and Application_Updated) - you will just need to enable this option during initialization. In addition to these, you will likely want to track some events that are success indicators for your app - like Viewed Product, Email Sign Up, Item Purchased, etc.

Setting up a `track` is very similar to the process you just went through to set up an `identify`. Here’s the basic, sample `track`:

```
analytics.track('Item Purchased', {
  item: 'Cat Feather Toy',
  revenue: 9.99
})
```

This example `track` call tells us that a user just triggered an "Item Purchased" event for an `item` called "Cat Feather Toy" and `revenue` of 9.99.

***Note**: In order to use a `track` call, you must specify a name for the event you want to track whereas properties and options are all optional fields.*

A lot of analytics tools support custom event mapping so, with `track` implemented, you’ll be able to attribute events to your users and start targeting them in a more informed and relevant way.

### Flushing

You can specify the number of events that should queue before flushing. Set this to 1 to send events as they come in (i.e. not batched) but note that it will use more battery. Also note that this is 20 by default.

```
await analytics.setup('YOUR_WRITE_KEY', {
  flushAt: 1
})
```

Alternatively, you can `flush` the queue manually:

```
analytics.alias('glenncoco')
analytics.flush()
```

### Submitting to the iOS App Store

When submitting to the iOS App Store, beware that MetaRouter collects the IDFA for use in doing mobile install attribution with destinations like Mobile App Tracking. Even if you’re not currently doing mobile install attribution, if you get asked, “Does this app use the Advertising Identifier (IDFA)?” on this page, you’ll want to check the following three boxes:

  1. "Attribute this app to a previously sent advertisement"
  2. “Attribute an action taken within this app to a previously served advertisement”
  3. “I, YOUR_NAME, confirm that this app, and any third party…”

Unless you are actually going to display ads in your app, do not check the box labeled "Serve advertisements within the app".

Congratulations, you can now use MetaRouter Analytics in your React Native app! Time to start hitting your business with insightful user data.
