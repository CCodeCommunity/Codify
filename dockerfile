# Use the official Node.js image from the Docker Hub
FROM node:18.5.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the rest of the application code to the working directory
COPY . .

# Define the command to run the app
CMD ["npm", "run", "dev"]
