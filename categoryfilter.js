(function() {
	jQuery(function() {
		// Case insensitive :contains filter

		jQuery.extend(jQuery.expr[':'], {
		  'containsi': function(elem, i, match, array)
		  {
		    return (elem.textContent || elem.innerText || '').toLowerCase()
		    .indexOf((match[3] || "").toLowerCase()) >= 0;
		  }
		});

		// Function to bind to keypress method in category filter element

		categoryFilter = function(filter) {
			jQuery('ul.categorychecklist:visible li, ul.category-checklist:visible li')
				.hide()
				.filter(':containsi("' + filter + '")')
				.show();
		};
		activateCategoryFilter = function() {
			// Fix the height of the category container for better usability (otherwise it'll grow and shrink when you filter/unfilter categories)
			jQuery('ul.categorychecklist:visible, ul.category-checklist:visible')
				.parent()
				.each(function() {
					jQuery(this)
						.height(jQuery(this).height());
				})

			jQuery('input.category-filter')
				.on('keydown', function(e) {
					if (e.keyCode == 13) { return false; } 
				})
				.on('keyup', function(){
					categoryFilter(jQuery(this).val())
				});
		}

		// Add the filter element to the edit post view
		jQuery('#category-all').after("<div id='category-filter'><h4>Filter: <input type='text' class='category-filter'/></h4></div>");
		activateCategoryFilter()
		
		// Add the filter element to the quick edit post view:

		if (typeof inlineEditPost != 'undefined') {

			// Copy existing inline edit function
			var $wp_inline_edit = inlineEditPost.edit;

			// Create a new version which calls the original and then takes an additional action
			inlineEditPost.edit = function( id ) {
				$wp_inline_edit.apply( this, arguments );
				jQuery('ul.categorychecklist:visible, ul.category-checklist:visible')
					.parent()
					.append("<div id='category-filter'><label><span class='title'>Filter: </span><span class='input-text-wrap'><input type='text' class='category-filter'/></span></title></div>");
				activateCategoryFilter()
			}
		}

	})
})();