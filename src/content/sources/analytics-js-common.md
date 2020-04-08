---
collectionKey: sources

navText: Analytics.js Common Fields

path: '/sources/analytics-js-common-fields/'

tags: [sources]
---

# Common Fields of Analytics.js API Calls

Every [API call](/analytics-js/) has a common structure. While some specific calls pass extra information, they will all pass the information detailed in this document. Note that, while MetaRouter will send all of these fields, not every destination will accept every field listed below.

## General Structure

As mentioned above, there is a general structure that governs our API calls. Below is an example of this structure in raw JSON:

```json
{
  "anonymousId": "exampleAnonymousId1234",
  "context": {
    "active": true,
    "app": {
      "name": "MetaRouter",
      "version": "123",
      "build": "1.1.1.123",
      "namespace": "com.production.metarouter"
    },
    "campaign": {
      "name": "MetaRouter Sunday Reads",
      "source": "Newsletter",
      "medium": "email",
      "term": "tps reports",
      "content": "image link"
    },
    "device": {
      "id": "exampleDeviceId",
      "advertisingId": "exampleAdvertisingId",
      "adTrackingEnabled": true,
      "manufacturer": "Apple",
      "model": "iPhone7,2",
      "name": "astro",
      "type": "ios",
      "token": "exampleToken"
    },
    "ip": "1.2.3.4",
    "library": {
      "name": "analytics.js",
      "version": "2.11.1"
    },
    "locale": "nl-NL",
    "location": {
      "city": "Cincinnati",
      "country": "United States",
      "latitude": 39.1031,
      "longitude": 84.512,
      "speed": 0
    },
    "network": {
      "bluetooth": false,
      "carrier": "Verizon",
      "cellular": true,
      "wifi": true
    },
    "os": {
      "name": "iPhone OS",
      "version": "8.1.3"
    },
    "page": {
      "path": "/",
      "referrer": "",
      "search": "",
      "title": "MetaRouter",
      "url": "https://www.metarouter.io/"
    },
    "referrer": {
      "id": "exampleId",
      "type": "example"
    },
    "screen": {
      "width": 320,
      "height": 568,
      "density": 2
    },
    "timezone": "America/Cincinnati",
    "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
  },
  "integrations": {
    "All": true
  },
  "messageId": "exampleMessageId",
  "receivedAt": "2017-12-5T01:05:31.909Z",
  "sentAt": "2017-12-5T01:05:31.581Z",
  "type": "track",
  "userId": "exampleUserId",
  "version": 2
}
```

Below is a chart detailing what the fields in the above sample payload mean.

| Field                     | Type   | Description                                                                                                                   |
| :------------------------ | :----- | :---------------------------------------------------------------------------------------------------------------------------- |
| [20]                      | [20]   | [60]                                                                                                                          |
| `anonymousId` (optional)  | Object | A pseudo-unique substitute for User ID. This is for cases when you don't have an absolutely unique identifier.                |
| `context` (optional)      | Object | Dictionary of extra information that provides useful context about a message that is not directly related to the API call     |
| `integrations` (optional) | String | Dictionary of destinations to either enable or disable                                                                        |
| `messageId` (implicit)    | String | Automatically collected, this is a unique identifier for each message that lets you find an individual message across the API |
| `receivedAt` (implicit)   | Date   | The timestamp of when a message is received by MetaRouter                                                                     |
| `sentAt` (optional)       | Date   | The timestamp of when a message is sent to MetaRouter                                                                         |
| `type` (implicit)         | String | Type of message, according to the API method                                                                                  |
| `userId` (required)       | Dtring | Unique string that identifies a user in your database                                                                         |
| `version` (implicit)      | Number | Version of the Tracking API that received the message, automatically set by MetaRouter                                        |

## Context

This section will provide other information you can gather to provide useful context about a data point. You should only use these fields for their intended meaning; they are complete and explicit specifications.

| Field       | Type   | Description                                                                                                                                                                           |
| :---------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [20]        | [20]   | [60]                                                                                                                                                                                  |
| `active`    | Bool   | Tells whether a user is active. This can be used to flag an `identify` call to update its traits                                                                                      |
| `app`       | Object | Information about the current application, including `name`, `version`, and `build`.                                                                                                  |
| `campaign`  | Object | Information about the campaign that led to the API call, including `name`, `source`, `medium`, `term`, and `content`. This field maps directly to the common UTM campaign parameters. |
| `device`    | Object | Informationa bout the device, including `id`, `manufacturer`, `model`, `name`, `type`, and `version`.                                                                                 |
| `ip`        | String | User's IP address.                                                                                                                                                                    |
| `library`   | Object | Information about the libaray making the API calls, including `name` and `version`.                                                                                                   |
| `locale`    | String | Current user's locale string                                                                                                                                                          |
| `location`  | Object | Information about user's location, including `city`, `country`, `latitude`, `longitude`, `region`, and `speed`.                                                                       |
| `network`   | Object | Information about user's current device connection, including `bluetooth`, `carrier`, `cellular`, and `wifi`.                                                                         |
| `os`        | Object | Information about user's operating system, including `name` and `version`.                                                                                                            |
| `page`      | Object | Information about the current page of the user's browser, including `hash,`, `path`, `referrer`, `search`, `title`, and `url`.                                                        |
| `referrer`  | Object | Information about how the user got to the page, including `type`, `name`, `url`, and `link`.                                                                                          |
| `screen`    | Object | Information about the user's device screen, including `density`, `height`, and `width`.                                                                                               |
| `timezone`  | String | Which timezone the user is in                                                                                                                                                         |
| `traits`    | Object | Current user's `traits`.                                                                                                                                                              |
| `userAgent` | String | User agent of the user's device.                                                                                                                                                      |

All of the fields listed in the above table can be populated, but this does not happen automatically for each one. Below is a chart that details which context fields are automatically populated. If there is no check mark, you will have to manually send these variables.

| Context Field              | Analytics.js | Analytics-ios | Analytics-android |
| :------------------------- | :----------: | :-----------: | :---------------: |
| [40]                       |     [20]     |     [20]      |       [20]        |
| `app.name`                 |      x       |       ✔       |         ✔         |
| `app.version`              |      x       |       ✔       |         ✔         |
| `app.build`                |      x       |       ✔       |         ✔         |
| `campaign.name`            |      ✔       |       x       |         x         |
| `campaign.source`          |      ✔       |       x       |         x         |
| `campaign.medium`          |      ✔       |       x       |         x         |
| `campaign.term`            |      ✔       |       x       |         x         |
| `campaign.content`         |      ✔       |       x       |         x         |
| `device.type`              |      x       |       ✔       |         ✔         |
| `device.id`                |      x       |       ✔       |         ✔         |
| `device.advertisingId`     |      x       |       ✔       |         ✔         |
| `device.adTrackingEnabled` |      x       |       ✔       |         ✔         |
| `device.manufacturer`      |      x       |       ✔       |         ✔         |
| `device.model`             |      x       |       ✔       |         ✔         |
| `device.name`              |      x       |       ✔       |         ✔         |
| `hash`                     |      ✔       |       x       |         x         |
| `library.name`             |      ✔       |       ✔       |         ✔         |
| `library.version`          |      ✔       |       ✔       |         ✔         |
| `ip`                       |      ✔       |       ✔       |         ✔         |
| `locale`                   |      x       |       ✔       |         ✔         |
| `location.latitude`        |      x       |       x       |         x         |
| `location.longitude`       |      x       |       x       |         x         |
| `location.speed`           |      x       |       x       |         x         |
| `network.bluetooth`        |      x       |       x       |         ✔         |
| `network.carrier`          |      x       |       ✔       |         ✔         |
| `network.cellular`         |      x       |       ✔       |         ✔         |
| `network.wifi`             |      x       |       ✔       |         ✔         |
| `os.name`                  |      x       |       ✔       |         ✔         |
| `os.version`               |      x       |       ✔       |         ✔         |
| `page.path`                |      ✔       |       x       |         x         |
| `page.search`              |      ✔       |       x       |         x         |
| `page.title`               |      ✔       |       x       |         x         |
| `page.url`                 |      ✔       |       x       |         x         |
| `screen.density`           |      x       |       x       |         ✔         |
| `screen.height`            |      x       |       ✔       |         ✔         |
| `screen.width`             |      x       |       ✔       |         ✔         |
| `search`                   |      ✔       |       x       |         x         |
| `title`                    |      ✔       |       x       |         x         |
| `traits`                   |      x       |       ✔       |         ✔         |
| `userAgent`                |      ✔       |       x       |         ✔         |
| `url`                      |      ✔       |       x       |         x         |
| `timezone`                 |      x       |       ✔       |         ✔         |
