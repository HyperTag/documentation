---
title: Meteor JS
sidebar: platform_sidebar
---

## MeteorJS

***Note**: This package is not being actively developed or maintained by MetaRouter. However, it is still functional. If you would like to contribute to the package, please submit a pull request or email pete@astronomer.io.*

If you're using the Meteor JavaScript app platform and haven't instrumented your app for user analytics yet, our [Meteor Package](https://atmospherejs.com/astronomerio/core) will instrument for you automatically!

***Note**: If you are using the package `percolatestudio:segment.io`, you will need to remove this before installing MetaRouter. This packages sets a global `analytics` object and makes the package unfunctional.*

```js
{
  "type": "info",
  "title": "Which user actions get tracked?",
  "body": "All of them! This is done by tracking all Meteor methods, route changes (flow-router and iron-router), and insertions into minimongo."
}
```

### Getting Started wtih MeteorJS

First, open your termal, cd to your app, and add the MetaRouter package:

```js
meteor add astronomerio:core
```

To configure your Meteor app, follow the steps below:
1. Copy this snippet:

```js
{
  "public": {
    "astronomer": {
      "appId": "XXXXXXXXXXXXXXXXXXX",
      "disableUserTracking": true,
      "disableRouteTracking": true,
      "disableMethodTracking": true,
      "ignoreNotFoundWarning": false
    }
  }
}
```

2. Create a new file called `settings.json` at the root directory of your Meteor application and paste the above snippet into that file. If you already have a file under this name, simply add the snippet to it.

3. In your MetaRouter UI, find your `Source ID` and copy it to your clipboard. Paste this value into the `appID` field in the snippet from step 1.

4. Restart your Meteor Application

### Additional MeteorJS Features

`disableUserTracking:` `true` or `false`: This tracks aliased users.

`disableRouteTracking:` `true` or `false`: This sends a Page call as routing is engaged within your Meteor App.

`disableMethodTracking:` `true` or `false`: This sends a Track call as methods are engaged within your Meteor App.

`ignoreNotFoundWarning:` `true` or `false`: This prevents a warning from appearing in the console if there is no `Source ID`.

***Note**: Every integration you activate will require you to set up a separate account with specific keys or ids that let MetaRouter know which account is yours*

To confirm that events are being sent, follow the steps below:

1. Check the web browser's JavaScript console for your app, make sure you see "Authenticating with https://app.metarouter.io:443" to ensure that your settings are correct.
2. Take some actions in your app (sign up, change routes).
3. Click on the 'Live Stream' tab to see what events are being received by MetaRouter.
4. Go to the integrations that you've activated and check to see that events are being properly received on their end.
