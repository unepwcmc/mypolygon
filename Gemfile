source 'http://rubygems.org'

gem 'rails', '3.0.5'

# Bundle edge Rails instead:
# gem 'rails', :git => 'git://github.com/rails/rails.git'

gem 'pg'

gem "uuid"
gem 'state_machine'
gem "paperclip"
gem "nofxx-georuby", :require => "geo_ruby"
gem "dbf"
gem "postgis_adapter", :git => 'git://github.com/nofxx/postgis_adapter.git'
gem 'will_paginate' #, '2.3.11'
gem "rubyzip", :require => "zip/zip" #, :git => "git://github.com/febeling/rubyzip.git"
gem "json"
gem "googlecharts", :require => "gchart"

gem 'whenever', :require => false

# Use unicorn as the web server
# gem 'unicorn'


# Bundle the extra gems:
# gem 'bj'
# gem 'nokogiri'
# gem 'sqlite3-ruby', :require => 'sqlite3'
# gem 'aws-s3', :require => 'aws/s3'

# Bundle gems for the local environment. Make sure to
# put test-only gems in this group so their generators
# and rake tasks are available in development mode:
group :development, :test do
  #   gem 'webrat'
  # Deploy with Capistrano
  gem 'capistrano'
  gem 'capistrano-ext'
  gem 'brightbox'
  
  # To use debugger (ruby-debug for Ruby 1.8.7+, ruby-debug19 for Ruby 1.9.2+)
  # gem 'ruby-debug'
  gem 'ruby-debug19', :require => 'ruby-debug'
end
