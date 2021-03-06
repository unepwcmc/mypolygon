#default_run_options[:pty] = true

set :application, "proteus"
set :repository,  "http://github.com/tokumine/proteus.git"
set :scm, "git"
#set :branch, "new_proteus"

role :web, "proteus2.tinypla.net"
role :app, "proteus2.tinypla.net"
role :db, "proteus2.tinypla.net", :primary=>true

#set :scm_passphrase, "" #This is your custom users password
set :user, "ubuntu"
set :deploy_to, "/home/ubuntu/www/#{application}"


namespace :deploy do
  desc "Restarting mod_rails with restart.txt"
  task :restart, :roles => :app, :except => { :no_release => true } do
    #sudo "chown postgres:postgres  #{current_path}/config/environment.rb"
    run "rm -f #{current_path}/config/database.yml"
    run "ln -s #{shared_path}/database.yml #{current_path}/config/database.yml"
    run "cd #{current_path} && RAILS_ENV=production rake asset:packager:build_all"
    run "touch #{current_path}/tmp/restart.txt"
  end  
end

desc "tail production log files" 
task :tail_logs, :roles => :app do
  run "tail -f #{shared_path}/log/production.log" do |channel, stream, data|
    puts  # for an extra line break before the host name
    puts "#{channel[:host]}: #{data}" 
    break if stream == :err    
  end
end
  
# If you have previously been relying upon the code to start, stop 
# and restart your mongrel application, or if you rely on the database
# migration code, please uncomment the lines you require below

# If you are deploying a rails app you probably need these:

# load 'ext/rails-database-migrations.rb'
# load 'ext/rails-shared-directories.rb'

# There are also new utility libaries shipped with the core these 
# include the following, please see individual files for more
# documentation, or run `cap -vT` with the following lines commented
# out to see what they make available.

# load 'ext/spinner.rb'              # Designed for use with script/spin
# load 'ext/passenger-mod-rails.rb'  # Restart task for use with mod_rails
# load 'ext/web-disable-enable.rb'   # Gives you web:disable and web:enable

# If you aren't deploying to /u/apps/#{application} on the target
# servers (which is the default), you can specify the actual location
# via the :deploy_to variable:
# set :deploy_to, "/var/www/#{application}"

# If you aren't using Subversion to manage your source code, specify
# your SCM below:
# set :scm, :subversion
# see a full list by running "gem contents capistrano | grep 'scm/'"

