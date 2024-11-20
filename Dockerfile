# Use an official Node.js image as the base image
FROM node:18

# Install dependencies for Python, C++ (G++), and other necessary tools
RUN apt-get update && \
    apt-get install -y \
    python3 \
    g++ \
    make \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]