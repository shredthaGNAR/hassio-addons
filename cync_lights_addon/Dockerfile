FROM node:17.5-bullseye

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Add env
ENV LANG C.UTF-8

# Install packages
RUN apt-get update
RUN apt-get install -y python3.9 python3-pip libportaudio2 alsa-utils \
        portaudio19-dev libffi-dev libssl-dev libmpg123-dev git
RUN pip install google-assistant-grpc==0.3.0 google-auth-oauthlib==0.4.6 \
        setuptools wheel
RUN pip install --force-reinstall protobuf==3.19.4
RUN apt-get clean -y
RUN npm install pm2@latest -g
RUN pm2 install pm2-logrotate
RUN pm2 set pm2-logrotate:max_size 10K
RUN pm2 set pm2-logrotate:retain 1
RUN git clone https://github.com/nikshriv/hassio-addons && \
    cd /hassio-addons/cync_lights_addon && \
    npm install --unsafe-perm && \
    chmod a+x run.sh

CMD [ "/hassio-addons/cync_lights_addon/run.sh" ]
