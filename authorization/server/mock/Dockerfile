# Runned in 'build' section of Docker Compose.

# Use the Alpine Linux image as a base because it's lightweight and
# suitable for running scripts
FROM alpine

# Install the PostgreSQL client. This is necessary to run psql commands
# from within this container.
# No-cache option ensures that the index is not stored, reducing the
# size of the container.
RUN apk add --no-cache postgresql-client

# Set the working directory inside the container to /script.
# This is where we'll place the script.
WORKDIR /script

# Copy the script into the container.
COPY ./create-tables-and-load-data.sh /script/create-tables-and-load-data.sh

# Change the permissions of the script to make it executable.
# This is necessary because files copied into a Docker container might
# not have execution permissions by default.
RUN chmod +x /script/create-tables-and-load-data.sh

# The default command to run when the container starts.
# Here, we execute the script because it's responsible for setting up and populating
# the database.
CMD ["sh", "/script/create-tables-and-load-data.sh"]