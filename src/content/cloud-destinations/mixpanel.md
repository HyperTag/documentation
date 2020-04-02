---
collectionKey: cloud-destinations

navText: Mixpanel

path: '/cloud-destinations/mixpanel/'

tags: [cloud, destinations]
---

# Mixpanel

MetaRouter makes it easy to send your data to Mixpanel. Once you follow the steps below, your data will be routed through our platform and pushed to Mixpanel in the appropriate format.

## What is Mixpanel and how does it work?

Mixpanel, geared towards financial services, SaaS, consumer tech, and media/entertainment, is a product analytics tool for product people. The tool analyzes customer-drive data, allowing your team to deeply understand every user's journey with instant insights for everyone on mobile and web.

Mixpanel creates funnel reports to identify user drop off or churn risk, allows for immediate A/B testing and experimentation, supports JSQL, and brings you automated insights that let non-technical users skip the data-mining.

[Learn more about Mixpanel](https://mixpanel.com/)

## Why send data to Mixpanel using MetaRouter?

Implementing Mixpanel without MetaRouter involves building with two separate APIs - Mixpanel and Mixpanel People. In this case, you'd need to indicate which user traits and events that you want to be collected and send them to the appropriate SDKs.

Integrating Mixpanel with MetaRouter, however, means that you don't need to work with any of Mixpanel's APIs or SDKs.

Once you enable Mixpanel in your MetaRouter UI, we'll route your data directly to Mixpanel in a compatible format so you can skip native implementation and save time for insights.

## Getting Started with Mixpanel and MetaRouter

### Mixpanel Side

Once you've made a Mixpanel account and find yourself on the site, go ahead to project settings. Here, you'll find your Token and API key.

![mixpanel1](/images/mixpanel1.png)

You'll need to copy these two fields into the MetaRouter App configuration for Mixpanel.

![mixpanel2](/images/mixpanel2.png)

### MetaRouter Side

Now, head over to your MetaRouter dashboard and insert both your Token and API key into the Mixpanel destination.

Give your pipeline a unique name, and click `Save` to officially activate it.

With that, you're set! Your data should start flowing almost immediately.

Click on `View Your Data` back in the Mixpanel UI to start exploring.

## Additional Features

On top of our standard calls, you're free to do a few extra things with our Mixpanel integration:

- `Enable Mixpanel People`: This will enable all of your analytics.identify() calls to get sent to Mixpanel's People.
  - `Events to Increment in People` - Used for segmenting users by event counts and last event date in Mixpanel People. List the events that you want to see in Mixpanel People here.
  - `Add People Properties` - These are set off of `identify` API calls and allow you to explicitly set properties that you want to track.
  - `Add Super Properties` - This lets you explicitly set the super properties that you wish to track.

Note that, if `Set All Traits by Default` is enabled, you will not need to specify explicit people or super properties.\_

- By default, we will track all pages to Mixpanel with a consolidated event name. This sends all `page` and `screen` calls as `Loaded a Page` or `Loaded a Screen` events. If you wish to do this in a different way, disable the `Consolidate Page Calls` option and see the additional options below.

- _Track additional pages_, including:

  - `Named Pages` - This sends a `Viewed (name) Page` event to Mixpanel.
  - `Categorized Pages` - This sends a `Viewed (category) Page to Mixpanel.
  - `All Pages` - This causes all `page` calls to be sent to Mixpanel, regardless of how you have customized your pages. They will appear as `Loaded A Page` in Mixpanel.

- `Group Identifier Traits` - What trait Metarouter should use as your Mixpanel “group key” in group calls. If, for example, you set this to be company, then “company” will be sent as group_key and the value of traits["company"] will be sent as the group_id.

- Cookies

  - `Add Cross Subdomain Cookie` - Allows Mixpanel cookie to be read across all subdomains.
  - `Secure Cookie` - This marks the Mixpanel cookie as `secure`, meaning that this cookie will only be transmitted over https.
  - `Persistence Cookie` - This allows the Mixpanel cookie to persist between two separate pages of your application.

- Geolocation
  - To stop geolocation from occuring based on the IP of your server side calls, add `ignoreIp: true` to the context of your `identify`, `track`, and `alias` calls. This will prevent ip and location from being updated in Mixpanel.

### Sending data to Mixpanel’s European Union Endpoint

If you’d like to implement Mixpanel in the European Union you will need to enable the setting “Enable European Union Enpoint” within the Mixpanel settings in the app. When this setting is enabled, Segment will automatically update the endpoint for any data sent from one of our server-side libraries or from a browser using Analytics.js or the iOS SDK.

If you are sending data using our Android SDK, you will need to specify the different endpoints using meta-data tags. On your app’s `AndroidManifest.xml` file, you need to add the following tags under your `<application>` tags to override the track, engage, and group endpoints:

```xml
<meta-data android:name="com.mixpanel.android.MPConfig.EventsEndpoint"
  android:value="https://api-eu.mixpanel.com/track?ip=" />
<meta-data android:name="com.mixpanel.android.MPConfig.PeopleEndpoint"
  android:value="https://api-eu.mixpanel.com/engage=" />
<meta-data android:name="com.mixpanel.android.MPConfig.GroupsEndpoint"
  android:value="https://api-eu.mixpanel.com/groups" />
```

For additional information regarding Mixpanel’s European Union endpoint, please see the [Mixpanel documentation here](https://developer.mixpanel.com/docs/implement-mixpanel#section-implementing-mixpanel-in-the-european-union-eu).
