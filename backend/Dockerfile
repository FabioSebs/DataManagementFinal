FROM golang:latest

WORKDIR /backend/

COPY . /backend/

RUN go mod download

EXPOSE "5000"

CMD [ "go", "run", "." ]