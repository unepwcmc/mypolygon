function SparseTileLayerOverlay()
{this._={};this.$={};this._.Q={alpha:[],level:[]};}
(function(_)
{var pair=[],offset=268435456,radius=268435456/Math.PI,degree=180/Math.PI;function LToX(x)
{return Math.round(offset+radius*x/degree);}
function LToY(y)
{return Math.round(offset-radius*Math.log((1+Math.sin(y/degree))/(1-Math.sin(y/degree)))/2);}
function XToL(x)
{return degree*(Math.round(x)-offset)/radius;}
function YToL(y)
{return degree*(Math.PI/2-2*Math.atan(Math.exp((Math.round(y)-offset)/radius)));}
_.setUrl=function(xy,z){return[];}
_.setStyle=function(offset,properties)
{var _=this._;var a,b,c,d,e,f,g,h,i,j,k,l,o,p,q,r,s,t,u,v,w,x,y,z;l=_.L;q=_.Q;if(l)
{i=offset;for(a in properties)
{if(q[a])q[a][i]=properties[a];}
for(a=0;l.childNodes[a];a++)
{if(e=l.childNodes[a].childNodes[i])
{if(q.alpha[i]==null)q.alpha[i]=1;if(q.level[i]==null)q.level[i]=0;e.style.display=q.alpha[i]?"":"none";e.style.zIndex=q.level[i];}}}}
_.draw=function()
{this.repair();}
_.idle=function()
{this.repair();}
_.repair=function()
{var _=this._;var a,b,c,d,e,f,g,h,i,j,k,l,o,p,q,r,s,t,u,v,w,x,y,z;var X$,Y$,X_,Y_,X0,X1,Y0,Y1;w=this.getMap();u=this.getPanes();v=this.getProjection();if(!w+!u+!v)return;l=w.getDiv();q=w.getBounds();c=w.getCenter();z=w.getZoom();var Q=8;var Z=21-z;q={x:LToX(c.lng())>>Z,y:LToY(c.lat())>>Z};c=v.fromLatLngToDivPixel(new google.maps.LatLng(YToL(q.y<<Z),XToL(q.x<<Z)));X0=q.x-((l.offsetWidth+1)>>1);X1=q.x+((l.offsetWidth+1)>>1);Y0=q.y-((l.offsetHeight+1)>>1);Y1=q.y+((l.offsetHeight+1)>>1);X$=q.x-c.x;Y$=q.y-c.y;X_=1+((X1-X0)>>Q)+1;Y_=1+((Y1-Y0)>>Q)+1;X0=((X0-0)>>Q)+0;X1=((X1-1)>>Q)+1;Y0=((Y0-0)>>Q)+0;Y1=((Y1-1)>>Q)+1;if((z!=_.Z)+(X$!=_.X$)+(Y$!=_.Y$)+(X_!=_.X_)+(Y_!=_.Y_))
{l=_.L;q=_.Q;if(l)
{for(i=l.childNodes.length-1;i+1;i--)
{o=l.childNodes[i];l.removeChild(o);}
u.overlayLayer.removeChild(l);l=null;}
l=document.createElement("DIV");if(l)
{u.overlayLayer.appendChild(l);l.style.position="absolute";for(i=0;X_*Y_-i;i++)
{o=document.createElement("DIV");l.appendChild(o);o.style.position="absolute";}}
_.X$=X$;_.Y$=Y$;_.X_=X_;_.Y_=Y_;_.X0=0;_.Y0=0;_.X1=0;_.Y1=0;_.L=l;_.Z=z;}
if((z!=_.Z)+(X0<_.X0)+(Y0<_.Y0)+(X1>_.X1)+(Y1>_.Y1))
{l=_.L;q=_.Q;i=(0%X_)+(0%Y_)*X_;for(X=X0;X0+X_-X;X++)
for(Y=Y0;Y0+Y_-Y;Y++)
{x=X^X>>z<<z;y=Y^Y>>z<<z;a=this.setUrl({x:x,y:y,X:1<<Q,Y:1<<Q,x0:XToL((x+0)<<Q<<Z),y0:YToL((y+0)<<Q<<Z),x1:XToL((x+1)<<Q<<Z),y1:YToL((y+1)<<Q<<Z)},z);if(typeof(a)!="object")a=[a];i=((X+X_)%X_)+((Y+Y_)%Y_)*X_;o=l.childNodes[i];o.style.position="absolute";o.style.left=((X<<Q)-X$)+"px";o.style.top=((Y<<Q)-Y$)+"px";o.style.width=(1<<Q)+"px";o.style.height=(1<<Q)+"px";if(a.length!=o.childNodes.length)for(i=o.childNodes.length-1;i+1;i--)
{e=o.childNodes[i];o.removeChild(e);}
if(a.length!=o.childNodes.length)for(i=0;a[i]!=null;i++)
{e=document.createElement("DIV");o.appendChild(e);e.style.position="absolute";e.style.left=0+"px";e.style.top=0+"px";e.style.width="100%";e.style.height="100%";if(q.alpha[i]==null)q.alpha[i]=1;if(q.level[i]==null)q.level[i]=0;e.style.display=q.alpha[i]?"":"none";e.style.zIndex=q.level[i];}
for(i=0;a[i]!=null;i++)
{e=o.childNodes[i];if((!window.XMLHttpRequest)*(!/[\&\?]format\=image\/(gif|jpeg)[\&\?]/gi.test(a[i]+"?")))
{e.style.backgroundImage="";if(a[i]=="")e.style.filter="";else if(a[i]!=e.src)e.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+a[i]+"',sizingMethod='scale')";}
else
{e.style.filter="";if(a[i]=="")e.style.backgroundImage="";else if(a[i]!=e.src)e.style.backgroundImage="url"+"("+a[i]+")";}
e.src=a[i];}}
_.X0=X0;_.Y0=Y0;_.X1=X1;_.Y1=Y1;_.L=l;_.Z=z;}}})
(SparseTileLayerOverlay.prototype=new google.maps.OverlayView);var map;var bounds;var lastMask=1000;var ppeOverlay;function setSearchButton(mapState){if(mapState=="false"){$("#button_map").html('show map');$("#button_map").css('background','url("../images/icons/double_arrow.gif") no-repeat left 2px');}else{$("#button_map").html('hide map');$("#button_map").css('background','url("../images/icons/double_arrow.gif") no-repeat left -11px');}}
function refreshGoogleMapsSize(){map.checkResize();map.setCenter(pa_center);}
function getSearchHeight(mapState){return((mapState=="true")?305:$('#advanced_search_box').height()+68);}
function setSearchMap(mapState){map_height=getSearchHeight(mapState);var userAgent=navigator.userAgent.toLowerCase();if(/mozilla/.test(userAgent)&&!/(compatible|webkit)/.test(userAgent)){$('div.flash_container').height(map_height);}else{$('div.flash_container').stop().animate({height:map_height},200);}}
function initialize(data){var myOptions={zoom:5,center:new google.maps.LatLng(0,0),disableDefaultUI:true,scrollwheel:true,mapTypeId:google.maps.MapTypeId.TERRAIN};map=new google.maps.Map(document.getElementById("map_canvas"),myOptions);var bounds=new google.maps.LatLngBounds();ppeOverlay=new SparseTileLayerOverlay();ppeOverlay.setUrl=function SetUrl(xy,z){var q=[];q[0]=UTILITY_SERVER_URL+"/blue/"+z+"/"+xy.x+"/"+xy.y;return q;};ppeOverlay.setMap(map);google.maps.event.addListener(map,"idle",function(){ppeOverlay.idle();});$.each(data,function(i,val){bounds.extend(new google.maps.LatLng(val.y,val.x));var infoBox=new SearchMarker({latlng:new google.maps.LatLng(val.y,val.x),map:map,paInformation:val});});map.fitBounds(bounds);map.setCenter(bounds.getCenter());}
function showBottom(){if($.browser.msie&&$.browser.version.substr(0,3)=="7.0"){$('#bottom_right_container').show();}}
function hideBottom(){if($.browser.msie&&$.browser.version.substr(0,3)=="7.0"){$('#bottom_right_container').hide();}}
function SearchMarker(opts){google.maps.OverlayView.call(this);this.latlng_=opts.latlng;this.map_=opts.map;this.offsetVertical_=-75;this.offsetHorizontal_=-40;this.height_=80;this.width_=80;this.paInformation_=opts.paInformation;var me=this;this.boundsChangedListener_=google.maps.event.addListener(this.map_,"bounds_changed",function(){return me.panMap.apply(me);});this.setMap(this.map_);}
SearchMarker.prototype=new google.maps.OverlayView();SearchMarker.prototype.remove=function(){if(this.div_){this.div_.parentNode.removeChild(this.div_);this.div_=null;}};SearchMarker.prototype.draw=function(){this.createElement();if(!this.div_)return;var pixPosition=this.getProjection().fromLatLngToDivPixel(this.latlng_);if(!pixPosition)return;this.div_.style.width=this.width_+"px";this.div_.style.left=(pixPosition.x+this.offsetHorizontal_)+"px";this.div_.style.height=this.height_+"px";this.div_.style.top=(pixPosition.y+this.offsetVertical_)+"px";$(this.div_).fadeIn('fast');};SearchMarker.prototype.createElement=function(){var panes=this.getPanes();var div=this.div_;var me=this;if(!div){div=this.div_=document.createElement("div");div.style.border="0px none";div.style.position="absolute";div.style.background="url('../images/icons/marker.png') no-repeat 0 0";div.style.width=this.width_+"px";div.style.height=this.height_+"px";var paImage=document.createElement("img");paImage.style.position="absolute";paImage.style.top='13px';paImage.style.left='16px';paImage.style.width="48px";paImage.style.height="48px";paImage.style.cursor="pointer";paImage.src=this.paInformation_.image;div.appendChild(paImage);var hiddenDiv=document.createElement('div');hiddenDiv.style.position="absolute";hiddenDiv.style.display='none';hiddenDiv.style.top='-7px';hiddenDiv.style.left='-5px';hiddenDiv.style.width="208px";hiddenDiv.style.height="88px";hiddenDiv.style.background='url(../images/markers/backgroundMarker.png) no-repeat 0 0';hiddenDiv.style.cursor="pointer";hiddenDiv.alt=this.paInformation_.name;var paImageOver=document.createElement("img");paImageOver.style.position="absolute";paImageOver.style.top='19px';paImageOver.style.left='20px';paImageOver.style.width="48px";paImageOver.style.height="48px";paImageOver.style.cursor="pointer";paImageOver.style.border='1px solid #005783'
paImageOver.src=this.paInformation_.image;hiddenDiv.appendChild(paImageOver);var paName=document.createElement('p');paName.style.position="relative";paName.style.float="left";paName.style.padding='18px 0 0 76px';paName.style.font='bold 12px Arial';paName.style.color='#FFFFFF';if(this.paInformation_.name!=null){var paNameLength=this.paInformation_.name.length;if(paNameLength>28){var paNameValue=this.paInformation_.name.substring(0,22);$(paName).html(paNameValue+'...');}else{$(paName).html(this.paInformation_.name);}}
paName.style.width="112px";paName.style.cursor="pointer";hiddenDiv.appendChild(paName);$(hiddenDiv).click(function(ev){window.location='/sites/'+me.paInformation_.id
ev.stopPropagation();ev.preventDefault();});var localName=document.createElement('p');localName.style.position="relative";localName.style.float="left";localName.style.margin='0 0 0 76px';localName.style.font='italic 11px Arial';localName.style.color='#FFFFFF';if(this.paInformation_.local_name!=null){var localNameLength=this.paInformation_.local_name.length;if(localNameLength>16){var localNameValue=this.paInformation_.local_name.substring(0,16);$(localName).html(localNameValue+'...');}else{$(localName).html(this.paInformation_.local_name);}}
localName.style.width="112px";localName.style.cursor="pointer";hiddenDiv.appendChild(localName);var poI=document.createElement('p');poI.style.position="absolute";poI.style.float="left";poI.style.bottom='18px';poI.style.left='76px';poI.style.font='normal 10px Arial';poI.style.color='#004669';if(this.paInformation_.pois>0){if(this.paInformation_.pois==1){$(poI).html(this.paInformation_.pois+' Point of interest');}else{$(poI).html(this.paInformation_.pois+' Points of interest');}}else{$(poI).html('');}
poI.style.width="112px";poI.style.cursor="pointer";hiddenDiv.appendChild(poI);div.appendChild(hiddenDiv);function removeInfoBox(ib){return function(){ib.setMap(null);};}
var config={sensitivity:10,interval:0,over:function(ev){lastMask++;$(this).children('div').css('z-index',lastMask+1);$(this).css('z-index',lastMask);$(this).children('div').fadeIn("fast");},timeout:0,out:function(ev){$(this).children('div').fadeOut("fast");}};div.style.display='none';$(div).hoverIntent(config);panes.floatPane.appendChild(div);this.panMap();}else if(div.parentNode!=panes.floatPane){div.parentNode.removeChild(div);panes.floatPane.appendChild(div);}else{}}
SearchMarker.prototype.getPosition=function(){return this.latlng_;};SearchMarker.prototype.panMap=function(){};$(document).ready(function(){$('.more_facet_link').hoverIntent(function(ev){var more_box=$(this).siblings(".more_facet_list");more_box.fadeIn("fast");},function(){$(this).siblings(".more_facet_list").delay(1000).fadeOut("normal");});$(".more_facet_list").mouseleave(function(){$(this).delay(1000).fadeOut("normal");});$(".more_facet_list").mouseover(function(){$(this).clearQueue();});var map_data=$('#search_map_data').text().replace('\\','');initialize(jQuery.parseJSON(map_data));if($.browser.msie&&$.browser.version.substr(0,3)=="7.0"){var zIndexNumber=1000;$('ul').each(function(){$(this).css('zIndex',zIndexNumber);zIndexNumber-=10;});$('li').each(function(){$(this).css('zIndex',zIndexNumber);zIndexNumber-=10;});$('a').each(function(){$(this).css('zIndex',zIndexNumber);zIndexNumber-=10;});}
if($('div.search_Container span.search_input input').val()!="Search for Protected Areas, Points of interest, Countries, etc.."){$('div.search_Container span.search_input input').css('color','#666666');}
$('div.search_Container span.search_input input').click(function(){if($('div.search_Container span.search_input input').val()=="Search for Protected Areas, Points of interest, Countries, etc.."){$('div.search_Container span.search_input input').val('');$('div.search_Container span.search_input input').css('color','#666666');}});if($.cookies.get("search_view_map")==null){$.cookies.set("search_view_map","true");}
$('div.flash_container').height(getSearchHeight($.cookies.get("search_view_map")));setSearchButton($.cookies.get("search_view_map"));$('#button_map').click(function(){new_state=(($.cookies.get("search_view_map")=="false")?"true":"false");setSearchButton(new_state);setSearchMap(new_state);$.cookies.set("search_view_map",new_state);return false;});$('#zoom_in').click(function(){map.setZoom(map.getZoom()+1);});$('#zoom_out').click(function(){map.setZoom(map.getZoom()-1);});});