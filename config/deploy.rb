set :default_stage, 'staging'
require 'capistrano/ext/multistage'

set :whenever_command, "bundle exec whenever"
require "whenever/capistrano"

