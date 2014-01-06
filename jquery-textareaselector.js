/**
 * jQuery Textarea Selector Plugin v1.0
 * 
 * Copyright (c) 2014 David Lee
 * https://github.com/DavidLeePlaySmart/JQueryTextareaSelector
 * 
 * Released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *  
 * Purpose:
 * For UI control to find target words in textarea and scroll automatically to target.
 * 
 * Usage:
 * Step1. Setup for keyWord for search >>
 *      var searchObj = jQuery('.textareaForSearch').textareaselector({
*         keyWord: 'keyWord',
*         textSizeRevise: 0, //See Note.1
*         searchToEndFunc: searchToEndFunc
*       });
*       
 * Step2. Do search >>
 *      searchObj.search();
 * Step3. Try to find the next can just call search again.
 * 
 * Note.1>> textSizeRevise: If you are using some other script to change the size of each word, can use this value to correct.
 * 
 */
(function($) {	
	$.fn.textareaselector = function(opts) {

		var defaults = {
				keyWord: '',
				textSizeRevise: 0,
				autoFocus: true;
	         };
		
		var options = $.extend(defaults, opts);
		var currentResultLine = -1;
		var scrollTarget = this;
		var startIndex = $(this).val().indexOf(options.keyWord);
        	var textareaObj = document.getElementById($(this).attr('id'));
		var lineArray = $(this).val().split("\n");
		var eachRowHeight =parseInt($(this).css('font-size'), 10);

		//Avoid no searchToEndFunc
		var searchToEndFunc = options.searchToEndFunc;
		if(typeof searchToEndFunc == 'undefined' || null == searchToEndFunc){
			searchToEndFunc = function(){};
		}
		
		/*
		* Do search and scroll to target line
		*/
		var search = function(){
			var didSuccessfulSearch = false;
			var targetScrollPos = 0;			
			$(lineArray).each(function(lineNum) {
				if (this.indexOf(options.keyWord) > -1 && lineNum>currentResultLine) {
					targetScrollPos = lineNum * (eachRowHeight + options.textSizeRevise);
					currentResultLine = lineNum;
					didSuccessfulSearch = true;
					return false;
				}
			});
			if(didSuccessfulSearch){
				$(scrollTarget).scrollTop(targetScrollPos);
				if(options.autoFocus){
				  textareaObj.setSelectionRange(startIndex, startIndex+(options.keyWord.length));
        	                  textareaObj.focus();
				}
			}else{
				searchToEndFunc();
			}
		};
		
		return {
			search:search
		};
		
	};
})(jQuery);
