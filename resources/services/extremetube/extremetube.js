/*
*
* This file is part of xVideoServiceThief,
* an open-source cross-platform Video service download
*
* Copyright (C) 2007 - 2011 Xesc & Technology
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with xVideoServiceThief. If not, see <http://www.gnu.org/licenses/>.
*
* Contact e-mail: Xesc <xeskuu.xvst@gmail.com>
* Program URL   : http://xviservicethief.sourceforge.net/
*
*/

function RegistVideoService()
{
	this.version = "1.0.4";
	this.minVersion = "2.0.0a";
	this.author = "crapmaster & Xesc & Technology 2011";
	this.website = "http://www.extremetube.com/";
	this.ID = "extremetube.com";
	this.caption = "Extremetube";
	this.adultContent = true;
	this.musicSite = false;
}

function getVideoInformation(url)
{
	// video information
	var result = new VideoDefinition();

	// download webpage
	var http = new Http();
	var html = http.downloadWebpage(url);

	// get video title
	result.title = copyBetween(html, '<h1 class="title-video-box float-left" title="', '">');

	// get the xml url
	var xmlUrl = copyBetween(html, '"FlashVars" value="options=', '"/>');
	var xml = http.downloadWebpage(xmlUrl);

	// load url
	var videoUrl = copyBetween(xml, "<flv_url>", "</flv_url>");
	result.URL=cleanUrl(videoUrl);

	// return the video information
	return result;
}

function searchVideos(keyWord, pageIndex) {
	const URL_SEARCH            = "http://www.extremetube.com/videos?search=%1&page=%2";
	const HTML_SEARCH_START     = '<ul class="video-tag-list">';
	const HTML_SEARCH_FINISH    = '</ul>';
	const HTML_SEARCH_SEPARATOR = "</li>";

	// replace all spaces for "+"
	keyWord = strReplace(keyWord, " ", "+");

	// init search results object
	var searchResults = new SearchResults();

	// init http object
	var http = new Http();
	var html = http.downloadWebpage(strFormat(URL_SEARCH, keyWord, pageIndex));


	var noResIx = strIndexOf(html, "No results");
	if (noResIx == -1) {

		// get the search summary
		var summary = copyBetween(html, '<div class="result-container">', '<div class="myuploads-wrapper-content">'); 
		summary = copyBetween(summary, '<h2>', '</h2>');
		summary = cleanSummary(summary);
		searchResults.setSummary(summary);

		// get results html block
		var htmlResults = copyBetween(html, HTML_SEARCH_START, HTML_SEARCH_FINISH);

		// if we found some results then...
		if (htmlResults != "") {
			var blocks = splitString(htmlResults, HTML_SEARCH_SEPARATOR);
			for (n = 0; n < blocks.length-1; n++)
				parseResultItem(searchResults, blocks[n]);
		}
	}

	// return search results
	return searchResults;
}

function cleanSummary(summary) {
	// remove all "\n"
	summary = strReplace(summary, "\n", "");

	// remove unused tags
	summary = strReplace(summary, "</span>", '');
	summary = strReplace(summary, "<span>", '');
	summary = strReplace(summary, "<em>", '');
	summary = strReplace(summary, "</em>", '');

	// remove &quot;
	summary = strReplace(summary, "&quot;", "");

	// return cleanned summary
	return summary;
}

function parseResultItem(searchResults, html) {
	// vars
	var tmp, videoUrl, imageUrl, title, description, duration, rating;

	// get video url
	videoUrl = copyBetween(html, 'href="', '"');

	// get title and image url
	tmp= copyBetween(html, '<img class="thumb-list-img"', '/>');
	title = copyBetween(tmp, 'title="', '"');
	imageUrl = copyBetween(tmp, 'src="', '"');

	// get video description
	description = "";

	// get video duration
	tmp = copyBetween(html, '<div class="time-video absolute">', '</div>');	
	duration = convertToSeconds(tmp); 

	// get rating
	rating = copyBetween(html, '<div class="absolute rate-val thumb-up-col">', '%</div>')/10;

	// add to results list
	searchResults.addSearchResult(videoUrl, imageUrl, title, description, duration, rating);
}

function convertToSeconds(text) {
	// how many ":" exists?
	var count = getTokenCount(text, ":");

	// get mins and seconds
	var h = new Number(h = count == 3 ? getToken(tmp2, ":", 0) * 3600 : 0);
	var m = new Number(getToken(text, ":", count - 2) * 60);
	var s = new Number(getToken(text, ":", count - 1));

	// convert h:m:s to seconds
	return h + m + s;
}

function getVideoServiceIcon()
{
	return new Array(
		0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a,0x00,0x00,0x00,0x0d,0x49,0x48,0x44,0x52,
		0x00,0x00,0x00,0x10,0x00,0x00,0x00,0x10,0x08,0x02,0x00,0x00,0x00,0x90,0x91,0x68,
		0x36,0x00,0x00,0x00,0x09,0x70,0x48,0x59,0x73,0x00,0x00,0x0b,0x13,0x00,0x00,0x0b,
		0x13,0x01,0x00,0x9a,0x9c,0x18,0x00,0x00,0x01,0xf1,0x49,0x44,0x41,0x54,0x18,0x19,
		0x75,0xc1,0xcb,0x6a,0x53,0x51,0x14,0x06,0xe0,0x7f,0x5d,0xf6,0xc9,0x49,0x52,0x89,
		0xa8,0x73,0x11,0x7c,0x06,0x71,0xe0,0x20,0x14,0x05,0xf5,0x45,0x9c,0x08,0xce,0x0a,
		0xbe,0x83,0x08,0xbe,0x80,0x82,0x38,0x55,0x3a,0xb0,0xd4,0xdb,0x3b,0x88,0x8e,0x94,
		0x56,0x2b,0x22,0x4d,0xa3,0x6d,0x6a,0x93,0x93,0x9e,0xdb,0xde,0x6b,0x99,0x64,0x2a,
		0xfd,0x3e,0x02,0xd0,0xcd,0xf3,0x07,0xf7,0xef,0x5d,0xbe,0x72,0x55,0x44,0x98,0xc9,
		0xdc,0x01,0x82,0xbb,0xc3,0x89,0xc8,0x1d,0xcc,0x64,0x66,0x1b,0x1b,0x0f,0x4f,0xa6,
		0x53,0x06,0x20,0x2a,0x27,0xd3,0xe3,0xdd,0xef,0x3b,0x6d,0xaa,0x98,0x93,0x8a,0x89,
		0x18,0x50,0x91,0x57,0xe4,0x75,0x51,0x4c,0xbe,0xed,0xed,0x0e,0x06,0x7d,0x11,0x06,
		0xc0,0x58,0x61,0xd1,0x83,0xf1,0xb8,0x29,0x4b,0x26,0x9c,0x16,0x53,0x78,0x0c,0x21,
		0xf4,0x7a,0xe7,0x44,0xc3,0xe4,0xf0,0xa8,0x2a,0xab,0x20,0xe2,0x58,0x52,0xac,0xa8,
		0x86,0x1b,0xd7,0xaf,0x11,0x8b,0x93,0x7e,0xd9,0xf9,0x31,0x1a,0xfd,0x66,0x21,0x02,
		0x44,0x24,0xb6,0x8d,0x88,0x6e,0x6d,0xbf,0x4b,0x31,0x01,0x50,0x2c,0x91,0x59,0x24,
		0xc2,0x42,0xdb,0x46,0x80,0x5f,0xbe,0xda,0xc4,0x19,0x14,0x80,0xbb,0x5b,0xb4,0xb6,
		0x6d,0x7b,0xbd,0x8c,0x88,0x78,0x05,0xff,0x31,0x33,0x00,0x8a,0x25,0x9f,0x16,0x45,
		0x59,0x96,0x04,0x0a,0x59,0xb8,0x75,0x73,0x7d,0x7d,0x7d,0x08,0x87,0x9b,0x99,0x7b,
		0x8a,0xad,0x86,0xf0,0x7a,0x6b,0xfb,0xe9,0xb3,0xe7,0x00,0x14,0x4b,0xc4,0x40,0x8a,
		0x6d,0x4c,0x91,0xa2,0xfd,0xdc,0xfb,0x9a,0x65,0xb9,0x39,0xb2,0x2c,0xcc,0x8b,0x19,
		0x11,0x65,0x59,0xd6,0xd4,0x25,0x56,0x14,0x00,0x01,0x9d,0x4e,0xc8,0xf3,0x3c,0x88,
		0x28,0xeb,0xe1,0xf1,0x9f,0x62,0x36,0xca,0xbb,0x39,0x33,0xab,0x66,0x93,0xc3,0x71,
		0xbf,0xdf,0x37,0x33,0xac,0x28,0x56,0x88,0xc9,0x53,0xac,0x53,0xec,0x0c,0xce,0x7f,
		0xdb,0xfb,0xf5,0xe6,0xed,0x07,0x51,0x05,0x40,0x80,0x2f,0x98,0x95,0x75,0x83,0x15,
		0x05,0xe0,0xc0,0xe9,0x6c,0xea,0x9e,0xea,0xaa,0x66,0x82,0x30,0xed,0x8f,0xc6,0x38,
		0x03,0x63,0xc9,0x85,0xd1,0x54,0xa7,0x21,0x88,0x5b,0x13,0xdb,0x16,0x67,0x53,0x2c,
		0x91,0x1b,0xca,0x79,0x91,0x52,0x82,0xa7,0xbb,0x77,0x6e,0x0f,0x87,0x43,0x07,0x85,
		0x10,0xcc,0x0c,0xee,0x66,0x49,0x35,0x7b,0xf4,0xf8,0xc9,0xc7,0x4f,0x9f,0x15,0x0b,
		0xee,0xc7,0x47,0xe3,0xac,0x93,0x05,0xd4,0x94,0xea,0xf7,0x9b,0x2f,0x34,0x68,0xde,
		0xed,0xa6,0x85,0xb6,0x6e,0x65,0x4d,0x11,0x2f,0x5d,0xb8,0x08,0x4f,0x00,0x14,0x80,
		0x03,0xa3,0xfd,0x83,0x59,0x4d,0x7d,0xae,0x9a,0xf9,0xb4,0xd3,0x09,0x31,0x9a,0x25,
		0x74,0xbb,0x0a,0xd0,0x8c,0x07,0x6b,0xd2,0xc6,0xba,0x61,0x51,0x00,0x0a,0xc0,0xcc,
		0xe6,0x29,0x9b,0x1f,0x8c,0xdd,0xe1,0x4b,0x95,0x9b,0x8b,0xb0,0x4d,0x1a,0x66,0x62,
		0xaa,0x92,0xd9,0xfe,0xa4,0xf9,0x3b,0x9d,0x03,0xf8,0x07,0x5c,0x43,0x1b,0x64,0xa0,
		0x5f,0x7f,0xbd,0x00,0x00,0x00,0x00,0x49,0x45,0x4e,0x44,0xae,0x42,0x60,0x82);
}