---
collectionKey: cloud-destinations

navText: VWO

path: '/cloud-destinations/vwo/'

tags: [cloud, destinations]
---

# VWO

MetaRouter makes it easy to send your data to VWO. Once you follow the steps below, your data will be routed through our platform and pushed to VWO in the appropriate format.

## What is VWO and how does it work?

VWO is a web and mobile optimization platform that creates varied web campaigns for A/B testing. It tracks revenue, clicks, signups, and conversion goals so that marketers can analyze performance. It also monitors user engagement by providing heatmaps and click analytics for a full visualization of how your customers are interacting with your site.

Using VWO natively requires the installation of their JavaScript library. Experiments can then be deployed within the VWO web app. You will need to write custom code if you want to export experiment data for analysis or include other tools in your marketing automation stack.

## Why send data to VWO using MetaRouter?

Since VWO loads data synchronously, we can't add their JavaScript snippet for you. However, integrating VWO with MetaRouter eliminates the need to add custom code to your site if you want to include other tools in your analytics stack. By triggering an event when a visitor views an experiment variation, MetaRouter allows you to send A/B test data downstream of your other integrations. You can use this downstream data in an analytics tool of your choice, or dump it in a warehouse for more advanced analytics.

## Getting Started with VWO and MetaRouter

### VWO Side

To get started, you'll need to add the VWO JavaScript snippet to the pages that you want to track. You can check out their docs on how to do that [here](https://vwo.com/knowledge/add-vwo-smartcode-to-your-website/). Keep in mind, they use different Javascript snippets based on if your Application is a Single-Page Application or not. Make sure you load the correct one.

If you would like for analytics.js to manage the loading of the snippet for you, ensure that you have **Use Async Smart Code** enabled in your Destination settings.

### MetaRouter Side

Since the VWO snippet is now on your site, all you need to do is enable the VWO integration in your MetaRouter UI to get started. Note that there are a few different custom metrics you can track to VWO. We have outlined how to set up those methods below.

### Settings

#### Account ID

Inside the Destination's Connection, add your VWO account ID in order to fetch your VWO async smart code.

This setting is only effective if _Use Async Smart Code_ is set to `true`.

#### Send Experiment Data to other Destinations (as Track)

If enabled, analytics.js will fire a `track` event for other destinations when a page is loaded with an active VWO Experiment.

It will automatically do the same as if you programed the following code below in your application

```javascript
analytics.track('Experiment Viewed', {
  experiment_id: 'Astro-home-page-title-1`,
  variation_name: 'Stop wondering what your users want.'
});
```

#### Send Experiment Data to other Destinations (as Identify)

Akin to the above setting, enabling this option will have analytics.js fire an `identify` event for other destinations when a page is loaded with an active VWO Experiment.

#### Library Tolerance

The maximum amount of time (in milliseconds) to wait for VWO’s full library to be downloaded before simply displaying your original page.

This setting is only effective if _Use Async Smart Code_ is set to `true`.

#### Settings Tolerance

The maximum amount of time (in milliseconds) to wait for test settings before VWO will simply display your original page.

This setting is only effective if _Use Async Smart Code_ is set to `true`.

#### Use Async Smart Code

If you would like to utilize VWO’s asynchronous smart code, toggle on this feature. This means you will not need to include VWO’s native snippet on your page as MetaRouter will do this on your behalf. If this feature is toggled off, you will need to include VWO’s native smart code on your webpage.

#### Use Existing jQuery

If your page already includes jQuery, you can set this to `true`. Otherwise, VWO will include jQuery onto the page for you. VWO needs jQuery on the page to function correctly.

This setting is only effective if **Use Async Smart Code** is set to `true`.

#### Single Page App Mode

By enabling Single Page App (SPA) mode, analytics.js will load the SPA version of the VWO Async Smart Code (if that option is enabled) and will watch for new experiments that VWO loads after the app is initialized in order to trigger _Send Experiment Data to other Destinations_ option correctly. By default, analytics.js will only send Experiment data to other Destinations the first time the page is loaded. However, SPA Mode will contine to watch for new Experiments and will re-trigger sending Experiment Data to other Destination on every `.page()` call. Only one "Experiment Viewed" event will be triggered per Experiment unless the user reloads the page.
