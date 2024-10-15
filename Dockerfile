FROM node:20.7.0-alpine

WORKDIR /app

COPY . .

RUN apk update && apk add python3 py3-pip && \
    pip3 install -r requirements.txt && \
    npm install && \
    npm run build && \
    echo -e "#!/bin/sh\n\
    python /app/service-server/ali_audio.py &\n\
    npm start" > /app/start.sh && \
    chmod +x /app/start.sh

# 暴露两个服务的端口
EXPOSE 5100
EXPOSE 3000
# 设置启动命令
CMD ["/bin/sh", "/app/start.sh"]

