## GraphQL API with CDK, AppSync, and Amazon Neptune

This project deploys a basic GraphQL API built with Neptune Graph database, AWS AppSync, and AWS Lambda.

## Getting started

First, clone the project:

```sh
git clone git@github.com:abdulwaqar844/AWS-Neptune-with-Appsync.git
```

Next, change into the directories and install the dependencies:

```sh
cdk cdk-appsync-neptune

npm install

# or

yarn
```

Next, also change into the `lambda-fns` directory to install the dependencies there:

```sh
cd lambda-fns

npm install

# or

yarn
```

To deploy the API and services, build the project and then run the `deploy` command:

```sh
npm run build && cdk deploy
```
