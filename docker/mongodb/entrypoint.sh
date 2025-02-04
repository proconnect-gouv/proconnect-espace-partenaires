#!/bin/bash

echo "Starting MongoDB in the background..."
mongod --replSet rs0 --bind_ip_all --keyFile /init/keyfile &

echo "Waiting for MongoDB to start..."
until mongo --eval "printjson(rs.initiate())" 2>/dev/null; do
  sleep 1
done

echo "Waiting for replica set to be ready..."
until mongo --eval "printjson(rs.status())" | grep -q '"ok" : 1'; do
  sleep 1
done

echo "Creating the admin user..."
mongo <<EOF
use admin
db.createUser({
  user: "${MONGO_INITDB_ROOT_USERNAME}",
  pwd: "${MONGO_INITDB_ROOT_PASSWORD}",
  roles: [{ role: "root", db: "admin" }]
});
db = db.getSiblingDB("core-fca-low")
db.createCollection('oidc_clients')
EOF

echo "Seeding the database..."
mongoimport --username=${MONGO_INITDB_ROOT_USERNAME} --password=${MONGO_INITDB_ROOT_PASSWORD} --authenticationDatabase=admin --db core-fca-low --collection oidc_clients --file /init/mockdata.json --jsonArray

# Keep the container running
wait
