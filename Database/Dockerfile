# Inherit from an image containing Debian OS + Mysql:
FROM mysql:5

# Copy the sql file into the init folder for runing it once:
COPY ./vacations.sql /docker-entrypoint-initdb.d 

