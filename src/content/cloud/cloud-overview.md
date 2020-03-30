---
collectionIndex: 0
collectionKey: cloud
collectionMerge: true
collectionTitle: Cloud Edition

navIndex: 3
navText: Overview

path: '/cloud-edition/'
---

# MetaRouter Cloud

MetaRouter Cloud Edition is our SaaS offering. This is different from our [Enterprise](../enterprise/overview.html) edition in that we run the infrastructure in our cloud rather than deploying to your private cloud or running in a docker container on your local machine.

Cloud is where many of our customers start their journey with streaming data, while Enterprise is typically used by larger companies that have outgrown SaaS and would like to keep all of their data in their own environment. To get started setting up, sign up for MetaRouter Cloud [here](https://app.metarouter.io/signup).

# Why Cloud?

The key to delighting customers is understanding them. Since identifying what they do-or don't do-is crucial to understanding their actions, thousands of tools exist to help marketers and product managers analyze user engagement with a website or app. As if selecting the right tools isn't challenging enough, accessing the fast-accumulating data for internal analysis is often a struggle, and the cost of switching to a better tool down the road can result in a major loss of data.

The MetaRouter Cloud Platform allows you to capture every user event from web, mobile, and server side sources. Once those events are ingested into our platform, we can push them to a data warehouse, CRM, or analytics tool of your choice. Implementing our Cloud Platform allows you to better understand how exactly users are interacting with your web and mobile apps so that you can tailor marketing and product focus accordingly.

# Getting Started

Once you've [signed up](https://app.metarouter.io/signup) for an account, it only takes a few minutes to start collecting valuable behavior data with MetaRouter.

Use one of our library sources to record user data from your website, mobile app, or servers. We'll transform and route that data to all of the destinations you've enabled.

## Sources

Collecting customer data from your website, mobile app, or servers is easy, and we've built an integration with each of the following platforms.

Check it out:

- [Analytics.js](/v2/clickstream/sources/analyticsjs.html)
- [Android](/v2/clickstream/sources/android.html)
- [HTTP API](/v2/clickstream/sources/httpapi.html)
- [iOS](/v2/clickstream/sources/ios.html)
- [React Native](/v2/clickstream/sources/react.html)
- [MeteorJS](/v2/clickstream/sources/meteorjs.html)
- [.NET](/v2/clickstream/sources/net.html)
- [Node.js](/v2/clickstream/sources/nodejs.html)
- [PHP](/v2/clickstream/sources/php.html)
- [Python](/v2/clickstream/sources/python.html)
- [Ruby](/v2/clickstream/sources/ruby.html)
- [Segment Webhook](../sources/segment-webhook.html)

## Destinations

Check out the list below to explore all of the destinations available with MetaRouter. From there, make your way to each destination's docs and setup guide to see how to use them!

- [Acquisio](/v2/clickstream/destinations/acquisio.html)
- [Adobe Analytics](/v2/clickstream/destinations/adobe-analytics.html)
- [Amazon Kinesis](/v2/clickstream/destinations/amazon-kinesis.html)
- [Amazon Redshift](/v2/clickstream/destinations/amazon-redshift.html)
- [Amplitude](/v2/clickstream/destinations/amplitude.html)
- [Attribution](/v2/clickstream/destinations/attribution.html)
- [Bing Ads](/v2/clickstream/destinations/bing-ads.md)
- [Blueshift](/v2/clickstream/destinations/blueshift.md)
- [Calq](/v2/clickstream/destinations/calq.html)
- [Clicky](/v2/clickstream/destinations/clicky.html)
- [Criteo](/v2/clickstream/destinations/criteo.html)
- [Customer.io](/v2/clickstream/destinations/customerio.html)
- [DoubleClick Floodlight](/v2/clickstream/destinations/doubleclick-floodlight.html)
- [Drift](/v2/clickstream/destinations/drift.html)
- [Facebook App Events](/v2/clickstream/destinations/facebook-app-events.html)
- [Facebook Pixel](/v2/clickstream/destinations/facebook-pixel.html)
- [Google AdWords](/v2/clickstream/destinations/google-adwords.html)
- [Google Analytics](/v2/clickstream/destinations/google-analytics.html)
- [Google BigQuery](/v2/clickstream/destinations/google-bigquery.html)
- [Google Tag Manager](/v2/clickstream/destinations/google-tag-manager.html)
- [Google Firebase](/v2/clickstream/destinations/firebase.html)
- [Heap Analytics](/v2/clickstream/destinations/heap-analytics.html)
- [Hubspot](/v2/clickstream/destinations/hubspot.html)
- [Intercom](/v2/clickstream/destinations/intercom.html)
- [Keen IO](/v2/clickstream/destinations/keen-io.html)
- [KISSmetrics](/v2/clickstream/destinations/kissmetrics.html)
- [Lucky Orange](/v2/clickstream/destinations/lucky-orange.html)
- [Lytics](/v2/clickstream/destinations/lytics.html)
- [Mixpanel](/v2/clickstream/destinations/mixpanel.html)
- [Optimizely](/v2/clickstream/destinations/optimizely.html)
- [OutBrain](/v2/clickstream/destinations/outbrain.html)
- [Pinterest](/v2/clickstream/destinations/pinterest.html)
- [Resonate](/v2/clickstream/destinations/resonate.html)
- [Retention Science](/v2/clickstream/destinations/retention-science.html)
- [Rubicon](/v2/clickstream/destinations/rubicon.html)
- [S3 Event Logs](/v2/clickstream/destinations/s3-event-logs.html)
- [Sailthru](/v2/clickstream/destinations/sailthru.html)
- [Taboola](/v2/clickstream/destinations/taboola.html)
- [Twitter Ads](/v2/clickstream/destinations/twitter-ads.html)
- [VWO](/v2/clickstream/destinations/vwo.html)
- [Webhooks](/v2/clickstream/destinations/webhooks.html)
- [Woopra](/v2/clickstream/destinations/woopra.html)

## Source/Destination Compatibility Matrix

<!-- TODO: Figure out how to get EE edition destinations into this matrix -->

|                     | Client | Server | Mobile |
| ------------------- | :----: | :----: | :----: |
| [40]                |  [20]  |  [20]  |  [20]  |
| Acquisio            |   ✔    |   x    |   x    |
| Adobe Analytics     |   ✔    |   x    |   x    |
| Amazon Kinesis      |   ✔    |   ✔    |   ✔    |
| Amazon Redshift     |   ✔    |   ✔    |   ✔    |
| Amplitude           |   ✔    |   ✔    |   ✔    |
| Appboy              |   ✔    |   ✔    |   x    |
| Attribution         |   ✔    |   ✔    |   x    |
| Bing Ads            |   ✔    |   x    |   x    |
| Bloom Reach         |   ✔    |   x    |   x    |
| Calq                |   x    |   ✔    |   ✔    |
| Clicky              |   ✔    |   x    |   x    |
| Criteo              |   ✔    |   x    |   x    |
| Customer.io         |   ✔    |   ✔    |   ✔    |
| DoubleClick         |   ✔    |   x    |   x    |
| Drift               |   ✔    |   x    |   x    |
| Facebook App Events |   x    |   ✔    |   ✔    |
| Facebook Pixel      |   ✔    |   x    |   x    |
| Google AdWords      |   ✔    |   x    |   ✔    |
| Google Analytics    |   ✔    |   ✔    |   ✔    |
| Google BigQuery     |   ✔    |   ✔    |   ✔    |
| Google Tag Manager  |   ✔    |   x    |   x    |
| Google Firebase     |   x    |   x    |   ✔    |
| Heap Analytics      |   ✔    |   ✔    |   ✔    |
| Hubspot             |   ✔    |   ✔    |   ✔    |
| Intercom            |   ✔    |   ✔    |   ✔    |
| Keen IO             |   ✔    |   ✔    |   ✔    |
| Kenshoo             |   ✔    |   x    |   x    |
| KISSmetrics         |   ✔    |   ✔    |   ✔    |
| Lucky Orange        |   ✔    |   x    |   x    |
| Lytics              |   ✔    |   ✔    |   ✔    |
| Mixpanel            |   ✔    |   ✔    |   ✔    |
| Netmining           |   ✔    |   x    |   x    |
| Optimizely          |   ✔    |   x    |   x    |
| OutBrain            |   ✔    |   x    |   x    |
| Pebble Post         |   ✔    |   x    |   x    |
| Resonate            |   ✔    |   x    |   x    |
| Retention Science   |   ✔    |   x    |   x    |
| Rubicon             |   ✔    |   x    |   x    |
| S3 Event Logs       |   ✔    |   ✔    |   ✔    |
| Sailthru            |   ✔    |   ✔    |   ✔    |
| Taboola             |   ✔    |   x    |   x    |
| Twitter Ads         |   ✔    |   x    |   x    |
| VWO                 |   ✔    |   x    |   x    |
| Webhooks            |   ✔    |   ✔    |   ✔    |
| Woopra              |   ✔    |   ✔    |   ✔    |

## Calls

[Here](/v2/clickstream/calls.html), we outline the different types of customer data we capture and how to implement them for your business.
