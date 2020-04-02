---
collectionKey: cloud-destinations

navText: Google Firebase

path: '/cloud-destinations/firebase/'

tags: [cloud, destinations]
---

# Google Firebase

Available for server-side and mobile sources, MetaRouter makes it easy to send your data to Firebase. Once you follow the steps below, your data will be routed through our platform and pushed to Firebase in the appropriate format.

## What is Firebase and how does it work?

Firebase is an app development platform owned by Google that allows users to build, monitor and improve apps based on valuable app performance feedback. Google is migrating their app development monitoring to Firebase, and in the process sunsetting the Google Analytics Mobile SDKs. A major advantage of this change is that while apps were previously limited to 10MM events per month before requiring Google's Analytics 360 subscription, Firebase users will now be allowed unlimited hits on his/her app within the free Google Analytics platform.

Firebase is powered by Google Firebase SDKs that require installation for both iOS and Android apps. These SDKs are entirely separate from the previous Google Analytics Services SDKs, and will need to be installed if you wish to track event data for your apps through Google Analytics.

[Learn more about Firebase](https://firebase.google.com/)

## Why send data to Firebase using MetaRouter?

With MetaRouter's Firebase integration, you will be able to push your app event data in Google Analytics once the Google Analytics Services SDKs are sunsetted. Just like with the Google Analytics destination, Firebase passes along all of the essential information to GA that you need to effectively measure app performance, such as app screens viewed, user attributes, and more. You can also configure the custom fields that you are familiar with, making it just as easy to track the data you need.

## Getting Started with Firebase and MetaRouter

### Firebase Side

You will need to install the iOS and/or Android Segment-Firebase SDKs (shout-out to Segment for making these available!). To do this, please see the following steps below.

#### Firebase for iOS

Register your app in the [Firebase Console](https://console.firebase.google.com/) and add the `GoogleService-Info.plist` to the root of your Xcode project.

Add the following dependency to your Podfile: `pod 'Segment-Firebase'`

After adding the dependency, import the integration:

```objectivec
#import <Segment-Firebase/SEGFirebaseIntegrationFactory.h>
```

Finally, register the dependency with the Segment SDK:

```objectivec
[config use:[SEGFirebaseIntegrationFactory instance]];
```

By default, Segment only bundles `Firebase/Core` which is [Firebase’s Analytics offering](https://firebase.google.com/docs/analytics/). You can see the other available [Firebase pods and features here](https://firebase.google.com/docs/ios/setup).

If configuring for proxy HTTP calls, follow these additional steps once you have completed the above:

1. Add this call:

```objectivec
SEGAnalyticsConfiguration *configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];

// Set a custom request factory which allows you to modify the way the library creates an HTTP request.
// In this case, we're transforming the URL to point to our own custom non-Segment host.

configuration.requestFactory = ^(NSURL *url) {
    NSURLComponents *components = [NSURLComponents componentsWithURL:url resolvingAgainstBaseURL:NO];
    // Replace http://e.metarouter.io/ with the address of your proxy, e.g. aba64da6.ngrok.io.
    components.host = @"http://e.metarouter.io/";
    NSURL *transformedURL = components.URL;
    return [NSMutableURLRequest requestWithURL:transformedURL];
};
// Set any other custom configuration options.
// Initialize the SDK with the configuration.
[SEGAnalytics setupWithConfiguration:configuration];
```

2. Then add the following Swift and objC configurations to point to MetaRouter:

```swift
configuration.requestFactory = { url in
            var components = URLComponents.init(url: url, resolvingAgainstBaseURL: false)
            let host = components?.host
            if (host == "cdn-settings.segment.com") {
                components?.host = "cdn.metarouter.io"
            } else if (host == "api.segment.io") {
                components?.host = "e.metarouter.io"
            }
            return NSMutableURLRequest.init(url: components?.url ?? url)
        }
```

```objectivec
configuration.requestFactory = ^(NSURL *url) {
        NSURLComponents *components = [NSURLComponents componentsWithURL:url resolvingAgainstBaseURL:NO];
        NSString* host = components.host;
        if ([host isEqualToString:@"cdn-settings.segment.com"]) {
            components.host = @"cdn.metarouter.io";
        } else if ([host isEqualToString:@"api.segment.io"]) {
            components.host = @"e.metarouter.io";
        }
        NSURL *transformedURL = components.URL;
        return [NSMutableURLRequest requestWithURL:transformedURL];
    };
```

#### Firebase for Android

To start sending data to Firebase Analytics from your Android project, you’ll need to follow a few simple steps:

Register your mobile app with Firebase at https://console.firebase.google.com

Once your app is registered, you’ll be prompted to download a google-services.json file. Place this in your Application’s “app” folder. This file contains all necessary configurations and cannot be used across multiple apps. If you’re configuring Firebase for other apps, you should create a new view in your Firebase console and download a unique google-services.json file for each.

**Module-level build.gradle:** Add the Segment-Firebase SDK and apply the Google Services plugin at the end of the file:

```
buildscript {
    dependencies {
        // Add these lines
        implementation 'com.segment.analytics.android:analytics:4.+'
        implementation 'com.segment.analytics.android.integrations:firebase:+'
    }
}

// Add to the bottom of the file
apply plugin: 'com.google.gms.google-services'
```

**Project-level build.gradle:** Add Google Services dependency and their Maven repo location to repositories:

```
buildscript {
    dependencies {
        // Add this line
        classpath 'com.google.gms:google-services:3.1.0'
    }
}

allprojects {
    repositories {
        // Add this line
        maven { url 'https://maven.google.com' }
    }
}
```

Add these permissions to your AndroidManifest.xml:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

Finally, register the dependency with the Segment SDK in your application subclass, as seen here in [Segment's Android library documentation](https://segment.com/docs/sources/mobile/android/#packaging-device-based-destination-sdks).

Periodically, Firebase updates the Android configuration requirements for loading their SDK in your app. To validate that your Android configuration is sufficient for your version of Firebase, please consult Google’s [Firebase release notes](https://firebase.google.com/support/release-notes/android#). You can find the corresponding version of the Firebase SDK Segment required in each of the Segment-Firebase SDK versions by consulting the [Segment-Firebase changelog](https://github.com/segment-integrations/analytics-android-integration-firebase/blob/master/CHANGELOG.md). For example, Segment-Firebase 1.3.1 includes Firebase Core 17.0.1 as a dependency.

```java
Analytics analytics = new Analytics.Builder(context, writeKey)
  .use(FirebaseIntegration.FACTORY)
  ...
  .build();
```

By default, we bundle only Firebase/Core which is [Firebase’s Analytics offering](https://firebase.google.com/docs/analytics/). You can see the other available [Firebase dependencies and features here](https://firebase.google.com/docs/android/setup).

#### Proxy HTTP calls

If configuring for proxy HTTP calls, follow these additional steps once you have completed the above:

1. Add this call:

```java
Analytics analytics = new Analytics.Builder(this, ANALYTICS_WRITE_KEY) //
        .connectionFactory(new ConnectionFactory() {
          @Override protected HttpURLConnection openConnection(String url) throws IOException {
            String path = Uri.parse(url).getPath();
            // Replace http://e.metarouter.io/ with the address of your proxy, e.g. https://aba64da6.ngrok.io.
            return super.openConnection("http://e.metarouter.io/" + path);
          }
        })
        .build();
```

2. Then add the following Swift, objC and Android configurations to point to MetaRouter:

```swift
configuration.requestFactory = { url in
            var components = URLComponents.init(url: url, resolvingAgainstBaseURL: false)
            let host = components?.host
            if (host == "cdn-settings.segment.com") {
                components?.host = "cdn.metarouter.io"
            } else if (host == "api.segment.io") {
                components?.host = "e.metarouter.io"
            }
            return NSMutableURLRequest.init(url: components?.url ?? url)
        }
```

```objectivec
configuration.requestFactory = ^(NSURL *url) {
        NSURLComponents *components = [NSURLComponents componentsWithURL:url resolvingAgainstBaseURL:NO];
        NSString* host = components.host;
        if ([host isEqualToString:@"cdn-settings.segment.com"]) {
            components.host = @"cdn.metarouter.io";
        } else if ([host isEqualToString:@"api.segment.io"]) {
            components.host = @"e.metarouter.io";
        }
        NSURL *transformedURL = components.URL;
        return [NSMutableURLRequest requestWithURL:transformedURL];
    };
```

```java
Analytics analytics = new Analytics.Builder(this, ANALYTICS_WRITE_KEY) //
        .connectionFactory(new ConnectionFactory() {
          @Override protected HttpURLConnection openConnection(String url) throws IOException {
            Uri parsedUri = Uri.parse(url);
            String path = parsedUri.getPath();
            String host = parsedUri.getHost();

            if (host.equals("cdn-settings.segment.com")) {
              return super.openConnection("https://cdn.metarouter.io" + path);
            } else if (host.equals("api.segment.io")) {
              return super.openConnection("https://e.metarouter.io" + path);
            }

            return super.openConnection(url);
          }
        })
        .build();
```

## Examples

### Identify

When you call `identify` the library will map to the corresponding Firebase Analytics calls:

- If there is a `userId` on your `identify call`, the library triggers `setUserId` via the Firebase SDK
- If there are traits included, the library will set user properties for each trait you include on the `identify` call

You can use these traits to create audiences and views to analyze your users’ behavior.

**Note:** Google prohibits sending PII to Firebase unless [“robust notice”](https://firebase.google.com/policies/analytics/) is given to your app users. For iOS apps, you must include the iAD Framework to automatically collect the Age, Gender, and Interests Firebase properties.

Learn more about [Firebase’s reporting dashboard](https://support.google.com/firebase/answer/6317517?hl=en&ref_topic=6317489) here.

**Firebase has strict requirements for User Property names; they must:**

- Begin with a letter (not a number or symbol, including an underscore)
- Contain only alphanumeric characters and underscores
- Be no longer than 40 characters

User Property values must be fewer than 100 characters.

You are limited to 25 unique user properties per Firebase Console.

**MetaRouter automatically:**

- Trims leading and trailing whitespace from user property names
- Replaces spaces with underscores
- Trims property names to 40 characters (Android only)

Firebase automatically collects these [user properties](https://support.google.com/firebase/answer/6317486).

### Track

When you call `track` MetaRouter will log the event with Firebase. Firebase automatically tracks [the events listed here](https://support.google.com/firebase/answer/6317485) and it will still do so when bundling with MetaRouter.

Firebase has a limit of 500 distinctly named events so you should be intentional with what you track.

When you call `track`, MetaRouter maps from the MetaRouter spec to those that match Firebase’s spec. For anything that does not match, MetaRouter will pass the event to Firebase as a custom event. Custom parameters cannot be seen directly in the Firebase Analytics dashboard but they can be used as filters in **Audiences**.

Like with user properties, the library will perform the following transformations on both your event names and event parameters. Unlike user properties, you do not need to pre-define event parameters in your Firebase dashboard.

- Trims leading and trailing whitespace from property names
- Replaces spaces with underscores
- Trims property names to 40 characters (Android only)

Event parameter values must be fewer than 100 characters.

#### Event Mappings

MetaRouter adheres to Firebase’s semantic event specification and maps the following MetaRouter specced events (left) to the corresponding Firebase events (right):

| MetaRouter Event          | Firebase Event          |
| :------------------------ | :---------------------- |
| Products Searched         | `search`                |
| Product List Viewed       | `view_item_list`        |
| Product Viewed            | `view_item`             |
| Product Clicked           | `select_content`        |
| Product Shared            | `share`                 |
| Product Added             | `add_to_cart`           |
| Product Added To Wishlist | `add_to_wishlist`       |
| Checkout Started          | `begin_checkout`        |
| Promotion Viewed          | `present_offer`         |
| Payment Info Entered      | `add_payment_info`      |
| Order Completed           | `ecommerce_purchase`    |
| Order Refunded            | `purchase_refundHeader` |

#### Property Mappings

MetaRouter maps the followed Segment specced properties (left) to the corresponding Firebase event parameters (right):

| MetaRouter Property | Firebase Property | Accepted Value(s)            |
| :------------------ | :---------------- | :--------------------------- |
| `category`          | `item_category`   | (String) “kitchen supplies”  |
| `product_id`        | `item_id`         | (String) “p1234”             |
| `name`              | `item_name`       | (String) “Le Creuset pot”    |
| `price`             | `price`           | (double) 1.0                 |
| `quantity`          | `quantity`        | (long) 1                     |
| `query`             | `search_term`     | (String) “Le Creuset”        |
| `shipping`          | `shipping`        | (double) 2.0                 |
| `tax`               | `tax`             | (double) 0.5                 |
| `total`             | `value`           | (double) 3.99 or (long) 3.99 |
| `revenue`           | `value`           | (double) 3.99 or (long) 3.99 |
| `order_id`          | `transaction_id`  | (String) “o555636”           |
| `currency`          | `currency`        | (String) “USD”               |

#### Passing Revenue and Currency

Ecommerce events containing “revenue” or “total” must also include the appropriate ISO 4217 “currency” string for revenue data to populate to the Firebase dashboard. If a “currency” value is not included, the library defaults to “USD”.

```
Properties properties = new Properties()
        .putValue("orderId", "p966540")
        .putValue("revenue", 25.00)
        .putCurrency("USD");

Analytics.with(this).track("Order Completed", properties);
```

#### Screen

MetaRouter doesn’t map screen events to Firebase - that’s because Firebase’s SDK collects screen information out of the box for you.

For Android, MetaRouter passes contextual screen information into each screen view on each activity’s `onResume` callback. To ensure that screen names are labeled properly, MetaRouter recommends adding a `label` value to each of your activities in your app’s AndroidManifest.xml file. At the moment, Firebase does not allow disabling automatic screen tracking for Android.

For iOS, you can configure `recordScreenViews` which will automatically track screen views, or pass in a screen manually via a screen call. You should be able to disable the Automatic Screen reporting by adding the plist flag `FirebaseScreenReportingEnabled` to `Info.plist` and set its value to `NO` (Bool).

Google Analytics for Firebase iOS does NOT support the case of manual-only screen reporting. Firebase only supports automatic + manual screen reporting or no screen reporting at all.

#### Firebase Dynamic Linking (iOS only)

Firebase Dynamic Links are smart URLs that can change behavior dynamically depending on the platform where the user clicks them. Use them in web, email, social media, referral and physical promotions to increase user acquisition, retention and lifetime value. Key features include ability to survive app installs, controlling user experience depending on what platform they access the link on and knowing which content and campaigns are working via tracking in the Firebase console. Check out [Firebase’s Docs here](https://firebase.google.com/docs/dynamic-links/). [Here’s a sample app delegate that shows how to implement the Dynamic Linking Logic](https://github.com/firebase/quickstart-ios/blob/master/dynamiclinks/DynamicLinksExample/AppDelegate.m#L41-L135).

To use Firebase Dynamic Links, add the below to your podfile.

```
pod 'Firebase/DynamicLinks'
```

#### Conversion Tracking and AdWords Conversions

Firebase is now Google’s recommended method for reporting conversions to AdWords! To do so, simply track the conversion events as you normally would with the mobile library and it will will send them through to Firebase! Follow [this documentation from Firebase to set up your conversions in Firebase and to have them forwarded to AdWords](https://firebase.google.com/docs/adwords/).

#### Troubleshooting

Firebase has great logging. If you are having any issues, you can enable debug mode as outlined [here](https://support.google.com/firebase/answer/7201382/?hl=en&authuser=0).

### MetaRouter Side

Not much to do here now that you already have your MetaRouter-Firebase SDKs all set up! When you set up your destination within the MetaRouter UI, you will see the below fields:

![firebaseDestination](firebasedestination.png)
In the "Name" field, simply name your destination.

The iOS Deep Link URL Scheme only applies if you have installed the iOS Firebase integration and are utilizing Firebase Dynamic Linking (above). If are wondering what a iOS Deep Links are, here is an [article](https://www.originate.com/thinking/stories/deeplinking-in-ios/) that explains use cases for deep link URLs and how to create them.
