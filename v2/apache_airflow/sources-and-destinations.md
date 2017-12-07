---
title: Sources and Destinations
sidebar: platform_sidebar
---
## Astronomer Hooks

At Astronomer, we're committed to open source and release all of the Airflow hooks and operators that we build back to the community. For a complete list of Airflow Hooks, Operators, and Utilities that we maintain, check out our [Airflow Plugins](https://github.com/airflow-plugins?utf8=%E2%9C%93&q=&type=&language=) organization on Github.


### Currently Available

Note that our development roadmap is influenced by customer requests. If you would like a specific hook built that isn't on our roadmap, feel free to contact us at support@astronomer.io and we'll be happy to scope it out.

 - [BambooHR](https://docs.astronomer.io/v2/apache_airflow/hooks/bamboohr.html)
 - [Bing Ads](https://docs.astronomer.io/v2/apache_airflow/hooks/bing-ads.html)
 - [Box](https://docs.astronomer.io/v2/apache_airflow/hooks/box.html)
 - [Chargify](https://docs.astronomer.io/v2/apache_airflow/hooks/chargify.html)
 - [Facebook Ads](https://docs.astronomer.io/v2/apache_airflow/hooks/facebook-ads.html)
 - [GitHub](https://docs.astronomer.io/v2/apache_airflow/hooks/github.html)
 - [Google Analytics](https://docs.astronomer.io/v2/apache_airflow/hooks/google-analytics.html)
 - [Imap](https://docs.astronomer.io/v2/apache_airflow/hooks/imap.html)
 - [MySQL](https://docs.astronomer.io/v2/apache_airflow/hooks/mysql.html)
 - [Salesforce](https://docs.astronomer.io/v2/apache_airflow/hooks/salesforce.html)
 - [Salesforce Bulk API](https://docs.astronomer.io/v2/apache_airflow/hooks/salesforce-bulk-api.html)

### In Progress
Hooks for these sources are currently being developed by our team.
 - Marketo
 - Hubspot

### In Queue
These are sources for which we have done preliminary requirements gathering but development work has not begun.
 - AutoPilot
 - FreshDesk
 - Freshsales
 - Instagram
 - JIRA
 - Zendesk
 - Stripe
 - Google Adwords

### Roadmap
 - Hootsuite
 - Kissmetrics
 - MongoDB
 - New Relic
 - Oracle
 - Pinterest
 - Sengrid
 - SurveyMonkey
 - Twilio
 - Mailchimp

## Standard Apache Airflow Hooks
 - [Base Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/hooks/base_hook.py)
 - [Database API Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/hooks/dbapi_hook.py)
 - [Docker Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/hooks/docker_hook.py)
 - [Druid Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/hooks/druid_hook.py)
 - [HDFS Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/hooks/hdfs_hook.py)
 - [Hive Hooks](https://github.com/apache/incubator-airflow/blob/master/airflow/hooks/hive_hooks.py)
 - [HTTP Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/hooks/http_hook.py)
 - [JDBC Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/hooks/jdbc_hook.py)
 - [MSSQL Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/hooks/mssql_hook.py)
 - [MySQL Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/hooks/mysql_hook.py)
 - [Oracle Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/hooks/oracle_hook.py)
 - [Pig Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/hooks/pig_hook.py)
 - [Postgres Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/hooks/postgres_hook.py)
 - [Presto Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/hooks/presto_hook.py)
 - [Samba Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/hooks/samba_hook.py)
 - [SQLite Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/hooks/sqlite_hook.py)
 - [S3 Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/hooks/s3_hook.py)
 - [WebHDFS Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/hooks/webhdfs_hook.py)
 - [Zendesk Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/hooks/zendesk_hook.py)

## Apache Airflow Contrib Hooks
 - [AWS Dynamo DB Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/hooks/aws_dynamodb_hook.py)
 - [AWS Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/hooks/aws_hook.py)
 - [AWS Lambda Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/hooks/aws_lambda_hook.py)
 - [BigQuery Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/hooks/bigquery_hook.py)
 - [Cloudant Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/hooks/cloudant_hook.py)
 - [Databricks Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/hooks/databricks_hook.py)
 - [Datadog Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/hooks/datadog_hook.py)
 - [Google Cloud Datastore Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/hooks/datastore_hook.py)
 - [Amazon EMR Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/hooks/emr_hook.py)
 - [File Server Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/hooks/fs_hook.py)
 - [FTP Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/hooks/ftp_hook.py)
 - [Google Cloud API Base Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/hooks/gcs_api_base_hook.py)
 - [Google Cloud Dataflow Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/hooks/gcp_dataflow_hook.py)
 - [Google Cloud Dataproc Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/hooks/gcp_dataproc_hook.py)
 - [Google Cloud Pub/Sub Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/hooks/gcp_pubsub_hook.py)
 - [Google Cloud Storage Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/hooks/gcs_hook.py)
 - [Jira Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/hooks/jira_hook.py)
 - [Qubole Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/hooks/qubole_hook.py)
 - [Redis Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/hooks/redis_hook.py)
 - [Redshift Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/hooks/redshift_hook.py)
 - [Salesforce hook](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/hooks/salesforce_hook.py)
 - [Spark SQL Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/hooks/spark_sql_hook.py)
 - [Spark Submit Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/hooks/spark_submit_hook.py)
 - [Sqoop Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/hooks/sqoop_hook.py)
 - [SSH Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/hooks/ssh_hook.py)
 - [Vertica Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/hooks/vertica_hook.py)
 - [Wasb Hook](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/hooks/wasb_hook.py)

## Astronomer Operators
- [Bamboo HR to S3](https://docs.astronomer.io/v2/apache_airflow/operators/bamboo-hr-to-s3.html)
- [Bing Ads to S3](https://docs.astronomer.io/v2/apache_airflow/operators/bing-ads-to-s3.html)
- [Chargify to S3](https://docs.astronomer.io/v2/apache_airflow/operators/chargify-to-s3.html)
- [Facebook Ads to S3](https://docs.astronomer.io/v2/apache_airflow/operators/facebook-ads-to-s3.html)
- [Github to S3](https://docs.astronomer.io/v2/apache_airflow/operators/github-to-s3.html)
- [Google Analytics to S3](https://docs.astronomer.io/v2/apache_airflow/operators/google-analytics-to-s3.html)
- [Imap to S3](https://docs.astronomer.io/v2/apache_airflow/operators/imap-to-s3.html)
- [MongoDB to S3](https://docs.astronomer.io/v2/apache_airflow/operators/mongo-to-s3.html)
- [MySQL to S3](https://docs.astronomer.io/v2/apache_airflow/operators/mysql-to-s3.html)
- [S3 to MySQL](https://docs.astronomer.io/v2/apache_airflow/operators/S3-to-mysql.html)
- [S3 to Redshift](https://docs.astronomer.io/v2/apache_airflow/operators/s3-to-redshift.html)
- [S3 to Spreadsheet](https://docs.astronomer.io/v2/apache_airflow/operators/s3-to-spreadsheet.html)
- [Salesforce Schema to Redshift](https://docs.astronomer.io/v2/apache_airflow/operators/salesforce-schema-to-redshift.html)
- [Salesforce to Redshift](https://docs.astronomer.io/v2/apache_airflow/operators/salesforce-to-redshift.html)
- [Salesforce to S3](https://docs.astronomer.io/v2/apache_airflow/operators/salesforce-to-s3.html)

## Apache Airflow Operators
 - [Bash Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/operators/bash_operator.py)
 - [Check Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/operators/check_operator.py)
 - [DAG Run Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/operators/dagrun_operator.py)
 - [Docker Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/operators/docker_operator.py)
 - [Dummy Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/operators/dummy_operator.py)
 - [Email Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/operators/email_operator)
 - [Generic Transfer Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/operators/generic_transfer.py)
 - [Hive Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/operators/hive_operator.py)
 - [Hive Stats Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/operators/hive_stats_opertor.py)
 - [Hive to Druid Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/operators/hive_to_druid.py)
 - [Hive to MySQL Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/operators/hive_to_mysql.py)
 - [Hive to Samba Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/operators/hive_to_samba_operator.py)
 - [HTTP Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/operators/http_operator.py)
 - [JDBC Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/operators/jdbc_operator.py)
 - [Latest Only Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/operators/latest_only_operator.py)
 - [MsSQL Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/operators/mssql_operator.py)
 - [MsSQL to Hive Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/operators/mssql_to_hive.py)
 - [Oracle Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/operators/oracle_operator.py)
 - [Pig Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/operators/pig_operator.py)
 - [Postgres Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/operators/postgres_operator.py)
 - [Presto Check Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/operators/presto_check_operator.py)
 - [Presto to MySQL Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/operators/presto_to_mysql_operator.py)
 - [Python Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/operators/python_operator.py)
 - [Redshift to S3 Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/operators/redshift_to_s3_operator.py)
 - [S3 File Transform Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/operators/s3_file_transform_operator.py)
 - [S3 to Hive Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/operators/s3_to_hive_operator.py)
 - [Sensor Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/operators/sensors.py)
 - [Slack Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/operators/slack_operator.py)
 - [SQLite Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/operators/sqlite_operator.py)
 - [SubDAG Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/operators/subdag_operator.py)

## Apache Airflow Contrib Operators
 - [BigQuery Check Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/bigquery_check_operator.py)
 - [BigQuery Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/bigquery_operator.py)
 - [BigQuery Table Delete Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/bigquery_delete_operator.py)
 - [BigQuery to BigQuery Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/bigquery_to_bigquery.py)
 - [Databricks Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/databricks_operator.py)
 - [DataFlow Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/dataflow_operator.py)
 - [DataProc Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/dataproc_operator.py)
 - [Datastore Export Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/datastore_export_operator.py)
 - [Datastore Import Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/datastore_import_operator.py)
 - [Druid Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/druid_operator.py)
 - [ECS Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/ecs_operator.py)
 - [EMR Add Steps Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/ems_add_steps_operator.py)
 - [EMR Create Job Flow Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/emr_create_job_flow_operator.py)
 - [EMR Terminate Job Flow Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/emr_terminate_job_flow_operator.py)
 - [File to Google Cloud Storage Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/file_to_gcs.py)
 - [File to Wasb Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/file_to_wasb.py)
 - [Google Cloud Storage Download Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/gcs_download_operator.py)
 - [Google Cloud Storage to BigQuery Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/gcs_to_bq.py)
 - [HipChat Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/hipchat_operator.py)
 - [Hive to Dynamo Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/hive_to_dynamodb.py)
 - [Jira Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/jira_operator.py)
 - [GCP ML Engine Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/mlengine_operator.py)
 - [MySQL to Google Cloud Storage Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/mysql_to_gcs.py)
 - [Pub/Sub Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/pubsub_operator.py)
 - [Qubole Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/qubole_operator.py)
 - [SFTP Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/sftp_operator.py)
 - [Spark SQL Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/spark_sql_operator.py)
 - [Spark Submit Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/spark_submit_operator.py)
 - [Sqoop Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/sqoop_operator.py)
 - [SSH Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/ssh_operator.py)
 - [Vertica Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/vertica_operator.py)
 - [Vertica to Hive Operator](https://github.com/apache/incubator-airflow/blob/master/airflow/contrib/operators/vertica_to_hive.py)
