---
collectionKey: enterprise-destinations

navText: 'Pinterest Tag'

path: '/enterprise-destinations/pinterest-tag/'
---

MetaRouter makes it easy to send your data to Pinterest Tag. Once you follow the steps below, your data will be routed through our platform and pushed to Pinterest Tag in the appropriate format.

## What is Pinterest Tag and how does it work?

Pinterest Tag is an ad management platform that creates JavaScript tags to track user actions once they click on or view an ad. In doing this, it is able to record website conversions tied to your specific ad campaigns. Using this platform enables audience targeting based on user behavior such as page views, videos watched, or orders completed. It also enables campaign optimization based on promoted pin performance and downstream user behavior such as products liked, shared, or purchased.

The Pinterest Tag allows you to track user events on your website after viewing your promoted Pin. You can then use this information to gauge the effectiveness of your ad campaign and create audiences to target on Pinterest. In order to use this tag, you must implement two separate components. First, you need to add JavaScript base code to every page of your website. Second, you need to add JavaScript event tracking code on specific pages where you want to track conversion events. You can provide additional information about an event by attaching an object that contains event data such as `value` or `quantity`. In order to do this, you'll have to hardcode values or pass them back dynamically.

[Learn more about Pinterest](https://business.pinterest.com/en)

## Why send data to Pinterest Tag using MetaRouter?

This integration can be very complicated to implement without MetaRouter; the base code for each customer is unique and must be obtained from the Pinterest UI or API. If you want to track custom events, you'll need to familiarize yourself with the Pinterest API to both locate the correct base and event tracking code as well as install it correctly into your own site. It typically needs to be added by a webmaster or developer to prevent errors.

Using MetaRouter, you can send page views and event data directly to Pinterest without needing to manually install any extra JavaScript on your website. Just enable the Pinterest destination in your MetaRouter UI, and we'll automatically take care of mapping a standard set of events to recognized Pinterest Tag events. MetaRouter also allows you to define and map your own events to supported Pinterest events without any custom code. All of this data is immediately available for analysis in your Pinterest dashboard.

Integrating Pinterest with MetaRouter cuts out any need for additional implementation resources, saving your development team valuable time.

## Getting Started with Pinterest Tag and MetaRouter

To get started sending events to Pinterest, first sign up for [Pinterest for Business](https://business.pinterest.com/en).

**\*Note**: This destination supports client-side analytics.js only. You also need to have implemented MetaRouter within your website prior to enabling this connector.\*

### Pinterest Side

Begin by logging into your [Pinterest for Business](https://business.pinterest.com/en) account. Create your conversion tracking tags by choosing from the `Ads` dropdown and selecting `Conversion Tracking`.

![pinterest1](/images/pinterest1.png)

On the next page, choose `Create a Pinterest tag`.

![pinterest2](/images/pinterest2.png)

Give your new tag a custom name, and choose `Next`. This next page will show your Pinterest conversion tag for that custom event name.

![pinterest3](/images/pinterest3.png)

The generated Pinterest tag contains a value shown in red in two places. Copy this value, which will be your `tagId`.

### MetaRouter Side

You can configure your integrations using a `integrations.yaml` config file, where you define multiple destinations, each one with its custom settings.

The only configuration needed is the `tagId`, which represents the id that you've got from the previous step.

Here is an example of `integrations.yaml`:

```yaml
- name: "pinterest"
  config:
      tagId: "2612826764086"
      handleCustomAsPartnerDefinedEvent: true
      valueFieldIdentifier: "price"
      customEventsMapping:
        - event: "Custom Event 1"
          mapping: "ViewContent"
          valueFieldIdentifier: ""
        - event: "Custom Event 2"
          mapping: "Subscribe"
          valueFieldIdentifier: "price"
        - event: "ViewCategory"
          mapping: "ViewContent"
        - event: "Order Updated"
          mapping: "ViewContent"
          valueFieldIdentifier: "revenueFORtest"
      customPropertiesForStandardEvents:
        - "prop1"
        - "prop2"
```

In this configuration, `tagId` represents the ID that you've got from the previous step.

Pinterest also allows sending _Partener Defined events_, which are additional evensts that you've defined for the purpose of audience targeting. When `handleCustomAsPartnerDefinedEvent` is `true` we'll send your custom's event concatenated name as the event parameter.

Take the following request:

```json
{
  "opts": {
    "clone": true,
    "traverse": true
  },
  "obj": {
    "context": {
      "ip": "172.24.0.1"
    },
    "originalTimestamp": "1901-01-01T00:00:00.000Z",
    "receivedAt": "2019-04-02T12:42:36.000Z",
    "sentAt": "1901-01-01T00:00:00.000Z",
    "timestamp": "0293-04-11T23:47:16.000Z",
    "type": "track",
    "userId": "41b70e4a-5ff4-4ff4-a34f-0f4c6cee231a",
    "writeKey": "THD1",
    "event": "Payment Info Entered",
    "properties": {
      "checkout_id": "39f39fj39f3jf93fj9fj39fj3f",
      "order_id": "dkfsjidfjsdifsdfksdjfkdsfjsdfkdsf"
    },
    "channel": "server"
  }
}
```

When `handleCustomAsPartnerDefinedEvent` is `false`, we'll send a `event:custom` parameter with your conversion, and additionally, a `custom_event_name` parameter with your custom event's name. The conversion payload for the previous request will look like:

```json
{
  "tid": "2613336903169",
  "noscript": 1,
  "ed[checkout_id]": "39f39fj39f3jf93fj9fj39fj3f",
  "ed[order_id]": "dkfsjidfjsdifsdfksdjfkdsfjsdfkdsf",
  "ed[custom_event_name]": "PaymentInfoEntered",
  "event": "custom"
}
```

When `handleCustomAsPartnerDefinedEvent` is `true`, we'll send a _Partener Defined event_, with the `event` parameter the same as your custom event concatenated name. The conversion payload for the previous request will look like:

```json
{
  "tid": "2613336903169",
  "noscript": 1,
  "ed[checkout_id]": "39f39fj39f3jf93fj9fj39fj3f",
  "ed[order_id]": "dkfsjidfjsdifsdfksdjfkdsfjsdfkdsf",
  "event": "PaymentInfoEntered"
}
```

`customEventsMapping` list allows you to define your own mapping for custom events that you track with `analytics.track()`. Using the config file from the example, when calling `analytics.track('Custom Event 1')` we'll send a `ViewContent` event to Pinterest. We use the following parameters:
_ `event`: your `track()` event.
_ `mapping`: the event send to Pinterest \* `valueFieldIdentifier`: we'll set the conversion value based on the field mapped here.

`customPropertiesForStandardEvents` list allows you to send additional custom parameters mapped from your `properties` of your`track()` calls to your conversions, for all the standard events.

### Pinterest Enhanced Match

Pinterest Enhanced Match is a slight modification of the Pinterest Tag to send back secure, **hashed** email addresses with your conversions. With Enhanced Match, you'll be able to see more conversions (by tracking website actions when there's no Pinterest cookie present).

You can send the users emails with your `track()` calls. If the email is already hashed with SHA256 we'll send it like that, otherwise we'll hash it for you.

### Track

According to [Pinterest Conversion tag documentation](https://developers.pinterest.com/docs/ad-tools/conversion-tag/), the following are the events that we can track:

- `Checkout`
- `AddToCart`
- `PageVisit`
- `Signup`
- `WatchVideo`
- `Lead`
- `Search`
- `ViewCategory`
- `Custom`
- `[Partner-defined event]` - _Note_: Any additional event defined for the purpose of audience targeting. Unique events aren’t available for conversion reporting.

The following Analytics.js Events are matching the following Pinterest Specific Events:

- `Products Searched` => `search`
- `Product List Viewed` => `viewcategory`
- `Promotion Viewed` => `pagevisit`
- `Product Viewed` => `pagevisit`
- `Product Added` => `addtocart`
- `Cart Viewed` => `pagevisit`
- `Order Completed` => `checkout`

Because Pinterest offers a Standard Event `custom` that is available for conversion reporting, for all unmatched Analytics.js events we decided to send data to use this last one.

### Page

We'll send all of your `analytics.page()` events to the standard Pinterest `pagevisit` event, after removing PII from the payload.
