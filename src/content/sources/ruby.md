---
collectionKey: sources

navText: Ruby

path: '/sources-ruby/'
---

# h1

## Ruby

This library lets you record analytics data from your Ruby code. You can use this library in your web server controller code. It is high-performing in that it uses an internal queue to make 'identify' and 'track' calls non-blocking and fast. It also batches messages and flushes asynchronously to our servers.

Check out [this Github repo](https://github.com/segmentio/analytics-ruby) to see the library.

### Getting Started with Ruby

#### Step 1

Install the Gem by either of these two methods:

- Directly into a Gemfile

```ruby
gem 'analytics-ruby', '~> 2.0.0', :require => 'segment/analytics'
```

- Directly into environment gems

```bash
gem install analytics-ruby
```

#### Step 2

Inside your Ruby application, you'll want to set your `Source ID` inside an instance of the Analytics object:

```ruby
require 'segment/analytics'

analytics = Segment::Analytics.new({
  app_id: 'YOUR_SOURCE_ID',
  host: 'e.metarouter.io'
})
```

**\*Note**: You can find your `Source ID` in the settings section of your MetaRouter App.\*

### Calls in Ruby

Check out the below calls and their use cases to determine the calls that you need to make. We have also included examples of how you'd call specific objects in Ruby.

#### Identify

The `identify` method helps you associate your users and their actions to a unique and recognizable `userID` and any optional `traits` that you know about them. We recommend calling an `identify` a single time - when the user's account is first created and only again when their traits change.

```ruby
analytics.identify(
    user_id: '1234qwerty',
    traits: { email: "#{} user,email }", fingers: 10 },
    context: {ip: '0.0.0.0'})

)
```

#### Track

To get to a more complete event tracking analytics setup, you can add a `track` call to your website. This will tell MetaRouter which actions you are performing on your site. With `track`, each user action triggers an “event,” which can also have associated properties.

```ruby
analytics.track(
    user_id: `1234qwerty`,
    event: 'Add to cart'
    properties: {price: 50.00, color, 'Medium'}
)
```

#### Page

The `page` method allows you to record page views on your website. It also allows you to pass addtional information about the pages people are viewing.

```ruby
analytics.page(
    user_id: user_id,
    category: Prod site
    name: 'Landing page'
    properties: { url: 'https://metarouter.io'}
)
```

#### Group

The `group` method associates an identified user with a company, organization, project, etc.

```ruby
analytics.group(
    user_id: '1234qwerty'
    group_id: '10'
    traits: { name: 'MetaRouter', description: 'Data Engineering Platform'}
)
```

#### Alias

The `alias` method combines two unassociated User IDs.

```ruby
analytics.alias(previous_id: 'previous id', user_id: 'new id')
```
