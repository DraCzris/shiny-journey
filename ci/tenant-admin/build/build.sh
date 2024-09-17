#!/bin/bash

PROJECT_ROOT="$(dirname $(realpath $0))/../../.."
BOOTSTRAP="${PROJECT_ROOT}/ci/_utils/bootstrap.sh"

if [ ! -f "${BOOTSTRAP}" ]; then
    echo "BOOTSTRAP NOT FOUND ON ${BOOTSTRAP}"
    exit 1
fi

read -r -d '' usage <<-'EOF' || true # exits non-zero when EOF encountered
  -n  [arg] Image name
  -i  [arg] Docker image version.
  -d        Enables debug mode
  -h        This page
EOF

source "${BOOTSTRAP}"

############################################################################################################

[ -z "${arg_n}" ] && emergency "Arg -n is required"
[ -z "${arg_i}" ] && emergency "Arg -i is required"

export INSTANCE_ID=${CI_RUNNER_ID:-default}

function cleanup_before_exit () {
  echo "Cleaning up..."
}

trap cleanup_before_exit EXIT

cd "${PROJECT_ROOT}"

echo "Building Tenant-admin image"
docker build -f ./ci/tenant-admin/build/Dockerfile . -t "${arg_n}:${arg_i}" 
