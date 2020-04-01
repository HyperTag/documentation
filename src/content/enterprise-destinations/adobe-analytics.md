---
collectionKey: enterprise-destinations

navText: 'Adobe Analytics'

path: '/enterprise-destinations/adobe-analytics/'

tags: [enterprise, destinations]
---

# Adobe Analytics

Adobe Analytics beats the competition with ad hoc reporting, AI and machine learning, and audience segmentation.

MetaRouter makes it easy to send your data to [Adobe Analytics](https://www.adobe.com/analytics/adobe-analytics.html) (and lots of other destinations). Once you follow the steps below, your data will be routed through our platform and pushed to Adobe Analytics in the format they understand.

## Why send data to Adobe Analytics using MetaRouter?

With MetaRouter, you can use Adobe Analytics without having to install their JavaScript library on every page of your site. We also eliminate the need to write custom code to track user event data. Once Adobe Analytics is routed through MetaRouter, our platform translates page views and events into corresponding Adobe Analytics events.

## Getting Started with Adobe Analytics and MetaRouter

### Adobe Analytics Side

To get started with this integration, you’ll first need to have access to an Adobe Analytics account. The information that you'll need moving forward is Adobe Report Suite ID, and your Tracking Server URL.

### MetaRouter Side

#### Configuration file

This configuration file allows you to set your own configuration based on how you interact with Adobe Analytics. Here's a configuration file that includes all the settings that you can apply - `REPORT_SUITE_ID` is the only mandatory field, everything else is optional.

```yaml
- name: "adobe-analytics"
  config:
    reportSuiteId: "REPORT_SUITE_ID"
    trackingServerUrl: "server.sc.omtrdc.net"
    timestampOption: "disabled"
    sendBoth: true
    sendContextData: true
    productIdentifier: "sku"
    events:
    	Purchase: "event15"
    eVars:
    	content_category: "eVar1"
    hVars:
    	content_category: "hVar2"
    lists:
    	content_category: "lVar3"
    props:
    	content_name: "prop12"

```

- `reportSuiteId` - String, **required**
  - You can find your Report Suite ID in your Adobe Analytics Settings page.
- `trackingServerUrl` - String, **optional**
  - This is the secure URL of your Adobe Analytics server.
- `timestampOption` - String, **optional**, one of:
  - `enabled` - Send timestamp instead of visitorID;
  - `disabled` - Send visitorID instead of timestamp;
  - `optional` - Use this together with `sendBoth` to send out both timestamp and visitorId.
- `sendBoth` - Boolean, **optional**, defaults to `false`
  - If you've set `timestampOption` to `optional`, you can opt to send _both_ the timestamp and the visitorID to Adobe. However, note that this is _NOT_ recommended by Adobe as it may lead to out of order data.
- `sendContextData` - Boolean, **optional**, defaults to `false`
  - If `true`, all track properties will be attached to event as context data. Then you can use processing rules to map you Context Data Variables in Adobe to other variables with Adobe Analytics Processing Rules.
- `productIdentifier` - String, **optional**, one of `id`, `name` or `sku`, defaults to `name`
  - Establishes which track event property to send as product identifier.
- `events` - Object, **optional**
  - By default, MetaRouter will map some of the E-commerce events to standard Adobe Analytics events. (See [here](#track-calls) for full list).
  - This config option allows you to map your own event to a specific Adobe Analytics standard event.
  - Use E-commerce event names as keys of this object, and the custom Adobe Analytics event names ("event1" - "event200") as the corresponding value.
- `eVars`, `hVars`, `lists`, `props` - Object, **optional**
  - Map your Adobe Analytics eVar, hVar, lVar and prop names to the property names you’re using in your MetaRouter events. Enter a E-commerce property name on the left and an Adobe Analytics eVar/lVar/hVar/prop number on the right.
  - By default, no vars or params are mapped or sent out.

### Track calls

- By default, we map some of the Analytics.js Standard E-commerce events to Adobe Analytics Standard events, as follows:

  | Analytics.js event  | Adobe Analytics event |
  | :------------------ | :-------------------- |
  | Product Viewed      | 'prodView'            |
  | Product List Viewed | 'prodView'            |
  | Product Added       | 'scAdd'               |
  | Product Removed     | 'scRemove'            |
  | Cart Viewed         | 'scView'              |
  | Checkout Started    | 'scCheckout'          |
  | Order Completed     | 'purchase             |

- In order to map other events, you would use the custom mapping provided by the config:

```yaml
events:
'Product Clicked': 'event10'
```

### Specifying a Marketing Cloud VisitorID

- If you are using the Marketing Cloud ID Service, you can pass the Marketing Cloud Visitor ID as an destination specific setting and we will send that along with the event.

```javascript
analytics.track({
  userId: '019mr8mf4r',
  event: 'Gotta catch em all',
  properties: {
    caught: 1738,
  },
  integrations: {
    'Adobe Analytics': {
      marketingCloudVisitorId: '12345',
    },
  },
})
```

### Manually specifying a visitorID

- `visitorId` may be passed manually from the client:

```javascript
analytics.track({
  userId: '019mr8mf4r',
  event: 'Gotta catch em all',
  properties: {
    caught: 1738,
  },
  integrations: {
    'Adobe Analytics': {
      visitorId: '12345',
    },
  },
})
```

### Sending exit/download events

- Use `properties.linkType` to specify an event type:

  - `e` for Exit events
  - `d` for Download events
  - `o` for Other events (_default_)

```javascript
.track({
  …,
  properties: {
    linkURL: 'https://foo.bar',
    linkType: ‘e’, // ‘d’ for downloads
    pageName: ‘Foo’
    }
})
```
