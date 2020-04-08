---
collectionKey: enterprise-destinations

navText: 'DoubleClick Floodlight'

path: '/enterprise-destinations/doubleclick-floodlight/'

tags: [enterprise, destinations]
---

# DoubleClick Floodlight

MetaRouter makes it easy to send your data to [DoubleClick Floodlight](https://www.google.com/dfa/trafficking) (and lots of other destinations). Once you follow the steps below, your data will be routed through our platform and pushed to DoubleClick Floodlight in the format they understand.

## Why send data to DoubleClick Floodlight using MetaRouter?

With MetaRouter, you can use DoubleClick Floodlight without having to install their JavaScript library on every page of your site. We also eliminate the need to write custom code to track user event data. Once DoubleClick Floodlight is routed through MetaRouter, our platform makes calls directly to Floodlight based on your mapped events.

## Getting Started with DoubleClick Floodlight and MetaRouter

### DoubleClick Floodlight Side

To get started with this integration, you’ll first need to have access to a DoubleClick Floodlight account. The information that you'll need moving forward is your DoubleClick advertiser Id.

### MetaRouter Side

The DoubleClick Floodlight destination allows you to make calls directly to Floodlight based on your mapped events. All you have to do is to add your settings and map the Analytics.js track events to their corresponding Floodlight tags in the configuration file as described below.

#### Configuration file

This configuration file allows you to set your own configuration based on how you interact with DoubleClick Floodlight. Here's a configuration file that includes all the settings that you can apply - `appId` and `advertiserId` are the only mandatory fields, everything else is optional.

```yaml
- name: 'doubleclick'
  config:
    advertiserId: 'XXXXXXXXXXX'
    cat: 'DEFAULT_CATEGORY'
    type: 'DEFAULT_TYPE'
    events:
      - event: 'EVENT NAME'
        cat: 'pagecat'
        type: 'targeting-pagetype'
        isPageview: true
        customVariables:
          name: 'u1'
          url: 'u3'
      - event: 'Products Searched'
        cat: 'marketing'
        type: 'targeting'
        customVariables:
          query: 'u1'
    defaultPageviewEvent:
      cat: 'DEFAULT_PAGEVIEW_CATEGORY'
      type: 'DEFAULT_PAGEVIEW_TYPE'
      ord: 'DEFAULT_PAGEVIEW_ORD'
```

- `advertiserId` - String (required)
  - Your advertiser ID that is the source of the Floodlight activity. This should be the `src` of your tag string.
- `cat` - String
  - This setting maps to the Doubleclick Floodlight container activity tag (or `cat`) string. You can choose to use this setting to define the same value for this parameter across all conversion events or you can define this value for each of your conversion event mappings below. If a mapped event doesn't have a `cat` value, we'll use this one as default.
- `type` - String
  - This setting maps to the Doubleclick Floodlight container group tag (the `type` parameter) string. You can choose to use this setting to define the same value for this parameter across all conversion events or you can define this value for each of your conversion event mappings below. If a mapped event doesn't have a `type` value, we'll use this one as default.
- `events`
  - `event` - String
    - The event name you track with Analytics.js.
  - `cat` - String
    - This should be the `cat` of your tag string, which Floodlight servers use to identify the activity group to which the activity belongs. If you do not add this option, we will fall back to whatever you defines in the top level `cat` setting.
  - `type` - String
    - This should be the `type` of your tag string, which identifies the activity group with which the Floodlight activity is associated. If you do not add this option, we will fall back to whatever you defines in the top level `type` setting.
  - `isPageView` - Bool
    - This allows us to know if this event is a pageview.
  - `customVariables` - Object
    - Map Analytics.js event properties (on the left) to Floodlight custom variables and we'll insert the value of that property in the corresponding Floodlight custom variables like `u1`, `u2`, ..etc (on the right).
- `defaultPageviewEvent` - Object
  - This settings allows you to define default `cat`, `type` and `ord` values for a standard page view. If a pageview is triggered and is not found defined inside `events` object, we'll use these values as defaults.
  - `cat` - String
    - DoubleClick Floodlight container activity tag (or `cat`) string.
  - `type` - String
    - DoubleClick Floodlight container group tag (the `type` parameter) string.
  - `ord` - String
    - For Sales tags only, please specify which property value should be used for the `ord`. You must **enable reporting on ord** inside DoubleClick Floodlight if you decide to use this feature. A good example would be something like `order_id`.

## Sending Personally Identifiable Information (PII)

Please refrain from mapping custom variables that are PII. Please refer to the [warning](https://support.google.com/dcm/answer/2604612?hl=en) by DoubleClick:

The terms of your DoubleClick contract prohibit passing any information to us that we could use or recognize as personally identifiable information (PII). If you enter certain key-values into a field in a DoubleClick product, you may see a warning that reminds you that you must not use key-values to pass data that we would recognize as PII. Key-values that trigger this warning include, for example, email and username. Note that it is okay to use these key-values if your purpose is not to collect information that DoubleClick could use or recognize as PII. (For example, email=weekly is fine, but passing a user’s email address is not.) If you do choose one of these key-values, DoubleClick may contact you in the future to confirm that you are not using them in a way that is prohibited.
