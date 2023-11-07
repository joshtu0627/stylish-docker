FROM node:20


RUN apt-get update && apt-get install -y redis-tools redis-server   

# Create a pp directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install



# Bundle app source
COPY . .
# Expose port 3000
EXPOSE 8000

# Run the app
CMD  [ "npm", "run", "dev" ]