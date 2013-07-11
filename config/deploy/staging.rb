## Generated with 'brightbox' on 2011-05-11 16:48:20 +0100
gem 'brightbox', '>=2.3.8'
require 'brightbox/recipes'
require 'brightbox/passenger'

# The name of your application.  Used for deployment directory and filenames
# and Apache configs. Should be unique on the Brightbox
set :application, "mypolygon"

# Primary domain name of your application. Used in the Apache configs
set :domain, "unepwcmc-005.vm.brightbox.net"

## List of servers
role :app, "unepwcmc-005.vm.brightbox.net"
role :web, "unepwcmc-005.vm.brightbox.net"
role :db, 'unepwcmc-005.vm.brightbox.net', :primary => true
# Target directory for the application on the web and app servers.
set(:deploy_to) { File.join("", "home", user, application) }

# URL of your source repository. By default this will just upload
# the local directory.  You should probably change this if you use
# another repository, like git or subversion.
#set :deploy_via, :copy
set :repository, "git@github.com:unepwcmc/mypolygon.git"

set :scm, :git
set :branch, "develop"
set :scm_username, "unepwcmc-read"
#set :deploy_via, :copy

### Other options you can set ##
# Comma separated list of additional domains for Apache
# set :domain_aliases, "www.example.com,dev.example.com"

## Local Shared Area
# These are the list of files and directories that you want
# to share between the releases of your application on a particular
# server. It uses the same shared area as the log files.
#
# NOTE: local areas trump global areas, allowing you to have some
# servers using local assets if required.
#
# So if you have an 'upload' directory in public, add 'public/upload'
# to the :local_shared_dirs array.
# If you want to share the database.yml add 'config/database.yml'
# to the :local_shared_files array.
#
# The shared area is prepared with 'deploy:setup' and all the shared
# items are symlinked in when the code is updated.
# set :local_shared_dirs, %w(public/upload)
# set :local_shared_files, %w(config/database.yml)
set :global_shared_dirs, %w(public/system)
set :global_shared_files, %w(config/database.yml)

# SSH options. The forward agent option is used so that loopback logins
# with keys work properly
# ssh_options[:forward_agent] = true

# Forces a Pty so that svn+ssh repository access will work. You
# don't need this if you are using a different SCM system. Note that
# ptys stop shell startup scripts from running.
default_run_options[:pty] = true

## Logrotation
# Where the logs are stored. Defaults to <shared_path>/log
# set :log_dir, "central/log/path"
# The size at which to rotate a log. e.g 1G, 100M, 5M. Defaults to 100M
# set :log_max_size, "100M"
# How many old compressed logs to keep. Defaults to 10
# set :log_keep, "10"

task :setup_database_configuration do
  the_host = Capistrano::CLI.ui.ask("Database IP address: ")
  database_name = Capistrano::CLI.ui.ask("Database name: ")
  database_user = Capistrano::CLI.ui.ask("Database username: ")
  pg_password = Capistrano::CLI.password_prompt("Database user password: ")
  require 'yaml'
  spec = { "production" => {
                                   "adapter" => "postgresql",
                                   "database" => database_name,
                                   "username" => database_user,
                                   "template" => "template_postgis",
                                   "host" => the_host,
                                   "password" => pg_password }}
  run "mkdir -p #{shared_path}/config"
  put(spec.to_yaml, "#{shared_path}/config/database.yml")
end
after "deploy:setup", :setup_database_configuration

task :package_assets do
  run "cd #{release_path} && bundle exec rake asset:packager:build_all RAILS_ENV=production"
end
after "deploy:update", :package_assets
