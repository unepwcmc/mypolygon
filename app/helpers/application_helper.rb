# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  def javascript_environment
    "environments/#{Rails.env.downcase}"
  end

  def to_percent percent, precision=1, none_text = 'none'
    return none_text if percent == 0
    percent = number_with_precision(100 * percent, :precision => precision)
    percent_bar(percent) + percent.to_s + '%'
  end

  def percent_bar percent
    " <span class='percent'><div class='bar' style='width: #{percent}%; background-color: #{calculate_bg percent};'></div>#{percent} %</span> ".html_safe
  end

  private
  def calculate_bg percent
    percent = percent.to_f unless percent.is_a? Fixnum
    red = percent*2.55#/100
    green = (100-percent)*2.55#/100
    blue = 0
    "#%02x%02x%02x" % [red, green, blue]
  end
end
