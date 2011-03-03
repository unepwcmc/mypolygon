# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  def javascript_environment
    "environments/#{Rails.env.downcase}"
  end
end
