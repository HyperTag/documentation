---
collectionKey: sources

navText: PHP

path: '/sources-php/'
---

# h1

## PHP

This library lets you record analytics data from your PHP code. It is a little different than other server-side libraries in that PHP is a single-threaded language, meaning it only processes once language at a time.

### Getting Started with PHP

#### Step 1

Clone the PHP integration into your application directory.

```php
git clone https://github.com/segmentio/analytics-php /my/app/folders/
```

#### Step 2

Add the following to your code to load in the library.

```php
require_once("/path/to/analytics-php/lib/Segment.php");
```

#### Step 3

Initialize the module with the Source ID found in the setting sections of your MetaRouter account. Note that you are only required to do this initialization once.

```php
class_alias('Segment', 'Analytics');
Segment::init("METAROUTER_APP_ID", array(
  "host" => "e.metarouter.io"
));
```

After this initialization, you have a ready-to-use instance with all calls built in.

**\*Note:** We've standardized to analytics.js. If you've used a tool like [Segment](https://segment.com/) in the past, you will find that instrumenting events in MetaRouter works in the exact same way.\*

### Using Composer to Install the PHP Library from Github

To add the MetaRouter PHP library to a PHP app using composer:

In composer.json, add the GitHub url to the repositories section and then require the library as usual.

**\*Note:** you need the ‘dev-‘ prefix on the version in the require section as noted in the [composer docs](https://getcomposer.org/doc/05-repositories.md#loading-a-package-from-a-vcs-repository).

```
{
    "repositories": [
        {
            "type": "vcs",
            "url": "https://github.com/segmentio/analytics-php"
        }
    ],

    "require": {
        "segmentio/analytics-php": "dev-master"
    }
}

```

### Calls in PHP

Check out the below calls and their use cases to determine the calls that you need to make. We have also included examples of how you'd call specific objects in PHP.

#### Identify

The `identify` method helps you associate your users and their actions to a unique and recognizable `userID` and any optional `traits` that you know about them. We recommend calling an `identify` a single time - when the user's account is first created and only again when their traits change.

```php
analytics::identify(array(
         "userId" => "1234qwerty",
         "traits" => array(
         "name" => "Arthur Dent",
         "email" => "earthling1@hitchhikersguide.com",
         "hasTowel" => True,)
);
```

#### Track

To get to a more complete event tracking analytics setup, you can add a `track` call to your website. This will tell MetaRouter which actions you are performing on your site. With `track`, each user action triggers an “event,” which can also have associated properties.

```php
analytics::track(array(
        "userId" => "1234qwerty",
        "event" => "Added File",
        "properties" => array(
        "fileTitle" => "Life, the Universe, and Everything",
        "fileSize" => "42kb",
        "fileType" => "PDF")
        )
);
```

#### Page

The `page` method allows you to record page views on your website. It also allows you to pass addtional information about the pages people are viewing.

```php
analytics::page(array(
        "userId" => "1234qwerty",
        "section" => "Blog",
        "name" => "10 Questions with Marvin, the clinically depressed robot",
        "properties" => array(
        "referrer" => "http://reddit.com/r/AMA")
        )
);
```

#### Group

The `group` method associates an identified user with a company, organization, project, etc.

```php
analytics::group(array(
        "userId" => "1234qwerty",
        "groupId" => "5678dvorak",
        "traits" => array(
        "name" => "The Hitchhikers",
        "relativePosition" => "[39.1000° N, 84.5167° W]")
        )
);
```

#### Alias

The `alias` method combines two unassociated User IDs.

```php
analytics::alias(array(
        "previousId" => "1ff049u10459u7",
        "userId" => "1234qwerty")
);
```
