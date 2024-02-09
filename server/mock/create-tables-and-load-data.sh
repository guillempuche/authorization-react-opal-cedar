#!/bin/sh
set -e

# Load environment variables from the .env file
. /script/.env

DATABASE=$DB_NAME
USERNAME=$DB_USERNAME
PASSWORD=$DB_PASSWORD
HOSTNAME=db # Same as the Docker service's name.

# Wait for PostgreSQL to start
echo "Waiting for postgres..."

# # Loop to check if PostgreSQL is ready and accepting connections
while ! pg_isready -h "$HOSTNAME" -U "$USERNAME"; do
  sleep 1
  echo "Waiting for PostgreSQL to become available..."
done
# # Define maximum number of attempts to check for DB readiness
# MAX_ATTEMPTS=30
# ATTEMPT=1
# until PGPASSWORD="$PASSWORD" psql -h "$HOSTNAME" -U "$USERNAME" -d "$DATABASE" -c '\q' || [ $ATTEMPT -eq $MAX_ATTEMPTS ]; do
#   echo "Waiting for PostgreSQL to become available... Attempt $ATTEMPT of $MAX_ATTEMPTS"
#   ATTEMPT=$((ATTEMPT+1))
#   sleep 1
# done
# initial_sleep=10
# echo "Waiting for $initial_sleep seconds before checking PostgreSQL readiness..."
# sleep $initial_sleep
# # Loop to check if PostgreSQL is ready and accepting connections
# echo "Checking PostgreSQL readiness..."
# until PGPASSWORD="$PASSWORD" psql -h "$HOSTNAME" -U "$USERNAME" -d "$DATABASE" -c '\q'; do
#   echo "Postgres is unavailable - sleeping"
#   sleep 5 # Increase sleep time to reduce the frequency of checks
# done

echo "🏃 PostgreSQL is up and running..."

echo "Creating the database tables \"quotes\" and \"creators\" if they don't exist yet..."

# Run SQL commands to set up the database
PGPASSWORD="$PASSWORD" psql -h "$HOSTNAME" -U "$USERNAME" -d "$DATABASE" <<EOSQL
  CREATE TABLE IF NOT EXISTS quotes (
      id VARCHAR(255) PRIMARY KEY,
      text TEXT NOT NULL,
      author VARCHAR(255) NOT NULL,
      private BOOLEAN NOT NULL,
      creator VARCHAR(255) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS creators (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      premium BOOLEAN NOT NULL
  );
EOSQL

echo "✅ Tables created"

echo "Inserting or updating data in the \"quotes\" and \"creators\" tables..."

# Load mock data from JSON files
QUOTES_JSON=$(cat /script/mock.quotes.json)
CREATORS_JSON=$(cat /script/mock.creators.json)

# Use the json_populate_recordset function to insert or update data.
# If a row with the same id already exists, it updates the existing row with the new values.
PGPASSWORD="$PASSWORD" psql -h "$HOSTNAME" -U "$USERNAME" -d "$DATABASE" -c \
  "INSERT INTO quotes SELECT * FROM json_populate_recordset(NULL::quotes, '$QUOTES_JSON') ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, author = EXCLUDED.author, private = EXCLUDED.private, creator = EXCLUDED.creator;"

PGPASSWORD="$PASSWORD" psql -h "$HOSTNAME" -U "$USERNAME" -d "$DATABASE" -c \
  "INSERT INTO creators SELECT * FROM json_populate_recordset(NULL::creators, '$CREATORS_JSON') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, premium = EXCLUDED.premium;"

echo "✅ Tables prefilled successfully with the mock data"

echo "🏃 \"script-runner\" is shutting down, but \"db\" is still running..."
