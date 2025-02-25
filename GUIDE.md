Here's your **updated user guide** with added **startup checks, cleanup commands, and next steps for migration**. 🚀  

---

# **📝 Playwright Kubernetes Test Framework - User Guide**

## **📌 Overview**
This guide covers how to:
- **Start and verify all required services**
- **Run Playwright tests in Kubernetes using Helm**
- **Debug and re-run tests**
- **Update test cases and Docker images**
- **Understand the relationship between `chart.yaml`, `values.yaml`, and `job.yaml`**
- **Next steps for migrating to Google Kubernetes Engine (GKE)**

---

## **1️⃣ Starting & Verifying Required Services**
Before running the tests, ensure all services are running.

### **🛠 Start Minikube (If Not Running)**
```bash
minikube start
```

Check Minikube status:
```bash
minikube status
```
Expected output:
```
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured
```
If any service is **not running**, restart Minikube:
```bash
minikube stop && minikube start
```

### **🐳 Check If Docker Daemon is Running**
```bash
docker ps
```
If you get an error, start Docker manually.

### **📦 Verify Docker Image is Available in Minikube**
```bash
minikube image ls | grep benpavey-tests
```
If the image is missing, reload it:
```bash
minikube image load benpavey-tests:latest
```

---

## **2️⃣ Running the Tests**
Each Playwright test execution is triggered as a **Kubernetes Job**. To deploy and run the tests:

```bash
helm upgrade --install playwright-tests ./playwright-tests
```

Check if the Job is running:
```bash
kubectl get jobs
```

Expected output:
```
NAME               STATUS    COMPLETIONS   DURATION   AGE
playwright-tests   Running   0/1           16s        16s
```
- `STATUS`: `Running` → Tests are still executing.
- `STATUS`: `Completed` → Tests have finished successfully.
- `STATUS`: `Failed` → Tests failed, see logs.

---

## **3️⃣ Debugging and Viewing Test Results**
### **🔍 Check Pod Status**
List the running test pod:
```bash
kubectl get pods
```

Example output:
```
NAME                       READY   STATUS      RESTARTS   AGE
playwright-tests-xyz123    0/1     Completed   0          2m
```

### **📜 View Test Logs**
```bash
kubectl logs job/playwright-tests
```

OR, if the job created a pod:
```bash
kubectl logs $(kubectl get pods --selector=job-name=playwright-tests -o jsonpath="{.items[0].metadata.name}")
```

This will show Playwright logs, including **pass/fail results** and **screenshot information**.

---

## **4️⃣ Re-running Tests**
Since Jobs **do not restart automatically**, delete the existing Job and redeploy:

```bash
helm uninstall playwright-tests
helm upgrade --install playwright-tests ./playwright-tests
```

Alternatively, manually delete the Job before running Helm again:

```bash
kubectl delete job/playwright-tests
helm upgrade --install playwright-tests ./playwright-tests
```

---

## **5️⃣ Stopping & Cleaning Up After Running Tests**
To prevent resource waste and free up disk space, clean up services after running tests.

### **🛑 Stop Minikube (Shuts Down the Local Kubernetes Cluster)**
```bash
minikube stop
```

### **🗑 Remove Old Jobs (Avoid Test History Clutter)**
```bash
kubectl delete job/playwright-tests
```

### **🧹 Remove Old Docker Images (Free Up Disk Space)**
```bash
docker image prune -a
```

### **🧹 stop tests running on kubernetes**
```bash
helm uninstall playwright-tests
```

### **🔥 Completely Remove Minikube (If Needed)**
```bash
minikube delete
```

---

## **6️⃣ Updating or Adding New Tests**
### **📝 Edit Test Files**
Your tests are stored inside the Playwright project directory. Edit existing test files or add new ones:

```bash
nano tests/navbar.spec.js
```

Create a new test:
```bash
touch tests/new-feature.spec.js
```

---

## **7️⃣ Building & Updating the Docker Image**
After changing tests, you need to rebuild the Docker image:

```bash
docker build -t benpavey-tests .
```

Then **load the new image into Minikube**:

```bash
minikube image load benpavey-tests:latest
```

### **🔄 Deploy the Updated Image**
After updating the image, **redeploy the Helm chart**:

```bash
helm upgrade --install playwright-tests ./playwright-tests
```

---

## **8️⃣ Understanding the Helm Chart Structure**
The Playwright test framework is deployed using **Helm**, which consists of **three main files**:

| File | Purpose |
|------|---------|
| `chart.yaml` | Defines the Helm chart metadata, version, and type (`application`). |
| `values.yaml` | Stores configuration values, including the **Docker image**, test execution variables (`BASE_URL`, `BROWSER`, etc.), and resource limits. |
| `job.yaml` | Defines the Kubernetes **Job** that runs the Playwright tests. It pulls configuration from `values.yaml`. |

### **🔗 Relationship Between These Files**
1. **`chart.yaml`**  
   - Defines the Helm package.
   - Versioned separately from the application.
  
2. **`values.yaml`**  
   - Controls test settings dynamically.
   - Specifies the **Docker image to use**.
   - Defines environment variables such as:
     ```yaml
     env:
       BASE_URL: "https://www.benpavey.com"
       HEADLESS: "true"
       BROWSER: "chromium"
     ```
  
3. **`job.yaml`**  
   - Uses values from `values.yaml` to execute the tests.
   - Example template:
     ```yaml
     apiVersion: batch/v1
     kind: Job
     metadata:
       name: {{ include "playwright-tests.fullname" . }}
     spec:
       template:
         spec:
           containers:
             - name: playwright-tests
               image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
               env:
                 - name: BASE_URL
                   value: "{{ .Values.env.BASE_URL }}"
           restartPolicy: Never
     ```

---

## **9️⃣ Next Steps: Migrating to Google Kubernetes Engine (GKE)**
Currently, the framework runs in **Minikube**. When moving to **Google Cloud**, follow these steps:

### **1️⃣ Push Docker Image to Google Container Registry (GCR)**
```bash
docker tag benpavey-tests gcr.io/your-project-id/benpavey-tests:latest
docker push gcr.io/your-project-id/benpavey-tests:latest
```

### **2️⃣ Update `values.yaml` to Use GCR**
Edit `values.yaml` and change:

```yaml
image:
  repository: gcr.io/your-project-id/benpavey-tests
  tag: latest
  pullPolicy: Always
```

### **3️⃣ Deploy to GKE**
```bash
gcloud container clusters get-credentials my-cluster
helm upgrade --install playwright-tests ./playwright-tests
```

---

## **✅ Summary**
| Command | Purpose |
|---------|---------|
| `helm upgrade --install playwright-tests ./playwright-tests` | Deploys or updates the Playwright test suite in Kubernetes. |
| `kubectl get jobs` | Lists running test jobs. |
| `kubectl logs job/playwright-tests` | Shows test execution logs. |
| `kubectl delete job/playwright-tests` | Deletes a test job to allow re-running. |
| `docker build -t benpavey-tests .` | Rebuilds the Docker image after modifying tests. |
| `minikube image load benpavey-tests:latest` | Loads the latest image into Minikube. |
| `docker push gcr.io/your-project-id/benpavey-tests:latest` | Pushes image to Google Cloud for GKE deployment. |

---

🚀 **Next Steps:**
1. ✅ **Ensure all services are running before execution**
2. ✅ **Migrate the framework to GCP Kubernetes**
3. ⏳ **Implement a Kubernetes CronJob after GCP migration**

Let me know if you need **any refinements**! 💪🔥