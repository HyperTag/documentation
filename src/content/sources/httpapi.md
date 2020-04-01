---
collectionKey: sources

navText: HTTP API

path: '/sources/http-api/'

tags: [sources]
---

# HTTP Tracking API

This document review the basic structure of our HTTP Tracking API endpoints and how to connect and send information into the system via the API.

## Getting Started

### Authentication (optional)

You'll need to supply your app_ID with each request using HTTP Basic Auth.

Basic Auth base64 encodes a 'username:password' and prepends it with the string 'Basic'. The native libraries should handle this for you, but if they do not you'll need to base64 encode a string in which the username is the Source ID and the password is empty. You can base64 encode your Source ID [here](https://www.base64encode.org/)

For example, if your Source ID is ILoveData123, that will be encoded to SUxvdmVEYXRhMTIz. Then, your encoded authentication line in your header will look like this:

```
Authorization: Basic SUxvdmVEYXRhMTIz
```

### Content-Type

Make sure to set the content-type header to `application/json`.

### Errors and Error responses

The HTTP Tracking API uses several response codes to validate requests sent to the API. The following are response codes render by the server and what they mean

| Status Code                  | Explanation                                                                                                 |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 200 OK                       | Event data is valid and has been accepted in the system                                                     |
| 207 Multi-Status             | Used by the batch endpoint to signify partial success indicating some events were valid while others failed |
| 400 Bad Request              | Event data contains errors and can not be processed by the system                                           |
| 413 Request Entity Too Large | Used to signify the event payload is too large to be received                                               |

Error responses render JSON bodies that can help determine the reason the event was rejected by the system. The following is an example of a typical error response. the Errors key contains an array of error objects with a list of all of the errors encountered by the system

```json
{
  "Error": "Bad Request",
  "Message": "Invalid or missing writekey",
  "Details": ""
}
```

Batch error endpoints return errors in a slightly different format. the Errors key contains an array of error objects with a list of all of the errors encountered by the system

```json
{
  "Success": false,
  "Errors": [
    {
      "Error": "Bad Request",
      "Message": "Error reading request body",
      "Details": "HTTP request too large"
    }
  ]
}
```

### Max Request Size

There is a maximum of 15KB per call (our batch endpoint accepts a maximum of 500KB per batch and 15KB per call). HTTP Tracking API will respond with 413 request entity too large if these limits are exceeded.

### Common Fields

Below are some fields are common across all events a list of common fields and their description.

#### General Event Fields

| Field        | Required                               | Type   | Explanation                                                                                                                                                                                                                                                                                 |
| ------------ | -------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| anonymousId  | optional (if `userId` exists)          | String | A pseudo-unique substitute for a User ID, for cases when you don’t have an absolutely unique identifier. A userId or an anonymousId is required.                                                                                                                                            |
| context      | optional                               | Object | Dictionary of extra information that provides useful context about a message, but is not directly related to the API call like ip address or locale See the Context field docs for more details.                                                                                            |
| integrations | optional                               | Object | Dictionary of destinations to either enable or disable See the Destinations field docs for more details.                                                                                                                                                                                    |
| messageId    | Required                               | String | A unique identifier for each message that lets you find an individual message across the API.                                                                                                                                                                                               |
| receivedAt   | implicit                               | Date   | Automatically set by HTTP Tracking API, the timestamp of when a message is received by HTTP Tracking API It is an ISO-8601 date string.                                                                                                                                                     |
| sentAt       | optional                               | Date   | Timestamp of when a message is sent to HTTP Tracking API, used for clock skew correction It is set automatically by the tracking libraries. It is an ISO-8601 date string.                                                                                                                  |
| timestamp    | optional                               | Date   | Timestamp when the message itself took place, defaulted to the current time by the HTTP Tracking API, as a ISO-8601 format date string. If the event just happened, leave it out and we’ll use the server’s time. If you’re importing data from the past, make sure to provide a timestamp. |
| type         | required                               | String | Type of message, corresponding to the API method: `identify`, `group`, `track`, `page`, `screen`, or `alias`.                                                                                                                                                                               |
| userId       | optional if anonymousID is set instead | String | Unique identifier for the user in your database. A userId or an anonymousId is required.                                                                                                                                                                                                    |

#### Context Object Fields

| Field     | Type    | Explanation                                                                                                                                                                                                                                           |
| --------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active    | Boolean | Whether a user is active. This is usually used to flag an .identify() call to just update the traits but not _last seen_.                                                                                                                             |
| app       | Object  | dictionary of information about the current application, containing name, version and build. This is collected automatically from our mobile libraries when possible.                                                                                 |
| campaign  | Object  | Dictionary of information about the campaign that resulted in the API call, containing name, source, medium, term, and content. This maps directly to the common UTM campaign parameters.                                                             |
| device    | Object  | Dictionary of information about the device, containing id, manufacturer, model, name, type and version.                                                                                                                                               |
| ip        | String  | Current user’s IP address.                                                                                                                                                                                                                            |
| library   | Object  | Dictionary of information about the library making the requests to the API, containing name and version.                                                                                                                                              |
| locale    | String  | Locale string for the current user. For example, `en-US`.                                                                                                                                                                                             |
| location  | Object  | Dictionary of information about the user’s current location, containing city, country, latitude, longitude, region, and speed.                                                                                                                        |
| network   | Object  | Dictionary of information about the current network connection, containing bluetooth, carrier, cellular, and wifi                                                                                                                                     |
| os        | Object  | Dictionary of information about the operating system, containing name and version                                                                                                                                                                     |
| page      | Object  | Dictionary of information about the current page in the browser, containing hash, path, referrer, search, title, and url. This is automatically collected by Analytics.js.                                                                            |
| referrer  | Object  | Dictionary of information about the way the user was referred to the website or app, containing type, name, url, and link                                                                                                                             |
| screen    | Object  | Dictionary of information about the device’s screen, containing density, height, and width                                                                                                                                                            |
| timezone  | String  | Timezones are sent as tzdata strings to add user timezone information which might be stripped from the timestamp. For example, `America/New_York`                                                                                                     |
| groupId   | String  | Group / Account ID. This is useful in B2B use cases where you need to attribute your non-group calls to a company or account. It is relied on by several Customer Success and CRM tools.                                                              |
| traits    | Object  | Dictionary of traits of the current user. This is useful in cases where you need to track an event, but also associate information from a previous identify call. You should fill this object the same way you would fill traits in an identify call. |
| userAgent | String  | User-agent of the device making the request                                                                                                                                                                                                           |

## Standard Calls

Check out the `POST` calls below and their use cases to determine the calls that you need to make. We have also included examples of how you'd call specific objects using the HTTP API.

### Identify

The `identify` method helps you associate your users and their actions to a unique and recognizable `userID` and any optional `traits` that you know about them. We recommend calling an `identify` a single time - when the user's account is first created and only again when their traits change.

Post `https://e.metarouter.io/v1/i` or `https://e.metarouter.io/v1/identify`

| Field  | Required | Type   | Explanation                                                    |
| ------ | -------- | ------ | -------------------------------------------------------------- |
| traits | optional | Object | Free-form dictionary of traits of the user, like email or name |

```json
{
  "userId": "1234qwerty",
  "traits": {
    "name": "Arthur Dent",
    "email": "earthling1@hitchhikersguide.com",
    "hasTowel": True,
  }
  "timestamp": "2015-11-10T00:45:23.412Z",
  "type": identify
}
```

### Track

To get to a more complete event tracking analytics setup, you can add a `track` call to your website. This will tell MetaRouter which actions you are performing on your site. With `track`, each user action triggers an “event,” which can also have associated properties.

Post `https://e.metarouter.io/v1/t` or `https://e.metarouter.io/v1/track`

| Property   | Required | Type   | Explanation                                                   |
| ---------- | -------- | ------ | ------------------------------------------------------------- |
| eventName  | required | String | Name of the action that a user has performed.                 |
| properties | optional | Object | Free-form dictionary of properties of the event, like revenue |

```json
{
  "userId": "1234qwerty",
  "event": "Added File",
  "properties": {
    "fileTitle": "Life, the Universe, and Everything",
    "fileSize": "42kb",
    "fileType": "PDF"
  },
  "timestamp": "2015-11-10T00:45:23.412Z"
  "type": track
}
```

### Page

The `page` method allows you to record page views on your website. It also allows you to pass addtional information about the pages people are viewing.

Post `https://e.metarouter.io/v1/p` or `https://e.metarouter.io/v1/page`

| Property   | Required | Type   | Explanation                                                                                                                                     |
| ---------- | -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| name       | optional | String | Name of the page For example, most sites have a “Signup” page that can be useful to tag, so you can see users as they move through your funnel. |
| properties | optional | Object | Free-form dictionary of properties of the event, like revenue                                                                                   |

```json
{
  "userId": "1234qwerty",
  "section": "Blog",
  "name": "10 Questions with Marvin, the clinically depressed robot",
  "properties": {
    "referrer": "http://reddit.com/r/AMA"
  }
  "type": page
}
```

### Group

The `group` method associates an identified user with a company, organization, project, etc.

Post `https://e.metarouter.io/v1/g` or `https://e.metarouter.io/v1/group`

| Property | Required | Type   | Explanation                                                                                                                   |
| -------- | -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| groupId  | required | String | A unique identifier for the group in your database. See the Group ID field docs for more detail.                              |
| traits   | optional | Object | Free-form dictionary of traits of the group, like email or name See the Traits field docs for a list of reserved trait names. |

```json
{
  "userId": "1234qwerty",
  "groupId": "5678dvorak",
  "traits": {
    "name": "The Hitchhikers",
    "relativePosition": "[39.1000 N, 84.5167 W]"
    }
  "type": group
}
```

### Alias

The `alias` method combines two unassociated User IDs.

Post `https://e.metarouter.io/v1/a` or `https://e.metarouter.io/v1/alias`

| Property   | Required                           | Type   | Explanation                                                                                                                                                                                   |
| ---------- | ---------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| previousId | required                           | String | The previousId is the existing ID you’ve referred to the user by. It might be an Anonymous ID assigned to that user or a User ID you previously identified them with using our identify call. |
| userId     | optional (if `anonymousId` exists) | String | Unique identifier for the user in your database. A userId or an anonymousId is required.                                                                                                      |

```json
{
  "previousId": "anonymous_id",
  "userId": "assigned_id_or_email",
  "timestamp": "2015-11-10T00:45:23.412Z"
  "type": alias
}
```

## Utility Endpoints

There are additional event collection endpoints to help with specific implementation use-cases.

### Batch

The `batch` method allows for submitting multiple events with one request. Batching events is useful for increased performance from the application and the MetaRouter Platform. The events follow the standard message formats from above and allow for context and timestamps to be injected from the top level.

Post `https://e.metarouter.io/v1/batch` or `https://e.metarouter.io/v1/import`

```json
{
  "batch": [
    {
      "anonymousId": "cf09e649-fd0b-46b6-9fc1-53ab9cd05c47",
      "messageId": "317b11a8-8cd3-40ad-b3fb-622835c42cfd",
      "sentAt": "2020-03-02T18:29:53.661Z",
      "timestamp": "2020-03-02T18:29:27.333Z",
      "type": "track",
      "writeKey": "test1",
      "event": "example 1 event"
    },
    {
      "anonymousId": "cf09e649-fd0b-46b6-9fc1-53ab9cd05c47",
      "messageId": "317b11a8-8cd3-40ad-b3fb-123d417b11a8",
      "sentAt": "2020-03-02T18:29:53.661Z",
      "timestamp": "2020-03-02T18:29:27.333Z",
      "type": "track",
      "writeKey": "test1",
      "event": "example 1 event"
    }
  ],
  "context": {
    "page": {
      "path": "/mycart/home",
      "referrer": "https://www.example.com/",
      "title": "Example - Shopping Cart",
      "url": "https://www.example.com/mycart/home"
    },
    "userAgent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36"
  },
  "integrations": {
    "All": false,
    "Mixpanel": true
  }
}
```

### Tracking Pixel

The API also exposes an `/v1/pixel/...` route for each of our single event POST requests to allow you to send data via a GET request. This option requires you to include the JSON payload as a Base64 encoded query parameter.

For example, the following payload for a Track Event:

```json
{
  "integrations": {},
  "context": {
    "page": {
      "path": "/home"
    },
    "library": {
      "name": "analytics.js",
      "version": "3.2.21"
    }
  },
  "event": "example event",
  "messageId": "1234567890",
  "type": "track",
  "writeKey": "example",
  "userId": "0987654321"
}
```

Would be sent as a Tracking Pixel by calling the following URL:

```
https://e.metarouter.io/v1/pixel/track?data=ewogICAgImludGVncmF0aW9ucyI6IHt9LAogICAgImNvbnRleHQiOiB7CiAgICAgICAgInBhZ2UiOiB7CiAgICAgICAgICAgICJwYXRoIjogIi9ob21lIgogICAgICAgIH0sCiAgICAgICAgImxpYnJhcnkiOiB7CiAgICAgICAgICAgICJuYW1lIjogImFuYWx5dGljcy5qcyIsCiAgICAgICAgICAgICJ2ZXJzaW9uIjogIjMuMi4yMSIKICAgICAgICB9CiAgICB9LAogICAgImV2ZW50IjogImV4YW1wbGUgZXZlbnQiLAogICAgIm1lc3NhZ2VJZCI6ICIxMjM0NTY3ODkwIiwKICAgICJ0eXBlIjogInRyYWNrIiwKICAgICJ3cml0ZUtleSI6ICJleGFtcGxlIiwKICAgICJ1c2VySWQiOiAiMDk4NzY1NDMyMSIKfQ==

```

The following are the supported Tracking Pixel routes:

- `/v1/pixel/track`
- `/v1/pixel/page`
- `/v1/pixel/alias`
- `/v1/pixel/identify`
- `/v1/pixel/group`

## Webhook Endpoint

Our API is able to receive Analytics.js formatted data from other systems from a general POST route, normally used for other platforms that can send data in this format as a Webhook.

Set the URL to be used as `https://e.metarouter.io/v1/webhook` or `https://e.metarouter.io/v1/w` and add a query parameter to set the Write Key for the MetaRouter Platform to overwrite the incoming data with.

For example, `https://e.metarouter.io/v1/webhook?writeKey=abcdefg` where the `writeKey` is replaced with that of the Source Write Key you have configured.
