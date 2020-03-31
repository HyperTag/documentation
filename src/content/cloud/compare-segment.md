---
collectionIndex: 3
collectionKey: cloud

path: /compare-with-segment/

navText: Compare MetaRouter and Segment
---

# Compare MetaRouter and Segment Side-by-Side

## A/A Test MetaRouter and Segment

If you are unable to test MetaRouter against Segment using an A/B testing method, MetaRouter provides a mechanism to A/A test against Segment.

### Set Segment Integrations to Cloud Mode

In order to complete a successful test, integrations need to be moved to cloud mode from inside of your Segment account. This will prevent unforeseen collisions from integration specific libraries accessing global variables.

![aa-test1](/images/aa_test1.png)

**\*Note:** Please be aware if Segment does not allow for cloud mode for a particular integration there is a risk of client-side collision occurring which may result in bad test results.\*

### Update Your MetaRouter Snippet

Next update your metarouter snippent to point to the testing metalytics snippet:

```javascript
<script type="text/javascript">
  !function(){var metalytics=window.metalytics=window.metalytics||[];if(!metalytics.initialize)if(metalytics.invoked)window.console&&console.error&&console.error("MetaRouter snippet included twice.");else{metalytics.invoked=!0;metalytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","page","once","off","on"];metalytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);metalytics.push(e);return metalytics}};for(var t=0;t<metalytics.methods.length;t++){var e=metalytics.methods[t];metalytics[e]=metalytics.factory(e)}metalytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.metarouter.io/analytics.js/v1/"+t+"/metalytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};metalytics.SNIPPET_VERSION="3.1.0";
  metalytics.load("YOUR_SOURCE_ID");
  metalytics.page()
  }}();
</script>
```

This will now allow for MetaRouter’s snippet to be run concurrently with Segment’s. Each will fire events independently and events can be tested side-by-side for comparison.

```javascript
analytics.page('hello segment');
metalytics.page(‘hello metarouter’);
```
