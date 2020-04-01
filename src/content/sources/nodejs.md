---
collectionKey: sources

navText: Node.js

path: '/sources/node-js/'

tags: [sources]
---

# Node.js

## Getting Started

This library lets you record all analytics data from your node code. You can check out it's open source code [here](https://github.com/segmentio/analytics-node). You can use this library in your web server controller code. It is high-performing in that it uses an internal queue to make `identify` and `track` calls non-blocking and fast. It also batches messages and flushes asynchronously to our servers.

### Step 1

Install the astronomer npm module.

```bash
npm install --save analytics-node
```

### Step 2

Initialize this package with the Source ID found in the settings section of your MetaRouter account.

```javascript
var Analytics = require('analytics-node')
var analytics = new Analytics('METAROUTER_SOURCE_ID', { host: 'https://e.metarouter.io' })
```

### Step 3

Set your event methods (identify, track, etc.) throughout your app.

**\*Note**: We've standardized to analytics.js. If you've used a tool like [Segment](https://segment.com/) in the past, you will find that instrumenting events in MetaRouter works in the exact same way.\*

## Calls in Node.js

Check out the below calls and their use cases to determine the calls that you need to make. We have also included examples of how you'd call specific objects in node.js.

### Identify

The `identify` method helps you associate your users and their actions to a unique and recognizable `userID` and any optional `traits` that you know about them. We recommend calling an `identify` a single time - when the user's account is first created and only again when their traits change.

```javascript
analytics.identify({
  userId: '1234qwerty',
  traits: {
    name: 'Arthur Dent',
    email: 'earthling1@hitchhikersguide.com',
    hasTowel: True,
  },
})
```

### Track

To get to a more complete event tracking analytics setup, you can add a `track` call to your website. This will tell MetaRouter which actions you are performing on your site. With `track`, each user action triggers an “event,” which can also have associated properties.

```javascript
analytics.track({
  userId: '1234qwerty',
  event: 'Added File',
  properties: {
    fileTitle: 'Life, the Universe, and Everything',
    fileSize: '42kb',
    fileType: 'PDF',
  },
})
```

### Page

The `page` method allows you to record page views on your website. It also allows you to pass addtional information about the pages people are viewing.

```javascript
analytics.page({
  userId: '1234qwerty',
  section: 'Blog',
  name: '10 Questions with Marvin, the clinically depressed robot',
  properties: {
    referrer: 'http://reddit.com/r/AMA',
  },
})
```

### Group

The `group` method associates an identified user with a company, organization, project, etc.

```javascript
analytics.group({
  userId: '1234qwerty',
  groupId: '5678dvorak',
  traits: {
    name: 'The Hitchhikers',
    relativePosition: '[39.1000° N, 84.5167° W]"',
  },
})
```

### Alias

The `alias` method combines two unassociated User IDs.

```javascript
analytics.alias({
  previousId: anonymous_id,
  userId: assigned_id_or_email,
})
```
