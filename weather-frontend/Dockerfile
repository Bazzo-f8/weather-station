# Base Image (Choose a lightweight Node.js image)
FROM node:18-alpine

WORKDIR /app

# Copy package.json and yarn.lock (or package-lock.json)
COPY package*.json ./

# Install dependencies (adjust if using yarn)
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose the port your Quasar app listens on (usually not needed for SPAs)
# EXPOSE 8080  # Optional, comment out if not needed
EXPOSE 9000
# Start the Quasar development server (adjust if using a different command)
CMD [ "npm", "run", "dev" ]

# Optional: Consider adding a volume to persist project files
# VOLUME /app
