#!/bin/bash

PROJECT_ROOT="$(dirname $(realpath $0))/../../.."
BOOTSTRAP="${PROJECT_ROOT}/ci/_utils/bootstrap.sh"

# Check if the bootstrap script exists
if [ ! -f "${BOOTSTRAP}" ]; then
    echo "BOOTSTRAP NOT FOUND ON ${BOOTSTRAP}"
    exit 1
fi

# Read usage instructions into the usage variable
read -r -d '' usage <<-'EOF' || true # exits non-zero when EOF encountered
  -i  [arg] Docker image version.
  -d        Enables debug mode
  -h        This page
EOF

# Source the bootstrap script
source "${BOOTSTRAP}"

############################################################################################################

# Check if the variables are empty
[ -z "${arg_i}" ] && emergency "Arg -i (commit hash) is required"

# Define the function to execute when the script exits
function cleanup_before_exit () {
    docker run -v "${PWD}":/data alpine:3.5 chown $PUID:$PGID -R /data
    docker rmi "${TENANT_ADMIN_IMAGE}:${arg_i}" || true
}

trap cleanup_before_exit EXIT

"${PROJECT_ROOT}/ci/tenant-admin/build/build.sh" -n "${TENANT_ADMIN_IMAGE}" -i "${arg_i}"

docker push "${TENANT_ADMIN_IMAGE}:${arg_i}"
