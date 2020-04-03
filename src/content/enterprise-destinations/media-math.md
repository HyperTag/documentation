---
collectionKey: enterprise-destinations

navText: 'Media Math'

path: '/enterprise-destinations/media-math/'

tags: [enterprise, destinations]
---

# Media Math

MetaRouter makes it easy to send your data to [Media Math](https://www.mediamath.com/) (and lots of other destinations). Once you follow the steps below, your data will be routed through our platform and pushed to Media Math in the format they understand.

## Why send data to Media Math using MetaRouter?

With MetaRouter, you can use Media Math without having to install their JavaScript library on every page of your site. We also eliminate the need to write custom code to track user event data. Once Media Math is routed through MetaRouter, our platform translates page views and events into corresponding Media Math events.

## Getting Started with Media Math and MetaRouter

### Media Math Side

To get started with this integration, you’ll first need to have access to a Media Math account. The information that you'll need moving forward is your advertiser Id.

### MetaRouter Side

Media Math allows you to track conversions. When you call `analytics.track('Event Name')` we will map that event to the `mt_id` and `mt_adid` that you provide. We'll map other data like properties to `s` and `v` parameters. Our configuration file allows you to set both the general `mt_id` and `mt_adid` values, and individual values based on the triggered event.

### Configuration file

This configuration file allows you to set your own configuration based on how you interact with Media Math. Here's a configuration file that includes all the settings that you can apply - `ADVERTISER_ID` is the only mandatory field, everything else is optional.

```yaml
- name: 'media-math'
  config:
    advertiserId: 'ADVERTISER_ID'
    mt_id: 'mt_id_value'
    mt_adid: 'mt_adid_value'
    events:
      - name: 'Product Viewed'
        mt_id: 'mt_id_ps'
        mt_adid: 'mt_adid_ps'
        vParams:
          - product_id: 'v0'
        sParams:
          - price: 's0'
```

- `advertiserId` - String (required)
  - You can find your advertiser ID in your Media Math account.
- `mt_id` - String (optional)
  - If you want to fire a conversion pixel on every page of your website (typically to block retargeting) then enter the `mt_id` for that pixel here.
- `mt_adid` - String (optional)
  - If you want to fire a conversion pixel on every page of your website (typically to block retargeting) then enter the `mt_adid` for that pixel here.
- `events` - Object (optional)
  - This config option allows you to map your own event to specific Media Math event details.
  - `name` - String (required)
    - Analytics event name
  - `mt_id` - String (optional)
    - The `mt_id` that you want us to send when this conversion event is triggered.
  - `mt_adid` - String (optional)
    - The `mt_adid` that you want us to send when this conversion event is triggered.
  - `vParams`, `sParams` - Object (optional)
    - Map your Media Math `s` params and `v` params to the property names you’re using in your MetaRouter events. Enter a E-commerce property name on the left and an Media Math s/v param on the right.
    - By default, no vars or params are mapped or sent out.
