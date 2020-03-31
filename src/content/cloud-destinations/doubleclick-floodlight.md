---
collectionKey: cloud-destinations

navText: DoubleClick Floodlight

path: '/cloud-destinations/doubleclick-floodlight/'
---

# DoubleClick Floodlight

MetaRouter makes it easy to send your data to DoubleClick Floodlight. Once you follow the steps below, your data will be routed through our platform and pushed to DoubleClick Floodlight in the appropriate format.

## What is DoubleClick Floodlight and how does it work?

DoubleClick Floodlight is a system developed by Google used for ad tracking and reporting. It operates by creating an image pixel tag to track user action once they click on a Google Ad. By using a single set of Floodlight tags, it avoids cross-channel redundancy. It also integrates directly with AdWords and Google Analytics to track all activity across multiple platforms.

DoubleClick Floodlight requires the installation of an HTML `Floodlight tag` on every page that you want to track. When a customer clicks an ad that lands them on a page with a `Floodlight tag` embedded within the HTML, the tag sends data about the conversion back to DoubleClick. Setting this up on every page that you want to track is burdensome and requires a commitment from your developer team to write custom event tracking code and learn new tags to make the tool work for your business. That's where we come in.

For more information on DoubleClick Floodlight, check out [this page](https://support.google.com/dfa/partner/answer/186739?hl=en).

## Why send data to DoubleClick Floodlight using MetaRouter?

By integrating DoubleClick Floodlight with MetaRouter, you can send information directly to DoubleClick without even using the `Floodlight tag`. Once you enable it as a destination in your MetaRouter UI, your data will routed by MetaRouter and sent to DoubleClick. By using MetaRouter to enable DoubleClick, you eliminate the need for additional developer resources and custom event tracking code.

## Getting Started with DoubleClick Floodlight and MetaRouter

### DoubleClick Floodlight Side

With the DoubleClick Floodlight destination, you can make calls directly to Floodlight based on your mapped events. To begin doing this, you'll need your Advertiser ID. Because DoubleClick is a rather expensive platform, you might be going through a DoubleClick Partner, such as [Mightyhive](http://mightyhive.com). If this is the case, you'll have to obtain your Advertiser ID directly from the partner.

### MetaRouter Side

Once you find your seven-digit Advertiser ID, enter it into the corresponding field in the MetaRouter UI. Under this field, you'll find space for your Activity Group label (referred to as "type" within DoubleClick) as well as your Activity Tag String Value (referred to as "cat") for tracking page views.

If you want to pass in specific track events to DoubleClick, you can do so within the Events section in the Advanced tab. Simply specify the name of the event _exactly_ as it is sent to MetaRouter and the corresponding Type and CAT values for the Activity Group in DoubleClick.

In the past, we've seen Floodlight tags that look something like this:

```HTML
<!--
Start of DoubleClick Floodlight Tag: Please do not remove

Activity name of this tag: MYACTIVITYNAME - Conversion Tag

URL of the webpage where the tag is expected to be placed: https://www.myurl.com/

This tag must be placed between the <body> and </body> tags, as close as possible to the opening tag.

Creation Date: 02/08/2017

-->

<iframe src="https://1234567.fls.doubleclick.net/activityi;src=1234567;type=myurl00;cat=myurl0;qty=1;cost=[Revenue];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=[OrderID]?" width="1" height="1" frameborder="0" style="display:none"></iframe>

<!-- End of DoubleClick Floodlight Tag: Please do not remove -->
```

### How to implement the Floodlight tag

Insert the Floodlight tags between the `<body>` and `</body>` tags, as close to the top of the page as possible.

In this example, `mytype00` is your `type` and `mycat0` is your `cat` in the MetaRouter UI.

Custom properties can be added to the events sent to Doubleclick by specifying the specific property and mapping to the corresponding property label in Doubleclick (e.g. u1, u2, etc.)

**Note**: When adding new events to track with DoubleClick, make sure the `Event key` matches the `Event name` exactly.

Once you have all of this set up, click `Save` to activate your pipeline.
