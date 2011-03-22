# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  def javascript_environment
    "environments/#{Rails.env.downcase}"
  end

  def to_percent amount, total, precision=1, none_text = 'none'
    percent = amount.out_of total
    return none_text if percent == 0
    percent = number_with_precision(100 * percent, :precision => precision)
    percent.to_s + '%'
  end
end
