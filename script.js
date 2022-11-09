/** @format */

const projectName = 'random-quote-machine';
let quotesData;

var colors = [
	'#CCCCFF',
	'#6495ED',
	'#40E0D0',
	'#9FE2BF',
	'#DE3163',
	'#FF7F50',
	'#FFBF00',
	'#DFFF00',
	'#00FFFF',
];
var currentQuote = '',
	currentAuthor = '';

function getQuotes() {
	return $.ajax({
		headers: {
			Accept: 'application/json',
		},
		url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',

		success: function (jsonQuotes) {
			if (typeof jsonQuotes === 'string') {
				quotesData = JSON.parse(jsonQuotes);
				console.log('quotesData');
				console.log(quotesData);
			}
		},
	});
}

function getRandomQuote() {
	return quotesData.quotes[
		Math.floor(Math.random() * quotesData.quotes.length)
	];
}

function getQuote() {
	let randomQuote = getRandomQuote();

	currentQuote = randomQuote.quote;
	currentAuthor = randomQuote.author;

	$('.quote-text').animate({ opacity: 0 }, 500, function () {
		$(this).animate({ opacity: 1 }, 500);
		$('#text').text(randomQuote.quote);
	});

	$('.quote-author').animate({ opacity: 0 }, 500, function () {
		$(this).animate({ opacity: 1 }, 500);
		$('#author').html(randomQuote.author);
	});

	var color = Math.floor(Math.random() * colors.length);
	$('html body').animate(
		{
			backgroundColor: colors[color],
			color: colors[color],
		},
		1000
	);
	$('.button').animate(
		{
			backgroundColor: colors[color],
		},
		1000
	);
	$('#tweet-quote').attr(
		'href',
		'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
			encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
	);
}

$(document).ready(function () {
	getQuotes().then(() => {
		getQuote();
	});

	$('#new-quote').on('click', getQuote);
});
