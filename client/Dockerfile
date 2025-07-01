# Build stage
FROM node:18-alpine as builder
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production

# Copy package files first to leverage Docker cache
COPY package*.json ./
COPY vite.config.js ./

# Install dependencies
RUN npm install --omit=dev

# Copy all files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the built app from previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for web traffic
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]