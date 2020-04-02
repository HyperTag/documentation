---
collectionKey: cloud-destinations

navText: Sailthru

path: '/cloud-destinations/sailthru/'

tags: [cloud, destinations]
---

# Sailthru

MetaRouter makes it easy to send your data to Sailthru. Once you follow the steps below, your data will be routed through our platform and pushed to Sailthru in the appropriate format.

## What is Sailthru and how does it work?

[Sailthru](https://www.sailthru.com/) is the complete, unified and integrated marketing solution which allows purchases tracking, content personalization and email managing. You can visit their docs [here](https://getstarted.sailthru.com/).

## Why send data to Sailthru using MetaRouter?

With MetaRouter, you can use Sailthru without having to install their JavaScript library on every page of your site. We also eliminate the need to write custom code to track user event data. Once your Sailthru is routed through MetaRouter, our platform translates page views and events into corresponding Sailthru events.

## Getting Started with Sailthru and MetaRouter

### Initialization

The Sailthru server-side destination will allow you to add users, send custom events and purchase events. Once you have configured a source and our MetaRouter [snippet](/sources/analytics-js/) is installed, enable and configure Sailthru as a destination and add your API Key and Shared Secret, which you can find in the Sailthru Dashboard under **App Settings > Setup > API & Postbacks**.

### Implementation checklist

**Important**: In order for this destination to work, you must have a few prerequisite configurations.

- You must have `extid` lookup enabled in Sailthru, which usually needs to be requested from Sailthru. This is critical to enabling full functionality.
- Use the [**Ecommerce**](/sources/analytics-js-ecommerce-spec/) event spec to track `Order Completed`,`Order Updated`, `Product Added`, and `Product Removed`.
- For `Product Added` and `Product Removed` events, whether there is an `email` or not, we need to make a request to grab the items in the user’s cart. We rely on the `userId` value for this request. It is essential that you have a `userId` on these calls, otherwise they will not make it to Sailthru.
  - To trigger abandoned cart campaigns, you must pass in a `reminder_time` and `reminder_template` on the `Product Added` and `Product Removed` events.
  - The template passed through as `reminder_template` must match the public name configured in Sailthru’s UI.
- We recommend appending `traits.email` whenever possible in your `identify` calls. If you send an identify call without a `traits.email` and only a `userId`, the profile will be created in Sailthru but you would not be able to find that user via their **User Look Up feature** or to send `Product Added`, `Product Removed` `Order Updated` and `Order Completed` events.

### Page

You must configure a `clientId` in your integration settings in order to utilize the page functionality. This value is only required for page calls and can be found in your **Sailthru Dashboard** under **App Settings** - **customerId**.

When you call page, we will hit the Sailthru page endpoint and you will see the calls populate in the **Sailthru Realtime Dashboard**.

The `context.page.url` is also a required field for all page calls, so be sure this is present on each call. The url _must_ be a domain name, otherwise the request will fail.

We will automatically handle the proper identification of user’s in Sailthru via the Analytics.js `userId`.

Sailthru provides an out of band web scraper that will automatically collect contextual information from your pages to power their [**personalization engine**](https://getstarted.sailthru.com/site/personalization-engine/meta-tags/). If the design of your site requires passing these tags to Sailthru manually (Single Page Apps are one example) you can manually pass them via a `tags` property in the page event:

```javascript
analytics.page('Page Name', {
  tags: ['football', 'new york giants', 'eli manning'],
})
```

### Identify

When you `identify` a user, MetaRouter will pass that user’s information to Sailthru with `userId` (or `anonymousId` if `userId` is not passed) as Sailthru’s External User ID (`extid`). MetaRouter sends all traits as `vars` to Sailthru.

MetaRouter will automatically alias users for you so if you `identify` a user who you had previously only identified with an anonymousId, we will merge the profile with `anonymousId` into a new profile with `userId` as long as you pass both `anonymousId` and `userId`.

An identify event will appear in Sailthru’s user lookup feature if there is an `email` present (Sailthru only allows a user lookup up based on an email):

![sailthru-identify-dashboard](/images/sailthru-identify-dashboard.png)

Or within the _Users > Lists_ feature, based on the default list you configured in the Metarouter UI or passed in through the destinations object like so:

```javascript
analytics.identify(
  '38472034892',
  {
    name: 'Hamurai',
    email: 'Hamurai@gmail.com',
    quote: 'Rick, you love those BBQs, Rick',
  },
  {
    Sailthru: {
      defaultListName: 'testingList',
    },
  }
)
```

![sailtrhu-default-list-name](/images/sailtrhu-default-list-name.png)

You can also configure an `optoutValue` value in the MetaRouter UI, or pass in a value through the destinations object with one of the Sailthru expected values:

```javascript
analytics.identify(
  '3242351231',
  {
    name: 'Duck With Muscles',
    email: 'MusclesQuack@gmail.com',
    quote: 'Oh, wow...Baby Wizard was a Parasite?!',
  },
  {
    Sailthru: {
      optoutValue: 'basic',
    },
  }
)
```

So if you send an`identify` call without a `traits.email` and only a `userId`, the profile will be created in Sailthru but you would not be able to find that user via their **User Look Up** feature.

### Track

We map `Product Added`, `Product Removed`, `Order Completed` and `Order Updated` events to the `/purchase` endpoint. All other Analytics.js Ecommerce Events will be sent to the `/event` endpoint, with the same name. . **Important**: You must have each event mapped in Sailthru within **Communications > Lifecycle Optimizer** in order to leverage the custom event. Be sure that the **Status** is set to **Active**:

![sailthru-lifecycle-optimizer-1](/images/sailthru-lifecycle-optimizer-1.png)

Your account must have triggers or lifecycle optimizer enabled. This should be enabled when the account is setup, however, just to be sure you may need to reach out to your account representative to confirm it is enabled.

A custom event will hit the **Sailthru Lifecycle Optimizer** feature. Navigate to **Communications > Lifecycle Optimizer** in your Sailthru dashboard:

![sailthru-lifecycle-optimizer-2](/images/sailthru-lifecycle-optimizer-2.png)

Configure a custom event to a new flow and trigger a follow up action to the event:

![sailthru-lifecycle-optimizer-3](/images/sailthru-lifecycle-optimizer-3.png)

For instance, in the above example notice that the `Registered` event will add the user who trigger the event to a list.

### Purchases

When you `track` an event with the name `Order Completed` or `Order Updated` using the **e-commerce tracking API**, we will send the products you’ve listed to Sailthru’s purchase log:

![sailthru-purchase-1](/images/sailthru-purchase-1.png)

In addition, it will also appear within the user view under purchase history:

![sailthru-purchase-2](/images/sailthru-purchase-2.png)

Note that the main identifier is `email` not `id`

![sailthru-purchase-3](/images/sailthru-purchase-3.png)

Sailthru does not allow the `extid` to be the main lookup identifier for their Purchase API. Instead, Sailthru requires an `email` as the primary identifier. MetaRouter will make a GET request to retrieve the user’s email based on their `userId`, which is their `extid` in Sailthru.

If the user and their email does not exist in Sailthru, the event will throw an error. If the user exists, the purchase will be added to their profile. Be sure to call `identify` with an `email` passed in the `traits` object prior to the `Order Completed`, `Order Updated`, `Product Added` and `Product Removed` events. If you are sending events using one of MetaRouter’s server-side libraries and want to be sure, you can also send the email value in your `track` calls under `properties.email`.

Once `Order Completed` is triggered, MetaRouter will pass in `incomplete: 0`to signify that the order is now complete. MetaRouter will map the following Sailthru **required fields** from the **v2 Order Completed Spec**:

| Sailthru spec | Analytics.js spec        |
| :------------ | :----------------------- |
| `title`       | `products.{}.name`       |
| `qty`         | `products.{}.quantity`   |
| `price`       | `products.{}.price`      |
| `id`          | `products.{}.product_id` |
| `url`         | `products.{}.url`        |

**Note:** the url field is required by Sailthru for each product. If it’s not explicitly attached to the product, MetaRouter will pull this value out from the `context.page.url` for you, or if this value is not present, we'll use `productBaseUrl` value configured in Metarouter UI.

In addition, the following optional parameters will be mapped:

| Sailthru spec     | Analytics.js spec             |
| :---------------- | :---------------------------- |
| `tags`            | `products.{}.tags`            |
| `image_url`       | `products.{}.image_url`       |
| `image_url_thumb` | `products.{}.image_url_thumb` |

`adjustments` is not a standard Analytics.js event, but we'll apply the values from `properties.tax`, `properties.shipping` and `properties.discount`.

Note that purchases cannot be edited once they are posted.

### Purchase confirmation

For `Order Completed` events you can configure an additional `sendTemplate` parameter, which will send a transactional email for purchase confirmation. `sendTemplate` parameter must match the **public name** configured in Sailthru’s UI.

```javascript
analytics.track(
  'Order Completed',
  {
    checkout_id: 'skdjsidjsd23209euhdqj32kdj29j',
    order_id: '50314b8e9bcf000000000000',
    total: 21.49,
    revenue: 18.99,
    shipping: 3,
    tax: 2,
    discount: 2.5,
    coupon: 'MAYDEALS',
    currency: 'USD',
    products: [
      (product_id: '507f1f77bcf86cd799439011'),
      (sku: 'G-32'),
      (category: 'Games'),
      (name: 'Monopoly: 3rd Edition'),
      (brand: 'Hasbro'),
      (variant: '200 pieces'),
      (price: 18.99),
      (quantity: 1),
      (position: 3),
    ],
  },
  {
    integrations: {
      Sailthru: {
        sendTemplate: 'test-send',
      },
    },
  }
)
```

### Abandoned Cart Events

In addition to `Order Completed` events, we support the concept of **Sailthru’s Abandoned Carts** via MetaRouter’s `Product Added`, `Product Removed` and `Order Updated` events. When these events are triggered, MetaRouter will pass in `incomplete: 1` to signify that the order is incomplete.

To leverage the functionality of sending transactional emails when a user abandons his or her cart, you must pass in a `reminderTime` and `reminderTemplate` on these events. The template passed through as `reminderTemplate` must match the **public name** configured in Sailthru’s UI.

If you send in a `Product Added` event without a valid template, Sailthru will return an error. If you send in a `Product Added` event with the `reminderTemplate` param, it will successfully send in and appear in the user view within their **incomplete purchase cart**. Some example values for `reminderTime` are 60 minutes, 24 hrs, 2 weeks. MetaRouter will handle passing in the `+` increment.

```javascript
analytics.track(
  'Product Added',
  {
    cart_id: 'skdjsidjsdkdj29j',
    product_id: '507f1f77bcf86cd799439011',
    sku: 'G-32',
    category: 'Games',
    name: 'Monopoly: 3rd Edition',
    brand: 'Hasbro',
    variant: '200 pieces',
    price: 18.99,
    quantity: 1,
    coupon: 'MAYDEALS',
    position: 3,
  },
  {
    integrations: {
      Sailthru: {
        reminderTemplate: 'abandoned cart',
        reminderTime: '20 minutes',
      },
    },
  }
)
```

**Note:** All `Product Added` and `Product Removed` events going into Sailthru must have a `userId`. Sailthru must understand the state of a user’s cart when updating an item within the cart. To understand this, MetaRouter makes a `get` request with the `userId` value to retrieve a user’s cart.

For `Product Added` events, we check the item added using the `productId` against the items we retrieved from Sailthru within the user’s cart. If the item is present, we increase the quantity by one. If there are no items in the retrieved cart, we simply add the item.

For `Product Removed` events, if the product is present, we then check the `qty`, subtracting the quantity of the one item, and add the remaining quantity back into the purchase payload. If there is only item, we remove it completely and push up the empty cart. If we fetch an empty cart, nothing happens.

### Settings

In addition to the required settings, you will have the option to configure an optout value, a product base url, a default reminder time/template, a send template and a default list name in the destination settings UI.

#### Optout

The default status for the optout value is `none` or you can select `all`, `basic` or `blast`. **Note:** Configuring a setting other than none in your integrations settings will apply to **all users**. If you need to dynamically opt users in or out of emails, pass the setting as a parameter on each event.

`all`: Opts the user out of all emails (campaigns & transactionals). This is the default status when a subscriber marks your email as spam from within an email client.

`basic`: This opt-out setup allows for certain communications (see some acceptable examples in the next bullet) to always send to a user – despite their status.

`blast`: Opts the user out of all campaign emails. The user will still receive all transactional (1:1) emails.

`none`: Optout(none) is a way of revalidating users back from being any type of optout. This would only be used if an end user has previously opted out and would like to opt back in to be a valid user.

You can read more about [**Optout Levels here**](https://getstarted.sailthru.com/audience/managing-users/user-optout-levels/).

#### Product Base Url

The default `productBaseUrl`, which will be used as a fallback for extracting a product url, if there is no `properties.url` for a product or `context.page.url`.

#### Adding users to a list

To configure a default list name, MetaRouter exposes a setting to configure this in the UI. You can also explicitly set your own `defaultListName` through the destination option on `identify`.

#### Reminder Time and Reminder/Send Template

To configure a default reminder time and template, enter the **public name** of your template (configured in Sailthru’s UI) and the time frame you will want the email to send. Some example values are 60 minutes, 24 hours, 2 weeks. MetaRouter will handle passing in the `+` increment. To read more about how Sailthru calculates time, please refer to their [**time documentation**](https://getstarted.sailthru.com/developers/zephyr-functions-library/time/).

## FAQ

### Rate limits

All calls are subject to rate limits.

- For `identify` events, we hit the `/user` endpoint, which allows 300 requests/second.
- All others allow 40 requests/second.
- Limits can be raised on a case-by-case basis in order to support valid business practices. Reach out to your Sailthru account representative for more.

### Nested Traits and Property Handling

Sailthru does not accept nested custom traits or properties, so by default we will flatten any custom nested properties. For example, see the below nested properties and the flattened output:

```json
{
  "input": {
    "type": "track",
    "userId": "14092348",
    "event": "Played Game",
    "timestamp": "2017",
    "properties": {
      "levels": [1, 2, 3],
      "arcade": {
        "blips and chitz": {
          "planet": "Parblesnops"
        },
        "galaxy": {
          "coordinates": "1232.4832"
        },
        "games": ["Roy: A life well lived", "Whack a mole"]
      }
    }
  }
}
```

```json
{
  "output": {
    "id": "14092348",
    "key": "extid",
    "event": "Played Game",
    "vars": {
      "levels0": 1,
      "levels1": 2,
      "levels2": 3,
      "arcadeblips and chitzplanet": "Parblesnops",
      "arcadegalaxycoordinates": "1232.4832",
      "arcadegames0": "Roy: A life well lived",
      "arcadegames1": "Whack a mole"
    },
    "format": "json",
    "api_key": "xxxxxxxxx",
    "shared_secret": "xxxxxxxxxx",
    "sig": "70f7461c89c789688c5a0680dae6f08f"
  }
}
```

### Replays

Note that Sailthru does not support historical replay.

## Settings

MetaRouter lets you change these destination settings via your MetaRouter dashboard without having to touch any code.

### API Key

The API key found in your Sailthru dashboard.

### Customer Id

**Required for page** calls. This value can be found in your Sailthru Dashboard under **App Settings**

### Default List Name

Sailthru best practice dictates every user be added to a list. Configure a default here.

### Default Reminder Template

**Required with Reminder Time**. The **public name** of your template which you first must configure in Sailthru’s UI.

### Default Reminder Time

**Required with Reminder Template**. The time frame you will want the email to send. **YOU MUST ENTER A NUMERICAL TIME AND FIELD MINUTES, HOURS, WEEKS** For example: `60 minutes`, `24 hours`, `2 weeks`. MetaRouter will handle passing in the `+` increment.

### Optout status

Select whether to opt out users from email campaigns. The default status is `none`.

### Shared secret

The Shared Secret found in your Sailthru dashboard

### Product Base Url

Fallback url, used as a fallback to interfere `url` value for products.

### Default Send Template

The **public name** of your template which is sent when for a completed purchase. You first must configure it in Sailthru’s UI.
