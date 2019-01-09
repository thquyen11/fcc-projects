FROM node:8.15.0

#Create app directory
RUN mkdir -p /usr/src/backend
WORKDIR /usr/src/backend

#Bundle app source
COPY . /usr/src/backend
RUN npm i

CMD ["/bin/bash"]