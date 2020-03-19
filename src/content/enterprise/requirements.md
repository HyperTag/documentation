---
collectionKey: enterprise
collectionIndex: 1

navIndex: 1
navText: Requirements

path: '/enterprise-requirements/'
---

# Resource Requirements

## Kubernetes

### Minimum Node Resources

We recommend that you have at least 3 nodes that each offer 4 CPU Cores and 16 GB of Memory per zone, and that you have at least 2 zones that your cluster is available from (to reduced the change of downtime from your Cloud provider) in order to support a majority of traffic with just the core platform.

Also, for every Destination you want supported, have an additional .5 CPU Core and 1GB Mem. available per region for every 1,000 events/sec for your peak expected traffic.

The minimum recommended size of our platform is, per zone:

- 3x Load Balancer (.25 CPU, .5 MEM)
- 3x Ingestors (.25 CPU, .25 MEM)
- 2x Routers (.25 CPU, .5 MEM)
- 1x Forwarder per Destination (.5 CPU, 1 MEM)

### Calculating Scaling

The platform is set to automatically scale to meet event demand, so if you expect a large range of events or ever-increasing peaks of traffic, please leave plenty of headroom or set your cluster to autoscale.

The Load Balancer, Ingestor and Router will each autoscale roughly by one pod for every 1,000 events/sec over the minimum rate.

To calculate the amount of Forwarders you will need, take the amount of Destinations you want the platform to support and multiply it by the amount of events per second you expect at peak volume. Then, compare it against the amount of Destinations and take the higher number.

For example, if I want to support Google Analytics, Facebook Pixel, and Pinterest on my platform only, and I expect 500 events/sec. Then, I would expect 3 Forwarders.

    (3*(500/1000)) = 1.5 < 3

However, supporting those 3 Destinations at 5000 events/sec, I should expect to need 15 Forwarders to handle that traffic.

    (3*(5000/1000)) = 15 > 3

### Supported Cloud Providers

**Currently Verified Kubernetes Providers**:

- Google Cloud Platform (GCP)
- Amazon Web Services (AWS)

**Coming Soon**:

- Digital Ocean (DO)
- Microsoft Azure

## Load Balancer

---

Our platform will spin up an internal Load Balancer and connect it with your Cloud Provider which, depending on your Cloud Provider, may create ingress rules or spin up resources that are represented outside of Kubernetes. The only manual step that is currently required is for you to link the DNS records to Ingress instances created for the Load Balancer, as our platform takes care of the rest. [Learn more about how Kubernetes leverages Ingress with Cloud Providers on their Docs](https://kubernetes.io/docs/concepts/services-networking/ingress/).

## Message Queues

---

We support connecting our services between different Stateful Message Queues in order to provide data durability and allow for finer connecting control for you to send data to other parts of your platform.

**Our currently supported queues are:**

- Confluent Kafka
- AWS Kafka (MSK)
- Google PUB/SUB

**Coming Soon**:

- Azure Service Bus (planned)
- AWS Kinesis (planned)
- NATS (investigating)
- Pulsar (investigating)

Although we do not have current support for queues managed from within the platform, we are planning to introduce it this year. This will prevent you from having to link any externally provided services, however the total amount of resources needed will be much higher.

<!-- # Example Resource Calculations

Here are some examples of resource calculations for our platform.


## Scenario 1: Peak of 170k events/hour going to 3 Destinations
Let’s say we have a Website and a iOS app that generate 35M events a month combined, and our peak traffic is 180k events/hour. This is just under the traffic that is supported by the minimum recommendations. Each event’s average size is

**Kubernetes Resources:**

- 3 Nodes (4 Core, 16 Mem) over two regions: 24 Core, 96 Mem
- 3 Destinations (1 Core, 4 Mem) over two regions: 6 Core, 24 Mem

Total resources needed for MetaRouter Enterprise: 30 CPU Cores, 120 GB Mem.

**Load Balancer Resources:**
Each of our events average 0.5 KB in size, resulting in a total of 17.5 GB of data coming into our Load Balancer each month.

**Message Queue Resources:**
We will be using an externally managed message queue that charges based off of data volume and retention. We recommend at 7 days of a retention period to act as a cache in case there are downstream issues you have to replay data for.

We will have one Topic for the platform and an additional topic per destination. Since we’ve configured each events to go to all three Destinations on the platform, that means the one 0.5 KB event is sent into 4 topics and that 2 KB of data is retained for a period of 7 days.

Over a month, that adds up to 17.5 GB of data processed, but only 4.4 GB of data stored (due to older data aging out) for 35M messages. -->
