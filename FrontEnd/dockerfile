# Stage 1 - the build process
FROM node:12.13 as build-deps
# set working directory
WORKDIR /usr/src/app

RUN npm install -g yarn

# install and cache app dependencies
COPY package*.json ./
COPY yarn*.lock ./
ADD package.json /usr/src/app/package.json
ADD yarn.lock /usr/src/app/yarn.lock

RUN yarn install

COPY ./ ./

# Stage 2 - the production environment

# Build for production.
RUN yarn run build

# Install `serve` to run the application.
RUN yarn global add serve

# Set the command to start the node server.
CMD serve -s build

# Tell Docker about the port we'll run on.
EXPOSE 5000

# end of file