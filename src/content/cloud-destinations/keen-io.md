---
title: Keen IO
sidebar: platform_sidebar
---
MetaRouter makes it easy to send your data to Keen.io. Once you follow the steps below, your data will be routed through our platform and pushed to Keen.io in the appropriate format.

```
Alert: Our server-side version of Keen.io has been disabled without a date set for it to be re-enabled. If you are interested in using Keen.io server-side, please contact us so we may evaluate. Thanks!
```

## What is Keen.io and how does it work?

Built for developers, Keen.io is an event data platform for real-time, intelligent data application. The platform allows you to collect and send event data wherever you need, directly build powerful analytics features into your tools and products, and programmatically provision role-based data access for your users and customers.

Keen.io supports customizable APIs and a charting library, which gives developers room to build and customize native analytics tools. Plus, their third-party integrations will allow your team to pinpoint key behavior metrics and pull customer data accordingly.

[Learn more about Keen.io](https://keen.io/)

## Why send data to Keen.io using MetaRouter?

Instead of having to manually adapt your code, MetaRouter's integration automatically collects and transforms data for Keen.io directly from web applications, mobile applications, and server-side implementations.

Plus, with MetaRouter, there is no need to manually install the Keen.io SDK in your web application.

## Getting Started with Keen IO and MetaRouter

### Keen.io Side

To get started sending events to Keen IO, you'll need two things:

* `Project ID`: This tells MetaRouter which project within Keen IO is yours
* `Write Key`: This gives MetaRouter permission to send data to your Keen IO dashboard
Both of these things will be long strings of random characters.

You can find your Write Key by clicking on `Show API Keys`.

![keen-io1](../../../images/keen-io1.png)

### MetaRouter Side

Once you have your Project ID and Write Key, copy both into the MetaRouter dashboard.

Your pipeline will be activated once you click `Create Destination`.

### Additional Features

We offer some additional features in the MetaRouter UI that allow you to change your destination settings without any code. 

* `Project ID` - This is a 24-character code that you can find in your Keen settings.
* `Read Key` - This can be used if you are a Keen Pro user. This should be a string of letters and numbers that is at least 32 characters long.
* `Add IP Address` - Check this box to use the Keen data enrichment feature for adding geographic information based on IP address.
* `Add Referrer` - Check this box to use the Keen data enrichment feature for parsing referrer URLs into their sources.
* `Track All Pages` - Check this box to track `Loaded a Page` to Keen for all `page` calls.
* `Track Categorized Pages` - Check this box to track all `page` calls that have a `category` associated with them to Keen. For example, `page('Product' , 'Index')` would translate to `Viewed Product Page` in your Keen dashboard.
* `Track Named Pages` - Check this box to track all `page` calls that have a `name` associated with them to Keen. For example, `page('Contact Us')`would translate to `Viewed Contact Us Page` in your Keen dashboard.
* `Add User Agent` - Check this box to use the Keen data enrichment feature that parses `userAgent` strings. Note that `userAgent` is only collected from Android sources and not from iOS ones.
* `Add URL` - Check this box to use the Keen data enrichment feature that parses URLs into their components for easier filtering. 
