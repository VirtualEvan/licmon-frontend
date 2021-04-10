# Builder image
FROM node:latest AS frontend-builder

# Build dependencies
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN HUSKY_SKIP_INSTALL=1 npm install

# Build project
COPY . ./
RUN npm run build

# Production image
FROM nginx
COPY --from=frontend-builder /usr/src/app/build /usr/share/nginx/html
RUN find /usr/share/nginx/html/ -type f -exec gzip -k {} +

#ENV FLASK_URL=http://127.0.0.1:8080
CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80


# COPY --from=builder /build/dist/licmon*.whl /tmp/
# RUN pip install $(echo /tmp/licmon*.whl)
# # RUN find /usr/local/lib/python3.8/site-packages/newdle/client/build/ -type f -exec gzip -k {} +
# ADD uwsgi.ini /
# 
# USER licmon
# 
# ENV LICMON_CONFIG=/licmon/config/licmon.cfg SERVERS_CONFIG=/licmon/config/servers.cfg FLASK_ENV=production FLASK_APP=licmon.wsgi
# CMD ["uwsgi", "--ini", "uwsgi.ini"]
# EXPOSE 8080
