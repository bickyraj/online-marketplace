# Use the official Node.js image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Expose the app on port 3000
EXPOSE 5173

# Start the app
CMD ["npm", "run", "dev", "--", "--host"]