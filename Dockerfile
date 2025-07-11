# Build stage
FROM node:18-alpine as builder
WORKDIR /app

# Install ALL dependencies including dev
COPY package*.json ./
RUN npm install --include=dev

# Copy rest of the app
COPY . .

# Build Vite app
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN ln -s /usr/share/nginx/html /etc/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
