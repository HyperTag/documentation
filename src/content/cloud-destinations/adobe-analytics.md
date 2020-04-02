---
collectionKey: cloud-destinations

navText: Adobe Analytics

path: '/cloud-destinations/adobe-analytics/'

tags: [cloud, destinations]
---

# Adobe Analytics

MetaRouter makes it easy to send your data to Adobe Analytics. Once you follow the steps below, your data will be routed through our platform and pushed to Adobe Analytics in the appropriate format.

## What is Adobe Analytics and how does it work?

Adobe Analytics is a solution for applying real-time analytics and detailed segmentation across marketing channels.
A request is made to the web server when a visitor comes to your site. Your site's web server sends the page code information, and the page displays in the browser. When the page loads the JavaScript code will run and send an image request to the Adobe server, passing the variables, metrics, and page data that were defined in your implementation.

## Why send data to Adobe Analytics using MetaRouter?

With MetaRouter, you can use Adobe Analytics without having to install their JavaScript library on every page of your site. We also eliminate the need to write custom code to track user event data. Once your Adobe Analytics is routed through MetaRouter, our platform translates page views and events into corresponding Adobe Analytics events.

## Getting Started with Adobe Analytics and MetaRouter

### Initialization

When using Adobe Analytics through Analytics.js, we will check if you already have global properties such as `window.s_account` or any properties on the `window.s` object and use them. In the absence of any of these values, we will fallback on the **Report Suite ID**, **Tracking Server URL**, and **Tracking Server Secure URL**(optional) you have defined in the destination settings inside MetaRouter.

Once these required properties are set, we will load `appmeasurement.js` version 1.6.

### Marketing Cloud Visitor ID Service

You can use Adobe’s Marketing Cloud Visitor ID Service, in witch case you will need to provide MetaRouter with your **Marketing Cloud Organization ID** - in the advanced options inside MetaRouter.

Our Analytics.js destination will load their `visitorAPI.js` library, but will only initialize it if you provide your Marketing Cloud Organization ID - we will set `window.s.visitor` with the return value from `window.Visitor.getInstance(<Your Marketing Cloud Org Id>)`. See [their documentation](https://marketing.adobe.com/resources/help/en_US/mcvid/mcvid-setup-analytics.html) for more information.

**Note:** In the same script as `appmeasurement.js` we also load `visitorAPI.js` - Adobe Analytics requires synchronous execution of this two scripts. Using the visitor API is **optional** but for those who do, we make it available on the page.

### List Variables

You can map your MetaRouter properties in your settings to any of your three list variables - `props`, `eVar`, `hVar`. You can either send the property value as a comma delimited string (ie. `'john,charlie,alfred'`) or as an Array (`['john', 'charlie', 'alfred']`). If the provided data will be an Array, we will join it into a comma delimited string and then sending to Adobe!

### Sending Data to Adobe Analytics

Our recommendation is to create both a MetaRouter and Adobe Analytics tracking plan before attempting to send any events/properties to Adobe, since you’ll have to map all your MetaRouter events to Adobe `events` and MetaRouter properties to Adobe `eVars` or `props` in both the MetaRouter settings UI and your Adobe Mobile Services dashboard.

### Page

By default, the MetaRouter snippet includes an empty `page()` call. When `page()` is called, here's the things that will happen:

1. Set `window.s.pageName` to the `name` of the page call was. By default, the MetaRouter `.page()` call will set `window.s.pageName` to be the passed argument. Since the default `page()` call has no arguments, `window.s.pageName` will be set as `undefined`. For calls like `page('Homepage')`, the `window.s.pageName` property will be set to the String passed, in this example, `'Homepage'`.

   **Note**: For an empty `page()` call, Adobe Analytics will fallback by default to displaying the `url` as the name of the page.

2. `window.s.events` will also be set to the passed argument of the `page(<name>)` call.

3. Check if page call is associated with a `userId` from a previous `.identify()` call. If so, we will set the `userId`as `window.s.visitorID`.

   **IMPORTANT**: Note that Adobe Analytics [does not support setting vistorID](https://marketing.adobe.com/resources/help/en_US/sc/implement/timestamps-overview.html) if you are sending a timestamped hit. So we will only set `window.s.visitorID` if your **Timestamp Option** is `disabled` and a `userId`exists on the event.

4. Check for some common properties such as the following and set them on the `window.s` object:

   - `channel`
   - `campaign`
   - `state`
   - `zip`

   In the first step, we will follow the properties you sent with the `page()` call. An example `page()` call in order to set the four properties above should be:

   ```javascript
   analytics.page({
     channel: 'Phones',
     campaign: '1234',
     state: 'OH',
     zip: '06145',
   })
   ```

   For the `campaign` property, we will first check for `context.campaign.name` and only after we will check within the properties sent.

   Alternatively, if you already set any of these four properties on your existing Adobe Analytics instance on the page (`window.s.channel`, `window.s.campaign`, etc.), we will fallback on that as the default value. This will allow you to easily set default values for all your web pages but you'll also be able to change them programmatically per page if needed.

5. If your **Timestamp Option** is either **Timestamp Enabled** or **Timestamp Optional**, we will attach the `timestamp` to `window.s.timestamp`. Please make sure that this setting is inline with your _actual_ timestamp setting inside Adobe Analytics for the same Report Suite ID.

6. Check if any of the page call’s properties have been mapped to any custom Adobe Analytics variables such as `eVar`, `props`, and `hVar`.

   Given the mapping setting below:

   ![adobe-analytics-page-mapping-settings](/images/adobe-analytics-page-mapping-settings.png)

   If you call the following `page()` call:

   ```javascript
   analytics.page({
     browser: 'chrome',
     searchTerm: 'blue shirt',
     section: 'shirts',
   })
   ```

   We will set the following properties on the `window.s` object:

   - `window.s.prop1 = 'chrome'`
   - `window.s.eVar7 = 'blue shirts'`
   - `window.s.eVar3` will be set to the `url` of the page where the call was made (`.page()` will automatically set a `url` property)
   - `window.s.hier1 = 'shirts'`

7. Finally we will send the pageview request to Adobe Analytics by using `window.s.t()`.

### Track

Event tracking for Adobe Analytics through MetaRouter requires you to predefine the `events` you want to collect.

In _both_ Adobe Analytics and MetaRouter destination settings UI, you must predefine a list of `.track()` events that you want to send and which properties you want to send as custom variables.

This means that you **must** map each event and property to a corresponding Adobe Analytics `event`, `prop`, or `eVar`.

Here is an example of how you might map the custom variables:

![adobe-analytics-track-mapping-settings](/images/adobe-analytics-track-mapping-settings.png)

Given the settings above, if you make a sample `.track()` call below:

```javascript
analytics.track('Watched Video', {
  plan: 'free',
  videoName: 'The Uptick Rule',
})
```

The following will happen:

1. Check if the MetaRouter event name, `'Watched Video'`, is mapped in your MetaRouter settings. If it is, set `window.s.linkTrackEvents` and `window.s.events` to its corresponding Adobe Analytics event name, `'event1'`. If no matching event name is found in the MetaRouter settings, do nothing and abort.

2. Attach `timestamp` to `window.s.timestamp` if your **Timestamp Option** setting inside MetaRouter is either **Timestamp Enabled** or **Timestamp Optional**.

3. Update common variables such as `channel`, `campaign`, `state`, `zip` if their corresponding properties were included in the event or on your `window.s` object.

4. Check if the MetaRouter event name, `Watched Video` is mapped to an `eVar`. Since it is in the example case above, set `window.s.eVar3` as `'Watched Video'`.

5. Check if any of the properties are mapped to either a `prop`, `eVar`, or `hVar`. Thus for the example above, set `window.s.prop1` as `'free'` and `window.s.eVar4` as `'The Uptick Rule'`.

6. Automatically try to set `window.s.pageName` to the following values, in order of precedence:

   - `properties.pageName` (for backward compatibility)
   - `options.pageName` (if you already have `window.s.pageName` defined on the web page)
   - `context.page.title` (which is automatically tracked by our Analytics.js library)

   Since `context.page.title` will always be populated, at the very minimum `window.s.pageName` will always be set to the value inside your `<title>` tag of the page where the `.track()` call was fired.

7. Set `window.s.linkTrackVars`, which is a joined string of variable keys delimited by a comma. The example above would produce a value of `'eVar3,events,pageName,timestamp,eVar3,prop1'`. This tells Adobe Analytics which properties on the `window.s` object they should send along with this event.

8. Finally, we will fire the request to Adobe Analytics using `window.s.tl(true, 'o', 'Watched Video')`

   **Note:** `true` sets a `500ms` delay to give your browser time to flush the event. It also signifies to Adobe that this event is something other than a `href` link. The `'o'` stands for `'Other'`, as opposed to `'d'` for `'Downloads'`and `'e'` for `'Exit Links'`. The final parameter is the link name you will see in reports inside Adobe Analytics.

### Ecommerce Events

The Adobe Analytics destination works with our standard Ecommerce API.

The following mapping between semantic ecommerce events for MetaRouter and Adobe Analytics are supported:

| MetaRouter Event Name | Adobe Analytics Event Name |
| :-------------------- | :------------------------- |
| Product Viewed        | `prodView`                 |
| Product List Viewed   | `prodView`                 |
| Product Added         | `scAdd`                    |
| Product Removed       | `scRemove`                 |
| Cart Viewed           | `scView`                   |
| Checkout Started      | `scCheckout`               |
| Order Completed       | `purchase`                 |

For any of the above ecommerce events, data is sent similarly to `.track()` events. The difference here is that you do **NOT** need to predefine these MetaRouter event names in the MetaRouter settings. The above ecommerce events will automatically be mapped and sent to Adobe Analytics.

**Note**: Ecommerce relevant properties such as `orderId`, `products` will be sent automatically. However, if you want to attach custom properties to Adobe’s `eVar`, `prop` or `hVar`, you need to predefine them in the MetaRouter settings. (just the properties, no need to map the event names, unless you want the event name to be set to an `eVar`).

For all ecommerce events listed, we will send product description data to Adobe Analytics.

Given the sample `Order Completed` MetaRouter event:

```javascript
analytics.track('Order Completed', {
  orderId: '50314b8e9bcf000000000000',
  total: 30.0,
  revenue: 25.0,
  shipping: 3.0,
  tax: 2.0,
  discount: 2.5,
  coupon: '15years',
  currency: 'USD',
  products: [
    {
      id: '507f1f77bcf86cd799439011',
      sku: '45790-32',
      name: 'Monopoly: 3rd Edition',
      price: 19,
      quantity: 1,
      category: 'Games',
    },
    {
      id: '6123ef823abf6fe926481024',
      sku: '13281-19',
      name: 'Go Pro',
      price: 99,
      quantity: 2,
      category: 'Electronics',
    },
  ],
})
```

1. Set `window.s.products` with the product description string - a semi-colon delimited string per product which is additionally delimited by commas if you have multiple products. The string format per product is `[category];[name];[quantity];[total]`. Total is calculated by multiplying price and quantity for each product.

   **Note**: you can optionally choose whether to map the `name`, `sku`, or `id` for each of item in the `products` array. So one could alternatively send product descriptions with `[category];[sku];[quantity];[total]` or `[category];[id];[quantity];[total]`. Select the mapping via the **Product Identifier** dropdown under Advanced Options in your Adobe Analytics MetaRouter settings. The default identifier is set to `name`.

   Thus the above example would set `window.s.products` to `'Games;Monopoly: 3rd Edition;1;19,Electronics;Go Pro;2;99'`.

   The default fallback values for `quantity` and `price` is `1` and `0`, respectively.

   **Important**: If any of the items in the `products` array have property values that include commas or semi-colons, you may have data issues since Adobe Analytics uses them as delimiters.

2. Update common variables such as `channel`, `campaign`, `state`, `zip`, and `pageName`. These values will be set if they exist at the property level, your existing Adobe Analytics variables already attached on the `window.s`object, or `context.page.title` (for `pageName`).

3. Set `window.s.events` with the corresponding Adobe Analytics naming convention. The above example would set this as `'purchase'`.

4. Check if the event name is mapped as an `eVar` and if so, set it on the `window.s`.

5. Check if any other top level properties have been mapped to a custom variable in the MetaRouter settings such as `eVar`, `prop`, and `hVar`. If so, set them on the `window.s`.

6. Set `window.s.purchaseID` and `window.s.transactionID` as the `orderId`, which for the example above would be `'50314b8e9bcf000000000000'`. **Note** that this is only for `Order Completed` events.

   The default `currencyCode` we set upon pageload is `USD`. We will check if you have passed any other currency in your event by checking `properties.currency`.

   **Important**: If you’d like to collect `transactionID`, make sure to enable the transactionID storage setting inside your [Reporting Suite](https://marketing.adobe.com/resources/help/en_US/sc/implement/transactionID.html)!

7. Attach the `timestamp` as `window.s.timestamp` if your **Timestamp Option** is **Timestamp Enabled** or **Timestamp Optional**.

8. Set `window.s.linkTrackEvents` to the Adobe Analytics event name, which would be `purchase` for the above example.

9. Set `window.s.linkTrackVars` which is a string of keys we want Adobe Analytics to read from the `window.s`object when the request is sent. For the example above, the value of `linkTrackVars` would be set as `'pageName,events,products,purchaseID,transactionID,timestamp'`.

10. Finally, we will fire the request to Adobe Analytics using `window.s.tl(true, 'o', 'Order Completed');`.
