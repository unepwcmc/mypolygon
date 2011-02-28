/**
 * jQuery.colorize
 * Copyright (c) 2008 Eric Karimov - ekarim57(at)gmail(dot)com | http://franca.exofire.net/jq/
 * Dual licensed under MIT and GPL.
 * Date: 6/24/2008
 *
 * @projectDescription Table colorize using jQuery.
 * http://franca.exofire.net/jq/colorize
 *
 * @author Eric Karimov
 * @version 1.2.0
 *
 * @param {altColor, bgColor, hoverColor, hiliteColor}
 * altColor : alternate row background color
 * bgColor : background color (The default background color is white).
 * hoverColor : background color when you hover a mouse over a row
 * hiliteColor : row highlight background color
 * oneClick : true/false(default) -  if true, clicking a new row reverts the current highlighted row to the original background color
 * columns : true/false(default)  - if true, highlights columns instead of rows
 * banColumns : []  - columns not to be highlighted; supply an array of column indices, starting from 0
 * @return {jQuery} Returns the same jQuery object, for chaining.
 *
 * @example $('table').colorize();
 *
 * @$('table').colorize({bgColor:'#EAF6CC', hoverColor:'green', hiliteColor:'red', columns:true, banColumns:[4,5,8]});
 *
 * @$('table').colorize({ columns : true, oneClick:true});
 * All the parameters are optional.
 */

jQuery.fn.colorize= function(params) {
	
	options= {
			altColor  : '#ECF6FC',
			bgColor: '#fff',
			hoverColor : '#BCD4EC',
			hiliteColor : 'yellow',
			oneClick : false,
			columns:false,
			banColumns :[]
	};		
	jQuery.extend(options, params);

	var colorHandler = {
		checkHover: function(){
			if(!this.onfire){
				this.origColor = this.style.backgroundColor;
				this.origTextColor = this.style.color;
				this.style.backgroundColor= options.hoverColor;
				this.style.color= options.textHoverColor;
			}
		},

		checkHoverOut : function(){
			if(!this.onfire){
				this.style.backgroundColor=this.origColor;
				this.style.color=this.origTextColor;
			}
		},
		highlight : function(){
			this.style.backgroundColor= options.hiliteColor;
			this.onfire = true;
		},

		stopHighlight : function(){
			this.onfire = false;
			this.style.backgroundColor = this.origColor;
			this.style.color=this.origTextColor;
		}
	}

	function getColCells(cells, idx){
		  var arr = [];
		  for (var i=0; i<cells.length; i++){
				if(cells[i].cellIndex == idx)
					arr.push(cells[i]);
		  }
		return arr;
   }

	function processCells(cells, idx, func){
			var colCells = getColCells(cells, idx);
			$.each(colCells, function(index, cell2){
					func.call(cell2);
			});
	}

	function processAdapter(cells, cell, func){
			processCells(cells, cell.cellIndex, func);
	}

	function toggleCellClick(cells){
			var func = (!this.onfire )? colorHandler.highlight: colorHandler.stopHighlight;
			processAdapter( cells, this, func);
	}

	function toggleRowClick() {
			if(!this.onfire)
				colorHandler.highlight.call (this);
			else
				colorHandler.stopHighlight.call(this);
	}

	function oneColumnClick (cells){
			processAdapter(cells, this, colorHandler.highlight);
			if(cells.clicked > -1){
					processCells(cells, cells.clicked, colorHandler.stopHighlight);
			}
			cells.clicked  = this.cellIndex;
	}

	function oneRowClick (rows){
			colorHandler.highlight.call(this);
			if(rows.clicked > -1){
					colorHandler.stopHighlight.call (rows[rows.clicked]);
			}
			rows.clicked = this.rowIndex;
	}

	function checkBan(){
			return (jQuery.inArray( this.cellIndex, options.banColumns) != -1) ;
	}

	return this.each(function(){

			jQuery(this).find('tr:odd').css('background', options.bgColor);
			jQuery(this).find('tr:even').css('background', options.altColor);

			if(options.columns){
				     var cells = jQuery(this).find('td,th');
				     cells.clicked = -1;
				 	  jQuery.each (cells, function (i, cell){
				 		  cell.onmouseover = function (){
				 		  	    processAdapter( cells, this, colorHandler.checkHover);
				 		  }
				 		  cell.onmouseout = function () {
				 		  		processAdapter( cells,  this, colorHandler.checkHoverOut);
				 		  }
				 		  cell.onclick= function () {
				 		  		if(checkBan.call(this)) return;
				 		  		if(options.oneClick)
										oneColumnClick.call (this, cells);
				 		  		else
				 		  				toggleCellClick.call(this, cells);
				 			}
					});
			}
			else {
				var rows =jQuery(this).find('tr');
				rows.clicked  = -1;

				jQuery.each(rows, function(index, row){
						row.onmouseover = colorHandler.checkHover ;
						row.onmouseout =  colorHandler.checkHoverOut;
						row.onclick = function(){
								if(options.oneClick)
										oneRowClick.call(this,rows);
								else
									   toggleRowClick.call(this);
						}
				});
			}
 	 });
}

