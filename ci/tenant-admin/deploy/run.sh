#!/bin/bash

PROJECT_ROOT="$(dirname $(realpath $0))/../../.."
BOOTSTRAP="${PROJECT_ROOT}/ci/_utils/bootstrap.sh"

if [ ! -f "${BOOTSTRAP}" ]; then
    echo "BOOTSTRAP NOT FOUND ON ${BOOTSTRAP}"
    exit 1
fi


read -r -d '' usage <<-'EOF' || true # exits non-zero when EOF encountered
  -i  [arg] Docker image version.
  -d        Enables debug mode
  -h        This page
EOF

source "${BOOTSTRAP}"

############################################################################################################

[ -z "${arg_i}" ] && emergency "Arg -i is required"

ENVIROMENT_ROOT="/srv/waypoint/${ENVIRONMENT_PATH}/admin"
ENV_FILE="${ENVIROMENT_ROOT}/.env"
ADMIN_IMAGE="${TENANT_ADMIN_IMAGE}:${arg_i}"

echo "Pulling image ${ADMIN_IMAGE}"
docker pull "${ADMIN_IMAGE}"

cd ${ENVIROMENT_ROOT}

echo "Stopping current container..."


docker compose down

# Extract build hash from manifest file

echo "Changing image in env file..."
echo "ADMIN_IMAGE=${ADMIN_IMAGE}" > "${ENV_FILE}"

echo "Running docker compose up -d"
docker compose up -d
