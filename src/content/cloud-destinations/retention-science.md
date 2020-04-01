---
collectionKey: cloud-destinations

navText: Retention Science

path: '/cloud-destinations/retention-science/'

tags: [cloud, destinations]
---

# Retention Science

MetaRouter makes it easy to send your data to Retention Science. Once you follow the steps below, your data will be routed through our platform and pushed to Retention Science in the appropriate format.

## What is Retention Science?

Retention Science builds AI software that uses your customer base to make powerful predictions. They take the guesswork out of marketing by breaking down customer trends to develop campaigns.

Retention Science offers an automation suite that includes AI powered website personalization, subscription software, and automated email campaigns that unlock predictive and self-optimizing features that in turn deliver increased engagement and purchase rates.

## Why send data to Retention Science using MetaRouter

Integrating Retention Science with MetaRouter will better inform their Artificial Intelligence software. Adding your user event data to Retention Science will empower your team to launch more successful marketing campaigns, whether through email or directly on your website.

[Learn more about Retention Science](https://www.retentionscience.com/)

## Getting Started with Retention Science and MetaRouter

### Retention Science Side

Once you have an account on [Retention Science](https://www.retentionscience.com/), work with a Retention Science account manager to:

- Create your company's specific remarketing campaign
- Identify your Site ID and tracking `<script>` tags

**\*Note:** This connector supports client-side analytics.js only. You also need to have instrumented MetaRouter [inside your website](/sources/analytics-js/) prior to enabling this connector.\*

### MetaRouter Side

Paste your Site ID into the `Site ID` field in your MetaRouter Retention Science configuration, and give your new connection a unique name.

Check the `Enable On-Site` box, click `Save` and your pipeline will be activated.

**Custom Events & Reserved Events**

You'll notice two additional sections in our UI. Both are optional, but you can use these to map custom events to specific Retention Science events.

**\*Note:** Retention Science has a list of reserved event names (`click`, `view`, `email_open`, `email_click`, `shopping_cart`, `checkout_success`, `search`) that should not be entered as custom events. We've provided those for mapping in the Reserved Events section of our UI.\*

Confirm with your Retention Science account manager that the `<script>` tags for your specific campaigns are being sent as expected.
