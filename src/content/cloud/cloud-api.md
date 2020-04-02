---
collectionIndex: 1
collectionKey: cloud

path: /cloud-api/

navText: Cloud API
---

# Cloud API

## Houston - MetaRouter's GraphQL API

Houston is a GraphQL API (utilizing Apollo) that allows interaction with the MetaRouter Data Engineering Platform. Named after NASA’s Johnson Space Center in Houston, it provides direct communication and orchestration over our platform services.

## API Explorer

You can
[explore the API](https://houston-explorer.metarouter.io/) directly using GraphQL Explorer for testing purposes. You will want to make sure you select "MetaRouter Houston" when interfacing with this tool.

## Connecting

We recommend using these projects while connecting to GraphQL:

- Client-side: [Apollo GraphQL](http://dev.apollodata.com/)
- Node.js: [graphql-request](https://github.com/graphcool/graphql-request)

## Authentication

### JSON Web Tokens

JSON Web Tokens (JWT) encrypt important user session data in a way for our system to validate into a string that you can pass with every request. These tokens are set to expire on our system 24 hours after they are created.

### Requesting JWT Access

In order to generate a JWT, you will first need a [user account](https://app.metarouter.io) with MetaRouter. Once you have a user account, the follow mutation (updated with your email, as the username, and password) will respond with your Token string for you to pass to our API.

```graphql
mutation createToken {
  createToken(username: "someone@somewhere.com", password: "password") {
    success
    message
    token
    decoded {
      id
    }
  }
}
```

## Accessing the Public API

### Using a JWT

Once you have created a JSON Web Token, you need to embed it in the header of each request as authorization. Additionally, any operation to edit an Organization or any Connection or pipeline that an Organization controls will require that Organization’s ID in the header of your request as well, under organization.

JWT will expire after 24 hours. Once it is expired, you will need to generate a new JWT and replace the expired one with it.

### Using an API Key

We’re working to provide trusted partners with API Keys that provide access to the Public API and do not self-expire. Stay tuned for updates, or send us a note at [support@metarouter.io](support@metarouter.io) if you would like to be notified when this feature is made available.

## Data Models

### Users and Organizations

In order to access and control pipelines in the MetaRouter platform, we give control of these operations to `Organizations`. `Users` are added to `Organizations` in order to utilize the org's control over those pipelines. Once an person is added to an `Organization`, they are titled either `Owner` or `User`.

Organization `Owners` have full read/write control over everything linked to that Organization, from editing pipelines to expanding User permissions. You can consider this role as having administrative privileges for this Organization.

Organization `Users` have specific read/write control over pipelines linked to that Organization, however cannot read the contents of Connections and cannot change access of other Users to their Organization.

#### Creating and Editing Users

A user account is tied to a specific email address and has to be confirmed via an emailed link. User accounts can be created either via self signup or auto signup. Self Signup assumes that you will configure both your email address and password by yourself, while auto signup assumes you only have the email address for the account you want to configure and the email account holder will need to create their own password.

To create a new user account with the API, use the `createNewUser` mutation below. Note that the profile argument is optional, however email and password are required.

```graphql
mutation {
  createNewUser(
    email: "someone.new@somewhere.com"
    password: "password_string"
    profile: {
      {
        firstName: "Someone",
        lastName: "New",
        company: "My Company"
      }
    }
  ) {
    success
    message
    token
    decoded {
      id
    }
  }
}
```

There is no direct access to auto signup a user from the API. However the auto signup feature will be automatically triggered when adding a user to your `Organization` that does not have an existing MetaRouter `User` account.

Note that editing a user's account and editing organization users are features on our roadmap and will be available soon!

#### Creating and Editing Organizations

In order to create any pipelines, you must first create an `Organization` to link those pipelines to. The `User` who creates an `Organization` is automatically given the `Organization Owner` title, giving them access to all possible functionality.

Below is the mutation to create a new Organization:

```graphql
mutation {
  createOrganization(name: "Human-friendly Organization Name", userId: "123456") {
    success
    message
    id
  }
}
```

## Clickstream Pipelines

Clickstream Pipelines focus on extracting or loading events in as close to real-time as possible.

### Sources and Applications

We currently support Analytics.js, servers, analytics-android, analytics-ios and analytics-react-native as sources in our Clickstream module. The SDKs we offer for those platforms forward events to our Clickstream API to be ingested and distributed by our system. These sources are grouped under an `Organization`, to allow you and other contributors that you specify to have access to view and/or edit them.

Upon source creation, a 21 character long `Source ID` is generated to identify your Application within our system and to ensure your events are routed to the correct destinations.

Below is the mutation to generate a Clickstream Source within our system:

```graphql
mutation {
  createApplication(name: "Human-friendly Source Name", platform: "analytics.js", orgId: "1234567890") {
    success
    message
    id
  }
}
```

### Destinations and Integrations

To find how to build the form for a Clickstream Pipeline, you want to query against `clickstreamPrototypes`. Within that response is a `connectionPrototype` and `configPrototype` array that list all the fields can use to configure a destination.

- `propertyName` : Key for these values within a
- `clickstreamConfig` label : Human-friendly name
- `field type` : The form field to display. Some of these are standard (input, boolean, number) and others are more abstract (array, boolean, map). (expansion on all types to follow)

As of right now, the connection has to be saved separately before you save the configuration, as the Id for the connection will be referenced within the configuration. This allows you to reuse the connection for multiple configurations that are for the same platform rather than having to make multiple requests to save them both initially.

Here is an example of the two mutations needed to set up a brand new clickstream destination

```graphql
mutation {
  createConnection(
    integrationCode: "acquisio"
    details: { apiKey: "123" }
    name: "Friendly Connection Name"
    orgId: "1234567890"
    connectionPrototypeId: "123"
  ) {
    success
    message
    id
  }
}
```

```graphql
mutation {
  createIntegration(
    appId: "456"
    integrationCode: "acquisio"
    configPayload:  {
          "events" : [
              "fvsbvsdfbsdfb"
          ]
    }
    connectionId: "123"
    name: "Friendly Application Name"
  ) {
    success
    message
    id
  }
}
```

## Query & Mutation Response

### Query Response

Queries typically respond as an array of objects, even if the arguments you pass would limit the response to a single object. For instance, the query organizations will return an array with a single object if you search by orgId, but possibly multiple objects if you search by userId.

### Mutation Response

Mutations typically respond with a `statusMessage` object to alert you on if the mutation you triggered was successful or not. This contains:

- `success` : True or False response if the request was successful
- `message` : Human-friendly message on what happened
- `id` : For operations that create new data, the id of the created object will be returned
- `code` : Coming soon...

Actions to mutate data within MetaRouter’s platform tend to follow a "create and update" pattern, where we separate out the functions to make a new object with the ability to change or delete it in order to have strict control over the permissions over data control. For example, anyone can run `createOrganization` and make a new `Organization` where they are the owner. However, only `Organization` owners can run `updateOrganization` that allows for adding/removing users, updating details, or deleting the org.

### Error Response

This is on our roadmap and currently being built out- check back soon for updates!

## Developer Tools

### API Developer Console

Please contact us directly at [support@metarouter.io](support@metarouter.io) for access to the main developer console for MetaRouter’s public API.

Within the black Header Area, you want to paste the JWT into the token field and the Organization ID (found within the URL of your Organizations dashboard on app.metarouter.io - app.metarouter.io/org/). This will embed that information within the header of all of your requests within the console and will provide access to query and mutation results for your organization. Make sure you select `Prod` as your GraphQL endpoint (defaults to `Staging` on page load) to make sure you are accessing data that resides on MetaRouter's Main Platform.

### API Reference Materials

- [API Schema](https://super-collider.github.io/houston/schema/public-API-schema-0.3.0.html)
- [API Roadmap](https://super-collider.github.io/houston/roadmap.html) coming soon...
