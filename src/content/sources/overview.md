---
collectionIndex: 0
collectionKey: sources
collectionTitle: Sources & SDKs

navIndex: 5
navText: Overview

path: '/sources-and-sdks/'
---

# Sources and SDKs

## Client-side libraries

- [JavaScript](/sources/analytics-js/)
- [Android](/sources/android/)
- [iOS](/sources/ios/)
- [React Native](/sources/react-native/)

## Server-side libraries

- [HTTP API](/sources/http-api/)
- [Java](/sources/java/)
- [MeteorJS](/sources/meteor-js/)
- [Node.js](/sources/node-js/)
- [.NET](/sources/dot-net/)
- [PHP](/sources/php/)
- [Python](/sources/python/)
- [Ruby](/sources/ruby/)
- [Segment Webhook](/sources/segment-webhook/)

> NOTE: Server-side ingestion allows you to send data to MetaRouter directly from your application's server. We recommend using these sources only when client sources will not work, as client sources generally pass additional data about the user's browser and environment. Use cases will include payment events, data that needs to be calculated from a database query, or sensitive information.

## Data Routing

We route all inbound data and translate it into a format that your destination of choice understands. You can see the sources that we currently support in the sidebar on the left hand side of the screen. If you don't see a source that you would like supported, send us an email at [support@metarouter.io](mailto:support@metarouter.io) to request.

## Source/Destination Compatibility Matrix

<!-- TODO: Figure out how to get EE edition destinations into this matrix -->

Check out the matrix below if you're wondering which sources are compatible with which destinations.

|                     | Client | Server | Mobile |
| ------------------- | ------ | ------ | ------ |
| Acquisio            | ✔      | x      | x      |
| Adobe Analytics     | ✔      | x      | x      |
| Amazon Kinesis      | ✔      | ✔      | ✔      |
| Amazon Redshift     | ✔      | ✔      | ✔      |
| Amplitude           | ✔      | ✔      | ✔      |
| Attribution         | ✔      | ✔      | x      |
| Bloom Reach         | ✔      | x      | x      |
| Braze               | ✔      | ✔      | x      |
| Calq                | x      | ✔      | ✔      |
| Clicky              | ✔      | x      | x      |
| Criteo              | ✔      | x      | x      |
| Customer.io         | ✔      | ✔      | ✔      |
| DoubleClick         | ✔      | x      | x      |
| Drift               | ✔      | x      | x      |
| Facebook App Events | x      | ✔      | ✔      |
| Facebook Pixel      | ✔      | x      | x      |
| Google AdWords      | ✔      | x      | ✔      |
| Google Analytics    | ✔      | ✔      | ✔      |
| Google BigQuery     | ✔      | ✔      | ✔      |
| Google Tag Manager  | ✔      | x      | x      |
| Heap Analytics      | ✔      | ✔      | ✔      |
| Hubspot             | ✔      | ✔      | ✔      |
| Intercom            | ✔      | ✔      | ✔      |
| Keen                | ✔      | ✔      | ✔      |
| Kenshoo             | ✔      | x      | x      |
| KISSmetrics         | ✔      | ✔      | ✔      |
| Lucky Orange        | ✔      | x      | x      |
| Lytics              | ✔      | ✔      | ✔      |
| Microsoft Ads       | ✔      | x      | x      |
| Mixpanel            | ✔      | ✔      | ✔      |
| Netmining           | ✔      | x      | x      |
| Optimizely          | ✔      | x      | x      |
| OutBrain            | ✔      | x      | x      |
| Pebble Post         | ✔      | x      | x      |
| Resonate            | ✔      | x      | x      |
| Retention Science   | ✔      | x      | x      |
| Rubicon             | ✔      | x      | x      |
| S3 Event Logs       | ✔      | ✔      | ✔      |
| Sailthru            | ✔      | ✔      | ✔      |
| Taboola             | ✔      | x      | x      |
| Twitter Ads         | ✔      | x      | x      |
| VWO                 | ✔      | x      | x      |
| Webhooks            | ✔      | ✔      | ✔      |
| Woopra              | ✔      | ✔      | ✔      |
