FROM node:16.17-alpine3.15
# Set the working directory
WORKDIR /usr/src/app
# Install typescript so I have access to tsc command
RUN npm i typescript
# Set the NODE_ENV variable to development so we can also install the dev dependencies
ENV NODE_ENV=development
# Copy the package.json and package-lock.json to install the dependencies
COPY package.json package-lock.json ./
RUN npm i 
# Copy all files
COPY . /usr/src/app
# Expose a port to run our application
EXPOSE 8080
# Run the application to the development variable
CMD ["npm", "run", "dev"]