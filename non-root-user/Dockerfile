FROM openjdk:17-jdk-slim

# Create a non-root user
RUN useradd -m appuser

# Set working directory
WORKDIR /app

# Copy application jar
COPY app.jar app.jar

# Switch to non-root user
USER appuser

# Run the application
CMD ["java", "-jar", "app.jar"]
