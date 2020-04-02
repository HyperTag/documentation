---
collectionKey: enterprise-destinations

navText: 'Facebook Pixel'

path: '/enterprise-destinations/facebook-pixel/'

tags: [enterprise, destinations]
---

# Facebook

MetaRouter makes it easy to send your data to Facebook Pixel. Once you follow the steps below, your data will be routed through our platform and pushed to Facebook Pixel in the appropriate format.

**Note:** MetaRouter's Facebook Pixel destination consolidates what was previously Facebook's "Ads for Websites" suite, which consisted of both Facebook Custom Audiences and Facebook Conversion Tracking.

## What is Facebook Pixel and how does it work?

Facebook Pixel is an Ad system designed for conversion optimization and lead tracking. It allows you to manage all of your ads from one platform and uses prospecting tools to target your ads to lookalike audiences. By providing this dynamic service, Facebook Pixel allows marketers to optimize cross-platform ads for custom conversions and see when users view content, search for a product, interact with their wishlist, or add payment info.

Facebook Pixel uses a JavaScript Tag API to track audiences and custom user events like page visibility and page length. In order to be used, this JavaScript library must be added to every page of your site. It has a standard set of natively-integrated events such as product views, adds to cart, and purchases. While extremely extensible, tracking dynamic data like sku, name, and price from your database will require that custom code be added to your site.

## Why send data to Facebook Pixel using MetaRouter?

With MetaRouter, you can use Facebook Pixel without having to install their JavaScript library on every page of your site. We also eliminate the need to write custom code to track user event data. Once your Facebook Pixel is routed through MetaRouter, our platform translates page views and events into corresponding Facebook Pixel events.

## Getting Started with Facebook and MetaRouter

### Facebook Pixel Side

To get started with this integration, you'll first need to create a Facebook for Business account. [Follow the instructions](https://www.facebook.com/business/a/online-sales/custom-audiences-website) for creating a Pixel.

You'll only create one pixel for your site (typically labeled with the name of your business). This pixel will [replace all the functionality](https://www.facebook.com/business/help/1686199411616919) previously given to Facebook Audiences and Facebook Conversions (as well as allowing some additional features, such as custom conversions).

![facebook-pixel1](/images/facebook-pixel1.png)

Once that's set up, identify your unique `pixelId`, a 15 digit number that uniquely identifies your site.

### MetaRouter Side

Put your Facebook Pixel ID into your MetaRouter account and give your new connection a unique name.

With that, just click `Save` to activate your pipeline.

#### Configuration file

```YAML
- name: "facebook-pixel"
        config:
          pixelId: "348149915804750"
          valueFieldIdentifier: "price"
          whitelistPII:
            - "email"
            - "phone"
          categoryToContentTypeMapping:
            'Games': 'group'
            'Lorem': 'ipsum'
          customEventsMapping:
            - event: "Custom Event 1"
              mapping: "ViewContent"
            - event: "Custom Event 2"
              mapping: "Subscribe"
            - event: "ViewCategory"
              mapping: "ViewContent"
            - event: "Order Updated"
              mapping: "ViewContent"
              valueFieldIdentifier: "revenueFORtest"
          customPropertiesForStandardEvents:
            - "prop1"
            - "prop23"
```

- `pixelId` - the id you've got from the Facebook Dashboard
- `valueFieldIdentifier` - if no `valueFieldIdentifier` is set on standard events mappings or on any custom event mapped as custom, we’ll use this to get the value parameter.

- `whitelistPII` - By default, we will strip any [PII](#pii-blacklisting) from the properties of track events that get sent to Facebook. If you would like to override this functionality, you can input each property you would like to whitelist as a line item in this setting.

- `categoryToContentTypeMapping` - Enter your category value on the left, and the Facebook content type to map to on the right. Facebook recognizes certain event types that can help deliver relevant ads. If no category values are mapped we’ll default to product and product_group, depending on the event.

- `customEventsMapping` - Enter your event on the `event` property, and the **Facebook Standard Event** to map to on `mapping` properties. Facebook recognizes certain standard events that can be used across Custom Audiences, custom conversions, conversion tracking, and conversion optimization. When you map an event to a standard Facebook event, we’ll send the event by that name. Any unmapped events will still be sent as Custom Events. According to [Facebook Pixel Documentation](https://developers.facebook.com/docs/facebook-pixel/implementation/conversion-tracking/#standard-events), accepted Standard Events, with `mapping` values as follows:

  - `AddPaymentInfo`
  - `AddToCart`
  - `AddToWishlist`
  - `CompleteRegistration`
  - `Contact`
  - `CustomizeProduct`
  - `Donate`
  - `FindLocation`
  - `InitiateCheckout`
  - `Lead`
  - `PageView`
  - `Purchase`
  - `Schedule`
  - `Search`
  - `StartTrial`
  - `SubmitApplication`
  - `Subscribe`
  - `ViewContent`

- `customPropertiesForStandardEvents` - If you send a custom property with your `track()` calls and you want to send it to your Facebook Pixel events you can add it here.

## Events

### Default properties

For all of the events sent to Facebook Pixel (including your `track()`, `identify()` and `page()` events) we map the following properties:

- `fbp` - facebook cookie
- `id` - your `pixelId` from **integrations.yaml**
- `it` - your `receivedAt` from payload
- `ts` - current timestamp
- `eid` - `messageId` from payload
- `ud[em]` - email, if it exits in traits
- `ud[uid]` - `userId` from payload
- `dl` - `fullURL` of the page.
- `rl` - `referrer` of the page

### Identify

We'll map your `page()` calls to the `UserProperties` Pixel Standard event, without additional data

### Page

We'll map your `page()` calls to the `PageView` Pixel Standard event, without additional data.

### Default Analytics.js Standard E-commerce events to Pixel Standard Events

By default, we map some of the Analytics.js Standard E-commerce events to Pixel Standard events, as following.

| Analytics.js              | Pixel Standard Event | Pixel parameters                                                                            |
| :------------------------ | :------------------- | :------------------------------------------------------------------------------------------ |
| [25]                      | [25]                 | [50]                                                                                        |
| Products Searched         | Search               | `content_category`, `content_ids`, `contents`, `currency`, `search_string`, `value`         |
| Product List Viewed       | ViewContent          | `content_ids`, `content_name`, `content_type`, `contents`, `currency`, `value`              |
| Product Viewed            | ViewContent          | `content_ids`, `content_name`, `content_type`, `contents`, `currency`, `value`              |
| Product Added             | AddToCart            | `content_ids`, `content_name`, `content_type`, `contents`, `currency`, `value`              |
| Checkout Started          | InitiateCheckout     | `content_category`, `content_ids`, `contents`, `currency`, `num_items`, `value`             |
| Payment Info Entered      | AddPaymentInfo       | `content_category`, `content_ids`, `contents`, `currency`, `value`                          |
| Order Completed           | Purchase             | `content_ids`, `content_name`, `content_type`, `contents`, `currency`, `num_items`, `value` |
| Product Added to Wishlist | AddToWishlist        | `content_name`, `content_category`, `content_ids`, `contents`, `currency`, `value`          |

All Pixel Standard Events will be mapped with the following properties.

| Property           | Type                         | Details                                                                                                                                                       |
| :----------------- | :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [25]               | [25]                         | [50]                                                                                                                                                          |
| `content_ids`      | Array of Integers or Strings | Each id of your `product[i].product_id`                                                                                                                       |
| `contents`         | Array of Objects             | Product details `{ id: track.productId() || track.id() || track.sku() || undefined, quantity: t.quantity(), item_price: t.price() }`                          |
| `num_items`        | Integer                      | Maps to `content_ids.length`                                                                                                                                  |
| `content_type`     | String                       | Either `product` or `product_group` based your products array length or on `categoryToContentTypeMapping[category_name]` parameter from **integrations.yaml** |
| `content_name`     | String                       | The `track.name()` property of the payload                                                                                                                    |
| `content_category` | String                       | The `track.category() || ''` of the page / or category of the first product `product[0].category()`                                                           |
| `currency`         | String                       | The currency for the specified value. Mapped from `track.currency()` or to `'USD'` if no currency is specified                                                |
| `search_string`    | String                       | `query` parameter from properties for the `Search` event or `undefined` for other events, for example `track.proxy('properties.query') || undefined`          |
| `value`            | String                       | The field you've mapped for the event in your `valueFieldIdentifier` property from **integrations.yaml**                                                      |

### Adding your own events

To send **Standard** events, use the Analytics.js destination setting (from **integrations.yaml** ) named `customEventsMapping` . Then, any time Analytics.js receives one of the events in that mapping, it will be sent to Facebook as the standard event you specified. All properties you included in the event will be sent as event properties.

### Custom events

To send Custom events, send any event that does not appear in either mapping. All properties you included in the event will be included as event properties.

## Timestamps

Facebook Pixel uses a custom timestamp format: an ISO 8601 timestamp without timezone information. For the following event fields, if you pass in a JavaScript `Date` object, it will be converted to this custom format:

- `checkinDate`
- `checkoutDate`
- `departingArrivalDate`
- `departingDepartureDate`
- `returningArrivalDate`
- `returningDepartureDate`
- `travelEnd`
- `travelStart`

## PII Blacklisting

Facebook enforces strict guidelines around sending Personally Identifiable Information (PII) as properties of Pixel events. In order to adhere to these guidelines, Analytics.js will automatically scan `track` event properties for PII and remove any that get flagged from the event to Facebook. The following keys are currently filtered:

- `email`
- `firstName`
- `lastName`
- `gender`
- `city`
- `country`
- `phone`
- `state`
- `zip`
- `birthday`
- `ssn`

Any `track` events with properties containing those keys will be sent to Facebook with those properties omitted.

If you have events that use any of those keys for non-PII properties, you can manually whitelist them using the `whitelistPII` object from your **integrations.yaml** file
