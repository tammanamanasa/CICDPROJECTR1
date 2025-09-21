FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
# install only production deps
RUN npm ci --omit=dev
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
