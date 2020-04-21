FROM ruby:2.7.1

RUN apt update && apt install -y nodejs tzdata sqlite build-essential patch \ 
    ruby-dev zlib1g-dev liblzma-dev && \
    gem install mailcatcher --no-document

RUN mkdir /app
WORKDIR /app

COPY . .
RUN bundle update --bundler && bundle install

CMD (sidekiq --concurrency 2 &) && (while true; do sleep 1; done;)
