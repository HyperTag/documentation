---
collectionKey: cloud-destinations

navText: Google AdWords

path: '/cloud-destinations/google-adwords/'

tags: [cloud, destinations]
---

# Google AdWords

MetaRouter makes it easy to send your data to Google AdWords. Once you follow the steps below, your data will be routed through our platform and pushed to AdWords in the appropriate format.

## What is Google AdWords and how does it work?

Google AdWords is a pay-per-click ad platform for Google Search. It operates by placing advertisements across text-based searches, graphic displays, YouTube videos, and in-app mobile displays. It also is able to target custom ads based on country, city, region, or distance from the location of the advertiser.

AdWords operates by installing code snippets on your site that trigger conversions or tag visitors for remarketing. It uses a `page` call to gauge these conversions and tags, and does not natively have an easy way to fire events based on user actions other that page loads.

Furthermore, if you want to use AdWords in your mobile apps, you'll need to learn their SDK and tag your app with custom events.

[Learn more about Google AdWords](https://adwords.google.com/home/)

## Why send data to Google AdWords using MetaRouter

Integrating AdWords with MetaRouter allows you to use your existing tracking events (check out our [API Calls](../calls.md)) to trigger conversions and remarketing tags. We also allow you to incorporate multiple remarketing tags using the conversion label identifier.

Furthermore, you do not need to learn the AdWords SDK methods if you want to send data from your mobile apps. You will also not need to re-submit to the app store, as everything can be handled by MetaRouter. We take care of pulling the data from your apps and sending it to AdWords.

## Getting Started with Google AdWords and MetaRouter

### AdWords Side

Once you create an AdWords account, you'll need to find your Conversion ID. To do this, you'll need to click the wrench icon in the upper right hand corner of your screen. It should look something like this:

![Adwords1](/images/Adwords1.png)

After you click the wrench, you'll be prompted with a menu. Under **Measurement**, select **Conversions**. Create a new conversion by clicking the plus icon in the upper left hand corner of the screen.

You will see a **Global Site Tag** that looks like the following:

```HTML
<!-- Global Site Tag (gtag.js) - Google AdWords: GOOGLE_CONVERSION_ID -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-GOOGLE_CONVERSION_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)};
  gtag('js', new Date());

  gtag('config', 'AW-GOOGLE_CONVERSION_ID');
</script>
```

In the code snippet above, the conversion ID has been replaced with `AW-Google_Conversion_ID`. In your new conversion, this will be a unique numerical ID that is tied to your AdWords account. Copy this to your clipboard and navigate back to your MetaRouter app.

### MetaRouter Side

Once you've obtained your Conversion ID, copy and paste it into the corresponding field in your MetaRouter UI. You can now enable the pipeline and watch your data flow into AdWords!

#### Event Mapping to AdWords

In you MetaRouter UI, you'll need to map your conversion `track` events to your AdWords `google_conversion_label`s. To do this, enter the name of your track event _exactly_ as you've named for both the **Key** and **Event** fields.

Then, add the **Conversion Label** from your AdWords conversion event to the **Label** field inside the MetaRouter UI. For more information on where to find your `google_Converion_id` and `google_conversion_label`, check out [this forum](https://www.en.advertisercommunity.com/t5/AdWords-Tracking-and-Reporting/Find-conversion-ID-and-Conversion-label/td-p/364894#).

For example, the event `analytics.track("Red Rover", {...})` and the AdWords Conversion label `ABC-123...` would be entered as:

- Key: `Red Rover`
- Event: `Red Rover`
- Label: `ABC-123...`

## Additional Features

You are also now able to click a **Remarketing** checkbox. If you enable this feature, MetaRouter sends an additional remarketing tag for each of your conversion labels and for every `page` API call.

Since AdWords recognizes labels rather than custom events, you'll need to map the `event name` to its corresponding **AdWords label** in the appropriate fields.
