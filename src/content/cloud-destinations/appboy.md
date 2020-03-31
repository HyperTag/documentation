---
collectionKey: cloud-destinations

navText: Braze

path: '/cloud-destinations/braze/'
---

# Braze

MetaRouter makes it easy to send your data to Braze, [formerly Appboy](https://www.braze.com/documentation/braze_faqs/?utm_campaign=2017-Braze-Launch&utm_medium=Appboy-Dashboard&utm_source=Dashboard-Email). Once you follow the steps below, your data will be routed through our platform and pushed to Braze in the appropriate format.

## What is Braze and how does it work?

Braze is a mobile marketing automation platform that allows your marketing team to engage with audience across lifecycles. It does this by pooling first-party and third-party data through APIs, in-store purchases, and mobile information. Braze also automates email delivery by using predictive analytics to decipher optimal messaging time based on user actions or API triggers.

Because Braze has a predictive analytics component, it functions most effectively when all of your customer data is available in the tool. In order to collect this data across multiple channels, you would need to do a lot of upfront work: planning about what customer data you want to track, learning and implementing Braze SDKs, and implementing server-to-server API calls.

## Why send data to Braze using MetaRouter?

Integrating Braze with MetaRouter means that you can track users across your web, mobile, and server-side apps. Without installing additional code in the form of Braze SDKs or API libraries, you'll be able to receive all [`identify` and `track` calls](,,/calls.html) in the format that Braze understands.

## Getting started with Braze

Note that you can only integrate Braze with server-side and mobile sources.

### Braze Side

Once you've created your Braze account, you'll need to find your `App Group Identifier`. You can find this ID in the Braze Dashboard under `App Settings-->Developer Console`.

### MetaRouter side

Paste your `App Group Identifier` into the appropriate field in your MetaRouter UI to get your data flowing!
