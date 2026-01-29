## Hands-on scenario for below

* custom user `appuser-nik`
* port mapping
* named volume
* custom network
* environment variables
* real container you can exec into

---

## Step 1: Create a custom Docker network

```bash
docker network create app-net
```

---

## Step 2: Create a simple Dockerfile (non-root user)

Create a file named `Dockerfile` in your local folder:

```dockerfile
FROM busybox

# Create custom non-root user
RUN adduser -D appuser-nik

# Set working directory
WORKDIR /app

# Switch to non-root user
USER appuser-nik

# Keep container running
CMD ["sh", "-c", "while true; do sleep 60; done"]
```

Build the image:

```bash
docker build -t demo-appuser .
```

---

## Step 3: Run container with **port, volume, network, env, user**

Now the **main command** 👇

```bash
docker run -it -d \
  --name demo-container \
  --user appuser-nik \
  -p 8080:80 \
  -v app-data:/app/data \
  --network app-net \
  -e APP_ENV=dev \
  -e APP_OWNER=nikhil \
  demo-appuser
```

### What this single command does

* `--user appuser-nik` → runs container as non-root user
* `-p 8080:80` → port mapping
* `-v app-data:/app/data` → named volume
* `--network app-net` → custom Docker network
* `-e` → environment variables

---

## Step 4: Exec into the container and verify everything

```bash
docker exec -it demo-container sh
```

### Inside container, test one by one

#### 1️⃣ Check user

```sh
whoami
```

Output:

```text
appuser-nik
```

#### 2️⃣ Check environment variables

```sh
env | grep APP
```

Output:

```text
APP_ENV=dev
APP_OWNER=nikhil
```

#### 3️⃣ Write data to volume

```sh
echo "volume test success" > /app/data/test.txt
ls /app/data
```

Exit:

```sh
exit
```

---

## Step 5: Verify volume on host

```bash
sudo ls /var/lib/docker/volumes/app-data/_data
sudo cat /var/lib/docker/volumes/app-data/_data/test.txt
```

Output:

```text
volume test success
```
<img width="1345" height="267" alt="image" src="https://github.com/user-attachments/assets/558d022b-f8c4-4bdb-a4ca-81ed417d6638" />

---

## Step 6: Network verification (optional)

```bash
docker network inspect app-net
```

You’ll see `demo-container` attached.

---

