#!/usr/bin/env bash

#
# Restarts the apache webserver and starts the launcher in the foreground.
#

groupadd proxy-mapping && \
useradd --system -g proxy-mapping -s /sbin/nologin pvw-user && \
usermod -a -G proxy-mapping www-data && \
mkdir -p /pvw/launcher && \
mkdir -p /opt/paraviewweb/scripts && \
touch /pvw/launcher/proxy-mapping.txt && \
chown pvw-user:proxy-mapping /pvw/launcher/proxy-mapping.txt && \
chmod 660 /pvw/launcher/proxy-mapping.txt && \
mkdir -p /pvw/launcher/logs

LAUNCHER_PATH=/pvw/launcher/launcher.json

# Make sure the apache webserver is running
echo "Starting/Restarting Apache webserver"
service apache2 restart

# Run the pvw launcher in the foreground so this script doesn't end
echo "Starting the wslink launcher"
/opt/paraview/install/bin/pvpython /opt/paraview/install/lib/python2.7/site-packages/wslink/launcher.py ${LAUNCHER_PATH}
