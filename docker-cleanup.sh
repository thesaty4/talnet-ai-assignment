#!/bin/bash

# Section 5: Stop and Restart the Application

# 5.1: Stop the Application
# Stops and removes all containers, networks, and volumes defined in docker-compose.yml
docker-compose down

# 5.2: Stop and Restart the Application
# Stops the application and restarts it in detached mode (runs in the background)
docker-compose down && docker-compose up -d

# Section 6: Full Cleanup of Docker Resources
# Warning: This will remove all containers, images, volumes, and networks. Back up important data first.

# 6.1: Stop and Remove All Containers
# Stops all running containers and removes all containers (including stopped ones)
docker stop $(docker ps -q)
docker rm -f $(docker ps -a -q)

# 6.2: Remove All Images
# Removes all Docker images from the system
docker rmi -f $(docker images -a -q)

# 6.3: Remove All Volumes
# Removes all unused Docker volumes to free up space
docker volume prune -f

# 6.4: Remove All Networks
# Removes all unused Docker networks
docker network prune -f

# 6.5: Clear Build Cache
# Clears the Docker build cache to free up additional space
docker builder prune -f

# 6.6: Remove Host-Mapped Data Directories
# Removes host-mapped directories for data persistence (adjust paths as needed)
rm -rf ./db-data /root/keycloak/data /srv/keycloak-postgres/backups/*

# 6.7: Restart Docker Daemon (Optional)
# Restarts the Docker daemon to reclaim disk space and ensure a clean state
sudo systemctl restart docker

# Section 7: Alternative Cleanup Command

# 7.1: Remove All Unused Resources
# Removes all unused Docker resources (images, volumes, networks) in a single command
docker system prune -a --volumes -f