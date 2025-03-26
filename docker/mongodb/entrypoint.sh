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
db.createCollection('client')
EOF

echo "Creating the runtime user"

mongo --username=${MONGO_INITDB_ROOT_USERNAME} --password=${MONGO_INITDB_ROOT_PASSWORD} <<EOF
use admin

db = db.getSiblingDB("core-fca-low")

db.createRole({
  role: "role_user_api_partenaires",
  roles: [],
  privileges: [
    {
      resource: { db: "core-fca-low", collection: "client" },
      actions: [ "find", "update", "insert" ]
    }
  ]
});

db.createUser({
  user: "${MONGO_INITDB_API_USERNAME}",
  pwd: "${MONGO_INITDB_API_PASSWORD}",
  roles: [
    { role: "role_user_api_partenaires", db: "core-fca-low"}
  ]
});
EOF

echo "Seeding the database..."
mongoimport --username=${MONGO_INITDB_ROOT_USERNAME} --password=${MONGO_INITDB_ROOT_PASSWORD} --authenticationDatabase=admin --db core-fca-low --collection client --file /init/mockdata.json --jsonArray

# Keep the container running
wait
