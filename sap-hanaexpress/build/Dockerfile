ARG IMAGE
ARG TAG
FROM ${IMAGE}:${TAG}

COPY --chown=12000:79 credentials.json /hana/mounts/
RUN chmod 600 /hana/mounts/credentials.json

CMD ["--agree-to-sap-license", "--passwords-url", "file:///hana/mounts/credentials.json" ]
