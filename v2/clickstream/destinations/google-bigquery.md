---
title: Google BigQuery
sidebar: platform_sidebar
---
MetaRouter makes it easy to send your data to Google BigQuery. Once you follow the steps below, your data will be routed through our platform and pushed to BigQuery in the appropriate format. Before we get started, there are a couple important things to note about this integration.

1. You will not immediately see events in your BigQuery upon configuration. The first time your data is loaded, it will take some added time before data will start flowing as our system establishes a connection.

2. Data is not streamed into BigQuery in real time as it is for our other destinations. Rather, our loader operates on an hourly basis and each hourly job is queued up 15 minutes after the next hour starts. For example, the load for 2-3 PM will queue at 3:15 PM.

Now, to the good stuff!

## What is Google BigQuery?

BigQuery is Google Cloud Platform's custom take on a traditional Postgres database. In Google's words, "[Google BigQuery is an enterprise data warehouse that solves this problem by enabling super-fast SQL queries using the processing power of Google's infrastructure.](https://cloud.google.com/bigquery/what-is-bigquery)" It's cost-effective at nearly any level, capable of scaling from gigabytes to petabytes without a loss in performance.

## Why send data to Google BigQuery using MetaRouter?

This guide will explain how to integrate BigQuery into MetaRouter's platform as a destination, allowing you to leverage Google's technology to access, store, and query your customer data.

Our connector periodically runs an ETL (Extract - Transform - Load) process that pulls raw event data in our data bucket, processes and transforms those raw events into a structured format, and then inserts structured event data from our bucket into your BigQuery cluster.


# Getting Google BigQuery set up with MetaRouter

## Setting up your BigQuery dataset

***Note**: If you already have your dataset created, you can skip this step*

Once you've logged into your GCP account and activated BigQuery, it's time to create your BigQuery dataset.

Follow [Google's guide](https://cloud.google.com/bigquery/docs/datasets#bigquery_create_dataset-console) to get your dataset created. Make sure that you keep this dataset name handy for when you go to put your information in on MetaRouter.

***Note**: Each unique `track` event will create a new table, and each property sent creates a new column in that table. For this reason, think about creating a detailed tracking plan to make sure that all events being passed to MetaRouter are necessary and consistent.*

---

## Setting up your authentication service account

***Note**: If you already have your auth json, you can skip this step*

Now that you have your dataset created, it is time to get GCP authentication set up. This is accomplished through creating a *service account*.

You can see the steps for getting this set up [here](https://cloud.google.com/docs/authentication/getting-started).

Once completed, you should have the following items ready to go:

1. BigQuery dataset created (keep dataset name handy for the next part)
2. The Data Location you selected
3. Downloaded the JSON file with the key for you service account
4. GCP credentials environment variables set up

If this list looks good, you are ready to jump over to the MetaRouter UI and create the destination!

Ensure that you give the Service Account the `BigQuery Editor` role in roder for us to have proper permissions to load data into your cloud.

---

## Activating your BigQuery integration on MetaRouter

In the [MetaRouter app](https://app.metarouter.io/), head to the pipeline you will be added BigQuery to, and under `Destinations` click `New Destination`. From there, click on `Google BigQuery` and create a name for your destination (e.g. "Production BigQuery").

Now it is time to input the information from GCP and BigQuery into the *Destination Details*. Under `Project ID`, enter the GCP project you have the desired BigQuery dataset tied to. Then, under `Data Location` enter the location you selected when setting up your dataset. The location will most often be 'Default', but if you selected another region, enter it here. Please use the region key (e.g. `US` or `europe-west3`). Lastly, under `BigQuery Dataset`, enter the name of your existing or newly created (step 1) dataset.

***Note**: Make sure you only enter the dataset name, not the full dataset id*

With those details in, you can go on to *Create Connection*. This is where you are granting MetaRouter teh ability to interface with your GCP account using that service account JSON. Under `Friendly Name`, enter in your connection name (e.g. Production GCP Connection). Then, copy the contents of that service account JSON file into the field for `Google Cloud Auth JSON`. Once that is completed, hit `Save` at the bottom of the form.

That's it! You'll now be receiving a livestream of data from your application into your BigQuery dataset.

If you run into any issues using this or any of our destinations, feel free to reach out to us at [support@metarouter.io](mailto:support@metarouter.io). Happy routing!