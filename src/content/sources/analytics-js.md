---
collectionKey: sources

navText: Analytics.js

path: '/analytics-js/'
---

Using the Javascript analytics.js library, you can start sending customer data directly from your website or web application to MetaRouter. Accessing this user data will yield rich, actionable insights, and it only takes a few minutes to get set up.

## Create a Client-Side Source in the MetaRouter UI

After logging in with your MetaRouter credentials, add a new `Source → Client-Side`. Give your source a friendly name and copy that `Source ID` for the next step.

## Copy & Paste the Snippet

Next, you’ll need to copy and paste the snippet below into the <head> of your website.

```javascript
<script type="text/javascript">
  !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("MetaRouter snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.metarouter.io/a/v1/"+t+".js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="3.1.0";
  analytics.load("YOUR_SOURCE_ID");
  analytics.page()
  }}();
</script>
```

When you paste the snippet, replace `"YOUR_SOURCE_ID"` with the `Source ID` for this particular project.

As soon as this snippet is running on your site, you can begin experimenting with destinations. Click back to MetaRouter Clickstream UI and start adding destinations to the source you just configured.

To test your newly configured source, trigger some events on your website and look for them in the Monitoring Overview & Logs.

> NOTE: You will want to remove any other native 3rd party destination code that you may already have on your website. Skipping this step could cause issues if you turn on those same destinations (e.g. Mixpanel, Google Analytics, Amplitude, etc.) through MetaRouter.\*

If you are just looking for basic clickstream functionality, you’re all done setting up! We recommend enabling a simple integration, like Google Analytics, to start analyzing your website’s data.

If you’d like to use any tool that deals with the identity of your users (e.g. Mixpanel), keep reading to learn how to use the `identify` call.

## Methods

### Identify

The `identify` method helps you associate your users and their actions to a unique and recognizable `userID` and `traits`. We recommend using a backend template to insert an `identify` call directly into the footer of every page of your site where the user is logged in. That way, your users will always be identified, no matter what page they first land on.

`identify` follows this basic definition:

```javascript
analytics.identify([userId], [traits], [options], [callback])
```

The `identify` call contains the following fields:

| Field    | Status   | Type     | Notes                                                                                                                                               |
| -------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId   | Optional | String   | The database ID for the user                                                                                                                        |
| traits   | Optional | Object   | A group of traits you know about the user, including email and name                                                                                 |
| options  | Optional | Object   | A group of options tied to the call. Note that, if you elect to not pass a `traits` object, you must pass an empty object with `{}` before options. |
| callback | Optional | Function | A function executed after a short timeout that gives the browser time to make outbound requests                                                     |

For example, a simple `identify` looks something like this:

```javascript
analytics.identify('123456', {
  name: 'Dagny',
  email: 'dagny@metarouter.io'
  role: 'buyer'
});
```

You’re now set up to use any basic CRM. Go ahead and switch on a CRM, like Intercom, to start seeing your user data through MetaRouter.

While `identify` is an extremely useful call for a lot of integrations, many other analytics tools go beyond just identifying users; they record the actions each user performs too. See below for how to get to an even more holistic event tracking analytics setup.

### Track

To get to a more complete event tracking analytics setup, you can add a `track` call to your website. This will tell MetaRouter which actions you are performing on your site. With `track`, each user action triggers an “event,” which can also have associated properties.

Setting up `track` is very similar to the process you just went through to set up an `identify`. Here’s the basic `track` definition:

```javascript
analytics.track(event, [properties], [options], [callback])
```

The fields mentioned above are defined here:

| Field      | Status    | Type     | Notes                                                                                                                                                                                                            |
| ---------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| event      | Mandatory | String   | Name of the event you're tracking                                                                                                                                                                                |
| properties | Optional  | Object   | A library of properties to be associated with the event. Check out our [API Call doc](https://docs.metarouter.io/v2/clickstream/calls.html) to learn more about properties you can pass with your track calls    |
| options    | Optional  | Object   | A library of options, such as enabiling or disabiling specfiic destinations for a given call. Note that, if you elect to not pass a `properties` object, you must pass an empty object with `{}` before options. |
| callback   | Optional  | Function | A function that is executed after a short timeout. This gives the browser time to make outbound requests.                                                                                                        |

And, here’s an example of what a simple `track` might look like:

```javascript
analytics.track('Viewed Product', {
  product: 'Cat Feather Toy',
  model_number: 'B001BOVEU4',
})
```

> NOTE: In order to use a `track` call, you must specify a name for the event you want to track whereas properties, options, and callback are all optional fields.\*

A lot of analytics tools support custom event mapping so, with `track` implemented, you’ll be able to attribute events to your users and start targeting them in a more informed and relevant way.

Congratulations, you’ve now successfully installed website tracking with MetaRouter!

Now the fun begins: head back to our app, turn on some destinations, and hit your business with insightful user data.

### Page

The `page` method allows you to record page views on your website. It also allows you to pass addtional information about the pages people are viewing. Note that a `page` call is included by default in our analytics.js snippet. Here's the basic `page` definition:

```javascript
analytics.page([category], [name], [properties], [options], [callback])
```

The fields outlined above are explained here:

| Field      | Status   | Type     | Notes                                                                                                                                                                                         |
| ---------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| category   | Optional | String   | Category of the page.                                                                                                                                                                         |
| name       | Optional | String   | Name of the page.                                                                                                                                                                             |
| properties | Optional | String   | A library of properties that you want to pass with your `page` call. Note that url, title, referrer, and path are automatically collected with `page` calls, so no need to include them here! |
| options    | Optional | Object   | A library of options that you might want to pass with your call. Note that, if you elect to not pass a `properties` object, you must pass an empty object with `{}` before options.           |
| callback   | Optional | Function | A function that is executed after a short timeout. This gives the browser time to make outbound requests.                                                                                     |

### Group

The `group` method associates an identified user with a company, organization, project, etc. Here's the basic `group` definition:

```javascript
analytics.group(groupId, [traits], [options], [callback])
```

The fields outlined above are explained here:

| Field    | Status    | Type     | Notes                                                                                                                                                                           |
| -------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| groupId  | Mandatory | String   | The Group ID associated with the user                                                                                                                                           |
| traits   | Optional  | String   | A library of trais that you'd like to associate with the group. Can include address, website, employees, etc.                                                                   |
| options  | Optional  | Object   | A library of options that you might want to pass with your call. Note that, if you elect to not pass a `traits` object, you must pass an empty object with `{}` before options. |
| callback | Optional  | Function | A function that is executed after a short timeout. This gives the browser time to make outbound requests.                                                                       |

### Alias

The `alias` method combines two unassociated User IDs. Here's the basic `alias` definition:

```javascript
analytics.alias(userId, [previousId], [options], [callback])
```

The fields outlined above are explained here:

| Field      | Status    | Type     | Notes                                                                                                     |
| ---------- | --------- | -------- | --------------------------------------------------------------------------------------------------------- |
| userId     | Mandatory | String   | The new user ID that you want to associate with the user                                                  |
| previousId | Optional  | String   | The previous ID that was assigned to the user.                                                            |
| options    | Optional  | Object   | A library of options that you might want to pass with your call.                                          |
| callback   | Optional  | Function | A function that is executed after a short timeout. This gives the browser time to make outbound requests. |

## Debugging

### Debugging within the Browser

Open up your browser's console, (instructions for [Chrome](https://developers.google.com/web/tools/chrome-devtools/console/), [Firefox](https://developer.mozilla.org/en-US/docs/Tools/Browser_Console#Opening_the_Browser_Console), [IE/EDGE](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide/console), [Safari](https://support.apple.com/guide/safari/use-the-developer-tools-in-the-develop-menu-sfri20948/mac) ) and type in `analytics.debug()`. If there is no error, refresh the page and view your browser's console again.

This will have analytics.js log out all the actions that it takes, as well as when it triggers an action for any client-side destinations.

### Debugging within the MetaRouter App

We provide a live event logger within your Source's dashboard. Select the Source you would want to inspect your [Sources list](https://app.metarouter.io/clickstream), then click on the **Logs** tab. This will show a copy of each event and it's payload to help you understand what our platform receives. Even if you are only using client-side sources, a copy of your event should show in this list.

The Logger can only display events that are triggered while it is open, and their may be a delay of a few seconds as our platform processes the event. If your event or events do not show, then use the **Debugging within the Browser** steps to ensure that the event is being sent in the first place.

## FAQ

### Can I run both MetaRouter's snippet and other analytics tools at the same time?

Depending on the tools, there could be conflicts in where functionality is overwritten by our snippet or the tracking tools logic. This is beacuse the names of the functions are the same, regardless of who loads it, and Javascript will overwrite one part of data with another if they share the same name.

There are three types of conflict resolution to expect across all destinations that we offer:

1. **Automatic Conflict Resolution** - These are destinations that expect that a separate, duplicate copy can exist at the same time. Google Analytics is an example of this.

2. **Manual Conflict Resolution** - These are destinations that require a setting to be specified in order to prevent conflicts. Facebook Pixel's [Send All Events as Single Events](https://docs.metarouter.io/v2/clickstream/destinations/facebook-pixel.html#additional-features) is an example of this.

3. **No Conflict Resolution** - These destinations do not have any functionality to handle multiple versions of themselves being loaded in at the same time.

**We do not support using Segment Analytics and this SDK at the same time**. Because both products use the same open-source project as the basis of their functionality, there are unavoidable conflicts for functionality. Instead, we recommend using an A/B test to send a portion of traffic to each snippet (for comparison reasons) or by leveraging the Webhooks Destination to forward a copy of the event from our system to Segment (this will only work for Segment's Cloud-Enabled Destinations)
