---
collectionKey: enterprise-destinations

navText: 'Amplitude'

path: '/enterprise-destinations/amplitude/'

tags: [enterprise, destinations]
---

# Amplitude

MetaRouter makes it easy to send your data to Amplitude. Once you follow the steps below, your data will be routed through our platform and pushed to Amplitude in the appropriate format.

## What is Amplitude and how does it work?

Amplitude is a behavioral data analytics tool that enables real-time cross-platform analytics so that marketers can view user activity on a dashboard. It also funnels audiences by custom events and actions like checkout completed, items added to cart, or payment entered. It integrates very nicely with Amazon Redshift for data access so that data scientists can analyze user drop off over time.

Implementing Amplitude natively in your stack requires a good amount of developer work; sending them user data requires mapping out your events and user traits to be collected and deciding which libraries and SDKs you'll need to use. You'll then need to install your libraries and SDKs of choice on all of your products.

[Learn more about Amplitude](https://amplitude.com/)

## Why send data to Amplitude using MetaRouter?

If you want to try out any other analytics application, implementing native event tracking for Amplitude is a waste of time. Going through the process of selecting and installing libraries and SDKs just for one tool will take your engineers a lot of time. Furthermore, if you plan to add more tools to your stack, the event tracking and custom coding work is going to be redundant and frustrating.

Integrating Amplitude with MetaRouter means that you will just need to install MetaRouter and enable Amplitude in your MetaRouter UI. You will only need to set up one event tracking library (MetaRouter's), and then you will be able to route and send data to Amplitude and any other destination of your choice without writing custom code for each one.

## Getting Started with Amplitude and MetaRouter

### Amplitude Side

To get started sending events to Amplitude, all you need is your API Key. After signing up for an Amplitude account, a page will load asking you to create an organization.

![amplitude1](/images/amp-ee-1.png)

Hit Manage Data and Create Project. This will allow you to get your API Key.

![amplitude2](/images/amp-ee-2.png)
![amplitude3](/images/amp-ee-3.png)

After this application is created, an API Key will be generated and presented in your dashboard.

![amplitude4](/images/amp-ee-4.png)

### MetaRouter Side

#### `apiKey`

The Amplitude Event API Key.

#### `trackAllPages`

This setting sends all the `page` and `screen` calls to Amplitude as `Loaded a Page`. This feature works with all source types. `trackAllPages` setting is set to `false` by default so it will prevent the integration from sending events.

#### `trackNamedPages`

Will send all _named_ `page` and `screen` calls to Amplitude. It will appear in Amplitude as `Viewed (Name) Page` or `Viewed (Name) Screen`. This feature works with all source types.

#### `trackCategorizedPages`

Means that every time you call `page` or `screen` and provide a `category`, an event will be sent. It will appear in Amplitude as `Viewed (Category) Page` or `Viewed (Category) Screen`. This feature works with all source types.

If both `trackNamedPages` and `trackCategorizedPages` are `true` it will appear in Amplitude as `Viewed [Category] [Name] Page`.

#### `usePageDetailsForTrackCalls`

Every time you call the Track event, the page details available from `context.page` will be merged into the Track `properties` object.

#### `mapQueryParams`

When sending data via server side, you can send the custom query params that are automatically collected by analytics.js (or whatever you manually send under context.page.search), by mapping it to either `user_properties` or `event_properties` keys. Choose whether you want the query params to be set on the Amplitude user profile or event metadata level.

```json
...
"mapQueryParams": [
    {"user_properties":"name"},
    {"user_properties":"some_other_query_param1"},
    {"event_properties":"source"}
    {"event_properties":"clkid"}
    {"event_properties":"some_other_query_param2"}
]
...
```

Below is a full example of the configuration to send into the Platform, with all of the defaults specified. Ensure to customize to match the data that you send as part of your analytics event.

```json
{
  "name": "amplitude",
  "apiKey": "<yourAmplitudeAPIKey>",
  "trackAllPages": true,
  "trackNamedPages": true,
  "trackCategorizedPages": true,
  "mapQueryParams": [
    { "user_properties": "name" },
    { "user_properties": "email" },
    { "event_properties": "source" },
    { "event_properties": "other" }
  ],
  "usePageDetailsForTrackCalls": true
}
```
