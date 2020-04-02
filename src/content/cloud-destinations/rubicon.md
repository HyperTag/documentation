---
collectionKey: cloud-destinations

navText: Rubicon

path: '/cloud-destinations/rubicon/'

tags: [cloud, destinations]
---

# Rubicon

MetaRouter makes it easy to send your data to Rubicon. Once you follow the steps below, your data will be routed through our platform and pushed to Rubicon in the appropriate format.

## What is Rubicon?

Rubicon is an ad tech company used by publishers to perform transactions with top brands around the globe. It offers a unified platform, dynamic campaigns, brand protection, and a global marketplace for anyone who wants to buy or sell advertisements.

[Learn more about Rubicon](http://rubiconproject.com/)

## Why send data to Rubicon using MetaRouter

Using MetaRouter data to power or complement your Rubicon platform will allow you to better gauge the way your customers engage with your ads. Automating this pipeline with MetaRouter will not only save you a headache, but also will allow you to make more informed business decisions.

## Getting Started with Rubicon and MetaRouter

### Rubicon Side

Once you're signed up on [Rubicon Project](http://rubiconproject.com/), work with your account manager to:

- Create your company's specific campaign
- Retrieve your **Page ID**, **Conversion ID**, and any conversion event names from them

**Note:** This connector supports client-side Analytics.js only. You need to have implemented MetaRouter [inside your website](/sources/analytics-js/) prior to enabling this connector.

### MetaRouter Side

Within your MetaRouter Rubicon connector UI, give your new connection a unique name.

Then, paste your Page ID into the `pid` field, and your Conversion ID into the **Conversion ID** field. In the **Conversion Events** area, paste in any conversion event names given to you by Rubicon. If you have more than one conversion event, choose the `+` icon to add more.

![rubicon1](/images/rubicon1v2.png)

With your configuration entered, choose **Save**.

Generate page views and events on your website by triggering `analytics.track('your conversion event name');`. Confirm with your Rubicon account manager that conversion events for your specific campaigns are being received as expected.
