---
collectionKey: enterprise
collectionIndex: 3

navText: Configuration & Management

path: '/config-and-management/'
---

# Controlling how the MetaRouter Platform sends data

The MetaRouter Streaming Data Platform will accept events from _Sources_, identified by their Write Key, and fan-out that data to the Source's _Destinations_, which map and forward the data out of the platform to their respective endpoints. You can control which Sources are allowed to have data received by the platform and which destinations are sent the data by providing the platform with a _Source Configuration_.

For example, say I have two applications, one a website and another a server that supports said website. I can give them a unique identifier, called the Write Key, that will allow me to detail where their events go. I give them the Write Key `WEB01` and `SVR01`, and now need to create two Source Configurations so the platform knows what to do once it receives events with those Write Keys.

In order to create effective Source Configurations, I need to send events to Destinations. Let's say that I want events from the server to go into S3, but I want the web events to go to S3 and Google Analytics. My Source Configurations would look something like this:

```json
"WEB01": {
  "s3": {
    "config": {
      ...
    }
  },
  "google-analytics": {
    "config": {
      ...
    }
  }
}

"SVR01": {
  "s3": {
    "config": {
      ...
    }
  }
}
```

Each configuration for a Destination can be unique per Source, but I cannot have more than one of the same Destination for a single Source. To find out what the `config` parameters are for a Destination, visit the [Destinations section](https://docs.metarouter.io/v2/clickstream/destinations/overview.html) of our Docs and look for Destinations with the _Enterprise_ tag.

## Version Control

We recommend using version control to save the contents of the configuration JSON file. The state of the configuration stored inside of the cluster does not maintain a state history. If a configuration is updated through the process outlined below, it will overwrite the current configuration with the new revision. In order to roll back a configuration change the pervious version of the previous version of the JSON file will need to be uploaded again.

## Canary Configuration Management

Canary is our tool that delegates instructions to the rest of the platform. It has a built-in API that can take updates to Sources and immediately deploy them to the rest of the platform.

### Manual Updates

#### Step 1: Locate Canary

Using Kubernetes' built-in tools, you can connect your local environment to Canary to pass it instructions directly.

Find the pod name of Canary by running `kubectl get pods -n <NAMESPACE>`, filling in the correct namepsace for your deployment, and find a pod that has _canary_ in it's name. Copy the full pod name.

#### Step 2: Port Forward Canary

Using the pod name you copied in Step 1, run the command `kubectl port-forward <POD_NAME> 8080 -n <NAMESPACE>`, replacing the pod name and namespace with the correct values. You should now see the console verify that your local system is not connected to Canary on port 8080.

#### Step 3: POST the Source Configuration to Canary

You want to send a POST request to `localhost:8080/cache/set/WRITEKEY`, where `WRITEKEY` is the Write Key of your Source and the `application/json` body is an object of the Destinations and their configurations.

Here is an example of the request body:

```json
"WEB01": {
  "facebook-pixel": {
    "config": {
      "pixelId": "348149915804750",
      "valueFieldIdentifier": "price",
      "whitelistPII": [
        "email",
        "phone"
      ]
    }
  },
  "google-analytics": {
    "config": {
      "appId": "UA-XXXXXXXX-4",
      "searchParam": "searchRedirect",
      "baseURL": "http://www.metarouter.io/"
    }
  }
}
```

And here is a cURL example of the request:

```bash
curl localhost:8080/cache/set/WRITEKEY -X POST --data "{\"google-analytics\": {\"config\": {\"appId\": \"UA-XXXXXXXX-4\"}}}" -H "Content-type: application/json"
```

Or from a file:

```bash
curl localhost:8080/cache/set/WRITEKEY -X POST --data-binary "@PATH/TO/YOUR-CONFIG-FILE.json" -H "Content-type: application/json"
```

#### Step 4: Verify Source Configuration

You can also make a GET request to Canary to read the existing Source Configuration by the Source's Write Key. Simply make a GET request to `localhost:8080/cache/get/WRITEKEY` and Canary will respond with a JSON payload it has for that configuration.

Here is a cURL example of that request:

```bash
curl localhost:8080/cache/get/WRITEKEY
```

### Using our Management Tools

_NOTE: This is a stub of a future feature. Coming Soon._

### Using our Remote Management Connection

_NOTE: This is a stub of a future feature. Coming Soon._
