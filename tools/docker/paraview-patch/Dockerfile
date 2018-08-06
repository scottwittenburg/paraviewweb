
# To build this image, first change into the directory where this Dockerfile
# lives, then:
#
# sudo docker build -t paraview-patch-5.5.0 .
#
# Or, to specify a differnt base paraview image:
#
# sudo docker build --build-arg BASE_IMAGE=paraview-osmesa -t paraview-patch-osmesa .
#
# To run the container and inspect it using the shell:
#
# sudo docker run --runtime=nvidia -P -ti pvw-patch bash
#

ARG BASE_IMAGE=kitware/paraviewweb:pv-5.5.0
FROM ${BASE_IMAGE}

# Copy render_window_serializer.py into place in the install tree
COPY render_window_serializer.py /opt/paraview/install/lib/python2.7/site-packages/vtkmodules/web/render_window_serializer.py

WORKDIR /opt/paraview
