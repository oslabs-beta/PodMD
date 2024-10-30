# PodMD

PodMD is a tool for developers utilizing and maintaining kubernetes clusters.\
With PodMD, you may set a specific configuration of desired pod metrics\
you wish to monitor and enable an automatic restart of designated pods based\
on your specific needs.\

## Getting Started

In order to use PodMD, you need to deploy Prometheus on your cluster to\
monitor pod metrics. You may also wish to install Grafana, but it isn't\
necessary for PodMD to function.

Additionally, it is _strongly_ recommended you utilize Helm for installing\
the following tools. You can find instructions to install helm here:\
https://v3-1-0.helm.sh/docs/intro/install/

See below for the recommended steps to setup a Prometheus deployment.

If using Minikube, perform the following steps to get your Kubernetes cluster\
running with Prometheus. Continue to step 3 if you would like to view\
visualizations with Grafana..

1. If you already have a Minikube cluster in docker that is no longer running\
   and you are trying to restart the tool, you most first delete the prior\
   Run the following command in your home directory:

   1. `minikube delete`

2. Start your cluster and install Prometheus-operator. To do this, run the\
   following commands in your home directory:
   1. `minikube start`
   2. ```
      helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
      helm repo add stable https://charts.helm.sh/stable
      helm repo update
      ```
   3. `helm install prometheus prometheus-community/kube-prometheus-stack`

3) Once Prometheus pods and services are running on your cluster, which can take\
   a few minutes, run Prometheus on https://localhost:9090/ with the following command:\
   `kubectl port-forward prometheus-prometheus-kube-prometheus-prometheus-0 9090`\
4) After navigating to https://localhost:9090/ you may enter commands in the\
   Prometheus dashboard if you would like to test its funcitonality. The search\
   bar requires the use of PromQL to gather various metrics. You can read more\
   here: https://prometheus.io/docs/prometheus/latest/querying/examples/
5) Install dependencies with: `npm install`
6) Build the application: `npm run build`
7) Start the application: `npm start`
   OPTIONAL
8) Should you also wish to run Grafana in your browser, this is done using:\
   `kubectl port-forward deployments/prometheus-grafana 3000` and then\
   navigating to https://localhost:3000/
   1. If using Grafana, you will need to login to access visualizations.\
      The default username is `admin` and the default password is `prom-operator`.

## Implementing AWS Functionality

1. Clone this PodMD repository to your computer and run the following command from the\
   resulting directory :
   `aws configure`
   AWS User Guide: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html
2. Create AWS EKS Clusters, example command is provided below with region set to us-west-1.\
   Clusters must be at least size medium to operate:
   `eksctl create cluster --name=prometheus-3 --region=us-west-1 --version=1.31 --nodegroup-name=promnodes --node-type t2.medium --nodes 2`
3. Once AWS Cluster is running, install the Prometheus-operator by running the following commands in your home directory:
   ```
   helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
   helm repo add stable https://charts.helm.sh/stable
   helm repo update
   ```
4. Deploy Prometheus on your cluster by running the following command in your home directory:
   `helm install prometheus prometheus-community/kube-prometheus-stack`
5. Once Prometheus pods and services are running on your cluster, which can take\
   a few minutes, run Prometheus on https://localhost:9090/ with the following command:\
   `kubectl port-forward prometheus-prometheus-kube-prometheus-prometheus-0 9090`
6. After navigating to https://localhost:9090/ you may enter commands in the\
   Prometheus dashboard if you would like to test its funcitonality. The search\
   bar requires the use of PromQL to gather various metrics. You can read more\
   here: https://prometheus.io/docs/prometheus/latest/querying/examples/
7. Install dependencies with: `npm install`
8. Build the application: `npm run build`
9. Start the application: `npm start`
   OPTIONAL
10. Should you also wish to run Grafana in your browser, this is done using:\
    `kubectl port-forward deployments/prometheus-grafana 3000` and then\
    navigating to https://localhost:3000/

1)  If using Grafana, you will need to login to access visualizations.\
    The default username is `admin` and the default password is `prom-operator`.

PodMD
