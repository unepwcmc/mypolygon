function createXmlHttpRequest(){try{if(typeof ActiveXObject!='undefined'){return new ActiveXObject('Microsoft.XMLHTTP');}else if(window["XMLHttpRequest"]){return new XMLHttpRequest();}}catch(e){changeStatus(e);}
return null;};function downloadUrl(url,callback){var status=-1;var request=createXmlHttpRequest();if(!request){return false;}
request.onreadystatechange=function(){if(request.readyState==4){try{status=request.status;}catch(e){}
if(status==200){callback(request.responseXML,request.status);request.onreadystatechange=function(){};}}}
request.open('GET',url,true);try{request.send(null);}catch(e){changeStatus(e);}};function xmlParse(str){if(typeof ActiveXObject!='undefined'&&typeof GetObject!='undefined'){var doc=new ActiveXObject('Microsoft.XMLDOM');doc.loadXML(str);return doc;}
if(typeof DOMParser!='undefined'){return(new DOMParser()).parseFromString(str,'text/xml');}
return createElement('div',null);}
function downloadScript(url){var script=document.createElement('script');script.src=url;document.body.appendChild(script);}
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}
if(p==this){return false;}
var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}
if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);function SparseTileLayerOverlay()
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
(SparseTileLayerOverlay.prototype=new google.maps.OverlayView);;(function($){$.fn.extend({autocomplete:function(urlOrData,options){var isUrl=typeof urlOrData=="string";options=$.extend({},$.Autocompleter.defaults,{url:isUrl?urlOrData:null,data:isUrl?null:urlOrData,delay:isUrl?$.Autocompleter.defaults.delay:10,max:options&&!options.scroll?10:150},options);options.highlight=options.highlight||function(value){return value;};options.formatMatch=options.formatMatch||options.formatItem;return this.each(function(){new $.Autocompleter(this,options);});},result:function(handler){return this.bind("result",handler);},search:function(handler){return this.trigger("search",[handler]);},flushCache:function(){return this.trigger("flushCache");},setOptions:function(options){return this.trigger("setOptions",[options]);},unautocomplete:function(){return this.trigger("unautocomplete");}});$.Autocompleter=function(input,options){var KEY={UP:38,DOWN:40,DEL:46,TAB:9,RETURN:13,ESC:27,COMMA:188,PAGEUP:33,PAGEDOWN:34,BACKSPACE:8};var $input=$(input).attr("autocomplete","off").addClass(options.inputClass);var timeout;var previousValue="";var cache=$.Autocompleter.Cache(options);var hasFocus=0;var lastKeyPressCode;var config={mouseDownOnSelect:false};var select=$.Autocompleter.Select(options,input,selectCurrent,config);var blockSubmit;$.browser.opera&&$(input.form).bind("submit.autocomplete",function(){if(blockSubmit){blockSubmit=false;return false;}});$input.bind(($.browser.opera?"keypress":"keydown")+".autocomplete",function(event){hasFocus=1;lastKeyPressCode=event.keyCode;switch(event.keyCode){case KEY.UP:event.preventDefault();if(select.visible()){select.prev();}else{onChange(0,true);}
break;case KEY.DOWN:event.preventDefault();if(select.visible()){select.next();}else{onChange(0,true);}
break;case KEY.PAGEUP:event.preventDefault();if(select.visible()){select.pageUp();}else{onChange(0,true);}
break;case KEY.PAGEDOWN:event.preventDefault();if(select.visible()){select.pageDown();}else{onChange(0,true);}
break;case options.multiple&&$.trim(options.multipleSeparator)==","&&KEY.COMMA:case KEY.TAB:case KEY.RETURN:if(selectCurrent()){event.preventDefault();blockSubmit=true;return false;}
break;case KEY.ESC:select.hide();break;default:clearTimeout(timeout);timeout=setTimeout(onChange,options.delay);break;}}).focus(function(){hasFocus++;}).blur(function(){hasFocus=0;if(!config.mouseDownOnSelect){hideResults();}}).click(function(){if(hasFocus++>1&&!select.visible()){onChange(0,true);}}).bind("search",function(){var fn=(arguments.length>1)?arguments[1]:null;function findValueCallback(q,data){var result;if(data&&data.length){for(var i=0;i<data.length;i++){if(data[i].result.toLowerCase()==q.toLowerCase()){result=data[i];break;}}}
if(typeof fn=="function")fn(result);else $input.trigger("result",result&&[result.data,result.value]);}
$.each(trimWords($input.val()),function(i,value){request(value,findValueCallback,findValueCallback);});}).bind("flushCache",function(){cache.flush();}).bind("setOptions",function(){$.extend(options,arguments[1]);if("data"in arguments[1])
cache.populate();}).bind("unautocomplete",function(){select.unbind();$input.unbind();$(input.form).unbind(".autocomplete");});function selectCurrent(){var selected=select.selected();if(!selected)
return false;var v=selected.result;previousValue=v;if(options.multiple){var words=trimWords($input.val());if(words.length>1){var seperator=options.multipleSeparator.length;var cursorAt=$(input).selection().start;var wordAt,progress=0;$.each(words,function(i,word){progress+=word.length;if(cursorAt<=progress){wordAt=i;return false;}
progress+=seperator;});words[wordAt]=v;v=words.join(options.multipleSeparator);}
v+=options.multipleSeparator;}
$input.val(v);hideResultsNow();$input.trigger("result",[selected.data,selected.value]);return true;}
function onChange(crap,skipPrevCheck){if(lastKeyPressCode==KEY.DEL){select.hide();return;}
var currentValue=$input.val();if(!skipPrevCheck&&currentValue==previousValue)
return;previousValue=currentValue;currentValue=lastWord(currentValue);if(currentValue.length>=options.minChars){$(".search_spinner, .search_spinner_mini, .search_spinner_header").show();if(!options.matchCase)
currentValue=currentValue.toLowerCase();request(currentValue,receiveData,hideResultsNow);}else{stopLoading();select.hide();}};function trimWords(value){if(!value)
return[""];if(!options.multiple)
return[$.trim(value)];return $.map(value.split(options.multipleSeparator),function(word){return $.trim(value).length?$.trim(word):null;});}
function lastWord(value){if(!options.multiple)
return value;var words=trimWords(value);if(words.length==1)
return words[0];var cursorAt=$(input).selection().start;if(cursorAt==value.length){words=trimWords(value)}else{words=trimWords(value.replace(value.substring(cursorAt),""));}
return words[words.length-1];}
function autoFill(q,sValue){if(options.autoFill&&(lastWord($input.val()).toLowerCase()==q.toLowerCase())&&lastKeyPressCode!=KEY.BACKSPACE){$input.val($input.val()+sValue.substring(lastWord(previousValue).length));$(input).selection(previousValue.length,previousValue.length+sValue.length);}};function hideResults(){clearTimeout(timeout);timeout=setTimeout(hideResultsNow,200);};function hideResultsNow(){var wasVisible=select.visible();select.hide();clearTimeout(timeout);stopLoading();if(options.mustMatch){$input.search(function(result){if(!result){if(options.multiple){var words=trimWords($input.val()).slice(0,-1);$input.val(words.join(options.multipleSeparator)+(words.length?options.multipleSeparator:""));}
else{$input.val("");$input.trigger("result",null);}}});}};function receiveData(q,data){if(data&&data.length&&hasFocus){stopLoading();select.display(data,q);autoFill(q,data[0].value);select.show();}else{hideResultsNow();}};function request(term,success,failure){if(!options.matchCase)
term=term.toLowerCase();var data=cache.load(term);if(data&&data.length){success(term,data);}else if((typeof options.url=="string")&&(options.url.length>0)){var extraParams={timestamp:+new Date()};$.each(options.extraParams,function(key,param){extraParams[key]=typeof param=="function"?param():param;});$.ajax({mode:"abort",port:"autocomplete"+input.name,dataType:options.dataType,url:options.url,data:$.extend({q:lastWord(term),limit:options.max},extraParams),success:function(data){var parsed=options.parse&&options.parse(data)||parse(data);cache.add(term,parsed);success(term,parsed);}});}else{select.emptyList();failure(term);}};function parse(data){var parsed=[];var rows=data.split("\n");for(var i=0;i<rows.length;i++){var row=$.trim(rows[i]);if(row){row=row.split("|");parsed[parsed.length]={data:row,value:row[0],result:options.formatResult&&options.formatResult(row,row[0])||row[0]};}}
return parsed;};function stopLoading(){$(".search_spinner, .search_spinner_mini, .search_spinner_header").hide();};};$.Autocompleter.defaults={inputClass:"ac_input",resultsClass:"ac_results",loadingClass:"ac_loading",minChars:1,delay:400,matchCase:false,matchSubset:true,matchContains:false,cacheLength:10,max:100,mustMatch:false,extraParams:{},selectFirst:true,formatItem:function(row){return row[0];},formatMatch:null,autoFill:false,width:0,multiple:false,multipleSeparator:", ",highlight:function(value,term){return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)("+term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi,"\\$1")+")(?![^<>]*>)(?![^&;]+;)","gi"),"<strong>$1</strong>");},scroll:true,scrollHeight:180};$.Autocompleter.Cache=function(options){var data={};var length=0;function matchSubset(s,sub){if(!options.matchCase)
s=s.toLowerCase();var i=s.indexOf(sub);if(options.matchContains=="word"){i=s.toLowerCase().search("\\b"+sub.toLowerCase());}
if(i==-1)return false;return i==0||options.matchContains;};function add(q,value){if(length>options.cacheLength){flush();}
if(!data[q]){length++;}
data[q]=value;}
function populate(){if(!options.data)return false;var stMatchSets={},nullData=0;if(!options.url)options.cacheLength=1;stMatchSets[""]=[];for(var i=0,ol=options.data.length;i<ol;i++){var rawValue=options.data[i];rawValue=(typeof rawValue=="string")?[rawValue]:rawValue;var value=options.formatMatch(rawValue,i+1,options.data.length);if(value===false)
continue;var firstChar=value.charAt(0).toLowerCase();if(!stMatchSets[firstChar])
stMatchSets[firstChar]=[];var row={value:value,data:rawValue,result:options.formatResult&&options.formatResult(rawValue)||value};stMatchSets[firstChar].push(row);if(nullData++<options.max){stMatchSets[""].push(row);}};$.each(stMatchSets,function(i,value){options.cacheLength++;add(i,value);});}
setTimeout(populate,25);function flush(){data={};length=0;}
return{flush:flush,add:add,populate:populate,load:function(q){if(!options.cacheLength||!length)
return null;if(!options.url&&options.matchContains){var csub=[];for(var k in data){if(k.length>0){var c=data[k];$.each(c,function(i,x){if(matchSubset(x.value,q)){csub.push(x);}});}}
return csub;}else
if(data[q]){return data[q];}else
if(options.matchSubset){for(var i=q.length-1;i>=options.minChars;i--){var c=data[q.substr(0,i)];if(c){var csub=[];$.each(c,function(i,x){if(matchSubset(x.value,q)){csub[csub.length]=x;}});return csub;}}}
return null;}};};$.Autocompleter.Select=function(options,input,select,config){var CLASSES={ACTIVE:"ac_over"};var listItems,active=-1,data,term="",needsInit=true,element,list;function init(){if(!needsInit)
return;element=$("<div/>").hide().addClass(options.resultsClass).css("position","absolute").appendTo(document.body);list=$("<ul/>").appendTo(element).mouseover(function(event){if(target(event).nodeName&&target(event).nodeName.toUpperCase()=='LI'){active=$("li",list).removeClass(CLASSES.ACTIVE).index(target(event));$(target(event)).addClass(CLASSES.ACTIVE);}}).click(function(event){$(target(event)).addClass(CLASSES.ACTIVE);select();input.focus();return false;}).mousedown(function(){config.mouseDownOnSelect=true;}).mouseup(function(){config.mouseDownOnSelect=false;});if(options.width>0)
element.css("width",options.width);needsInit=false;}
function target(event){var element=event.target;while(element&&element.tagName!="LI")
element=element.parentNode;if(!element)
return[];return element;}
function moveSelect(step){listItems.slice(active,active+1).removeClass(CLASSES.ACTIVE);movePosition(step);var activeItem=listItems.slice(active,active+1).addClass(CLASSES.ACTIVE);if(options.scroll){var offset=0;listItems.slice(0,active).each(function(){offset+=this.offsetHeight;});if((offset+activeItem[0].offsetHeight-list.scrollTop())>list[0].clientHeight){list.scrollTop(offset+activeItem[0].offsetHeight-list.innerHeight());}else if(offset<list.scrollTop()){list.scrollTop(offset);}}};function movePosition(step){active+=step;if(active<0){active=listItems.size()-1;}else if(active>=listItems.size()){active=0;}}
function limitNumberOfItems(available){return options.max&&options.max<available?options.max:available;}
function fillList(){list.empty();var max=limitNumberOfItems(data.length);for(var i=0;i<max;i++){if(!data[i])
continue;var formatted=options.formatItem(data[i].data,i+1,max,data[i].value,term);if(formatted===false)
continue;var li=$("<li/>").html(options.highlight(formatted,term)).addClass(i%2==0?"ac_even":"ac_odd").appendTo(list)[0];$.data(li,"ac_data",data[i]);}
listItems=list.find("li");if(options.selectFirst){listItems.slice(0,1).addClass(CLASSES.ACTIVE);active=0;}
if($.fn.bgiframe)
list.bgiframe();}
return{display:function(d,q){init();data=d;term=q;fillList();},next:function(){moveSelect(1);},prev:function(){moveSelect(-1);},pageUp:function(){if(active!=0&&active-8<0){moveSelect(-active);}else{moveSelect(-8);}},pageDown:function(){if(active!=listItems.size()-1&&active+8>listItems.size()){moveSelect(listItems.size()-1-active);}else{moveSelect(8);}},hide:function(){element&&element.hide();listItems&&listItems.removeClass(CLASSES.ACTIVE);active=-1;},visible:function(){return element&&element.is(":visible");},current:function(){return this.visible()&&(listItems.filter("."+CLASSES.ACTIVE)[0]||options.selectFirst&&listItems[0]);},show:function(){var offset=$(input).offset();element.css({width:typeof options.width=="string"||options.width>0?options.width:$(input).width(),top:offset.top+input.offsetHeight-5,left:offset.left}).show();if(options.scroll){list.scrollTop(0);list.css({maxHeight:options.scrollHeight,overflow:'auto'});if($.browser.msie&&typeof document.body.style.maxHeight==="undefined"){var listHeight=0;listItems.each(function(){listHeight+=this.offsetHeight;});var scrollbarsVisible=listHeight>options.scrollHeight;list.css('height',scrollbarsVisible?options.scrollHeight:listHeight);if(!scrollbarsVisible){listItems.width(list.width()-parseInt(listItems.css("padding-left"))-parseInt(listItems.css("padding-right")));}}}},selected:function(){var selected=listItems&&listItems.filter("."+CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);return selected&&selected.length&&$.data(selected[0],"ac_data");},emptyList:function(){list&&list.empty();},unbind:function(){element&&element.remove();}};};$.fn.selection=function(start,end){if(start!==undefined){return this.each(function(){if(this.createTextRange){var selRange=this.createTextRange();if(end===undefined||start==end){selRange.move("character",start);selRange.select();}else{selRange.collapse(true);selRange.moveStart("character",start);selRange.moveEnd("character",end);selRange.select();}}else if(this.setSelectionRange){this.setSelectionRange(start,end);}else if(this.selectionStart){this.selectionStart=start;this.selectionEnd=end;}});}
var field=this[0];if(field.createTextRange){var range=document.selection.createRange(),orig=field.value,teststring="<->",textLength=range.text.length;range.text=teststring;var caretAt=field.value.indexOf(teststring);field.value=orig;this.selection(caretAt,caretAt+textLength);return{start:caretAt,end:caretAt+textLength}}else if(field.selectionStart!==undefined){return{start:field.selectionStart,end:field.selectionEnd}}};})(jQuery);jQuery.easing['jswing']=jQuery.easing['swing'];jQuery.extend(jQuery.easing,{def:'easeOutQuad',swing:function(x,t,b,c,d){return jQuery.easing[jQuery.easing.def](x,t,b,c,d);},easeInQuad:function(x,t,b,c,d){return c*(t/=d)*t+b;},easeOutQuad:function(x,t,b,c,d){return-c*(t/=d)*(t-2)+b;},easeInOutQuad:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return-c/2*((--t)*(t-2)-1)+b;},easeInCubic:function(x,t,b,c,d){return c*(t/=d)*t*t+b;},easeOutCubic:function(x,t,b,c,d){return c*((t=t/d-1)*t*t+1)+b;},easeInOutCubic:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;},easeInQuart:function(x,t,b,c,d){return c*(t/=d)*t*t*t+b;},easeOutQuart:function(x,t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b;},easeInOutQuart:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return-c/2*((t-=2)*t*t*t-2)+b;},easeInQuint:function(x,t,b,c,d){return c*(t/=d)*t*t*t*t+b;},easeOutQuint:function(x,t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;},easeInOutQuint:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b;},easeInSine:function(x,t,b,c,d){return-c*Math.cos(t/d*(Math.PI/2))+c+b;},easeOutSine:function(x,t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b;},easeInOutSine:function(x,t,b,c,d){return-c/2*(Math.cos(Math.PI*t/d)-1)+b;},easeInExpo:function(x,t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b;},easeOutExpo:function(x,t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b;},easeInOutExpo:function(x,t,b,c,d){if(t==0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b;return c/2*(-Math.pow(2,-10*--t)+2)+b;},easeInCirc:function(x,t,b,c,d){return-c*(Math.sqrt(1-(t/=d)*t)-1)+b;},easeOutCirc:function(x,t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b;},easeInOutCirc:function(x,t,b,c,d){if((t/=d/2)<1)return-c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;},easeInElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},easeOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;},easeInOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(.3*1.5);if(a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;},easeInBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b;},easeOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},easeInOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},easeInBounce:function(x,t,b,c,d){return c-jQuery.easing.easeOutBounce(x,d-t,0,c,d)+b;},easeOutBounce:function(x,t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b;}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;}},easeInOutBounce:function(x,t,b,c,d){if(t<d/2)return jQuery.easing.easeInBounce(x,t*2,0,c,d)*.5+b;return jQuery.easing.easeOutBounce(x,t*2-d,0,c,d)*.5+c*.5+b;}});jQuery.extend({historyCurrentHash:undefined,historyCallback:undefined,historyIframeSrc:undefined,historyNeedIframe:jQuery.browser.msie&&(jQuery.browser.version<8||document.documentMode<8),historyInit:function(callback,src){jQuery.historyCallback=callback;if(src)jQuery.historyIframeSrc=src;var current_hash=location.hash.replace(/\?.*$/,'');jQuery.historyCurrentHash=current_hash;if(jQuery.historyNeedIframe){if(jQuery.historyCurrentHash==''){jQuery.historyCurrentHash='#';}
jQuery("body").prepend('<iframe id="jQuery_history" style="display: none;"'+' src="javascript:false;"></iframe>');var ihistory=jQuery("#jQuery_history")[0];var iframe=ihistory.contentWindow.document;iframe.open();iframe.close();iframe.location.hash=current_hash;}
else if(jQuery.browser.safari){jQuery.historyBackStack=[];jQuery.historyBackStack.length=history.length;jQuery.historyForwardStack=[];jQuery.lastHistoryLength=history.length;jQuery.isFirst=true;}
if(current_hash)
jQuery.historyCallback(current_hash.replace(/^#/,''));setInterval(jQuery.historyCheck,100);},historyAddHistory:function(hash){jQuery.historyBackStack.push(hash);jQuery.historyForwardStack.length=0;this.isFirst=true;},historyCheck:function(){if(jQuery.historyNeedIframe){var ihistory=jQuery("#jQuery_history")[0];var iframe=ihistory.contentDocument||ihistory.contentWindow.document;var current_hash=iframe.location.hash.replace(/\?.*$/,'');if(current_hash!=jQuery.historyCurrentHash){location.hash=current_hash;jQuery.historyCurrentHash=current_hash;jQuery.historyCallback(current_hash.replace(/^#/,''));}}else if(jQuery.browser.safari){if(jQuery.lastHistoryLength==history.length&&jQuery.historyBackStack.length>jQuery.lastHistoryLength){jQuery.historyBackStack.shift();}
if(!jQuery.dontCheck){var historyDelta=history.length-jQuery.historyBackStack.length;jQuery.lastHistoryLength=history.length;if(historyDelta){jQuery.isFirst=false;if(historyDelta<0){for(var i=0;i<Math.abs(historyDelta);i++)jQuery.historyForwardStack.unshift(jQuery.historyBackStack.pop());}else{for(var i=0;i<historyDelta;i++)jQuery.historyBackStack.push(jQuery.historyForwardStack.shift());}
var cachedHash=jQuery.historyBackStack[jQuery.historyBackStack.length-1];if(cachedHash!=undefined){jQuery.historyCurrentHash=location.hash.replace(/\?.*$/,'');jQuery.historyCallback(cachedHash);}}else if(jQuery.historyBackStack[jQuery.historyBackStack.length-1]==undefined&&!jQuery.isFirst){if(location.hash){var current_hash=location.hash;jQuery.historyCallback(location.hash.replace(/^#/,''));}else{var current_hash='';jQuery.historyCallback('');}
jQuery.isFirst=true;}}}else{var current_hash=location.hash.replace(/\?.*$/,'');if(current_hash!=jQuery.historyCurrentHash){jQuery.historyCurrentHash=current_hash;jQuery.historyCallback(current_hash.replace(/^#/,''));}}},historyLoad:function(hash){var newhash;hash=decodeURIComponent(hash.replace(/\?.*$/,''));if(jQuery.browser.safari){newhash=hash;}
else{newhash='#'+hash;location.hash=newhash;}
jQuery.historyCurrentHash=newhash;if(jQuery.historyNeedIframe){var ihistory=jQuery("#jQuery_history")[0];var iframe=ihistory.contentWindow.document;iframe.open();iframe.close();iframe.location.hash=newhash;jQuery.lastHistoryLength=history.length;jQuery.historyCallback(hash);}
else if(jQuery.browser.safari){jQuery.dontCheck=true;this.historyAddHistory(hash);var fn=function(){jQuery.dontCheck=false;};window.setTimeout(fn,200);jQuery.historyCallback(hash);location.hash=newhash;}
else{jQuery.historyCallback(hash);}}});var jaaulde=window.jaaulde||{};jaaulde.utils=jaaulde.utils||{};jaaulde.utils.cookies=(function()
{var cookies=[];var defaultOptions={hoursToLive:null,path:'/',domain:null,secure:false};var resolveOptions=function(options)
{var returnValue;if(typeof options!=='object'||options===null)
{returnValue=defaultOptions;}
else
{returnValue={hoursToLive:(typeof options.hoursToLive==='number'&&options.hoursToLive!==0?options.hoursToLive:defaultOptions.hoursToLive),path:(typeof options.path==='string'&&options.path!==''?options.path:defaultOptions.path),domain:(typeof options.domain==='string'&&options.domain!==''?options.domain:defaultOptions.domain),secure:(typeof options.secure==='boolean'&&options.secure?options.secure:defaultOptions.secure)};}
return returnValue;};var expiresGMTString=function(hoursToLive)
{var dateObject=new Date();dateObject.setTime(dateObject.getTime()+(hoursToLive*60*60*1000));return dateObject.toGMTString();};var assembleOptionsString=function(options)
{options=resolveOptions(options);return((typeof options.hoursToLive==='number'?'; expires='+expiresGMTString(options.hoursToLive):'')+'; path='+options.path+
(typeof options.domain==='string'?'; domain='+options.domain:'')+
(options.secure===true?'; secure':''));};var splitCookies=function()
{cookies={};var pair,name,value,separated=document.cookie.split(';');for(var i=0;i<separated.length;i=i+1)
{pair=separated[i].split('=');name=pair[0].replace(/^\s*/,'').replace(/\s*$/,'');value=decodeURIComponent(pair[1]);cookies[name]=value;}
return cookies;};var constructor=function(){};constructor.prototype.get=function(cookieName)
{var returnValue;splitCookies();if(typeof cookieName==='string')
{returnValue=(typeof cookies[cookieName]!=='undefined')?cookies[cookieName]:null;}
else if(typeof cookieName==='object'&&cookieName!==null)
{returnValue={};for(var item in cookieName)
{if(typeof cookies[cookieName[item]]!=='undefined')
{returnValue[cookieName[item]]=cookies[cookieName[item]];}
else
{returnValue[cookieName[item]]=null;}}}
else
{returnValue=cookies;}
return returnValue;};constructor.prototype.filter=function(cookieNameRegExp)
{var returnValue={};splitCookies();if(typeof cookieNameRegExp==='string')
{cookieNameRegExp=new RegExp(cookieNameRegExp);}
for(var cookieName in cookies)
{if(cookieName.match(cookieNameRegExp))
{returnValue[cookieName]=cookies[cookieName];}}
return returnValue;};constructor.prototype.set=function(cookieName,value,options)
{if(typeof value==='undefined'||value===null)
{if(typeof options!=='object'||options===null)
{options={};}
value='';options.hoursToLive=-8760;}
var optionsString=assembleOptionsString(options);document.cookie=cookieName+'='+encodeURIComponent(value)+optionsString;};constructor.prototype.del=function(cookieName,options)
{var allCookies={};if(typeof options!=='object'||options===null)
{options={};}
if(typeof cookieName==='boolean'&&cookieName===true)
{allCookies=this.get();}
else if(typeof cookieName==='string')
{allCookies[cookieName]=true;}
for(var name in allCookies)
{if(typeof name==='string'&&name!=='')
{this.set(name,null,options);}}};constructor.prototype.test=function()
{var returnValue=false,testName='cT',testValue='data';this.set(testName,testValue);if(this.get(testName)===testValue)
{this.del(testName);returnValue=true;}
return returnValue;};constructor.prototype.setOptions=function(options)
{if(typeof options!=='object')
{options=null;}
defaultOptions=resolveOptions(options);};return new constructor();})();(function()
{if(window.jQuery)
{(function($)
{$.cookies=jaaulde.utils.cookies;var extensions={cookify:function(options)
{return this.each(function()
{var i,resolvedName=false,resolvedValue=false,name='',value='',nameAttrs=['name','id'],nodeName,inputType;for(i in nameAttrs)
{if(!isNaN(i))
{name=$(this).attr(nameAttrs[i]);if(typeof name==='string'&&name!=='')
{resolvedName=true;break;}}}
if(resolvedName)
{nodeName=this.nodeName.toLowerCase();if(nodeName!=='input'&&nodeName!=='textarea'&&nodeName!=='select'&&nodeName!=='img')
{value=$(this).html();resolvedValue=true;}
else
{inputType=$(this).attr('type');if(typeof inputType==='string'&&inputType!=='')
{inputType=inputType.toLowerCase();}
if(inputType!=='radio'&&inputType!=='checkbox')
{value=$(this).val();resolvedValue=true;}}
if(resolvedValue)
{if(typeof value!=='string'||value==='')
{value=null;}
$.cookies.set(name,value,options);}}});},cookieFill:function()
{return this.each(function()
{var i,resolvedName=false,name='',value,nameAttrs=['name','id'],iteration=0,nodeName;for(i in nameAttrs)
{if(!isNaN(i))
{name=$(this).attr(nameAttrs[i]);if(typeof name==='string'&&name!=='')
{resolvedName=true;break;}}}
if(resolvedName)
{value=$.cookies.get(name);if(value!==null)
{nodeName=this.nodeName.toLowerCase();if(nodeName==='input'||nodeName==='textarea'||nodeName==='select')
{$(this).val(value);}
else
{$(this).html(value);}}}
iteration=0;});},cookieBind:function(options)
{return this.each(function()
{$(this).cookieFill().change(function()
{$(this).cookify(options);});});}};$.each(extensions,function(i)
{$.fn[i]=this;});})(window.jQuery);}})();var searchBoxVisible=true;jQuery.ajaxSetup({'beforeSend':function(xhr){xhr.setRequestHeader("Accept","text/javascript")}})
jQuery.fn.submitWithAjax=function(){this.submit(function(){$.post(this.action,$(this).serialize(),null,"script");return false;})
return this;};$(document).ready(function(){$.historyInit(pageload,"jquery_history.html");$('#new_user_session').submitWithAjax();$('#loginBox a#sign_in').click(function(ev){ev.stopPropagation();ev.preventDefault();$('#signUp').fadeIn('fast');$('form#forgot_pass').hide();$('form.new_user_session').show();$('#username_field_home').focus();});$('#signUp div.loginTop a').click(function(ev){ev.stopPropagation();ev.preventDefault();$('#signUp').fadeOut('fast');});$('#tinyExplore a').click(function(ev){ev.stopPropagation();ev.preventDefault();$('#categoryBox').fadeIn('fast');});$('#close_options').click(function(ev){ev.stopPropagation();ev.preventDefault();$('#categoryBox').fadeOut('fast');});$('#backToStart').click(function(ev){ev.stopPropagation();ev.preventDefault();$('#searchBox').fadeIn('slow');$('#tinyExplore').fadeOut('slow');$('#search_inputText').focus();});$('a#go_forget').click(function(ev){ev.stopPropagation();ev.preventDefault();$('form.new_user_session').hide();$('form#forgot_pass').show();});$('a#back_login').click(function(ev){ev.stopPropagation();ev.preventDefault();$('form#forgot_pass').hide();$('form.new_user_session').show();});$('#zoomIn').click(function(ev){ev.stopPropagation();ev.preventDefault();if($('#searchBox').is(":visible")){hideExploreInput();}
if(map.getZoom()==2){$('#zoomOut').fadeIn('slow');}
if($('#container').is(":visible")&&map.getZoom()==4){$('#zoomIn').fadeOut('slow');}
map.setZoom(map.getZoom()+1);});$('#zoomOut').click(function(ev){ev.stopPropagation();ev.preventDefault();if($('#searchBox').is(":visible")){hideExploreInput();}
if(map.getZoom()==3){$('#zoomOut').fadeOut('slow');}
if($('#zoomIn').is(":hidden")){$('#zoomIn').fadeIn('slow');}
map.setZoom(map.getZoom()-1);});$('#search_inputText').focus().autocomplete('/api/search_suggest',{dataType:'json',parse:function(data){var rowsPas=new Array();var rowsCountries=new Array();pas=data["pas"];countries=data["countries"];var pas_to_show;var max_elements=5;if(pas.length>countries.length){if(countries.length<max_elements)pas_to_show=pas.length-countries.length;else pas_to_show=0;}
for(var i=0;i<pas_to_show;i++){rowsPas[i]={data:pas[i],value:pas[i].english_name,result:pas[i].english_name};}
for(var i=0;i<countries.length;i++){countries[i].pas_length=pas.length;rowsCountries[i]={data:countries[i],value:countries[i].name,result:countries[i].name};}
var allData=rowsPas.concat(rowsCountries);return allData;},formatItem:function(row,i,n){if(row.iso==undefined){if(row.not_marine==undefined){var menu_string='<img src="'+row.image+'" style="float:left;margin:7px 7px 5px 2px;border:1px solid #ccc;"><div style="margin-top:7px;float:left;width:270px;font-size:13px;">'+row.english_name+'<br><span style="color:#aaa;font-size:10px; line-height:5px;">'+row.designation+'</span></div><div style="float:right;margin-top:7px; width:10px;">';if(row.marine==true){menu_string=menu_string+'<img src="/images/icons/circle.gif">';}
if(row.whs==true){menu_string=menu_string+'<img src="/images/icons/green_star.gif">';}}}
else{var menu_string='<img style="float:left; margin:5px 7px 5px 2px; width:35px; height:35px;" src="/images/flags/32/'+row.iso+'.png"><div style="margin-top:7px;float:left;width:270px;font-size:13px;">Protected Areas <b>in '+row.name+'</b><br><span style="color:#aaa;font-size:10px; line-height:5px;">'+row.pas+' Protected Areas in this country</span></div><div style="float:right;margin-top:7px; width:10px;">';}
menu_string=menu_string+'</div>';return menu_string;},width:335,height:100,minChars:4,max:5,selectFirst:false,multiple:false,scroll:false}).result(function(event,row){location.href=row.url;});$('#searchHeader').autocomplete('/api/search_suggest',{dataType:'json',parse:function(data){var rowsPas=new Array();var rowsCountries=new Array();pas=data["pas"];countries=data["countries"];var pas_to_show;var max_elements=5;if(pas.length>countries.length){if(countries.length<max_elements)pas_to_show=pas.length-countries.length;else pas_to_show=0;}
for(var i=0;i<pas_to_show;i++){rowsPas[i]={data:pas[i],value:pas[i].english_name,result:pas[i].english_name};}
for(var i=0;i<countries.length;i++){countries[i].pas_length=pas.length;rowsCountries[i]={data:countries[i],value:countries[i].name,result:countries[i].name};}
var allData=rowsPas.concat(rowsCountries);return allData;},formatItem:function(row,i,n){if(row.iso==undefined){if(row.not_marine==undefined){var menu_string='<div style="margin-top:1px;float:left;width:169px;font-size:11px;">'+row.english_name+'<br><span style="color:#aaa;font-size:9px;">'+row.designation+'</span></div><div style="float:left;margin-top:1px; width:10px;">';if(row.marine==true){menu_string=menu_string+'<img src="/images/icons/circle.gif">';}
if(row.whs==true){menu_string=menu_string+'<img src="/images/icons/green_star.gif">';}
menu_string=menu_string+'</div>';}}
else{var menu_string='<div style="margin-top:1px;float:left;width:169px;font-size:11px;">PAs in <b>'+row.name+'</b><br><span style="color:#aaa;font-size:9px;">'+row.pas+' PAs in this country</span></div><div style="float:left;margin-top:1px; width:10px;">';menu_string=menu_string+'</div>';}
return menu_string;},resultsClass:"ac_results ac_results_small",loadingClass:"ac_loading_small",width:194,height:50,minChars:4,max:5,selectFirst:false,multiple:false,scroll:false}).result(function(event,row){location.href=row.url;});$('#searchHeader').click(function(ev){ev.stopPropagation();ev.preventDefault();if($(this).val()=='Search PAs, countries,...'){$(this).val('');$(this).css('font-style','normal');$(this).css('color','#666666');$(this).focus();}});$('div#explore_input a').click(function(ev){ev.stopPropagation();ev.preventDefault();hideExploreInput();});});function hideExploreInput(){$('#searchBox').fadeOut('slow');$('#tinyExplore').fadeIn('slow');$('#header_home').fadeIn('slow');$('#login_error_home').fadeOut('fast');searchBoxVisible=false;}
function showExploreInput(){$('#searchBox').fadeIn('slow');$('#tinyExplore').fadeOut('slow');$('#header_home').fadeOut('slow');searchBoxVisible=true;}
function displayLoading(){$('#loading').fadeIn('fast');}
function hideLoading(){$('#loading').fadeOut('fast');}
var map;var bounds;var clickedLat;var paDictionary=new Object();var lastMask=10000;var ppeOverlay;var current_latlng;var stopNow=false;var boundsAppearingMarkers;var firstLoad=true;var params;var searchBoxVisible=true;var pixelsMoved=0;var startLatLng;var moveMaplistener;var onDragMovement=false;var drag_timeout=0;var drag_start_event;var drag_end_event;var click_event;var drag_end_event_tiny;function pageload(hash){if(hash){if($.browser.msie){hash=encodeURIComponent(hash);}
params=hash.split("_");}}
function getMapHash(){if(map){var vis=0;if(searchBoxVisible){vis=1;}
anchor=map.getZoom()+"_"+rnd(map.getCenter().lat())+"_"+rnd(map.getCenter().lng())+"_"+vis;$.cookies.set("home_anchor",anchor);return anchor;}
return"";}
function initialize(){bounds=new google.maps.LatLngBounds();boundsAppearingMarkers=new google.maps.LatLngBounds();var zoom=8;if(params){zoom=Number(params[0]);lat=params[1];lon=params[2];if(params[3]=="0"){hideExploreInput();}
current_latlng=new google.maps.LatLng(lat,lon);}else{var zoom=8;if(google.loader.ClientLocation){current_latlng=new google.maps.LatLng(google.loader.ClientLocation.latitude,google.loader.ClientLocation.longitude);}else{current_latlng=new google.maps.LatLng(40.4166909,-3.7003454);}}
clickedLat=current_latlng;startLatLng=current_latlng;var myOptions={zoom:zoom,center:current_latlng,disableDefaultUI:true,scrollwheel:true,mapTypeId:google.maps.MapTypeId.TERRAIN}
map=new google.maps.Map(document.getElementById("map_canvas"),myOptions);ppeOverlay=new SparseTileLayerOverlay();ppeOverlay.setUrl=function SetUrl(xy,z){var q=[];q[0]=UTILITY_SERVER_URL+"/blue/"+z+"/"+xy.x+"/"+xy.y;return q;};ppeOverlay.setMap(map);google.maps.event.addListener(map,"idle",function(){ppeOverlay.idle();});click_event=google.maps.event.addListener(map,'click',function(event){clickedLat=event.latLng;getData(event.latLng);});google.maps.event.addListener(this.map,'tilesloaded',function(event){google.maps.event.clearListeners(map,'tilesloaded');getTenPAS(current_latlng.b,current_latlng.c);});drag_start_event=google.maps.event.addListener(map,'dragstart',function(event){stopNow=true;});drag_end_event=google.maps.event.addListener(map,'dragend',function(event){onDragMovement=true;stopNow=false;clickedLat=map.getCenter();clearMap();getTenPAS(clickedLat.lat(),clickedLat.lng());$.historyLoad(getMapHash());if(drag_timeout!=0){clearTimeout(drag_timeout);}
drag_timeout=setTimeout(function(){drag_timeout=0;onDragMovement=false;},150);});drag_end_event_tiny=google.maps.event.addListener(map,'dragend',function(event){clickedLat=map.getCenter();$.historyLoad(getMapHash());});google.maps.event.addListener(map,'zoom_changed',function(event){$.historyLoad(getMapHash());});if(searchBoxVisible){moveMaplistener=google.maps.event.addListener(map,'dragend',function(){var changeInLng=Math.abs(startLatLng.lng()-map.getCenter().lng());var changeInLat=Math.abs(startLatLng.lat()-map.getCenter().lat());if(changeInLng>3||changeInLat>2){google.maps.event.removeListener(moveMaplistener);hideExploreInput();}});}}
function getTileLayerOverlay(layer){var overlay=new SparseTileLayerOverlay();overlay.setUrl=function SetUrl(xy,z){var q=[];q[0]=UTILITY_SERVER_URL+"/geoserver/gwc/service/gmaps?layers="+layer+"&zoom="+z+"&x="+xy.x+"&y="+xy.y;return q;};overlay.setMap(map);overlay.setMap(null);return overlay;}
function rnd(dd){return 0.25*parseInt(4*dd);}
function rnd_rad(rad){return((parseInt(rad)+24)/25)*25}
function getTenPAS(lat,lng){var script=document.createElement('script');bounds=map.getBounds();var bottomRightPosition=bounds.getSouthWest();var centre=map.getCenter();var distance=distanceBetween(bottomRightPosition.lat(),bottomRightPosition.lng(),centre.lat(),centre.lng());script.setAttribute('src',BASE_APP_URL+'/api/search_by_point/'+rnd(lng)+'/'+rnd(lat)+'?radius='+rnd_rad(distance)+'&callback=loadTenPAS');script.setAttribute('id','jsonScript');script.setAttribute('type','text/javascript');document.documentElement.firstChild.appendChild(script);displayLoading();}
function loadTenPAS(json){if(json.length>0){boundsAppearingMarkers=map.getBounds();recursiveFunction(json);}
hideLoading();}
function recursiveFunction(paItems){if(stopNow){stopNow=false;}else{var latlng=new google.maps.LatLng(paItems[0].centre[1],paItems[0].centre[0]);if(!belongToMap(paItems[0].id)){var infoBox=new PAInfoWindow({latlng:latlng,map:map,paInformation:paItems[0]});var id=paItems[0].id;paDictionary[id]=infoBox;paItems.splice(0,1);setTimeout(function(ev){if(paItems.length>0){recursiveFunction(paItems);}},1);}else{paItems.splice(0,1);setTimeout(function(ev){if(paItems.length>0){recursiveFunction(paItems);}},1);}}}
function getData(latlng){var script=document.createElement('script');script.setAttribute('src',BASE_APP_URL+'/api/sites_by_point/'+latlng.lng()+'/'+latlng.lat()+'?callback=loadJson');script.setAttribute('id','jsonScript');script.setAttribute('type','text/javascript');document.documentElement.firstChild.appendChild(script);displayLoading();}
function loadJson(json){var find=false;if(json.length>0){var name=json[0].name;var id=json[0].id;if(!belongToMap(id)){var infoBox=new PAInfoWindow({latlng:clickedLat,map:map,paInformation:json[0]});paDictionary[id]=infoBox;}}
hideLoading();}
function clearMap(){bounds=map.getBounds();for(var i in paDictionary){var itemPosition=new google.maps.LatLng(paDictionary[i].paInformation_.centre[1],paDictionary[i].paInformation_.centre[0]);if(!bounds.contains(itemPosition)){paDictionary[i].setMap(null);paDictionary[i]=null;delete paDictionary[i];}}}
function belongToMap(paID){for(var i in paDictionary){if(i==paID){return true;}}
return false;}
function distanceBetween(lat1,lon1,lat2,lon2){var R=6371;var dLat=(lat2-lat1).toRad();var dLon=(lon2-lon1).toRad();var a=Math.sin(dLat/2)*Math.sin(dLat/2)+
Math.cos(lat1.toRad())*Math.cos(lat2.toRad())*Math.sin(dLon/2)*Math.sin(dLon/2);var c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));var d=R*c;return d*(50/100);}
Number.prototype.toRad=function(){return this*Math.PI/180;}
function ratelimit(fn,ms){var last=(new Date()).getTime();return(function(){var now=(new Date()).getTime();if(now-last>ms){last=now;fn.apply(null,arguments);}});}
function goToSearch(){var searchString=$('#search_inputText').val();var url=BASE_APP_URL+'/search?q='+searchString+'&commit=Search';if(searchString.length>0){window.location=url;}}
function goToSearchSecond(){var searchString=$('#searchHeader').val();var url=BASE_APP_URL+'/search?q='+searchString+'&commit=Search';if(searchString.length>0){window.location=url;}}
function PAInfoWindow(opts){google.maps.OverlayView.call(this);this.latlng_=opts.latlng;this.map_=opts.map;this.offsetVertical_=-75;this.offsetHorizontal_=-40;this.height_=80;this.width_=80;this.paInformation_=opts.paInformation;var me=this;this.boundsChangedListener_=google.maps.event.addListener(this.map_,"bounds_changed",function(){return me.panMap.apply(me);});this.setMap(this.map_);}
PAInfoWindow.prototype=new google.maps.OverlayView();PAInfoWindow.prototype.remove=function(){if(this.div_){this.div_.parentNode.removeChild(this.div_);this.div_=null;}};PAInfoWindow.prototype.draw=function(){this.createElement();if(!this.div_)return;var pixPosition=this.getProjection().fromLatLngToDivPixel(this.latlng_);if(!pixPosition)return;this.div_.style.width=this.width_+"px";this.div_.style.left=(pixPosition.x+this.offsetHorizontal_)+"px";this.div_.style.height=this.height_+"px";this.div_.style.top=(pixPosition.y+this.offsetVertical_)+"px";$(this.div_).fadeIn('fast');};PAInfoWindow.prototype.createElement=function(){var panes=this.getPanes();var div=this.div_;if(!div){div=this.div_=document.createElement("div");div.style.border="0px none";div.style.position="absolute";div.style.background="url('../images/icons/marker.png') no-repeat 0 0";div.style.width=this.width_+"px";div.style.height=this.height_+"px";var paImage=document.createElement("img");paImage.style.position="absolute";paImage.style.top='13px';paImage.style.left='16px';paImage.style.width="48px";paImage.style.height="48px";paImage.style.cursor="pointer";paImage.src=this.paInformation_.image;div.appendChild(paImage);var hiddenDiv=document.createElement('div');hiddenDiv.style.position="absolute";hiddenDiv.style.display='none';hiddenDiv.style.top='-7px';hiddenDiv.style.left='-5px';hiddenDiv.style.width="208px";hiddenDiv.style.height="88px";hiddenDiv.style.background='url(../images/markers/backgroundMarker.png) no-repeat 0 0';hiddenDiv.style.cursor="pointer";hiddenDiv.alt=this.paInformation_.slug;var paImageOver=document.createElement("img");paImageOver.style.position="absolute";paImageOver.style.top='19px';paImageOver.style.left='20px';paImageOver.style.width="48px";paImageOver.style.height="48px";paImageOver.style.cursor="pointer";paImageOver.style.border='1px solid #005783'
paImageOver.src=this.paInformation_.image;hiddenDiv.appendChild(paImageOver);var paName=document.createElement('p');paName.style.position="relative";paName.style.float="left";paName.style.padding='18px 0 0 76px';paName.style.font='bold 12px Arial';paName.style.color='#FFFFFF';if(this.paInformation_.name!=null){var paNameLength=this.paInformation_.name.length;if(paNameLength>28){var paNameValue=this.paInformation_.name.substring(0,22);$(paName).html(paNameValue+'...');}else{$(paName).html(this.paInformation_.name);}}
paName.style.width="112px";paName.style.cursor="pointer";hiddenDiv.appendChild(paName);$(hiddenDiv).click(function(ev){if(!onDragMovement){window.location='/sites/'+$(this).attr('alt');}else{onDragMovement=false;}
ev.stopPropagation();ev.preventDefault();});var localName=document.createElement('p');localName.style.position="relative";localName.style.float="left";localName.style.margin='0 0 0 76px';localName.style.font='italic 11px Arial';localName.style.color='#FFFFFF';if(this.paInformation_.local_name!=null){var localNameLength=this.paInformation_.local_name.length;if(localNameLength>16){var localNameValue=this.paInformation_.local_name.substring(0,16);$(localName).html(localNameValue+'...');}else{$(localName).html(this.paInformation_.local_name);}}
localName.style.width="112px";localName.style.cursor="pointer";hiddenDiv.appendChild(localName);var poI=document.createElement('p');poI.style.position="absolute";poI.style.float="left";poI.style.bottom='18px';poI.style.left='76px';poI.style.font='normal 10px Arial';poI.style.color='#004669';if(this.paInformation_.poi_count>0){if(this.paInformation_.poi_count==1){$(poI).html(this.paInformation_.poi_count+' Point of interest');}else{$(poI).html(this.paInformation_.poi_count+' Points of interest');}}else{$(poI).html('');}
poI.style.width="112px";poI.style.cursor="pointer";hiddenDiv.appendChild(poI);div.appendChild(hiddenDiv);function removeInfoBox(ib){return function(){ib.setMap(null);};}
var config={sensitivity:10,interval:0,over:function(ev){lastMask++;$(this).children('div').css('z-index',lastMask+1);$(this).css('z-index',lastMask);$(this).children('div').fadeIn("fast");},timeout:0,out:function(ev){$(this).children('div').fadeOut("fast");}};div.style.display='none';$(div).hoverIntent(config);panes.floatPane.appendChild(div);this.panMap();}else if(div.parentNode!=panes.floatPane){div.parentNode.removeChild(div);panes.floatPane.appendChild(div);}else{}}
PAInfoWindow.prototype.getPosition=function(){return this.latlng_;};PAInfoWindow.prototype.panMap=function(){};