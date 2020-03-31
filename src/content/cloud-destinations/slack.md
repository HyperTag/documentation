---
collectionKey: cloud-destinations

navText: Slack

path: '/cloud-destinations/slack/'
---

# Slack

MetaRouter makes it easy to send your events to your Slack workspace. This Destination will help send **Identify** and **Track** events to the Slack channel of your choice.

## Create a Slack Webhook

Slack has a more in-depth guide to [Getting Started with WebHooks](https://api.slack.com/incoming-webhooks#getting-started) that goes over creating your first webhook and all of the steps needed for your account. Once you have a Webhook URL, that is all of the necessary steps in order to send events to your Slack Workspace.

If you've alreay have made a webhook, go to **Manage Apps** within your Workspace Settings and select **Custom Integrations** on the side-nav. Within Custom Integrations, select **Incoming Webhooks** and select **Add Configuration**.

## MetaRouter Settings

Below are the settings needed to sucessfully connect and configure MetaRouter to send events to your Slack Workspace.

### Connection

#### Slack Channel Webhook (required)

This requires the URL Slack gave you when you added an new _Incoming Webhook_ Configuration.

### Destination Details

#### Whitelisted Identify Traits

As located within your Identify event's `traits` property, this is a list of values that you want to trigger an identify event on Slack. If a trait you list is not in a triggered Identify event it will not be sent to Slack, however if an Identify event matches at least one trait, then it and all of the traits that are in it will be sent as a message on Slack.

If you do not whitelist any traits, no Identify event will be sent to Slack.

#### Identify Event Template

This field allows you to customize the message that appears for Identify events that match whitelisting. You can automatically use [Handlebars](http://handlebarsjs.com/expressions.html) to template data within your Slack messages.

Everything within the Identify event `traits` are available, as well as `{{ name }}` that will attempt to display an identifier of the user with all available information.

By default, Identify events print out all traits.

#### Track Event Templates

This field allows you to customize the message that appears for specific Track events that match the name that you provide. You can automatically use [Handlebars](http://handlebarsjs.com/expressions.html) to template data within your Slack messages.

Everything within the Track event is available, as well as `{{ name }}` that will attempt to display an identifier of the user with all available information and `{{ event }}` with handles converting the event name into something Slack friendly.

For instance, if you want to add the page path that the event was triggered on, you can use this template `{{ context.page.path }}`

By default, Track events print out `{{ name}} did {{ event }}}.`

#### Track Event Channels

This field allows you to specify sending events to specific channels, instead of the one specified by default for the Slack Webhook. For instance, you can set up your Slack Webhook to send messages to #cloud_events but specifiy here to send the `Purchase` event to the #sales channel.

#### Only Send Templated Track Events

By checking this field, we will automatically drop all Track events that you have not created a custom template for. This helps you prevent a large amount of message volume from going into a Slack Channel.

If you'd prefer not to customize the message for each filtered event, just add the default template `{{ name}} did {{ event }}.`

**Note:** Events filtered this way will still count towards your monthly event usage.
