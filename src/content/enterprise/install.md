---
collectionKey: enterprise
collectionIndex: 2

navText: Installation & Updates

path: '/installation/'
---

# Before Enterprise Platform Installation

## Cloud Provider Prerequisites

### Google Cloud (GCP)

For a proper DNS setup, our platform will require a Static IP to be assigned to it. First, reserve a Static IP (Found in GCP > Networking > VPC Network > External IP Addresses) and note the IP Address. This will be needed during the installation process.

### Amazon Web Services (AWS)

**Note:** This is a stub of an existing feature. Details coming soon.\_

## Kubernetes Prerequisites

Create the namespace for the platform. We recommend creating a namespace that will be used solely by the MetaRouter Platform:

```bash
kubectl create namespace mr-ee
```

### Install Tiller

Prep cluster for installation of Tiller

```bash
kubectl -n kube-system create serviceaccount tiller

kubectl create clusterrolebinding tiller --clusterrole cluster-admin --serviceaccount=kube-system:tiller
```

Start Tiller

```bash
helm init --service-account tiller
```

Then, verify tiller is there with:

```bash
kubectl get pods --namespace kube-system
```

### Adding Custom Definitions

Ensure Cluster has access to cert-manager definitions

```bash
kubectl apply -f https://raw.githubusercontent.com/jetstack/cert-manager/release-0.6/deploy/manifests/00-crds.yaml
```

## Message Queue Preparations

### Topic Creation

The EE Platform uses topics to pass events from one stage of the service to another. The topic from the first to second stage is called `main`, and from the second to the third stage are named after the destination they send events into (in kebab-case.)

For example, if I want the platform to send events to Google Analytics, Adobe Analytics and Pinterest, I would need to create the following topics:

- `main`
- `google-analytics`
- `adobe-analytics`
- `pinterest`

To ensure the uniqueness of the names, if the Message Queue is shared by other applications, we recommend supplying a Topic Prefix to the platform upon installation. By adding a prefix to be used by the platform, you will need to ensure that topics exists for the existing naming convention with the prefix you specified. For example, if I use the default Topic Prefix of `mr-ee` I will need to make the following topics:

- `mr-ee-main`
- `mr-ee-google-analytics`
- `mr-ee-adobe-analytics`
- `mr-ee-pinterest`

We recommend always specifying a prefix to future-proof any shared resources.

### Custom Topics

If you desire the router to send a copy of events to a Topic you will manually read from, you will need to push a custom Destination for your Write Key into the Configuration Store. Keep in mind that whatever you add here will have the same prefix added as specified in the Topic Names section above.

For example, if you have the prefix `mr-ee-` and add `logs` as a destination, the Router will write to the Topic `mr-ee-logs`.

We only create Event Forwarders based on the values used to install or update the platform, so there is no need to worry about an additional service spinning up to consume messages. However, we do recommend ensuring that the naming is unique and will not clash with future updates of us making additional destinations available. Stay away from names that describe third-party services or message delivery types, such as `amazon-kinesis` or `redis` as they may conflict in the future and require further customization to support.

### Partition Creation

If supported by your Message Queue of choice, such as Kafka or Kinesis, Partitions allow for multiple services in each group to read events simultaneously. You will want to have, at least, a 1:1 ratio for partitions to consumers. We recommend assuming a 3:1 ratio of partitions to consumers to allow for the easy scaling of consumers.

Our minimal production size is two Routers and one of each Forwarder. An example of partitions, according to our recommendation, is as follows:

- `main`: 6 Partitions
- `google-analytics`: 3 Partitions
- `adobe-analytics`: 3 Partitions
- `pinterest`: 3 Partitions

# Installation of the Platform

## What you will need

1. Kubernetes and Helm installed and configured on your computer
2. Docker installed and configured on your computer
3. Operational access to your Kubernetes Cluster
4. The domain(s) you will use for sending events, pointing to the Static IP/Load Balancer created in the _Cloud Provider Prerequisites > Networking_ section.

## Step 1: Create Install Directory

Create a new folder or directory on your local system. Our installation process will generate files into this directory for you to use Helm for the final installation of the platform.

## Step 2: Run the Installation Script

Using your terminal, navigate into the directory you created in Step 1. Then, run the installation script we've provided you, passing along the License Key (one per contracted platform instance) once the installation process asks for it. After, providing the Key, the rest of the installation will continue over your web browser. Follow the on-screen instructions to finishing the configuration of your platform's details.

## Step 3: Installing the platform

Once the installation is complete, the directory you created in Step 1 will now have all of our platform charts, customized to your instructions, within it. Run `helm install metarouter-enterprise -f ./metarouter-ee.yaml --name <RELEASE> --namespace <NAMESPACE>` to install the platform into Kubernetes, replacing `<RELEASE>` with the name you would like to use to reference the platform (we recommend `ee` for just the one deployment) and replacing `<NAMESPACE>` with the namespace you've previously configured for our platform to run in (as specified in the _Kubernetes Prerequisites_ section.)

## Installation complete

That's it, the platform will automatically pick up on events sent to the domain you have specified and process them using your provided Message Queue.

Please keep the files generate by the installation process in a safe place, as it will make updating the platform exponentially easier. Feel free to keep in Revision Control the files created during the installation process to keep a record of the platform state, if you would like.

# Updates to the Platform

## Manual Updates

Using the files generated by the Installation Process, you can repeat Step 2 and Step 3 of the installation process to create updated instructions. Then, run the command `helm upgrade <RELEASE> metarouter-enterprise -f ./metarouter-ee.yaml` and Helm will handle rolling out changes to the updated components. There is no need to stop or switch traffic during this process.

## Automated Stable Updates

**Note**: This is a stub of a future feature. Currently not available.
