# Stage 1: Build the Vite React app
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the build output to Nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Remove default Nginx config and replace with custom (optional)
 COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
