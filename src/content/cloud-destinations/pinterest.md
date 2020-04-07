---
collectionKey: cloud-destinations

navText: Pinterest Tag

path: '/cloud-destinations/pinterest/'

tags: [cloud, destinations]
---

# Pinterest Tag

MetaRouter makes it easy to send your data to Pinterest Tag. Once you follow the steps below, your data will be routed through our platform and pushed to Pinterest Tag in the appropriate format.

## What is Pinterest Tag and how does it work?

Pinterest Tag is an ad management platform that creates JavaScript tags to track user actions once they click on or view an ad. In doing this, it is able to record website conversions tied to your specific ad campaigns. Using this platform enables audience targeting based on user behavior such as page views, videos watched, or orders completed. It also enables campaign optimization based on promoted pin performance and downstream user behavior such as products liked, shared, or purchased.

The Pinterest Tag allows you to track user events on your website after viewing your promoted Pin. You can then use this information to gauge the effectiveness of your ad campaign and create audiences to target on Pinterest. In order to use this tag, you must implement two separate components. First, you need to add JavaScript base code to every page of your website. Second, you need to add JavaScript event tracking code on specific pages where you want to track conversion events. You can provide additional information about an event by attaching an object that contains event data such as `value` or `quantity`. In order to do this, you'll have to hard-code values or pass them back dynamically.

[Learn more about Pinterest](https://business.pinterest.com/en)

## Why send data to Pinterest Tag using MetaRouter?

This integration can be very complicated to implement without MetaRouter; the base code for each customer is unique and must be obtained from the Pinterest UI or API. If you want to track custom events, you'll need to familiarize yourself with the Pinterest API to both locate the correct base and event tracking code as well as install it correctly into your own site. It typically needs to be added by a webmaster or developer to prevent errors.

Using MetaRouter, you can send page views and event data directly to Pinterest without needing to manually install any extra JavaScript on your website. Just enable the Pinterest destination in your MetaRouter UI, and we'll automatically take care of mapping a standard set of events to recognized Pinterest Tag events. MetaRouter also allows you to define and map your own events to supported Pinterest events without any custom code. All of this data is immediately available for analysis in your Pinterest dashboard.

Integrating Pinterest with MetaRouter cuts out any need for additional implementation resources, saving your development team valuable time.

## Getting Started with Pinterest Tag and MetaRouter

To get started sending events to Pinterest, first sign up for [Pinterest for Business](https://business.pinterest.com/en).

**Note:** This destination supports client-side Analytics.js only. You also need to have implemented MetaRouter within your website prior to enabling this connector.

### Pinterest Side

Begin by logging into your [Pinterest for Business Ads account](https://ads.pinterest.com) account. Create your conversion tracking tags by choosing from the **Ads** dropdown and selecting **Conversion Tracking**.

![pinterest1](/images/pinterest-tag-1.png)

On the next page, click **Create Pinterest Tag**.

![pinterest2](/images/pinterest-tag-2.png)

This next page will show your Pinterest Tag Id (shown in red in the image below - copy this value) and allows you to choose a custom name for it.

![pinterest3](/images/pinterest-tag-3.png)

**Note:** MetaRouter will fire `page` views for you, but you'll need to map in your custom events in order to fire those off.

### MetaRouter Side

Back in the MetaRouter UI, select Pinterest Tag as a destination and give your new Pinterest pipeline a unique name.

The next mandatory step is to add you Pinterest Tag Id as the connection of the current pipeline. Clicking Save will activate your pipeline and you're ready to go with the basic functionalities.

In addition, you can choose to customize your destination using the following fields available on our UI, under **Destination Details** section:

![pinterest4](/images/pinterest-tag-4.png)

#### `Pinterest Custom Properties`

If you wish to send any extra custom properties to Pinterest - in addition to the [standard Pinterest properties](https://help.pinterest.com/sites/help/files/pinterest_tag_instructions.pdf) - then add them to this section. These properties are case-insensitive, and can be nested. For example, if you want to send `analytics.track('Event', {myObject: { myProperty: true }})` then input `myObject.myProperty`.

MetaRouter automatically binds the following properties to Pinterest Event Data:

| Analytics.js Spec Property | Pinterest Tag Event Data |
| :------------------------- | :----------------------- |
| `query`                    | `search_query`           |
| `order_id`                 | `order_id`               |
| `coupon`                   | `coupon`                 |
| `value`                    | `value`                  |
| `currency`                 | `currency`               |
| `products.{}.name`         | `product_name`           |
| `products.{}.product_id`   | `product_id`             |
| `products.{}.sku`          | `product_id`             |
| `products.{}.category`     | `product_category`       |
| `products.{}.variant`      | `product_variant`        |
| `products.{}.price`        | `product_price`          |
| `products.{}.quantity`     | `product_quantity`       |
| `products.{}.brand`        | `product_brand`          |

#### `Map Your Events to Pinterest`

Enter your event on the left, and map it to one of the [standard Pinterest events](https://help.pinterest.com/sites/help/files/pinterest_tag_instructions.pdf) on the right. Some Pinterest events, such as `AddToCart` are already mapped to the Analytics Spec (in this case, to `Product Added`). In the MetaRouter Pinterest Tag destination settings, one can define their own events for Pinterest Tag’s `Signup`, `Lead`, and `Custom` events. Any events sent that aren’t bound to any of these events will still be sent as a _Partner-defined_ event. However, they will not be available for conversion tracking; only for audience creation.

| Analytics.js Spec Event           | Pinterest Tag Event Type |
| :-------------------------------- | :----------------------- |
| Products Searched                 | `Search`                 |
| Product List Filtered             | `Search`                 |
| Product Added                     | `AddToCart`              |
| Order Completed                   | `Checkout`               |
| Video Playback Started            | `WatchVideo`             |
| `.page()` call with no `category` | `PageVisit`              |
| `.page()` call with `category`    | `ViewCategory`           |

#### Enable Enhanced Match

MetaRouter supports Pinterest Enhanced Match in two scenarios:

1. where a user is already identified when they visit your site
2. when a user visits your site anonymously but is identified at some later point.


To support Pinterest Enhanced Match in the first scenario, go to the Pinterest Tag destination settings in the MetaRoyter web app, and click **Enable Enhanced Match to on Page Load**. This attaches the hashed email address on the initial page load conversion event. For more information see the [Pinterest enhanced-match documentation here](https://help.pinterest.com/en/business/article/enhanced-match).

To support the second scenario, where a user visits your site anonymously, but is identified at a later point, you do not need to change any of the Pinterest destination settings. Instead, you can make an `identify()` call with the user’s email address, which triggers a Pinterest `set()` method. This saves the identification parameters so they can be sent with the next event, so it’s important to `set` the values as early as possible.  
**Note**: Nothing appears in the network tab in your browser or in the tag helper extension after `set()` is called. However, a hashed value for an `'em'` parameter is added in the next event call, in a JSON object encoded in the URL. You can also see the email box in the tag helper extension.

If you use MetaRouter’s `identify()` method to enable Pinterest’s Enhanced Match, you only collect this information for events *after* you enable the setting. Pinterest does not retroactively update values for past events.

## Things to note

Generate page views and trigger your custom event inside your website with `analytics.track('your event name')`. You should see confirmation of those tags sent to Pinterest inside your Pinterest for Business dashboard, under **Ads > Conversions**.
