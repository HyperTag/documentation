---
collectionKey: enterprise-destinations

navText: 'Criteo'

path: '/enterprise-destinations/criteo/'
---

# Criteo

Criteo drives sales for e-commerce businesses, intelligently converting shoppers with dynamic, personalized ads.

MetaRouter makes it easy to send your data to [Criteo](http://www.criteo.com/) (and lots of other destinations). Once you follow the steps below, your data will be routed through our platform and pushed to Criteo in the format they understand.

## Why send data to Criteo using MetaRouter?

With MetaRouter, you can use Criteo without having to install their JavaScript library on every page of your site. We also eliminate the need to write custom code to track user event data. Once Criteo is routed through MetaRouter, our platform translates page views and events into corresponding Criteo events.

## Getting Started

### Criteo Side

To get started with this integration, you’ll first need to have access to a Criteo account. The information that you'll need forward is your Criteo Account ID and the assigned GUM ID.

### MetaRouter Side

#### Configuration file

This configuration file allows you to set your own configuration based on how you interact with Criteo. Here's a configuration file that includes all the settings that you can apply - `gumId` and `partnerId` are the only mandatory fields, everything else is optional.

```yaml
- name: 'criteo'
  config:
    gumId: 'GUM_ID'
    partnerId: 'ACCOUNT_ID'
    isDeduplicationOn: true
    defaultSiteType: 'd'
    standardEvents:
      - event: 'Order Updated'
        to: 'viewListing'
        params:
          - name: 'product'
            type: 'pids'
    additionalEvents:
      - event: 'setHashedEmail'
        params:
          - name: 'email'
      - event: 'setZipCode'
        params:
          - name: 'zipcode'
      - event: 'setStore'
        params:
          - name: 'store_id'
    eventGrouping:
      - - 'viewHome'
        - 'setHashedEmail'
        - 'setZipCode'
        - 'setStore'
      - - 'viewProduct'
        - 'setHashedEmail'
        - 'setZipCode'
        - 'setStore'
      - - 'viewListing'
        - 'setHashedEmail'
        - 'setZipCode'
        - 'setStore'
      - - 'viewBasket'
        - 'setHashedEmail'
        - 'setZipCode'
        - 'setStore'
      - - 'trackTransaction'
        - 'setHashedEmail'
        - 'setZipCode'
      - - 'viewStore'
        - 'setHashedEmail'
```

- `gumId` - String, **required**
  - you'll find GUM ID value on your Criteo account
- `partnerId` - String, **required**
  - is your Account (Partner) ID from your Criteo account
- `isDeduplicationOn` - Bool, **optional**
  - will allow you to set the Criteo's `deduplication` parameter for your calls
  - _default value: `0`_
- `defaultSiteType` - String, , **optional**, one of these values:
  - `m` - for mobile
  - `t` - for tablet
  - `d` - for desktop
  - _default value: `d`_
- `standardEvents` - Array of Objects, **optional**

  - by default, MetaRouter will map some of the E-commerce events to standard Criteo events. (See #track-calls to see )
  - this config option allows you to map your own event to a specific Criteo standard event
  - each Object in the Array (one Object in Array equals one mapping) should have the following structure:

    - `event` - String - your event name
    - `to` - String - Criteo standard event name
    - `params` - Object with the following structure:
      - `name` - String - the param name that will be sent to Criteo
      - `type` - String - the param type of values that you want to send to Criteo. These are the accepted values for `type`:
        - `ps`
          - will send an Array of Strings representing products IDs
          - the value will be retrieved from `properties.product` or `properties.products`
          - if the value type is Array, it will be sent as is
          - if the value type is String, it will be processed into an Array by splinting the String value by `,`
        - `pid` - will send a String representing the product ID
        - `pids` - will send an Array of Strings representing products IDs
        - `products-short` - will send an Array of Objects where each object has the following structure:
          - `id` - String - product id
          - `price` - int / float - product price
          - `quantity` - int - product quantity
        - `products-full` - will send an Array of Objects where each object will have the same structure that you are passing from your own event
        - `tid` - will send a String representing transaction / order ID
        - if **no `type` provided**, we'll search for `property.[name]` and we'll use this value for this param

  ## Examples

  Let's assume you will add the following `standardEvents` value:

  ```yaml
  standardEvents:
    - event: 'Order Updated'
      to: 'viewListing'
      params:
        - name: 'product'
          type: 'pids'
    - event: 'Modal Opened'
      to: 'viewProduct'
      params:
        - name: 'modal'
  ```

  Here's how the events will be mapped:

  **Triggered Analytics.js event**

  ```javascript
  analytics.track('Order Updated', {
    order_id: '50314b8e9bcf000000000000',
    revenue: 25.0,
    currency: 'USD',
    products: [
      {
        product_id: '507f1f77bcf86cd799439011',
        sku: '45790-32',
        name: 'Monopoly: 3rd Edition',
        price: 19,
        quantity: 1,
        category: 'Games',
      },
      {
        product_id: '505bd76785ebb509fc183733',
        sku: '46493-32',
        name: 'Uno Card Game',
        price: 3,
        quantity: 2,
        category: 'Games',
      },
    ],
  })
  ```

  **Mapped Criteo event**

  ```json
  {
    "event": "viewListing",
    "product": ["507f1f77bcf86cd799439011", "505bd76785ebb509fc183733"]
  }
  ```

  **Triggered Analytics.js event**

  ```javascript
  analytics.track('Modal Opened', {
    modal: '6cd799439011507f1f77bcf8',
    price: 25.0,
    currency: 'USD',
  })
  ```

  **Mapped Criteo event**

  ```json
  {
    "event": "viewProduct",
    "modal": "6cd799439011507f1f77bcf8"
  }
  ```

* `additionalEvents` - Array of Objects, **optional**

  - follows the same structure as `standardEvents` but this will allows you to define events that will be used as additional events fired in groups, attached to specific standard events
  - to populate params with specific values for additional events, you need to pass the values with your track call by adding the key directly on the `properties` object sent with the event (see Example below)
  - Example:
    Let's assume you will add the following `additionalEvents` value:

    ```yaml
    additionalEvents:
      - event: 'setZipcode'
        params:
          - name: 'zipcode'
    ```

    Your track call should look like this:

    ```javascript
    analytics.track('Product Viewed', {
      product_id: '507f1f77bcf86cd799439011',
      name: 'Monopoly: 3rd Edition',
      price: 18.99,
      quantity: 1,
      zipcode: 'XXXXXX',
    })
    ```

    The additional event mapped that will be sent to Criteo will look like this:

    ```json
    {
      "event": "setZipcode",
      "zipcode": "XXXXXX"
    }
    ```

- `eventGrouping` - Array of Arrays, **optional**

  - Criteo allows you to send multiple events grouped into a single API call. This option allows you to define groups of events
  - Example:
    Let's assume you will add the following `additionalEvents` and `eventGrouping` value:

    ```yaml
    additionalEvents:
      - event: "setHashedEmail"
        params:
          - name: "email"
      - event: "setZipCode"
        params:
          - name: "zipcode"
      - event: "setStore"
        params:
          - name: "store_id"
    eventGrouping:
      -
        - "viewProduct"
        - "setHashedEmail"
        - "setZipCode"
        - "setS
    ```

    This means that when `Product Viewed` event is triggered like this:

    ```javascript
    analytics.track('Product Viewed', {
      {
        product_id: '507f1f77bcf86cd799439011',
        name: 'Monopoly: 3rd Edition',
        price: 18.99,
        quantity: 1,
      }, {
      integrations: {
        Criteo: {
          email: "EDD9738967D46927C73AD068CAD486AD",
          zipcode: "XXXXXX",
          store_id: "1234"
        }
      }
    })
    ```

    We'll send the following to Criteo's API:

    ```json
    {
      "events": [
        { "event": "viewProduct", "product": "507f1f77bcf86cd799439011" },
        { "event": "setHashedEmail", "email": "EDD9738967D46927C73AD068CAD486AD" },
        { "event": "setZipCode", "zipcode": "XXXXXX" },
        { "event": "setStore", "store_id": "1234" }
      ]
    }
    ```

#### Identify calls

Criteo identification is based on the client side API call to http://gum.criteo.com/sync endpoint - passing it the GUM ID will return a specific user id - this user id is used on every call made, making the identify calls unnecessary - we're taking care of adding the user id to every call.

#### Page calls

Criteo does not provide an API for tracking page views, but it does allow the usage of `viewHome` event that should be called on the homepage of an website. To not alter other integrations, the Criteo integration will only react to page calls similar to this one:

```javascript
analytics.page('Page Name', { viewHome: true })
```

If `properties.viewHome` is not present or is set to `false`, the page call is **dropped**.

#### Track calls

- Standard events - this is the list of standard events available from Criteo:

  - `viewHome`
  - `viewProduct`
  - `viewListing`
  - `viewBasket`
  - `trackTransaction`
  - `viewStore`

  For each of these events, Criteo is suggesting a grouping of events as follows:

  - `viewHome` additional events: `setHashedEmail`, `setZipcode`,`setStore`;
  - `viewProduct` additional events: `setHashedEmail`, `setZipcode`,`setStore`;
  - `viewListing` additional events: `setHashedEmail`, `setZipcode`,`setStore`;
  - `viewBasket` additional events: `setHashedEmail`, `setZipcode`,`setStore`;
  - `trackTransaction` additional events: `setHashedEmail`, `setZipcode`,`setStore`;
  - `viewStore` additional events: `setHashedEmail`.

  This means that, for example, if a `viewProduct` event is triggered, the actual events that will be sent are: `viewProduct`, `setHashedEmail`, `setZipcode` and `setStore`.

  By default, we map some of the Analytics.js Standard E-commerce events to Criteo Standard events, as follows:

    <table>
        <thead>
            <tr>
                <th><b>Analytics.js</b></th>
                <th><b>Criteo Standard Event</b></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Products Searched</td>
                <td>viewListing</td>
            </tr>
            <tr>
                <td>Product List Viewed</td>
                <td>viewListing</td>
            </tr>
            <tr>
                <td>Product List Filtered</td>
                <td>viewListing</td>
            </tr>
            <tr>
                <td>Product Viewed</td>
                <td>viewProduct</td>
            </tr>
            <tr>
                <td>Cart Viewed</td>
                <td>viewBasket</td>
            </tr>
            <tr>
                <td>Order Completed</td>
                <td>trackTransaction</td>
            </tr>
        </tbody>
    </table>

* Custom events - For any custom event call, Criteo's API is responding with a `200 ok` status, but **any custom event is dropped by Criteo**. To avoid triggering a call that is eventually dropped by Criteo, we're **dropping** any custom event.

#### Setting Emails

It’s easy to associate emails with a user, if there’s an `email` property in the track call, we’ll include the `setHashedEmail` event to Criteo along with your event. The email value needs to be MD5-hash of the lowercase email (i.e. MD5(user@domain.com) ). To pass the `email` property your `track` call should be trigger like this:

```javascript
analytics.track('Event Name', {
  ...
  email: "HASHED_EMAIL"
})
```

#### Setting zip codes

It’s easy to set a zip code to all track calls - if there’s a `zipcode` property in the `track` call, we’ll include the `setZipcode` event to Criteo along with your event. To pass the `zipcode` property your `track` call should be trigger like this:

```javascript
analytics.track('Event Name', {
  ...
  zipcode: "ZIPCODE_VALUE"
})
```

#### Setting store ids

It’s easy to set a store id to all track calls - if there’s a `store_id` property in the `track` call, we’ll include the `setStore` event to Criteo along with your event. To pass the `store_id` property your `track` call should be trigger like this:

```javascript
analytics.track('Event Name', {
  ...
  store_id: "STORE_ID"
})
```
