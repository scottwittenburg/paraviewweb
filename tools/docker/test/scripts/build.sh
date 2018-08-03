#!/usr/bin/env bash

set -ev

BUILD_VERSION=master

if [ "$#" -eq 1 ]
then
  BUILD_VERSION=$1
fi

echo "Building paraview ${BUILD_VERSION}"

git clone --recursive https://gitlab.kitware.com/paraview/paraview-superbuild.git src
cd src

if [ "${BUILD_VERSION}" != "master" ];
then
  git checkout "tags/v${BUILD_VERSION}" -b "version-${BUILD_VERSION}"
  SOURCE_SEL="-Dparaview_SOURCE_SELECTION:STRING=${BUILD_VERSION}"
  GIT_TAG=""
else
  SOURCE_SEL="-Dparaview_SOURCE_SELECTION:STRING=git"
  GIT_TAG="-Dparaview_GIT_TAG:STRING=master"
fi

git submodule update
cd .. && mkdir build && cd build

/opt/cmake/3.11.1/bin/cmake \
  -DCTEST_USE_LAUNCHERS:BOOL=1 \
  -DCMAKE_INSTALL_PREFIX:PATH=/opt/paraview/install \
  -DENABLE_egl:BOOL=ON \
  -DEGL_INCLUDE_DIR:PATH=/usr/local/include \
  -DEGL_LIBRARY:FILEPATH=/usr/local/lib/x86_64-linux-gnu/libEGL.so \
  -DEGL_gldispatch_LIBRARY:FILEPATH=/usr/local/lib/x86_64-linux-gnu/libGLdispatch.so \
  -DEGL_opengl_LIBRARY:FILEPATH=/usr/local/lib/x86_64-linux-gnu/libOpenGL.so \
  -DENABLE_vistrails:BOOL=ON \
  -DUSE_SYSTEM_qt5:BOOL=OFF \
  -DENABLE_netcdf:BOOL=OFF \
  -DENABLE_hdf5:BOOL=ON \
  -DENABLE_szip:BOOL=ON \
  -DENABLE_paraviewgettingstartedguide:BOOL=OFF \
  -DENABLE_visitbridge:BOOL=ON \
  -DENABLE_mesa:BOOL=OFF \
  -DENABLE_ffmpeg:BOOL=ON \
  -DPARAVIEW_DEFAULT_SYSTEM_GL:BOOL=OFF \
  -DENABLE_nvidiaindex:BOOL=OFF \
  -DENABLE_qt5:BOOL=OFF \
  -DENABLE_mpi:BOOL=ON \
  -DENABLE_silo:BOOL=ON \
  -DENABLE_paraview:BOOL=ON \
  -DENABLE_xdmf3:BOOL=ON \
  -DENABLE_h5py:BOOL=ON \
  -DBUILD_SHARED_LIBS:BOOL=ON \
  -Dvtkm_SOURCE_SELECTION:STRING=for-git \
  -DENABLE_paraviewtutorial:BOOL=OFF \
  -DENABLE_vtkm:BOOL=ON \
  -DENABLE_numpy:BOOL=ON \
  -DENABLE_vrpn:BOOL=ON \
  -DENABLE_paraviewusersguide:BOOL=OFF \
  -DENABLE_cosmotools:BOOL=ON \
  -DCMAKE_BUILD_TYPE:STRING=Release \
  -DENABLE_glu:BOOL=ON \
  -DENABLE_tbb:BOOL=ON \
  -DENABLE_boxlib:BOOL=OFF \
  -Dsuperbuild_download_location:PATH=/opt/paraview/build/downloads \
  -DENABLE_paraviewweb:BOOL=ON \
  -DENABLE_paraviewtutorialdata:BOOL=OFF \
  -DENABLE_boost:BOOL=ON \
  -DENABLE_vortexfinder2:BOOL=OFF \
  -DENABLE_python:BOOL=ON \
  -DDIY_SKIP_SVN:BOOL=ON \
  -DUSE_NONFREE_COMPONENTS:BOOL=ON \
  -DENABLE_matplotlib:BOOL=ON \
  -DENABLE_las:BOOL=ON \
  -DBUILD_TESTING:BOOL=ON \
  -DENABLE_scipy:BOOL=ON \
  -DENABLE_ospray:BOOL=OFF \
  -DENABLE_acusolve:BOOL=ON \
  -DENABLE_fontconfig:BOOL=ON \
  -Dparaview_FROM_GIT:BOOL=ON \
  ${SOURCE_SEL} \
  ${GIT_TAG} \
  -DCTEST_USE_LAUNCHERS:BOOL=TRUE \
  "-GUnix Makefiles" \
  ../src

make -j"$(nproc)" install
