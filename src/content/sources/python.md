---
collectionKey: sources

navText: Python

path: '/sources/python/'
---

# h1

## Python

This library lets you record analytics data from your Python code. You can use this library in your web server controller code. It is high-performing in that it uses an internal queue to make 'identify' and 'track' calls non-blocking and fast. It also batches messages and flushes asynchronously to our servers.

Visit <https://github.com/segmentio/analytics-python> for full package details.

### Getting Started with Python

#### Step 1

Install it.

```bash
pip install analytics-python
```

#### Step 2

Inside your python app, set you Source ID inside an instance of the Analytics object.

```python
import analytics
analytics.host = 'https://e.metarouter.io'
analytics.app_id = ‘metarouter_source_id’
```

**\*Note**: You can find your metarouter_source_id in the settings section of your MetaRouter App.\*

### Calls in Python

Check out the below calls and their use cases to determine the calls that you need to make. We have also included examples of how you'd call specific objects in Python.

#### Identify

The `identify` method helps you associate your users and their actions to a unique and recognizable `userID` and any optional `traits` that you know about them. We recommend calling an `identify` a single time - when the user's account is first created and only again when their traits change.

```python
analytics.identify('userID' : '1234qwerty', {
    'name': 'Arthur Dent',
    'email': 'earthling1@hitchhikersguide.com',
    'friends': 100
})
```

#### Track

To get to a more complete event tracking analytics setup, you can add a `track` call to your website. This will tell MetaRouter which actions you are performing on your site. With `track`, each user action triggers an “event,” which can also have associated properties.

```python
analytics.track('userID' : '1234qwerty', 'Signed Up')
```

#### Page

The `page` method allows you to record page views on your website. It also allows you to pass addtional information about the pages people are viewing.

```python
analytics.page('user_id', 'Docs', 'Python', {
  'url': 'http://metarouter.io'
})
```

#### Group

The `group` method associates an identified user with a company, organization, project, etc.

```python
analytics.group('user_id', 'group_id', {
  'name': 'MetaRouter',
  'domain': 'Data Engineering Platform'
})
```

#### Alias

The `alias` method combines two unassociated User IDs.

```python
analytics.alias(previous_id, user_id)
```
