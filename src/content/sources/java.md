---
collectionKey: sources

navText: Java

path: '/sources/java/'

tags: [sources]
---

# Java

## Getting Started

This library lets you record analytics data from your Java code. Once installed, the requests will hit our servers and then be routed to the destinations of your choice.

You can install the library [here](https://github.com/segmentio/analytics-java).

You can use this library in your web server controller code- it is built for high performance and uses and internal queue to make all calls non-blocking and fast. It will batch messages and flush asynchronously to our servers.

## Install the Library

We reccommend installing the library with a build system like Maven. If you do it this way, you will have much less trouble upgrading and swapping out destinations.

The library is distributed as a `jar` dependency via [Maven Central](http://search.maven.org/). Here's what it would look like with Maven.

Add to `pom.xml`:

```xml
<dependency>
    <groupId>com.segment.analytics.java</groupId>
    <artifactId>analytics</artifactId>
    <version>LATEST</version>
</dependency>
```

## Initialize the SDK

Before you can start sending us events, you'll need to initialize an instance of the Analytics class. Do this using the `Analytics.builder` class, inputting the **Source ID** found in the source settings of your MetaRouter UI.

```java
Analytics analytics = Analytics.builder("Your Source ID")
        .endpoint("https://e.metarouter.io")
        .build();
```

Note that there exists an internal `AnalyticsClient` class, not to be confused with the public `Analytics` class.

The `Analytics` class has a method called `enqueue` that takes a `MessageBuilder`. Each message class has a corresponding builder that is used to construct instances of a message. Be sure to provide either a `userId` or `anonymousID` for each message, as failing to do so will raise an exception at runtime.

## Calls in Java

Check out the below calls and their use cases to determine the calls that you need to make. We have also included examples of how you'd call specific objects in Java.

**Note:** Thee following examples use the [Guava](https://github.com/google/guava) immutable map style, but feel free to use standard Java maps instead.

### Identify

The `identify` method helps you associate your users and their actions to a unique and recognizable `userID` and any optional `traits` that you know about them. We recommend calling an `identify` a single time - when the user's account is first created and only again when their traits change.

```java
analytics.enqueue(IdentifyMessage.builder()
    .userId("qwerty1234")
    .traits(ImmutableMap.builder()
        .put("name", "Buzz Aldrin")
        .put("email", "buzz.aldrin@visitthemoon.com")
        .put("gender", "male")
        .put("title", "Second person to visit the moon")
        .build()
    )
);
```

The above call identifies Buzz by his unique `userID` and labels him with `name`, `email`, `gender`, and `title` traits. For a complete library of the traits that you're able to assign to a user, check out our [API Calls doc](/analytics-js/).

### Track

To get to a more complete event tracking analytics setup, you can add a `track` call to your website. This will tell MetaRouter which actions you are performing on your site. With `track`, each user action triggers an “event,” which can also have associated properties.

```java
analytics.enqueue(TrackMessage.builder("Item Purchased")
    .userId("qwerty1234")
    .properties(ImmutableMap.builder()
        .put("revenue", 50.00)
        .put("shipping", "Next-Day")
        .build()
    )
);
```

The above call tells us that someone has purchased an item for 50 dollars and has selected a "next day" shipping option.

### Screen

**Note:** The `screen` call pulls the same data as a `page` call, but is used for mobile rather than web sources.

```java
analytics.enqueue(ScreenMessage.builder("MoonLanding")
    .userId("qwerty1234")
    .properties(ImmutableMap.builder()
        .put("category", "Space")
        .put("path", "/space/moonlanding")
        .build()
    )
);
```

The above call tells us that someone has viewed a `MoonLanding` page that is categorized in a `Space` section of the mobile app.

### Group

The `group` method associates an identified user with a company, organization, project, etc.

```java
analytics.enqueue(GroupMessage.builder("some-group-id")
    .userId("qwerty1234")
    .traits(ImmutableMap.builder()
        .put("name", "MetaRouter")
        .put("size", 55)
        .put('website", "www.metarouter.io")
        .build()
    )
);
```

The above call assigns the user with the "MetaRouter" group and gives that group the "size" and "website" traits.

### Alias

The `alias` method combines two unassociated User IDs.

```java
analytics.enqueue(AliasMessage.builder("previousId")
    .userId("qwerty1234")
);
```

We might use the above call in the following way:

```java
// the anonymous user clicks a button
track("anonymous_user", "Click Button");
// the anonymous user signs up and is aliased
alias("anonymous_user", "first.last@website.com");
// the signed up user is identified
identify("first.last@website.com", new Traits("plan", "Pro"));
// the identified user clicks a button
track("first.last@website.com", "Click Button");
```

Note that making an `alias` call means that we are able to combine the user's anonymous actions with their identified actions, so that we can get a clear picture of their user journey.
