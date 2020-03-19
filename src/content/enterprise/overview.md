---
title: Enterprise Edition
path: /enterprise-edition
navIndex: [1]
collectionKey: enterprise
collectionIndex: 0
---

## Data Streaming on your own terms

MetaRouter Enterprise is a private, cloud-agnostic, streaming data platform designed for companies with sensitive data or who aim for full control of their data ingestion. Deploy an end-to-end data router on your own cloud, maximizing control, flexibility, and security.

With support for a variety of Destinations, MetaRouter Enterprise leverages Kubernetes to allow all of your streaming data processing to happen in one place.

**Learn More:** [Here](https://www.metarouter.io/#about)

# Architecture

## The Data Streaming Engine

The primary component of our platform, consisting of three distinct layers of services, that allows for the real-time ingestion, durable processing, and monitored delivery of data from your applications.

[![MetaRouter Overview](/images/platform_overview.png)](/images/platform_overview.png)

**Layer 1: Ingestion** - A high performance API, only outwardly facing component of the platform, that accepts the incoming data from your sources to write into durable stateful message queues.

**Layer 2: Routing** - Syndicates event processing among Layer 3 to ensure the sending of data to it’s destination based on the configuration you provide for that individual source.

**Layer 3: Forwarding** - Handles mapping the data schema implemented within your sources to that of the proprietary format you want the event sent to and tracks sending success to destinations outside of platform.

As with all of our Clickstream products, you only have to implement a centralized schema for the data you want tracked and the platform handles validation and parsing of that data to match the requirements of all of the distinct services that you want to receive that data.

## Customization

The design of MetaRouter Enterprise is modular and allows for an unprecedented amount of flexibility when it comes to real-time streaming data processors. It can sit downstream from existing APIs to receive data or feed data directly to your own internal data processors.

Each deployment supports multi-tenancy out of the box, allowing you to implement tracking with a variety of data sources and map their data distinctly based on the configurations you set for that specific instance.
