---
collectionKey: sources

navText: Segment Webhook

path: '/sources/segment-webhook/'

tags: [sources]
---

# Segment

## Getting data from Segment into MetaRouter Clickstream

If you'd like to get your data from Segment to MetaRouter, you can do this through our webhook API. Follow the instructions below to make this happen.

Begin by creating a server-side source in your MetaRouter app. There, you'll find a **Source ID**, which is a long string of letters and numbers.

![segment-webhook-1](/images/segment-webhook-1.png)

In your Segment UI, add a **Web Hook** integration. You can filter by integrations to "raw data" to expedite this process. Once you've created this destination, paste in this URL: `https://e.metarouter.io/v1/webhook?appId=YOUR_SOURCE_ID`, substituting `YOUR_SOURCE_ID` with the **Source ID** from your source settings.

Once you configure a destination, you can now trigger some events and confirm that they're flowing from Segment to MetaRouter via the log screen in your MetaRouter UI.
