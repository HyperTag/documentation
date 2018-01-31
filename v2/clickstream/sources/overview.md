---
title: Sources Overview
sidebar: platform_sidebar
---

## Client-side libraries

* [Javascript](../sources/analyticsjs.html)
* [Android](../sources/android.html)
* [iOS](../sources/ios.html)

## Server-side libraries

* [HTTP API](../sources/httpapi.html)
* [Java](../sources/java.html)
* [MeteorJS](../sources/meteorjs.html)
* [Node.js](../sources/nodejs.html)
* [.NET](../sources/net.html)
* [PHP](../sources/php.html)
* [Python](../sources/python.html)
* [Ruby](../sources/ruby.html)

> NOTE: Server-side ingestion allows you to send data to Astronomer directly from your application's server. We recommend using these sources only when client sources will not work, as client sources generally pass additional data about the user's browser and environment.  Use cases will include payment events, data that needs to be calculated from a database query, or sensitive information.

## Data Routing

We route all inbound data and translate it into a format that your destination of choice understands. You can see the sources that we currently support in the sidebar on the left hand side of the screen. If you don't see a source that you would like supported, send us an email at [humans@astronomer.io](mailto:humans@astronomer.io) to request.


## Source/Destination Compatibility Matrix

Check out the matrix below if you're wondering which sources are compatible with which destinations.

|            | Client | Server | Mobile |
| ---------- | ------ | ------ | ------ |
| Acquisio | ✔ | x | x |
| Amazon Kinesis | ✔ | ✔ | ✔ |
| Amazon Redshift | ✔ | ✔ | ✔ |
| Amplitude | ✔ | ✔ | ✔ |
| Appboy | ✔ | ✔ | x |
| Attribution | ✔ | ✔ | x |
| Bing Ads | ✔ | x | x |
| Bloom Reach | ✔ | x | x |
| Calq | x | ✔ | ✔ |
| Clicky | ✔ | x | x |
| Criteo | ✔ | x | x |
| Customer.io | ✔ | ✔ | ✔ |
| DoubleClick | ✔ | x | x |
| Drift | ✔ | x | x |
| Facebook App Events | x | ✔ | ✔ |
| Facebook Pixel | ✔ | x | x |
| Google AdWords | ✔ | x | ✔ |
| Google Analytics | ✔ | ✔ | ✔ |
| Google Tag Manager | ✔ | x | x |
| Heap Analytics | ✔ | ✔ | ✔ |
| Hubspot | ✔ | ✔ | ✔ |
| Intercom | ✔ | ✔ | ✔ |
| Keen IO | ✔ | ✔ | ✔ |
| Kenshoo | ✔ | x | x |
| KISSmetrics | ✔ | ✔ | ✔ |
| Lytics | ✔ | ✔ | ✔ |
| Mixpanel | ✔ | ✔ | ✔ |
| Netmining | ✔ | x | x |
| Optimizely | ✔ | x | x |
| OutBrain | ✔ | x | x |
| Pebble Post | ✔ | x | x |
| Resonate | ✔ | x | x |
| Retention Science | ✔ | x | x |
| Rubicon | ✔ | x | x |
| S3 Event Logs | ✔ | ✔ | ✔ |
| Taboola | ✔ | x | x |
| Twitter Ads | ✔ | x | x |
| VWO | ✔ | x | x |
| Webhooks | ✔ | ✔ | ✔ |
| Woopra | ✔ | ✔ | ✔ |
