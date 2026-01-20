FROM node:24

WORKDIR /app

# Install dependencies only
COPY package.json package-lock.json ./
RUN npm install

# Do NOT copy the source code here
# Next.js will read it from the mounted volume

EXPOSE 3020

CMD ["npm", "run", "dev"]
