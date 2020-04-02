---
collectionKey: sources

navText: React Native

path: '/sources/react-native/'

tags: [sources]
---

# React Native

## Getting Started

Using our analytics-react-native library, you can start sending customer data from your app to MetaRouter, giving you valuable user data that yields actionable insights for your business. Follow the steps below to get started in only a few minutes.

### Create an iOS Source in the MetaRouter UI

After logging in with your MetaRouter credentials, add a new **Source > Client-Side**. Give your source a friendly name and copy that `Source ID` for the next step.

### iOS CocoaPods

To add CocoaPods to your app, follow [these instructions](https://facebook.github.io/react-native/docs/integration-with-existing-apps#configuring-cocoapods-dependencies).

## Installing and configuring the SDK

The recommended way to install Analytics for React Native is via npm, since it means you can create a build with specific destinations, and because it makes it dead simple to install and upgrade.

First, add the `@metarouter/analytics-react-native` dependency to your dependencies and link it using react-native-cli, like so:

```bash
yarn add @metarouter/analytics-react-native
yarn react-native link
```

Then change the current directory to ios:

```bash
cd ios
```

and run `pod install` to install the required dependences for iOS.

Then somewhere your application, setup the SDK like so:

```javascript
await analytics.setup('YOUR_WRITE_KEY', {
  // Record screen views automatically!
  recordScreenViews: true,
  // Record certain application events automatically!
  trackAppLifecycleEvents: true,
})
```

And of course, import the SDK in the files that you use it with:

```javascript
import analytics from '@metarouter/analytics-react-native'
```

## Calls in React Native

### Identify Your Users

The `identify` method helps you associate your users and their actions to a unique and recognizable `userID` and any optional `traits` that you know about them. We recommend calling an `identify` a single time - when the user's account is first created and only again when their traits change.

**Note:** Users are automatically assigned an anonymousID before you identify them. The userID is then what connects anonymous activity across mobile iOS devices.

For example, a simple `identify` looks something like this:

```javascript
analytics.identify("a user's id", {
  email: "a user's email address",
})
```

This call identifies a user by his unique User ID (the one you know him by in your database) and labels him with `name` and `email` traits.

**Note:** When you add an `identify` to your React Native app, you will need to replace all those hard-coded strings with details about the currently logged-in user.

Analytics works on its own background thread, so it will never block the main thread for the UI or the calling thread.

Calling identify with a userId will write that ID to disk to be used in subsequent calls. That ID can be removed either by uninstalling the app or by calling `reset`.

Once you have the `identify` call implemented, you're ready to move on to the `track` call.

### Track Your Users’ Actions

To get to a more complete event tracking analytics setup, you can add a `track` call to your app. This will tell MetaRouter which actions users are performing in your app. With `track`, each user action triggers an “event”, which can also have associated properties.

To start, our SDK can automatically track a few common events (e.g. Application_Installed, Application_Opened, and Application_Updated) - you will just need to enable this option during initialization. In addition to these, you will likely want to track some events that are success indicators for your app - like Viewed Product, Email Sign Up, Item Purchased, etc.

Setting up a `track` is very similar to the process you just went through to set up an `identify`. Here’s the basic, sample `track`:

```javascript
analytics.track('Item Purchased', {
  item: 'Cat Feather Toy',
  revenue: 9.99,
})
```

This example `track` call tells us that a user just triggered an "Item Purchased" event for an `item` called "Cat Feather Toy" and `revenue` of 9.99.

**Note:** In order to use a `track` call, you must specify a name for the event you want to track whereas properties and options are all optional fields.

A lot of analytics tools support custom event mapping so, with `track` implemented, you’ll be able to attribute events to your users and start targeting them in a more informed and relevant way.

### Screen

The `screen` method lets you you record whenever a user sees a screen of your mobile app, along with optional extra information about the page being viewed.

You’ll want to record a screen event an event whenever the user opens a screen in your app. This could be a view, fragment, dialog or activity depending on your app.

Example screen call:

```javascript
analytics.screen('Photo Feed', {
  'Feed Type': 'private',
})
```

### Group

`group` lets you associate an identified user user with a group. A group could be a company, organization, account, project or team! It also lets you record custom traits about the group, like industry or number of employees.

Example group call:

```javascript
analytics.group('group123', {
  name: 'Initech',
  description: 'Accounting Software',
})
```

### Alias

`alias` is how you associate one identity with another. This is an advanced method, but it is required to manage user identities successfully in some of our destinations.

Example alias call:

```javascript
analytics.alias('some new id')
```

### Reset

The reset method clears the SDK’s internal stores for the current user and group. This is useful for apps where users can log in and out with different identities over time.

Clearing all information about the user is as simple as calling:

```javascript
analytics.reset()
```

### Flushing

You can specify the number of events that should queue before flushing. Set this to 1 to send events as they come in (i.e. not batched) but note that it will use more battery. Also note that this is 20 by default.

```javascript
await analytics.setup('YOUR_WRITE_KEY', {
  flushAt: 1,
})
```

Alternatively, you can `flush` the queue manually:

```javascript
analytics.alias('glenncoco')
analytics.flush()
```

## Native Configuration

You can also use the native Analytics API to configure it. Just make sure to call `analytics.useNativeConfiguration()` in your JavaScript code so that Analytics doesn’t wait for you to configure it.

### Application Lifecycle Tracking

Our SDK can automatically instrument common application lifecycle events such as **Application Installed**, **Application Updated** and **Application Opened**. Simply enable this option when you initialize the SDK.

```javascript
await analytics.setup('YOUR_WRITE_KEY', {
  trackAppLifecycleEvents: true,
})
```

### Logging

To see a trace of your data going through the SDK, you can enable debug logging with the debug method:

```javascript
await analytics.setup('YOUR_WRITE_KEY', {
  debug: true,
})
```

By default, debug logging is disabled.

### Opt-out

Depending on the audience for your app (e.g. children) or the countries where you sell your app (e.g. the EU), you may need to offer the ability for users to opt-out of analytics data collection inside your app. To do that, just call the `disable` method:

```javascript
analytics.disable()
```

Or if they opt-back-in, you can re-enable data collection:

```javascript
analytics.enable()
```

### Anonymizing IP

We collect IP address for client-side (iOS, Android and Analytics.js) events automatically.

If you don’t want us to record your tracked users’ IP in destinations and S3, you can set your event’s `context.ip` field to `0.0.0.0`. Our server won’t record the IP address of the client for libraries if the `context.ip` field is already set.

### Submitting to the iOS App Store

When submitting to the iOS App Store, beware that MetaRouter collects the IDFA for use in doing mobile install attribution with destinations like Mobile App Tracking. Even if you’re not currently doing mobile install attribution, if you get asked, “Does this app use the Advertising Identifier (IDFA)?” on this page, you’ll want to check the following three boxes:

1. "Attribute this app to a previously sent advertisement"
2. “Attribute an action taken within this app to a previously served advertisement”
3. “I, YOUR_NAME, confirm that this app, and any third party…”

Unless you are actually going to display ads in your app, do not check the box labeled "Serve advertisements within the app".

Congratulations, you can now use MetaRouter Analytics in your React Native app! Time to start hitting your business with insightful user data.
