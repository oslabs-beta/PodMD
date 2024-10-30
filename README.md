# PodMD

PodMD is a tool for developers utilizing and maintaining kubernetes clusters.\
With PodMD, you may set a specific configuration of desired pod metrics\
you wish to monitor and enable an automatic restart of designated pods based\
on your specific needs.

## Getting Started

In order to use PodMD, you need to deploy Prometheus on your cluster to\
monitor pod metrics. You may also wish to install Grafana, but it isn't\
necessary for PodMD to function.

Additionally, it is _strongly_ recommended you utilize Helm for installing\
the following tools. You can find instructions to install Helm below.

# First: Initial Setup

You can deploy the application either locally, to Minikube, or on the cloud, to AWS.\
See below for a detailed walkthrough.

## Implementing Monitoring via Minikube

If using Minikube, perform the following steps to get your Kubernetes cluster\
running with Prometheus. Continue to last, optional step if you would like to\
access visualizations with Grafana.

1. Ensure that you have the following installed to your computer:\
   [Docker](https://www.docker.com/)\
   [Minikube](https://minikube.sigs.k8s.io/docs/start/)\
   [Helm](https://v3-1-0.helm.sh/docs/intro/install/)\
   [Kubernetes Kubectl](https://kubernetes.io/docs/tasks/tools/)\
   [Node.js](https://nodejs.org/en)
2. If you already have a Minikube cluster in Docker that is no longer running\
   and you are trying to restart the tool, you must first delete the old cluster\
   by running the following command in your home directory:

   ```
   minikube delete
   ```

3. Make sure you have Docker running then start your cluster and install the\
   Prometheus-operator by running the following commands in your home directory:

   ```
   minikube start
   ```

   ```
   helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
   helm repo add stable https://charts.helm.sh/stable
   helm repo update
   ```

   ```
   helm install prometheus prometheus-community/kube-prometheus-stack
   ```

4. Once Prometheus pods and services are running on your cluster, which can take\
   a few minutes, run Prometheus on [PORT 9090](https://localhost:9090/) with the following command:
   ```
   kubectl port-forward prometheus-prometheus-kube-prometheus-prometheus-0 9090
   ```
5. After navigating to [PORT 9090](https://localhost:9090/) you may enter commands in the\
   Prometheus dashboard if you would like to test its functionality. The search\
   bar requires the use of PromQL to gather various metrics. You can read more\
   here: [Prometheus Documentation | Query Examples](https://prometheus.io/docs/prometheus/latest/querying/examples/)
6. Clone this PodMD repository to your computer.
7. Install dependencies by running the following command from your new, local repository:
   ```
   npm install
   ```

## Implementing Monitoring via AWS EKS

1. Ensure that you have the following installed to your computer:\
   [AWS Command Line Interface](https://aws.amazon.com/cli/)\
   [AWS EKS Command Line Interface (eksctl)](https://eksctl.io/installation/)\
   [Helm](https://v3-1-0.helm.sh/docs/intro/install/)\
   [Kubernetes Kubectl](https://kubernetes.io/docs/tasks/tools/)\
   [Node.js](https://nodejs.org/en)
2. Clone this PodMD repository to your computer and run the following command from the\
   resulting directory :
   ```
   aws configure
   ```
   [AWS User Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html)
3. Create AWS EKS Clusters, example command is provided below with region set to us-west-1.\
   Clusters must be at least size medium to operate:
   ```
   eksctl create cluster --name=prometheus-3 --region=us-west-1 --version=1.31 --nodegroup-name=promnodes --node-type t2.medium --nodes 2
   ```
4. Once AWS Cluster is running, install the Prometheus-operator by running the following commands in your home directory:
   ```
   helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
   helm repo add stable https://charts.helm.sh/stable
   helm repo update
   ```
5. Deploy Prometheus on your cluster by running the following command in your home directory:
   ```
   helm install prometheus prometheus-community/kube-prometheus-stack
   ```
6. Once Prometheus pods and services are running on your cluster, which can take\
   a few minutes, run Prometheus on [PORT 9090](https://localhost:9090/) with the following command:
   ```
   kubectl port-forward prometheus-prometheus-kube-prometheus-prometheus-0 9090
   ```
7. After navigating to [PORT 9090](https://localhost:9090/) you may enter commands in the\
   Prometheus dashboard if you would like to test its functionality. The search\
   bar requires the use of PromQL to gather various metrics. You can read more\
   here: [Prometheus Documentation | Query Examples](https://prometheus.io/docs/prometheus/latest/querying/examples/)
8. Install dependencies by running the following command from your new, local repository:
   ```
   npm install
   ```

# Next: Running Application

You can run the application either in your browser or in a desktop application. See below for\
detailed instructions on how to run the application:

## Running Application in Browser

1. Build the application by running the following command from your new, local repository:
   ```
   npm run build
   ```
2. Start the application by running the following command from your new, local repository:
   ```
   npm start
   ```

## Launch Desktop Application

1. Build and run Electron app by running the following command from your new, local\
   repository:
   ```
   npm run electron
   ```

# Optional: Accessing Grafana Visualizations

Should you also wish to run Grafana in your browser, this can by done by running the\
following command from your home directory:

```
kubectl port-forward deployments/prometheus-grafana 3000
```

Navigate to [PORT 3000](https://localhost:3000/). Finally, you will need to login to access visualizations. The default\
username is `admin` and the default password is `prom-operator`.

PodMD
