class TenementsController < ApplicationController
  layout 'base_layout'
  
  def show
    @t = Tenement.includes(:sites).find(params[:id])
    @a = Assesment.find(params[:assesment_id])
    @images = @t.sites.map{|s| s.image }.flatten.compact
    @protected_area = @t.sites.sum(:query_area_protected_km2)
    @total_area     = @t.query_area_km2
    @percent_protected = (@protected_area/@total_area)     
  end

end
