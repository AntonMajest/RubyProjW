FROM ruby:2.7.0
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

WORKDIR /myapp
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN bundle install

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3001

# Configure the main process to run when running the image
CMD ["rails", "server", "-b", "0.0.0.0"]




# FROM ruby:2.7.0
# WORKDIR /myapp
# RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

# COPY Gemfile /myapp/Gemfile
# COPY Gemfile.lock /myapp/Gemfile.lock

# RUN bundle exec rake rails:update:bin
# RUN bundle install
# RUN rails new myapp



# EXPOSE 3000

# # Configure the main process to run when running the image
# CMD ["rails", "server", "-b", "0.0.0.0"]                           

# FROM ruby:2.7.0

# # RUN apt-get update \
# #     && apt-get install -y --no-install-recommends \
# #         postgresql-client \
# #     && rm -rf /var/lib/apt/lists/*



# WORKDIR /usr/src/app
# COPY Gemfile* ./
# RUN bundle install
# COPY . .

# RUN apt-get update && apt-get upgrade -y && \
#     apt-get install -y nodejs postgresql-client\
#     npm

# EXPOSE 3001 

# CMD ["rails", "server", "-b", "0.0.0.0"]