#
# To build this image and run it with a shell, first change into the directory
# where this Dockerfile lives, then:
#
# sudo docker build --build-arg BUILD_VERSION=5.5.0 -t test .
# sudo docker run -ti test bash
#

FROM nvidia/opengl:1.0-glvnd-devel-ubuntu16.04

# Could provide a specific release version here, such as "5.5.0"
ARG BUILD_VERSION=master

RUN apt-get update && apt-get install -y --no-install-recommends \
        ca-certificates \
        chrpath \
        curl \
        gfortran \
        git \
        g++ && \
    rm -rf /var/lib/apt/lists/*

COPY scripts/build.sh /opt/paraview/build.sh

# Get CMake, then clone, configure and build ParaView
RUN mkdir -p /opt/cmake/3.11.1 && cd /opt/cmake/3.11.1 && \
    curl -L https://cmake.org/files/v3.11/cmake-3.11.1-Linux-x86_64.tar.gz | tar --strip-components=1 -xzv
#     curl -L https://cmake.org/files/v3.11/cmake-3.11.1-Linux-x86_64.tar.gz | tar --strip-components=1 -xzv && \
#     mkdir -p /opt/paraview && cd /opt/paraview && \
#     ./build.sh $BUILD_VERSION && \
#     rm -rf /opt/paraview/build && \
#     rm -rf /opt/paraview/src && \
#     rm -rf /opt/cmake

WORKDIR /opt/paraview
