# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  def javascript_environment
    "environments/#{ENV['RAILS_ENV'].downcase}"
  end
end
