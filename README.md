
````md
# Docker Build Context, Versioned Dockerfiles, and Named Volume Demo

This project demonstrates two important Docker concepts commonly used in real-world DevOps work:

1. Docker build context and versioned Dockerfiles
2. Docker named volume persistence using BusyBox

---

## 1. Docker Build Context and Versioned Dockerfiles

### Folder Structure
```text
dockerfiles/
 ├── v1.0/
 │    └── Dockerfile
 ├── v1.1/
 │    └── Dockerfile
 └── v2.0/
      └── Dockerfile
````

Each folder contains a separate Dockerfile for a specific version of the application.
Docker uses the folder passed in the `docker build` command as the **build context**.

---

### Sample Dockerfiles

**dockerfiles/v1.0/Dockerfile**

```dockerfile
FROM busybox
CMD ["echo", "Hello from version 1.0"]
```

**dockerfiles/v1.1/Dockerfile**

```dockerfile
FROM busybox
CMD ["echo", "Hello from version 1.1"]
```

**dockerfiles/v2.0/Dockerfile**

```dockerfile
FROM busybox
CMD ["echo", "Hello from version 2.0"]
```

---

### Build Docker Images

Run these commands from the project root directory:

```bash
docker build -t myapp:1.0 dockerfiles/v1.0
docker build -t myapp:1.1 dockerfiles/v1.1
docker build -t myapp:2.0 dockerfiles/v2.0
```

Each command builds a Docker image using the Dockerfile located in the specified folder.

---

### Verify Built Images

```bash
docker images | grep myapp
```

---

### Run Containers

```bash
docker run --rm myapp:1.0
docker run --rm myapp:1.1
docker run --rm myapp:2.0
```

Each container prints a message based on the version it was built from.

---

## 2. Docker Named Volume Persistence Test (BusyBox)

This section demonstrates how Docker named volumes persist data even after a container is stopped or removed.

---

### Run BusyBox Container with Named Volume

```bash
docker run -it --name mybusybox -v app-data:/var/lib/app busybox sh
```

The `sh` command opens an interactive shell inside the container.

---

### Inside the Container

```bash
echo "hello from busybox" > /var/lib/app/test.txt
ls /var/lib/app
```

Expected output:

```text
test.txt
```

Exit the container:

```bash
exit
```

---

### Verify Volume Data on Host

```bash
sudo ls /var/lib/docker/volumes/app-data/_data
```

Expected output:

```text
test.txt
```

Check file contents:

```bash
sudo cat /var/lib/docker/volumes/app-data/_data/test.txt
```

Output:

```text
hello from busybox
```

---

## Key Takeaways

* Docker build context is the directory passed to `docker build`
* Docker searches for a Dockerfile inside the build context
* Folder-based Dockerfiles help manage multiple application versions
* Docker named volumes store data outside the container lifecycle

---

## Cleanup (Optional)

```bash
docker rm mybusybox
docker volume rm app-data
docker rmi myapp:1.0 myapp:1.1 myapp:2.0
```
