---
collectionKey: cloud-destinations

navText: Intercom

path: '/cloud-destinations/intercom/'

tags: [cloud, destinations]
---

# Intercom

MetaRouter makes it easy to send your data to Intercom. Once you follow the steps below, your data will be routed through our platform and pushed to Intercom in the appropriate format.

## What is Intercom and how does it work?

Intercom is a customer messaging platform, providing in-app messaging for onboarding and support. It targets chat, email, and in-app messages based on user behavior.

Intercom requires that a JavaScript snippet be added to your site or that you use the appropriate SDK for iOS and Android. If you want to send data directly into Intercom, you'll need to implement custom event tracking in your site.

## Why send data to Intercom using MetaRouter?

Integrating Intercom with MetaRouter allows you to immediately begin messaging customers based on their behavior. We also eliminate the need to home-brew a solution that tracks user events to Intercom.

## Getting Started with Intercom and MetaRouter

### Intercom Side

Once you're on the [Get started with Intercom](http://www.intercom.io) page, you'll be asked if you want to either integrate one of their libraries or import users from another service/csv.

![intercom1](/images/intercom1.png)

Click on `Integrate` and then `Segment` (You're still setting up MetaRouter, don't worry).

![intercom2](/images/intercom2.png)

Go ahead and click `Next` to continue the setup.

![intercom3](/images/intercom3.png)

This is where you'll actually create your account and get started using Intercom.

![intercom4](/images/intercom4.png)

Skip the `Set up Intercom & Segment` prompt and click on the gear wheel icon on the top right and then into the `Integrations` option in the dropdown.

![intercom5](/images/intercom5.png)

From here, click on the `API Keys` on the left hand panel to access your Source ID and API Key. Your Source ID will look something like this: `9iefb489`.

![intercom6](/images/intercom6.png)

### MetaRouter Side

Enter your Source ID and API Key into the Intercom connector on your MetaRouter dashboard.

Give your new connection a unique name.

Click `Save` to activate your pipeline.

![intercom7](/images/intercom7v2.png)

At this point, you'll see events coming in to your Intercom account. If you click on the `People` icon on the top of your dashboard, you'll see 1 new user. That's you!

![intercom8](/images/intercom8.png)

Click on that new user to see the history of events being recorded.

![intercom9](/images/intercom9.png)

## Additional Features

### Disassociating Users from a Company (server-side only)

You can disassociate a user from a company by passing in a field inside the `company` trait with `remove: true` in your `identify` calls.

### Identity verification plus filtering via Destinations Object

If you're using Intercom identity verification AND the `selective destinations functionality`, the context object will look like this:

```
{
  integrations: {
    All: false,
    Intercom: {
      user_hash: '<%= OpenSSL::HMAC.hexdigest("sha256", "YOUR_INTERCOM_APP_SECRET", current_user.id) %>'
    }
  }
}
```

### Unsubscribe Users

With MetaRouter, you can unsubscribe users from email by setting a flag from `server side` libraries `unsubscribedFromEmails`, inside `context` object.

`node.js` example:

```javascript
analytics.identify({
  userId: '4832094283057439285723523452345',
  anonymousId: '43254364571',
  context: {
    Intercom: { unsubscribedFromEmails: true },
  },
  traits: {
    firstName: 'John ',
    lastName: 'Jacob',
    email: 'jingleheimer@schmidt.com',
  },
})
```

**Note:** This will only work from server-side libraries and mobile, NOT for Analytics.js.
