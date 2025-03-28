#!/bin/bash

# Function to display menu
show_menu() {
    echo "=========================================="
    echo "       Docker Management Script           "
    echo "=========================================="
    echo "1) Fresh Restart (Stop & Up in Detached Mode)"
    echo "2) Remove Unused Docker Resources"
    echo "3) Deep Cleanup (Remove Everything)"
    echo "4) Basic Cleanup (Remove Containers & Images)"
    echo "5) Exit"
    echo "------------------------------------------"
    read -p "Select an option: " option
}

# Function for Fresh Restart
fresh_restart() {
    echo "Stopping the application and restarting it in detached mode..."
    docker-compose down && docker-compose up -d
}

# Function for Unused Cleanup
cleanup_unused() {
    echo "Removing all unused Docker resources (images, volumes, networks)..."
    docker system prune -a --volumes -f
}

# Function for Deep Cleanup
deep_cleanup() {
    echo "Performing a full cleanup of Docker resources..."
    docker-compose down
    docker stop $(docker ps -q)
    docker rm -f $(docker ps -a -q)
    docker rmi -f $(docker images -a -q)
    docker volume prune -f
    docker network prune -f
    docker builder prune -f
    rm -rf ./db-data /root/keycloak/data /srv/keycloak-postgres/backups/*
    echo "Restarting Docker daemon..."
    sudo systemctl restart docker
}

# Function for Basic Cleanup
basic_cleanup() {
    echo "Stopping and removing all containers..."
    docker stop $(docker ps -q)
    docker rm -f $(docker ps -a -q)
    echo "Removing all images..."
    docker rmi -f $(docker images -a -q)
}

# Infinite loop to show menu
while true; do
    show_menu
    case $option in
        1) fresh_restart ;;
        2) cleanup_unused ;;
        3) deep_cleanup ;;
        4) basic_cleanup ;;
        5) echo "Exiting..."; exit 0 ;;
        *) echo "Invalid option, please try again." ;;
    esac
    echo ""
    read -p "Press Enter to return to menu..."
done
