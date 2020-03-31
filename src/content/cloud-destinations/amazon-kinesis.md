---
collectionKey: cloud-destinations

navText: Amazon Kinesis

path: '/cloud-destinations/amazon-kinesis/'
---

MetaRouter makes it easy to send your data to Amazon Kinesis. Once you follow the steps below, your data will be routed through our platform and pushed to Kinesis in the appropriate format.

## What is Amazon Kinesis?

Amazon Kinesis is a real-time data streamer that makes it easy to load and analyze streaming data. It provides you with the ability to build custom streaming data applications and ingest real-time data from various sources.

In order to configure a Kinesis stream, you must implement its appropriate API libraries and SDKs for each property that you want to track.

[Learn more about Amazon Kinesis](https://aws.amazon.com/documentation/kinesis/)

## Why send data to Amazon Kinesis using MetaRouter?

Implementing Kinesis with MetaRouter allows you to skip the installation of a Kinesis API library or SDK and limits the amount of modifications that you need to make to your own code. Our Kinesis integration supports all of our [API Calls](../calls.html), so you don't need to set up a separate library for each event you want to track.

## Getting started with Amazon Kinesis

### Kinesis Side

Once you create your Kinesis stream, you'll need to [create an IAM user](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_console) to allow us to integrate with your stream. You will then need to [create an IAM policy](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create.html), which will allow Astronomer to issue a `putRecord` request that looks like this:

```javascript
kinesis.putRecord({
  Data: new Buffer(JSON.stringify(msg)).toString('base64')
  PartitionKey: msg.userId() || msg.anonymousId(),
  StreamName: 'your_stream_name'
});
```

Next, select the `Create Policy from JSON` option and use the code template blow in the `Policy Document` field. You'll need to change the `region`, `account-id`, and `stream-name` to reflect the appropriate values.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["kinesis:PutRecord"],
      "Resource": ["arn:aws:kinesis:{region}:{account-id}:stream/{stream-name}"]
    }
  ]
}
```

Now, [follow these instructions to attach the IAM policy to the IAM user](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-using.html#attach-managed-policy-console).

### Astronomer Side

Now, all you need to do is enable Kinesis as a destination in your Astronomer UI. You'll need to input your `AWS Region` and `Kinesis Stream Name`. Enable the destination to watch your data flow from your source to your Kinesis stream.

Once you've created that policy, you need to attach it to the IAM user that you have also created. Now, you can flip over to the Astronomer UI and enable your Kinesis connector.
