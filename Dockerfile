#local stage
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:dev" ]

#prod stage
# FROM node:18

# WORKDIR /app

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# COPY --from=build /app/dist ./dist

# COPY package*.json ./

# RUN npm install --only=production

# RUN rm package*.json 

# EXPOSE 3000

# CMD [ "node","dist/main.js" ]