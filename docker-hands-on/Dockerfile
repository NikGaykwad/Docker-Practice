FROM busybox

# Create non-root user
RUN adduser -D appuser-nik

# Create app directory and data directory
WORKDIR /app
RUN mkdir -p /app/data && chown -R appuser-nik /app

# Switch to non-root user
USER appuser-nik

CMD ["sh", "-c", "while true; do sleep 60; done"]

