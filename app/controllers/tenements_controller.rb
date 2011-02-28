class TenementsController < ApplicationController
  layout 'base_layout'
  
  def show
    @t = Tenement.find(params[:id], :include => :sites)
    @a = Assesment.find(params[:assesment_id])
    @images = @t.sites.map{|s| s.image }.flatten.compact
    @protected_area = Site.sum(:query_area_protected_km2, :conditions => "tenements.id = #{@t.id}", :joins => [:tenement])
    @total_area     = @t.query_area_km2
    @percent_protected = (@protected_area/@total_area)     
  end

end
