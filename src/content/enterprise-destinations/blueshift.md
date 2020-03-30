---
collectionKey: enterprise-destinations

navText: 'Blueshift'

path: '/enterprise-destinations/blueshift/'
---

# What is Blueshift and how does it work?

Blueshift brings AI in the Hands of Every Marketer.
It is modern AI-First platform for Cross-Channel Marketing. AI is the key to unlocking the power of fast-changing data, and delivering 1:1 personalization.

# Why send data to Blueshift using MetaRouter?

The base code for each customer is unique and must be obtained from the Blueshift UI. If you want to track custom events, you'll need to familiarize yourself with the Blueshift API to both locate the correct base and event tracking code as well as install it correctly into your own site. It typically needs to be added by a webmaster or developer to prevent errors.

Using MetaRouter, you can send page views and event data directly to Blueshift without needing to manually install any extra JavaScript on your website. Just enable the Blueshift destination in your MetaRouter UI, and we'll automatically take care of mapping a standard set of events to standard Blueshift events. MetaRouter also allows you to define and map your own events to supported Blueshift events without any custom code. All of this data is immediately available for analysis in your Blueshift dashboard.

Integrating Blueshift with MetaRouter cuts out any need for additional implementation resources, saving your development team valuable time.

# Getting Started with Blueshift and MetaRouter

## Blueshift Side

To get started sending events to Blueshift, first contact [Blueshift](https://blueshift.com/contact-us/) to create your account.

Next you'll need to go to your [Account Page](https://app.getblueshift.com/dashboard#/app/account/api)
And get your Event API Key.

The easiest way to setup and test the events stream is to observe events coming to [clickstream events dashboard](https://app.getblueshift.com/dashboard#/app/click_stream/index).

## MetaRouter Side

You can configure the Blueshift account and the event field mappings for our Blueshift Destination, below is the full payload you will need to send to the Platform via Canary. Keep in mind that you will also need to add the configurations of your other destinations as the Platform will overwrite any new instructions over the old one.

### Config

#### `eventApiKey` _(Required)_

The Blueshift Event API Key from your Account Page

#### `mappedEventNames`

Replaces the key of your event name into the value specified before sending to Blueshift. For example, by default, when calling `analytics.track('Order Completed')` we'll send an event with the `purchase` action to Blueshift.

#### `userAttributesMap`

Replaces the key of an event payload's property object into the value specified before sending to Blueshift, specifically for properties that define user values

#### `eventAttributesMap`

Replaces the key of an event payload's property object into the value specified before sending to Blueshift, specifically for properties that define event values

#### `fallbackToDefault`

Allows you to control the default fall-back behaviour.
Possible fields to control:

- "customer_id": [boolean],
- "username": [boolean],
- "currency": [boolean],
- "phones": [boolean],
- "websites": [boolean],

If following properties are enabled in `config.fallbackToDefault` , next behavior should be expected:

- `customer_id` falls back to ⇒ `user_id` ⇒ `anonymous_id` ⇒ `session_id`
- `username` falls back to `traits.username` ⇒ `properties.username`⇒ `userId` ⇒`anonymousId`
- `session_id` falls back to `anonymous_id`
- `currency` falls back to `'USD'`
- `phones` falls back to single `phone`
- `websites` falls back to `website`

Except the `session_id`. It is disabled totally in request payload/config, since it is the same as `anonymous_id` . If you want to send `session_id` , simply place it to `properties`.

Also anything can be overwritten if placed directly inside `properties` object.

## Examples:

Given the following config:

```json
"config": {
  "fallbackToDefault": {
    "customer_id": true,
  }
}
```

Calling event with `customer_id`

```javascript
analytics.track(‘event’, {
  ...
  anonymousId: 'Anonumous ID value',
  properties: {
    customerId: 'My Customer Id',
  }
  ...
})
```

will result in payload that contains:

```JSON
{
  ...
  "anonymous_id": "Anonymous ID value",
  "customer_id": "My Customer Id"
  ...
}
```

Calling event without `customer_id`

```javascript
analytics.track(‘event’, {
  ...
  anonymousId: 'Anonymous ID value',
  ...
})
```

will result the payload that contains:

```json
{
  ...
  "anonymous_id": "Anonymous ID value",
  "customer_id": "Anonymous ID value"
  ...
}
```

Given the following config:

```json
"config": {
  "fallbackToDefault": {
    "customer_id": false, // or if it's missing
  }
}
```

Calling event with `customer_id`

```javascript
analytics.track(‘event’, {
  ...
  anonymousId: 'Anonymous ID value',
  properties: {
    customerId: 'My Customer Id',
  }
  ...
})
```

will result in payload that contains `customer_id` and it's value from `properties`:

```json
{
  ...
  "anonymous_id": "Anonymous ID value",
  "customer_id": "My Customer Id"
  ...
}
```

Calling event without `customer_id`

```javascript
analytics.track(‘event’, {
  ...
  anonymousId: 'Anonymous ID value',
  ...
})
```

will result in payload that is missing the `customer_id`:

```json
{
  ...
  "anonymous_id": "Anonymous ID value",
  ...
}
```

Below is a full example of the configuration to send into the Platform, with all of the defaults specified. Ensure to customize to match the data that you send as part of your analyitcs event.

```json
{
  "writeKey": {
    "blueshift": {
      "config": {
        "eventApiKey": "<my Blueshift Event API Key - required>",
        "fallbackToDefault": {
          "customer_id": true,
          "username": true,
          "currency": true,
          "phones": true,
          "websites": true
        },
        "mappedEventNames": {
          "Product Viewed": "view",
          "Products Searched": "search",
          "Product Added": "add_to_cart",
          "Product Removed": "remove_from_cart",
          "Checkout Started": "checkout",
          "Order Completed": "purchase"
        },
        "userAttributesMap": {
          "firstName": "firstname",
          "lastName": "lastname",
          "email": "email",
          "created": "joined_at",
          "companyCreated": "company_created",
          "companyName": "company_name",
          "name": "name",
          "uid": "uid",
          "description": "description",
          "age": "age",
          "avatar": "avatar",
          "position": "position",
          "username": "username",
          "website": "website",
          "websites": "websites",
          "phone": "phone",
          "phones": "phones",
          "address": "address",
          "gender": "gender",
          "birthday": "birthday"
        },
        "eventAttributesMap": {
          "revenue": "revenue",
          "value": "value",
          "category": "category",
          "id": "id",
          "productId": "product_id",
          "promotionId": "promotion_id",
          "cartId": "cart_id",
          "checkoutId": "checkout_id",
          "paymentId": "payment_id",
          "couponId": "coupon_id",
          "wishlistId": "wishlist_id",
          "reviewId": "review_id",
          "orderId": "order_id",
          "sku": "sku",
          "tax": "tax",
          "name": "name",
          "price": "price",
          "repeat": "repeat",
          "coupon": "coupon",
          "shipping": "shipping",
          "discount": "discount",
          "shippingMethod": "shipping_method",
          "paymentMethod": "payment_method",
          "description": "description",
          "plan": "plan",
          "subtotal": "subtotal",
          "products": "products",
          "quantity": "quantity",
          "currency": "currency",
          "query": "query",
          "username": "username",
          "email": "email"
        }
      }
    }
  }
}
```

### Page

We'll send all of your `analytics.page()` events to the standard Blueshift `pageload` event.

### Identify

We'll send all of your `analytics.identify()` events to the standard Blueshift `identify` event..

### Track

Please check the [Blueshift Events API](https://help.blueshift.com/hc/en-us/articles/115002714773-Event-API) to see available Blueshift's Standard events.

We've followed Blueshift's naming conventions, so if you fire event named `Order Refunded` that is not a part of Blueshift [standard event list](https://help.blueshift.com/hc/en-us/articles/115002714773-Event-API), you'll be able to see it under `order_refunded` name on your Blueshift clickstream events [dashboard](https://app.getblueshift.com/dashboard#/app/click_stream/index).

The same naming convention is applied to any custom named event. For example: `My Custom Event` will be sent as `my_custom_event`.

You also have the option to provide your custom event names mapping as described earlier. In this case we do not correct event names using Blueshift naming system.
