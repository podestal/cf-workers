# Use Node 20 on Ubuntu Bookworm (Ubuntu 24.04) to ensure glibc >= 2.35
FROM node:20-bookworm

# metadata
LABEL maintainer="you@example.com"
ENV DEBIAN_FRONTEND=noninteractive

# create a non-root user to match host UID/GID for file ownership
ARG USERNAME=dev
ARG USER_UID=1000
ARG USER_GID=1000

# install system tools we may need
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    ca-certificates \
    build-essential \
    sudo \
    unzip \
  && rm -rf /var/lib/apt/lists/*

# create group and user (so files created by container match host)
RUN groupadd -g ${USER_GID} ${USERNAME} \
  || true \
  && useradd -m -u ${USER_UID} -g ${USER_GID} -s /bin/bash ${USERNAME} \
  || true \
  && echo "${USERNAME} ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/${USERNAME} \
  && chmod 0440 /etc/sudoers.d/${USERNAME}

# Set working dir
WORKDIR /workspace

# Copy a package.json if you want dependencies cached (optional)
# COPY package.json package-lock.json* /workspace/

# Use a named volume for node_modules to avoid host/OS conflicts if you want:
# RUN mkdir -p /workspace/node_modules && chown -R ${USER_UID}:${USER_GID} /workspace/node_modules

# Install pnpm
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable \
 && corepack prepare pnpm@9.12.0 --activate

# Switch to non-root user
USER ${USERNAME}

# Add npm global bin to PATH (already present, but explicit)
ENV PATH=/home/${USERNAME}/.npm-global/bin:$PATH

# By default container starts a bash shell (interactive)
CMD [ "bash" ]

