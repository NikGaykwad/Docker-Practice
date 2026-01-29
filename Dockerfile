FROM nginx:latest

# Copy custom configuration file (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Copy static website files (optional)
COPY ./linux_commands_pdf.html /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
