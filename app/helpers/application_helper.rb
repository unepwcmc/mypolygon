# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  def javascript_environment
    "environments/#{Rails.env.downcase}"
  end

  def overlapping_percent_of part, total, options ={}
    defaults = {:precision => 4, :units => "km2", :notice => "no coverage"}
    percent_of part, total, options.reverse_merge(defaults)
  end

  def percent_of part, total, options = {}
    options.reverse_merge! :precision => 1, :notice => 'none'

    percent = part.out_of(total)
    return options[:notice] if percent == 0

    units = options[:units]
    units = "km<sup>2</sup>" if units == "km2"

    percent = number_with_precision(100 * percent, :precision => options[:precision])
    res = percent_slider(percent)
    #return res.html_safe if options[:no_text]
    res += percent.to_s + "% [" + number_with_precision(part, :precision => options[:precision]||1)
    res += " #{units}".html_safe if units
    res += "]"
    res.html_safe
  end

  def percent_bar percent, colored = false
    " <span class='percent'><div class='bar' style='width: #{percent}%; #{"background-color: #{calculate_bg percent};" if colored}'></div>#{percent} %</span> ".html_safe
  end

  def percent_slider percent, colored = false
    " <span class='percent_slider'><div class='bar' style='left: #{percent}%; #{"background-color: #{calculate_bg percent};" if colored }'></div> &nbsp; </span> ".html_safe
  end

  def percent_scale
    image_tag 'misc/percent_scale.png', :alt =>'percent scale', :title=>'percent scale', :class => "percent_scale"
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
