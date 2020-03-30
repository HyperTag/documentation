---
collectionKey: enterprise-destinations

navText: 'Google Analytics'

path: '/enterprise-destinations/google-analytics/'
---

MetaRouter makes is easy to send your data to Google Analytics. Once you've set up your source to start tracking data, we'll translate and route that data to Google Analytics.

# What is Google Analytics and how does it work?

Google Analytics is a web analytics tool that pools real-time site information for a comprehensive view into user acquisition, audience demographics, and conversion goals. It supports targeted audience and integrates seamlessly with Google AdWords and all DoubleClick products.

Google Analytics requires that you add their snippet to your site. Doing this will give you basic information such as page views, traffic sources, and user location. If you want to get more detailed user information, you'll need to write custom code in your site. In order to do this, you'll need to have a developer study the Google Analytics API to learn how to implement methods and format data correctly.

# Why send data to Google Analytics using MetaRouter?

Integrating Google Analytics with MetaRouter means that you do not need to install any Google Analytics code into your site or mobile app. It also greatly eases the processes of tracking more detailed information like what users are doing on a page, e-commerce data, and user attributes. Furthermore, many custom events can be configured directly in the MetaRouter UI, making it easy to track the data that you need.

# Getting Started with Google Analytics and MetaRouter

_Before you get started, note that you will need to remove Google Analytics snippet from your page if you were using it outside of MetaRouter._

## Google Analytics Side

To get started sending events to Google Analytics, first you'll need to [create an account](https://analytics.google.com).

The first step is to get your Google Analytics `Tracking ID`. This can be found in the Admin panel and should abide by the following structure: `UA-XXXXXXXX-X`.

![google-analytics1](../../../../images/google-analytics1.png)

Next, you'll need to enable e-commerce tracking for the view you want to track transactions to.
This can be done inside of Google Analytics by clicking: **Admin > View Settings > Ecommerce Settings switch to ON**

Without this step transactions will not show up in your reports.

Most of the events are based on Enhanced Ecommerce, which allows you to derive insights by combining impression data, product data, promotion data, and action data. This is required for product-scoped custom dimensions.
Enable Enhanced Ecommerce inside of Google Analytics by clicking: **Admin > View Settings > Enhanced Ecommerce Settings switch to ON**

## MetaRouter Side

You can configure the Google Analytics account and the event field mappings for our Google Analytics Destination, below is the full payload you will need to send to the Platform via Canary. Keep in mind that you will also need to add the configurations of your other destinations as the Platform will overwrite any new instructions over the old one.

### Config

#### `api` _(Required)_ - Object

---

The purpose of this section is to allow you to define Google Analytics' specific API information.
The structure of the `api` property is the following:

- `"endpoint": "https://www.googleanalytics.com/collect"` _(required)_ - String
  - Request's endpoint
  - **\*Note:** This is GA's API endpoint and should not be altered.\*
- `"method": "post"` _(optional)_ - String
  - Request's method
  - Availavle values: `"get"`, `"post"`
  - Default value: `"get"`
  - **\*Note:** GA's API is expecting a POST request, this should not be altered.\*
- `"keepAliveAgent": true` _(optional)_ - Bool / Object
  - Request's HttpAgent or HttpsAgent (automatically detected based on endpoint's structure)
  - Possible values:
    - `false` => request agent won't be set
    - `true` => the following default settings will be used as request agent: `{ maxSockets: 100, maxFreeSockets: 10, timeout: 60000, freeSocketTimeout: 30000 }`
    - Object of agent settings => passed settings will be used as request agent
  - **\*Note:** This should be enabled and set based on your needs and does not affect GA's capabilities.\*
- `"includePayloadInURL": true` _(optional)_ - Bool
  - If this is set to `true`, the request's URL will include the encoded payload
  - **\*Note:** GA's API requires the payload to be included inside the URL.\*

#### `events` _(Required)_ - Object

---

The purpose of this section is to allow you to define event-specific information based on the event type. Because GA allows you to track `page()` and standard and custom `track()` calls, we divided this into the following sections:

```json
{
  "general": [],
  "page": [],
  "track": [],
  "customTrack": []
}
```

##### `general` section

All GA API calls require specific properties to be sent regardless of the event type that's being triggered, page or track. This section allows you to define all the properties that are common for all API calls that'll go to GA.

Here's how this section should look like for GA:

```json
"general": [
  { "input": "1", "output": "v" },
  { "input": "<TRACKING_ID_HERE>", "output": "tid" },
  { "input": "properties.currency", "transformations": [{ "type": "assign", "defaultValue": "USD" }, { "type": "toUpperCase" }], "output": "cu" },
  { "input": "context.page.url", "transformations": [{ "type": "assign" }], "output": "dl" },
  { "input": "context.page.title", "transformations": [{ "type": "assign" }], "output": "dt" },
  { "input": "context.page.referrer", "transformations": [{ "type": "assign" }], "output": "dr" },
  { "input": "context.userAgent", "transformations": [{ "type": "assign" }], "output": "ua" },
  { "input": "context.ip", "transformations": [{ "type": "assign" }], "output": "uip" },
  { "input": "userId", "transformations": [{ "type": "assign" }], "output": "uid"}
]
```

**Notes**

- All GA API calls require the following properties to be sent:

| GA parameter | value                          | Explanation                              | Notes                                                                               |
| ------------ | ------------------------------ | ---------------------------------------- | ----------------------------------------------------------------------------------- |
| `v`          | `"1"`                          | protocol version, currently at version 1 | -                                                                                   |
| `tid`        | your Tracking ID               | universal google analytics tracking ID   | _please note that you should replace `<TRACKING_ID_HERE>` with your GA Tracking ID_ |
| `cu`         | `properties.currency` property | currency uppercase                       | default value: `"USD"`                                                              |
| `uip`        | `context.ip` property          | user’s ip                                | -                                                                                   |
| `ua`         | `context.userAgent` property   | user agent                               | -                                                                                   |

- All other properties included in the `general` section are nice to have.

##### `page` section

All GA API calls require the `t` (hit type) parameter to be sent. For `page()` calls, GA is expecting a hit type `"pageview"`.

Here's how this section should look like for GA:

```json
"page": [
  { "input": "pageview", "output": "t" }
]
```

##### `track` section

The purpose of this section is to allow you to define the properties that you want to send over to GA for a specific event.

Here's how this section should look like for GA for the main standard events:

```json
"track": [
  {
    "event": "Products Searched",
    "parameters": [
      { "input": "event", "output": "t" },
      { "input": "engagement", "output": "ec" },
      { "input": "search", "output": "ea" },
      { "input": "properties.query", "transformations": [{ "type": "assign" }] ,"output": "el" }
    ]
  },
  {
    "event": "Product List Viewed",
    "parameters": [
      { "input": "event", "output": "t" },
      { "input": "list", "output": "ec" },
      { "input": "view", "output": "ea" },
      { "input": "Product List Viewed", "output": "el" },
      { "input": "detail", "output": "pa" },
      { "input": "properties.list_id", "transformations": [{ "type": "assign" }], "output": "il1nm"},
      {
        "transformations": [{
          "type": "toObject",
          "fields": [{
            "input": "properties.products",
            "transformations": [{
              "type": "toArrayOfObjects",
              "unfold": "il1pi_INDEX__KEY_",
              "fields": [
                { "input": "sku", "transformations": [{ "type": "assign" }], "output": "id" },
                { "input": "name", "transformations": [{ "type": "assign" }], "output": "nm" },
                { "input": "brand", "transformations": [{ "type": "assign" }], "output": "br" },
                { "input": "category", "transformations": [{ "type": "assign" }], "output": "ca" },
                { "input": "variant", "transformations": [{ "type": "assign" }], "output": "va" },
                { "input": "position", "transformations": [{ "type": "toInt" }], "output": "ps" },
                { "input": "price", "transformations": [{ "type": "toFloat" }], "output": "pr" },
                { "input": "quantity", "transformations": [{ "type": "toInt" }], "output": "qt" }
              ]
            }]
          }]
        }]
      }
    ]
  },
  {
    "event": "Product Viewed",
    "parameters": [
      { "input": "event", "output": "t" },
      { "input": "ordering", "output": "ec" },
      { "input": "view", "output": "ea" },
      { "input": "Product Viewed", "output": "el" },
      { "input": "detail", "output": "pa" },
      {
        "transformations": [{
          "type": "toObject",
          "fields": [{
            "input": "properties",
            "transformations": [{
              "type": "toArrayOfObjects",
              "unfold": "pr_INDEX__KEY_",
              "fields": [
                { "input": "sku", "transformations": [{ "type": "assign" }], "output": "id" },
                { "input": "name", "transformations": [{ "type": "assign" }], "output": "nm" },
                { "input": "brand", "transformations": [{ "type": "assign" }], "output": "br" },
                { "input": "category", "transformations": [{ "type": "assign" }], "output": "ca" },
                { "input": "variant", "transformations": [{ "type": "assign" }], "output": "va" },
                { "input": "position", "transformations": [{ "type": "toInt" }], "output": "ps" },
                { "input": "price", "transformations": [{ "type": "toFloat" }], "output": "pr" },
                { "input": "quantity", "transformations": [{ "type": "toInt" }], "output": "qt" }
              ]
            }]
          }]
        }]
      }
    ]
  },
  {
    "event": "Product Added",
    "parameters": [
      { "input": "event", "output": "t" },
      { "input": "ordering", "output": "ec" },
      { "input": "view", "output": "ea" },
      { "input": "Product Added", "output": "el" },
      { "input": "add", "output": "pa" },
      {
        "transformations": [{
          "type": "toObject",
          "fields": [{
            "input": "properties",
            "transformations": [{
              "type": "toArrayOfObjects",
              "unfold": "pr_INDEX__KEY_",
              "fields": [
                { "input": "sku", "transformations": [{ "type": "assign" }], "output": "id" },
                { "input": "name", "transformations": [{ "type": "assign" }], "output": "nm" },
                { "input": "brand", "transformations": [{ "type": "assign" }], "output": "br" },
                { "input": "category", "transformations": [{ "type": "assign" }], "output": "ca" },
                { "input": "variant", "transformations": [{ "type": "assign" }], "output": "va" },
                { "input": "position", "transformations": [{ "type": "toInt" }], "output": "ps" },
                { "input": "price", "transformations": [{ "type": "toFloat" }], "output": "pr" },
                { "input": "quantity", "transformations": [{ "type": "toInt" }], "output": "qt" }
              ]
            }]
          }]
        }]
      }
    ]
  },
  {
    "event": "Cart Viewed",
    "parameters": [
      { "input": "event", "output": "t" },
      { "input": "cart", "output": "ec" },
      { "input": "view", "output": "ea" },
      { "input": "Cart Viewed", "output": "el" },
      { "input": "checkout", "output": "pa" },
      {
        "transformations": [{
          "type": "toObject",
          "fields": [{
            "input": "properties.products",
            "transformations": [{
              "type": "toArrayOfObjects",
              "unfold": "il1pi_INDEX__KEY_",
              "fields": [
                { "input": "sku", "transformations": [{ "type": "assign" }], "output": "id" },
                { "input": "name", "transformations": [{ "type": "assign" }], "output": "nm" },
                { "input": "brand", "transformations": [{ "type": "assign" }], "output": "br" },
                { "input": "category", "transformations": [{ "type": "assign" }], "output": "ca" },
                { "input": "variant", "transformations": [{ "type": "assign" }], "output": "va" },
                { "input": "position", "transformations": [{ "type": "toInt" }], "output": "ps" },
                { "input": "price", "transformations": [{ "type": "toFloat" }], "output": "pr" },
                { "input": "quantity", "transformations": [{ "type": "toInt" }], "output": "qt" }
              ]
            }]
          }]
        }]
      }
    ]
  },
  {
    "event": "Order Completed",
    "parameters": [
      { "input": "transaction", "output": "t" },
      { "input": "cart", "output": "ec" },
      { "input": "order_completed", "output": "ea" },
      { "input": "Order Completed", "output": "el" },
      { "input": "purchase", "output": "pa" },
      { "input": "properties.order_id", "transformations": [{ "type": "assign" }], "output": "ti" },
      { "transformations": [{ "type": "toRevenue", "priorities": ["properties.revenue", "properties.total"] }], "output": "tr" },
      { "input": "properties.total", "transformations": [{ "type": "toFloat" }], "output": "tt" },
      {
        "transformations": [{
          "type": "toObject",
          "fields": [{
            "input": "properties.products",
            "transformations": [{
              "type": "toArrayOfObjects",
              "unfold": "pr_INDEX__KEY_",
              "fields": [
                { "input": "sku", "transformations": [{ "type": "assign" }], "output": "id" },
                { "input": "name", "transformations": [{ "type": "assign" }], "output": "nm" },
                { "input": "brand", "transformations": [{ "type": "assign" }], "output": "br" },
                { "input": "category", "transformations": [{ "type": "assign" }], "output": "ca" },
                { "input": "variant", "transformations": [{ "type": "assign" }], "output": "va" },
                { "input": "position", "transformations": [{ "type": "toInt" }], "output": "ps" },
                { "input": "price", "transformations": [{ "type": "toFloat" }], "output": "pr" },
                { "input": "quantity", "transformations": [{ "type": "toInt" }], "output": "qt" }
              ]
            }]
          }]
        }]
      }
    ]
  }
]
```

**Notes**

- All GA track calls require the following properties to be sent:

| GA parameter | value                                                  | Explanation                                                                                   | Notes |
| ------------ | ------------------------------------------------------ | --------------------------------------------------------------------------------------------- | ----- |
| `t`          | depending on the triggered event, this value will vary | available values: `"event"`, `"transaction"`, `"item"`, `"social"`, `"exception"`, `"timing"` |
| `ec`         | `properties.category` property                         | event category                                                                                | -     |
| `ea`         | `properties.action` property                           | event action                                                                                  | -     |

##### `customTrack` section

The purpose of this section is to allow you to specify if a custom event (event that is not mapped inside the `track` section) should be triggered or not. It also allows you to add a list of specific properties that should exist for all custom events.

Here's how this section should look like for GA:

```json
"customTrack": {
  "allowAnyProperty": true,
  "mappedProperties": [
    { "input": "event", "output": "t" },
    { "input": "properties.category", "transformations": [{ "type": "assign", "defaultValue": "custom" }], "output": "ec" },
    { "input": "properties.action", "transformations": [{ "type": "assign", "defaultValue": "custom" }], "output": "ea" },
    { "input": "event", "transformations": [{ "type": "assign", "defaultValue": "Custom Event" }], "output": "el" },
  ]
}
```

**Notes**

- `allowAnyProperty` set to `true` will append the track `properties` to the final payload using the same `key: value` structure and naming
- `mappedProperties` allows you to define properties that you want to add to all your custom track calls

#### `cookies` _(Optional)_ - String

---

Our Analytics.js library includes a sync-injector. The purpose of this sync-injector is to load the minimal 3rd party tag in order for it to drop it's first party cookies. It will then grab these values and include those into the event's final structure.

The purpose of this `cookies` section is to flag if first party cookie values should be used and from where to retrieve those values.

There are first party cookies available for Google Analytics, and those can be accessed and automatically added to the API's payload by setting `"cookies": "integrations.googleAnalytics"`.

# Analytics.js Standard E-commerce Events to GA Enhanced E-commerce events mapping

We put together a list with expected properties for each of the Standard E-commerce Events based on [Google Analytics' documentation](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters).

## Products Searched

This is a simple GA request, not supported out of the box by Enhanced E-Commerce. In order to send the query to the GA server you have to specify a parameter dl (Document Location) that contains the query parameter that you set in site search tracking setting of the app.
Example query:

```
https://www.google-analytics.com/collect?v=1&tid=UA-1234567-1&cid=123e4567-e89b-12d3-a456-426655440000&t=pageview&dl=http://mywebsite.com/searchRedirect=trees
```

where `searchRedirect` is the set site search query parameter and `trees` is the search query that we got from Analytics.js's Products Searched `query` property.

## Product List Viewed

This query takes advantage of GA's Enhanced E-Commerce. Besides [the mandatory fields](#mandatory-fields), these other parameters will be used:

| GA parameter | value                             | Explanation    |
| ------------ | --------------------------------- | -------------- |
| `t`          | "event"                           | Hit type       |
| `ea`         | "view                             | Event action   |
| `ec`         | "list"                            | Event category |
| `pa`         | "detail"                          | Product action |
| `il1nm`      | `category` from your `track` call | List name      |

- [Product list fields](#product-list-fields) with `<type>` "pr" and `N` 1, because there's only one product

## Promotion events

Enhanced Ecommerce allows you to go beyond measuring product performance to measure the internal and external marketing efforts that support those products. To take advantage of enhance e-commerce's promotion reports, you can easily collect data about promotion impressions and promotion clicks with Analytics.js, like so:

```javascript
analytics.track('Viewed Promotion', {
  id: <id>,
  name: <name>,
  creative: <creative>, // optional
  position: <position> // optional
});
```

```javascript
analytics.track('Clicked Promotion', {
  id: <id>,
  name: <name>,
  creative: <creative>, // optional
  position: <position> // optional
});
```

### Promotion Viewed

Besides [the mandatory fields](#mandatory-fields), the parameters for this call are as follow:

| GA parameter | value   | Explanation |
| ------------ | ------- | ----------- |
| `t`          | "event" | Hit type    |

- [Promotion fields](#promotion-fields)

### Promotion Clicked

Besides [the mandatory fields](#mandatory-fields), the parameters for this call are as follow:

| GA parameter | value         | Explanation    |
| ------------ | ------------- | -------------- |
| `t`          | "event"       | Hit type       |
| `ea`         | "click"       | Event action   |
| `ec`         | "interaction" | Event category |
| `pa`         | "click"       | Product action |

- [Promotion fields](#promotion-fields)

## Product Events

### Product Clicked

This query takes advantage of GA's Enhanced E-Commerce. Besides [the mandatory fields](#mandatory-fields), these other parameters will be used:

| GA parameter | value      | Explanation    |
| ------------ | ---------- | -------------- |
| `t`          | "event"    | Hit type       |
| `ea`         | "click"    | Event action   |
| `ec`         | "ordering" | Event category |
| `pa`         | "click"    | Product action |

- [Product list fields](#product-list-fields) with `<type>` "pr" and `<ProductIndex>` 1, because there's only one product

### Product Viewed

This query takes advantage of GA's Enhanced E-Commerce. Besides [the mandatory fields](#mandatory-fields), these other parameters will be used:

| GA parameter | value      | Explanation    |
| ------------ | ---------- | -------------- |
| `t`          | "event"    | Hit type       |
| `ea`         | "view      | Event action   |
| `ec`         | "ordering" | Event category |
| `pa`         | "detail"   | Product action |

- [Product list fields](#product-list-fields) with `<type>` "pr" and `<ProductIndex>` 1, because there's only one product

## Cart events

### Product Added

This query takes advantage of GA's Enhanced E-Commerce. Besides [the mandatory fields](#mandatory-fields), these other parameters will be used:

| GA parameter | value      | Explanation    |
| ------------ | ---------- | -------------- |
| `t`          | "event"    | Hit type       |
| `ea`         | "view      | Event action   |
| `ec`         | "ordering" | Event category |
| `pa`         | "add"      | Product action |

- [Product list fields](#product-list-fields) with `<type>` "pr" and `<ProductIndex>` 1, because there's only one product

**NOTE:** at this stage we can't associate a `cart_id` to send to GA.

### Product Removed

This query takes advantage of GA's Enhanced E-Commerce. Besides [the mandatory fields](#mandatory-fields), these other parameters will be used:

| GA parameter | value    | Explanation    |
| ------------ | -------- | -------------- |
| `t`          | "event"  | Hit type       |
| `ea`         | "view    | Event action   |
| `ec`         | "cart"   | Event category |
| `pa`         | "remove" | Product action |

- [Product list fields](#product-list-fields) with `<type>` "pr" and `<ProductIndex>` 1, because there's only one product

**NOTE:** at this stage we can't associate a `cart_id` to send to GA.

### Cart Viewed

This query takes advantage of GA's Enhanced E-Commerce. Besides [the mandatory fields](#mandatory-fields), these other parameters will be used:

| GA parameter | value      | Explanation    |
| ------------ | ---------- | -------------- |
| `t`          | "event"    | Hit type       |
| `ea`         | "view      | Event action   |
| `ec`         | "cart"     | Event category |
| `pa`         | "checkout" | Product action |

- [Product list fields](#product-list-fields) with `<type>` "list" and `<ProductIndex>` between 1 and products length

## Checkout events

The biggest differentiator between e-commerce and enhanced e-commerce is support for checkout steps. To take advantage of tracking your checkout funnel and measuring metrics like cart abandonment, etc, you'll first need to configure your checkout funnel in the Google Analytics admin interface, giving easily readable labels to the numeric checkout steps:

![checkout-funnel](../../../../images/google-analytics-checkout-funnel.png)

Then you'll instrument your checkout flow with `Viewed Checkout Step` and `Completed Checkout Step` for each step of the funnel you configured in the Google Analytics admin interface, passing the step number and step-specific options through as a property of those events:

```javascript
//upon arrival at first checkout step ('Review Cart' per the screenshot example above)
analytics.track('Viewed Checkout Step', {
  step: 1,
})

//upon completion of first checkout step ('Review Cart')
analytics.track('Completed Checkout Step', {
  step: 1,
})

//upon arrival at second checkout step ('Collect Payment Info' per the screenshot example above)
analytics.track('Viewed Checkout Step', {
  step: 2,
})

//upon completion of this checkout step ('Collect Payment Info')
analytics.track('Completed Checkout Step', {
  step: 2,
  //if this is the shipping step
  shipping_method: 'FedEx',
  //if this is the payment step
  payment_method: 'Visa',
})

//upon arrival at third checkout step ('Confirm Purchase Details' per the screenshot example above)
analytics.track('Viewed Checkout Step', {
  step: 3,
})

//upon completion of third checkout step ('Confirm Purchase Details')
analytics.track('Completed Checkout Step', {
  step: 3,
  //you will need to provide either an empty shippingMethod or paymentMethod for the event to send.
  shipping_method: '', // or paymentMethod: ''
})

//upon arrival at fourth checkout step ('Receipt' per the screenshot example above)
analytics.track('Viewed Checkout Step', {
  step: 4,
})

//upon completion of fourth checkout step ('Receipt')
analytics.track('Completed Checkout Step', {
  step: 4,
  //you will need to provide either an empty shippingMethod or paymentMethod for the event to send.
  shipping_method: '', // or paymentMethod: ''
})
```

**Note**: `shipping_method` and `payment_method` are semantic properties so if you want to send that information, please do so in this exact spelling!

You can have as many or as few steps in the checkout funnel as you'd like. The 4 steps above merely serve as an example. Note that you'll still need to track the `Order Completed`event per our standard e-commerce tracking API after you've tracked the checkout steps.

### Checkout Started

This query takes advantage of GA's Enhanced E-Commerce. Besides [the mandatory fields](#mandatory-fields), these other parameters will be used:

| GA parameter | value           | Explanation    |
| ------------ | --------------- | -------------- |
| `t`          | "event"         | Hit type       |
| `ea`         | "start_checkout | Event action   |
| `ec`         | "cart"          | Event category |
| `pa`         | "checkout"      | Product action |

- [Product list fields](#product-list-fields) with `<type>` "list" and `<ProductIndex>` between 1 and products length

### Checkout Step Viewed

Before starting down this path, Enhanced E-Commerce needs to be enabled. Furthermore, the checkout steps need to be defined in the admin section of the app.

This query takes advantage of GA's Enhanced E-Commerce. Besides [the mandatory fields](#mandatory-fields), these other parameters will be used:

| GA parameter | value      | Explanation    |
| ------------ | ---------- | -------------- |
| `pa`         | "checkout" | Product action |

- [Checkout fields](#checkout-fields)

### Checkout Step Completed

This query takes advantage of GA's Enhanced E-Commerce. Besides [the mandatory fields](#mandatory-fields), these other parameters will be used:
| GA parameter | value | Explanation |
| ---- | ---- | --- |
| `pa` | "checkout_option" | Product action |

- [Checkout fields](#checkout-fields)

### Payment Info Entered

This query takes advantage of GA's Enhanced E-Commerce. Besides [the mandatory fields](#mandatory-fields), these other parameters will be used:
| GA parameter | value | Explanation |
| ---- | ---- | --- |
| `pa` | "checkout_option" | Product action |

- [Checkout fields](#checkout-fields)

## Ordering events

### Order Updated

This query takes advantage of GA's Enhanced E-Commerce. Besides [the mandatory fields](#mandatory-fields), these other parameters will be used:

| GA parameter | value         | Explanation    |
| ------------ | ------------- | -------------- |
| `t`          | "transaction" | Hit type       |
| `ea`         | "update"      | Event action   |
| `ec`         | "cart"        | Event category |
| `pa`         | "checkout"    | Product action |

- [Transaction fields](#transaction-fields)
- [Product list fields](#product-list-fields) with `<type>` "pr" and `<ProductIndex>` between 1 and products length

### Order Completed

This query takes advantage of GA's Enhanced E-Commerce. Besides [the mandatory fields](#mandatory-fields), these other parameters will be used:

| GA parameter | value             | Explanation    |
| ------------ | ----------------- | -------------- |
| `t`          | "transaction"     | Hit type       |
| `ea`         | "order_completed" | Event action   |
| `ec`         | "cart"            | Event category |
| `pa`         | "purchase"        | Product action |

- [Transaction fields](#transaction-fields)
- [Product list fields](#product-list-fields) with `<type>` "pr" and `<ProductIndex>` between 1 and products length

If you want to send coupon data to your `Order Completed` event when using Enhanced E-commerce, you can simply add the `coupon` property on the order level or the product level or both.

Google Analytics documentation emphasizes on the fact that we should send a `total` field comprise of the final cost to the client, including tax, shipping etc. For better flexibility and total control over tracking, we let you decide how to calculate how coupons and discounts are applied.

```
analytics.track({
  userId: '019mr8mf4r',
  event: 'Order Completed',
  properties: {
    orderId: '50314b8e9bcf000000000000',
    total: 27.5,
    shipping: 3,
    tax: 2,
    discount: 2.5,
    coupon: 'hasbros',
    currency: 'USD',
    repeat: true,
    products: [
      {
        id: '507f1f77bcf86cd799439011',
        sku: '45790-32',
        name: 'Monopoly: 3rd Edition',
        price: 19,
        quantity: 1,
        category: 'Games',
        coupon: '15%OFF'
      },
      {
        id: '505bd76785ebb509fc183733',
        sku: '46493-32',
        name: 'Uno Card Game',
        price: 3,
        quantity: 2,
        category: 'Games',
        coupon: '20%OFF'
      }
    ]
  }
});

```

### Order Refunded

This query takes advantage of GA's Enhanced E-Commerce. Besides [the mandatory fields](#mandatory-fields), these other parameters will be used:

| GA parameter | value         | Explanation    |
| ------------ | ------------- | -------------- |
| `t`          | "transaction" | Hit type       |
| `ea`         | "refund"      | Event action   |
| `ec`         | "cart"        | Event category |
| `pa`         | "refund"      | Product action |

- [Transaction fields](#transaction-fields) for `negative` transasctions

* [Product list fields](#product-list-fields) with `<type>` "pr" and `<ProductIndex>` between 1 and products length

For full refunds, fire this event whenever an order/transaction gets refunded:

```
analytics.track('Order Refunded', {
    order_id: '50314b8e9bcf000000000000',
  });
```

For partial refunds, you must include the productId and quantity for the items you want refunded:

```
analytics.track('Order Refunded', {
    order_id: '50314b8e9bcf000000000000',
    products: [
      {
      product_id: '123abc',
      quantity: 200
      }
    ]
  });
```

## Social events

### Product Shared

This query takes advantage of GA's Enhanced E-Commerce. Besides [the mandatory fields](#mandatory-fields), these other parameters will be used:

| GA parameter | value    | Explanation    |
| ------------ | -------- | -------------- |
| `t`          | "social" | Hit type       |
| `sa`         | "share"  | Product action |

- [Social details fields](#social-details-fields)

### Cart Shared

This query takes advantage of GA's Enhanced E-Commerce. Besides [the mandatory fields](#mandatory-fields), these other parameters will be used:

| GA parameter | value    | Explanation    |
| ------------ | -------- | -------------- |
| `t`          | "social" | Hit type       |
| `sa`         | "share"  | Product action |

- [Social details fields](#social-details-fields)

### Product Reviewed

This query takes advantage of GA's Enhanced E-Commerce but there is no native support for this type of action. It is recommended that this action be marked as a **social** hit. Besides [the mandatory fields](#mandatory-fields), these other parameters will be used:

| GA parameter | value    | Explanation    |
| ------------ | -------- | -------------- |
| `t`          | "social" | Hit type       |
| `sa`         | "share"  | Product action |

- [Review fields](#social-details-fields) with `sn` hardcoded

### Fields mapping

### 1. Mandatory fields

| Ga field | Mapping                                                                                   | Explanation                              |
| -------- | ----------------------------------------------------------------------------------------- | ---------------------------------------- |
| `v`      | "1"                                                                                       | protocol version, currently at version 1 |
| `tid`    | `trackingId` from your `integrations.yaml`                                                | universal google analytics tracking ID   |
| `t`      | `pageview`, `event`, `social`, `transaction`, `item`, `exception`, `appview` or `timing`. | hit type                                 |
| `cu`     | `currency` property from `track()` calls. Default `USD`                                   | currency                                 |
| `uip`    | `context.ip` property from your `track()` calls                                           | user's ip                                |
| `ua`     | `context.userAgent` property from your `track()` calls                                    | user agent                               |

### 2. Promotion fields

| GA field   | Analytics.js property from `properties` obj | Explanation        |
| ---------- | ------------------------------------------- | ------------------ |
| `promo1id` | `promotion_id`                              | promotion id       |
| `promo1cr` | `creatives`                                 | promotion creative |
| `promo1nm` | `name`                                      | promotion name     |
| `promo1ps` | `position`                                  | promotion position |

### 3. Checkout fields

| GA field | Analytics.js property from `properties` obj | Explanation   |
| -------- | ------------------------------------------- | ------------- |
| `cos`    | `step`                                      | checkout step |
| `col`    | `checkout_id`                               | checkout id   |

### 4. Transaction fields

| GA field | Analytics.js property from `properties` obj |
| -------- | ------------------------------------------- |
| `ti`     | `order_id`                                  | transaction id |
| `ta`     | `affiliation`                               | transaction affiliation |
| `tr`     | `revenue`                                   | transaction revenue - although we have a revenue field in Analytics.js as well that field does not include shipping and applied coupons, taxes, promotions etc. GA documentation emphasizes on the fact that this field should comprise of the final cost to the client, including tax, shipping etc. |
| `ts`     | `shipping`                                  | transaction shipping cost |
| `tt`     | `tax`                                       | transaction tax |
| `tcc`    | `coupon`                                    | transaction coupon code |

For `negative` transactions, we map negative values of `revenue`, `shipping`, `tax` and `coupon`

### 5. Social details fields

| GA field | Analytics.js property from `properties` obj                    | Observation                                                                             |
| -------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `sn`     | `share_via`                                                    | share network - hardcoded as `product-review` for [Product Reviewed](#product-reviewed) |
| `st`     | `cart-<cart_id>:<product_id1>:<product_id2>:...:<product_idn>` |

For `Review events` we hardcode `sn` as `product-review`

### 6. Search fields

| GA field | Analytics.js property from `properties` obj | Observation                                                                      |
| -------- | ------------------------------------------- | -------------------------------------------------------------------------------- |
| `dl`     | `<baseURL><searchParam>=<query>`            | use `searchParam` and `baseUrl` from `integrations.yaml` to set the query string |

### 7. Product list fields

| GA field                  | Analytics.js property from `properties` obj | Observation      |
| ------------------------- | ------------------------------------------- | ---------------- |
| `<type><ProductIndex>id`  | `sku` \|\| `product_id`                     | product ID       |
| `<type><ProductIndex>nm`  | `name`                                      | product name     |
| `<type><ProductIndex>ca`  | `category`                                  | product category |
| `<type><ProductIndex>pr`  | `price`                                     | product price    |
| `<type><ProductIndex>br`  | `brand`                                     | product brand    |
| `<type><ProductIndex>va`  | `variant`                                   | product variant  |
| `<type><ProductIndex>ps`  | `position`                                  | product position |
| `<type><ProductIndex>qty` | `quantity`                                  | product quantity |
| `<type><ProductIndex>cc`  | `coupon`                                    | product coupon   |

Where `<type>` is either `"pr"` - for simple products, or `il1pi` - "il" prefix stands for `Impression List`.

**Note:** `<ProductIndex>` stands for a product index number. It's an integer from 1 to 200 (limited to 200) and is not an array index. `il1pi1id`, `il1pi2id`, `il1pi3id`...`il1pi200id` are separate parameters that are sent individually.

**Note 2:** besides the hard limit of 200 products do not forget about the 8kb/request hard limit that the GA collect API has.

# Complete GA configurations

---

Here's a full example of the configuration file for Google Analytics with the following functionalities:

- sending page calls
- mapping standard events according to GA's specifications
- allows any triggered event that is not mapped to be sent over to GA with the exact `properties` structure with what the track event is being triggered; mandatory properties are appended

```json
{
  "api": {
    "endpoint": "https://www.google-analytics.com/collect",
    "method": "post",
    "keepAliveAgent": true,
    "includePayloadInURL": true
  },
  "cookies": "integrations.googleAnalytics",
  "events": {
    "general": [
      { "input": "1", "output": "v" },
      { "input": "UA-XXXXXXXXX-Y", "output": "tid" },
      {
        "input": "properties.currency",
        "transformations": [{ "type": "assign", "defaultValue": "USD" }, { "type": "toUpperCase" }],
        "output": "cu"
      },
      { "input": "context.page.url", "transformations": [{ "type": "assign" }], "output": "dl" },
      { "input": "context.page.title", "transformations": [{ "type": "assign" }], "output": "dt" },
      { "input": "context.page.referrer", "transformations": [{ "type": "assign" }], "output": "dr" },
      { "input": "context.userAgent", "transformations": [{ "type": "assign" }], "output": "ua" },
      { "input": "context.ip", "transformations": [{ "type": "assign" }], "output": "uip" },
      { "input": "userId", "transformations": [{ "type": "assign" }], "output": "uid" }
    ],
    "page": [{ "input": "pageview", "output": "t" }],
    "track": [
      {
        "event": "Products Searched",
        "parameters": [
          { "input": "event", "output": "t" },
          { "input": "engagement", "output": "ec" },
          { "input": "search", "output": "ea" },
          { "input": "properties.query", "transformations": [{ "type": "assign" }], "output": "el" }
        ]
      },
      {
        "event": "Product List Viewed",
        "parameters": [
          { "input": "event", "output": "t" },
          { "input": "list", "output": "ec" },
          { "input": "view", "output": "ea" },
          { "input": "Product List Viewed", "output": "el" },
          { "input": "detail", "output": "pa" },
          { "input": "properties.list_id", "transformations": [{ "type": "assign" }], "output": "il1nm" },
          {
            "transformations": [
              {
                "type": "toObject",
                "fields": [
                  {
                    "input": "properties.products",
                    "transformations": [
                      {
                        "type": "toArrayOfObjects",
                        "unfold": "il1pi_INDEX__KEY_",
                        "fields": [
                          { "input": "sku", "transformations": [{ "type": "assign" }], "output": "id" },
                          { "input": "name", "transformations": [{ "type": "assign" }], "output": "nm" },
                          { "input": "brand", "transformations": [{ "type": "assign" }], "output": "br" },
                          { "input": "category", "transformations": [{ "type": "assign" }], "output": "ca" },
                          { "input": "variant", "transformations": [{ "type": "assign" }], "output": "va" },
                          { "input": "position", "transformations": [{ "type": "toInt" }], "output": "ps" },
                          { "input": "price", "transformations": [{ "type": "toFloat" }], "output": "pr" },
                          { "input": "quantity", "transformations": [{ "type": "toInt" }], "output": "qt" }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "event": "Product Viewed",
        "parameters": [
          { "input": "event", "output": "t" },
          { "input": "ordering", "output": "ec" },
          { "input": "view", "output": "ea" },
          { "input": "Product Viewed", "output": "el" },
          { "input": "detail", "output": "pa" },
          {
            "transformations": [
              {
                "type": "toObject",
                "fields": [
                  {
                    "input": "properties",
                    "transformations": [
                      {
                        "type": "toArrayOfObjects",
                        "unfold": "pr_INDEX__KEY_",
                        "fields": [
                          { "input": "sku", "transformations": [{ "type": "assign" }], "output": "id" },
                          { "input": "name", "transformations": [{ "type": "assign" }], "output": "nm" },
                          { "input": "brand", "transformations": [{ "type": "assign" }], "output": "br" },
                          { "input": "category", "transformations": [{ "type": "assign" }], "output": "ca" },
                          { "input": "variant", "transformations": [{ "type": "assign" }], "output": "va" },
                          { "input": "position", "transformations": [{ "type": "toInt" }], "output": "ps" },
                          { "input": "price", "transformations": [{ "type": "toFloat" }], "output": "pr" },
                          { "input": "quantity", "transformations": [{ "type": "toInt" }], "output": "qt" }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "event": "Product Added",
        "parameters": [
          { "input": "event", "output": "t" },
          { "input": "ordering", "output": "ec" },
          { "input": "view", "output": "ea" },
          { "input": "Product Added", "output": "el" },
          { "input": "add", "output": "pa" },
          {
            "transformations": [
              {
                "type": "toObject",
                "fields": [
                  {
                    "input": "properties",
                    "transformations": [
                      {
                        "type": "toArrayOfObjects",
                        "unfold": "pr_INDEX__KEY_",
                        "fields": [
                          { "input": "sku", "transformations": [{ "type": "assign" }], "output": "id" },
                          { "input": "name", "transformations": [{ "type": "assign" }], "output": "nm" },
                          { "input": "brand", "transformations": [{ "type": "assign" }], "output": "br" },
                          { "input": "category", "transformations": [{ "type": "assign" }], "output": "ca" },
                          { "input": "variant", "transformations": [{ "type": "assign" }], "output": "va" },
                          { "input": "position", "transformations": [{ "type": "toInt" }], "output": "ps" },
                          { "input": "price", "transformations": [{ "type": "toFloat" }], "output": "pr" },
                          { "input": "quantity", "transformations": [{ "type": "toInt" }], "output": "qt" }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "event": "Cart Viewed",
        "parameters": [
          { "input": "event", "output": "t" },
          { "input": "cart", "output": "ec" },
          { "input": "view", "output": "ea" },
          { "input": "Cart Viewed", "output": "el" },
          { "input": "checkout", "output": "pa" },
          {
            "transformations": [
              {
                "type": "toObject",
                "fields": [
                  {
                    "input": "properties.products",
                    "transformations": [
                      {
                        "type": "toArrayOfObjects",
                        "unfold": "il1pi_INDEX__KEY_",
                        "fields": [
                          { "input": "sku", "transformations": [{ "type": "assign" }], "output": "id" },
                          { "input": "name", "transformations": [{ "type": "assign" }], "output": "nm" },
                          { "input": "brand", "transformations": [{ "type": "assign" }], "output": "br" },
                          { "input": "category", "transformations": [{ "type": "assign" }], "output": "ca" },
                          { "input": "variant", "transformations": [{ "type": "assign" }], "output": "va" },
                          { "input": "position", "transformations": [{ "type": "toInt" }], "output": "ps" },
                          { "input": "price", "transformations": [{ "type": "toFloat" }], "output": "pr" },
                          { "input": "quantity", "transformations": [{ "type": "toInt" }], "output": "qt" }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "event": "Order Completed",
        "parameters": [
          { "input": "transaction", "output": "t" },
          { "input": "cart", "output": "ec" },
          { "input": "order_completed", "output": "ea" },
          { "input": "Order Completed", "output": "el" },
          { "input": "purchase", "output": "pa" },
          { "input": "properties.order_id", "transformations": [{ "type": "assign" }], "output": "ti" },
          {
            "transformations": [{ "type": "toRevenue", "priorities": ["properties.revenue", "properties.total"] }],
            "output": "tr"
          },
          { "input": "properties.total", "transformations": [{ "type": "toFloat" }], "output": "tt" },
          {
            "transformations": [
              {
                "type": "toObject",
                "fields": [
                  {
                    "input": "properties.products",
                    "transformations": [
                      {
                        "type": "toArrayOfObjects",
                        "unfold": "pr_INDEX__KEY_",
                        "fields": [
                          { "input": "sku", "transformations": [{ "type": "assign" }], "output": "id" },
                          { "input": "name", "transformations": [{ "type": "assign" }], "output": "nm" },
                          { "input": "brand", "transformations": [{ "type": "assign" }], "output": "br" },
                          { "input": "category", "transformations": [{ "type": "assign" }], "output": "ca" },
                          { "input": "variant", "transformations": [{ "type": "assign" }], "output": "va" },
                          { "input": "position", "transformations": [{ "type": "toInt" }], "output": "ps" },
                          { "input": "price", "transformations": [{ "type": "toFloat" }], "output": "pr" },
                          { "input": "quantity", "transformations": [{ "type": "toInt" }], "output": "qt" }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "customTrack": {
      "allowAnyProperty": true,
      "mappedProperties": [
        { "input": "event", "output": "t" },
        {
          "input": "properties.category",
          "transformations": [{ "type": "assign", "defaultValue": "custom" }],
          "output": "ec"
        },
        {
          "input": "properties.action",
          "transformations": [{ "type": "assign", "defaultValue": "custom" }],
          "output": "ea"
        },
        { "input": "event", "transformations": [{ "type": "assign", "defaultValue": "Custom Event" }], "output": "el" }
      ]
    }
  }
}
```
