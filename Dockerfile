# Use Ubuntu as a base image
FROM ubuntu:20.04

# Install Node.js and Yarn
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g yarn@1.22.19

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock /app/

# Install project dependencies
RUN yarn install --frozen-lockfile

# Copy the entire project directory to the container
COPY . /app/

# Build the project
RUN yarn run build

# Expose the port that your Next.js application listens on
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
