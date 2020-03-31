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

MetaRouter Cloud Edition is our SaaS offering. This is different from our [Enterprise](/enterprise-edition/) edition in that we run the infrastructure in our cloud rather than deploying to your private cloud or running in a docker container on your local machine.

Cloud is where many of our customers start their journey with streaming data, while Enterprise is typically used by larger companies that have outgrown SaaS and would like to keep all of their data in their own environment. To get started setting up, sign up for MetaRouter Cloud [here](https://app.metarouter.io/signup).

## Why Cloud?

The key to delighting customers is understanding them. Since identifying what they do-or don't do-is crucial to understanding their actions, thousands of tools exist to help marketers and product managers analyze user engagement with a website or app. As if selecting the right tools isn't challenging enough, accessing the fast-accumulating data for internal analysis is often a struggle, and the cost of switching to a better tool down the road can result in a major loss of data.

The MetaRouter Cloud Platform allows you to capture every user event from web, mobile, and server side sources. Once those events are ingested into our platform, we can push them to a data warehouse, CRM, or analytics tool of your choice. Implementing our Cloud Platform allows you to better understand how exactly users are interacting with your web and mobile apps so that you can tailor marketing and product focus accordingly.

## Getting Started

Once you've [signed up](https://app.metarouter.io/signup) for an account, it only takes a few minutes to start collecting valuable behavior data with MetaRouter.

Use one of our library sources to record user data from your website, mobile app, or servers. We'll transform and route that data to all of the destinations you've enabled.

## Sources

Collecting customer data from your website, mobile app, or servers is easy, and we've built an integration with each of the following platforms.

Check it out:

- [Analytics.js](/sources/analytics-js/)
- [Android](/sources/android/)
- [HTTP API](/sources/http-api/)
- [iOS](/sources/ios/)
- [React Native](/sources/react-native/)
- [MeteorJS](/sources/meteor-js/)
- [.NET](/sources/dot-net/)
- [Node.js](/sources/node-js/)
- [PHP](/sources/php/)
- [Python](/sources/python/)
- [Ruby](/sources/ruby/)
- [Segment Webhook](/sources/segment-webhook/)

## Destinations

Check out the list below to explore all of the destinations available with MetaRouter. From there, make your way to each destination's docs and setup guide to see how to use them!

- [Acquisio](/cloud-destinations/acquisio/)
- [Adobe Analytics](/cloud-destinations/adobe-analytics/)
- [Amazon Kinesis](/cloud-destinations/amazon-kinesis/)
- [Amazon Redshift](/cloud-destinations/amazon-redshift/)
- [Amplitude](/cloud-destinations/amplitude/)
- [Attribution](/cloud-destinations/attribution/)
- [Calq](/cloud-destinations/calq/)
- [Clicky](/cloud-destinations/clicky/)
- [Criteo](/cloud-destinations/criteo/)
- [Customer.io](/cloud-destinations/customer-io/)
- [DoubleClick Floodlight](/cloud-destinations/doubleclick-floodlight/)
- [Drift](/cloud-destinations/drift/)
- [Facebook App Events](/cloud-destinations/facebook-app-events/)
- [Facebook Pixel](/cloud-destinations/facebook-pixel/)
- [Google AdWords](/cloud-destinations/google-adwords/)
- [Google Analytics](/cloud-destinations/google-analytics/)
- [Google BigQuery](/cloud-destinations/google-bigquery/)
- [Google Tag Manager](/cloud-destinations/google-tag-manager/)
- [Google Firebase](/cloud-destinations/firebase/)
- [Heap Analytics](/cloud-destinations/heap-analytics/)
- [Hubspot](/cloud-destinations/hubspot/)
- [Intercom](/cloud-destinations/intercom/)
- [Keen IO](/cloud-destinations/keen-io/)
- [KISSmetrics](/cloud-destinations/kissmetrics/)
- [Lucky Orange](/cloud-destinations/lucky-orange/)
- [Lytics](/cloud-destinations/lytics/)
- [Microsoft Advertising](/cloud-destinations/microsoft-advertising/)
- [Mixpanel](/cloud-destinations/mixpanel/)
- [Optimizely](/cloud-destinations/optimizely/)
- [OutBrain](/cloud-destinations/outbrain/)
- [Pinterest](/cloud-destinations/pinterest/)
- [Resonate](/cloud-destinations/resonate/)
- [Retention Science](/cloud-destinations/retention-science/)
- [Rubicon](/cloud-destinations/rubicon/)
- [S3 Event Logs](/cloud-destinations/s3-event-logs/)
- [Sailthru](/cloud-destinations/sailthru/)
- [Taboola](/cloud-destinations/taboola/)
- [Twitter Ads](/cloud-destinations/twitter-ads/)
- [VWO](/cloud-destinations/vwo/)
- [Webhooks](/cloud-destinations/webhooks/)
- [Woopra](/cloud-destinations/woopra/)

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
