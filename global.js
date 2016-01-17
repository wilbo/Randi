$(document).ready(function() {

	// if the submit button has been pressed
	$('#submit').click(function() {

		// prepare the output
		var output = '';

		// start by hiding the last output
		$('#output').html('');
		$('#output').css('display', 'none');
		$('#label-result').css('display', 'none');
		$('.copy').css('display', 'none');

		// get the input values
		var amount = $('#amount').val();
		var min = $('#min').val();
		var max = $('#max').val();
		var columns = $('#columns').val();
		var seed = $('#seed').val();
		var style = $('#style').val();

		// if seed is empty, give it the word 'new'
		// read more here: https://www.random.org/clients/http/'
		if (seed == '') {
			seed = 'new';
		} else {
			seed = 'id.' + seed;
		}

		// construct request url
		var url = 'https://www.random.org/integers/?num=' + amount + '&min=' + min + '&max=' + max + '&col=2&base=' + style + '&format=plain&rnd=' + seed;

		// start the request
		// data are the requested numbers on succes
		$.get(url, function (data) {

			// formatting the data
			var data = data.replace(/\s+/g,',');
			var data = data.slice(0, -1);

			// create an array of the numbers
			var	outputArray = data.split(',');
			// the length of the array for looping
			var rows = outputArray.length;
			
			// this value keeps track of the outputted values in the array
			var outputIndex = 0;

			// the result tag
			output += '<label id="label-result">result: </label>';

			// this is the 2 dimensional array to make the columns and the rows
			for (var i=0; i < columns; i++) {

				// add a 'column'
				output += '<div class="column">';

				// this loop wil complete each row
				for (var j=0; j < (rows / columns); j++) {
					
					// check if there is is a number in the array left
					if (typeof outputArray[outputIndex] != 'undefined') {
						
						// add the number to the output
						output += '<span>' + outputArray[outputIndex] + ' </span><br>';
		
					}
					// increment the output value here
					outputIndex++;
				}

				// end of a column
				output += '</div>';
			}

			// display the result label
			$('#label-result').css('display', 'inline-block').hide().fadeIn(250);;
			// display the #result div 
			$('#output').css('display', 'inline-block');
			// display the copy button
			$('.copy').css('display', 'inline-block');
			// append the output string to the document
			$('#output').append(output).hide().fadeIn(250);
		
		// if error
		}).fail(function(){

 			 // if some fields are empty or 0
			if (amount == '' || min == '' || max == '' || columns == '') {
				output = 'You left an important field empty :(';
			} else if (amount == '0' || max == '0' || columns == '0') {
				output = 'Please try some realistic input :)';
			} 

			// display the result label
			$('#label-result').css('display', 'inline-block').hide().fadeIn(250);
			// display the #result div
			$('#output').css('display', 'inline-block');
			// append the error message to the document
			$('#output').append(output).hide().fadeIn(250);

		});

	});

	// the code that handles the copy button underneath the results.
	function initCopyButton() {

		// the copy button
		var copyButton = new Clipboard('.copy');

		// on succes
		copyButton.on('success', function(e) {
	    $('#copy-result').css('display', 'inline-block').hide().fadeIn(250);
	    $('#copy-result').append('copied!').hide().fadeIn(250);
	    e.clearSelection();
		});

		// on error
		copyButton.on('error', function(e) {
	    $('#copy-result').css('display', 'inline-block').hide().fadeIn(250);
	    $('#copy-result').append('something went wrong :(').hide().fadeIn(250);
		});

	}

	// the code that handles the the explanatory labels on focus
	function triggerFocusLabels() {

		// show 
		$('.input').focusin(function() {
			$(this).next().fadeIn(250);
		});

		// hide 
		$('.input').focusout(function() {
			$(this).next().fadeOut(250);
		});

	}

	// init
	initCopyButton();
	triggerFocusLabels();


});