# Stage 1: build
FROM node:18-alpine AS build
WORKDIR /app
# copy package files first for better layer caching
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: serve with nginx
FROM nginx:stable-alpine
# remove default content
RUN rm -rf /usr/share/nginx/html/*
# nginx config: SPA fallback and simple proxy for /api to backend service
RUN printf '%s\n' "server {" \
"  listen 80;" \
"  server_name _;" \
"  root /usr/share/nginx/html;" \
"  index index.html;" \
"  location / {" \
"    try_files \$uri /index.html;" \
"  }" \
"  location /api/ {" \
"    proxy_pass http://backend:5000/;" \
"    proxy_http_version 1.1;" \
"    proxy_set_header Upgrade \$http_upgrade;" \
"    proxy_set_header Connection 'upgrade';" \
"    proxy_set_header Host \$host;" \
"  }" \
"}" > /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
