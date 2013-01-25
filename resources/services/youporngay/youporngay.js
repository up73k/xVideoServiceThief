/*
*
* This file is part of xVideoServiceThief,
* an open-source cross-platform Video service download
*
* Copyright (C) 2007 - 2012 Xesc & Technology
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
	this.version = "1.0.0";
	this.minVersion = "2.0.0a";
	this.author = "Xesc & Technology 2012";
	this.website = "http://www.youporngay.com/";
	this.ID = "youporngay.com";
	this.caption = "YouPorn Gay";
	this.adultContent = true;
	this.musicSite = false;
}

function getVideoInformation(url)
{
	// video information
	var result = new VideoDefinition();
	// fix possible unneeded url information (i.e: /?from=categ_us)
	if (strIndexOf(url, "/?") > 0) url = getToken(url, "/?", 0);
	// download webpage
	var http = new Http();
	var html = http.downloadWebpage(url + "/?user_choice=Enter");
	// get video title
	result.title = copyBetween(html, "<title>", "- Free Porn Videos");
	// get the flv url
	//var video_url = /'video_url'\s*:\s*encodeURIComponent\('(.*?)'\)/
	var video_url = /<video\s*src="(.*?)"/
	result.URL = video_url.exec(html)[1];
	result.URL = strReplace(result.URL, "%26", "&");
	result.URL = strReplace(result.URL, "&amp;", "&");
	// get cookies
	result.cookies = http.getCookies("|");
	// return the video information
	return result;
}

/*
function searchVideos(keyWord, pageIndex)
{
	const URL_SEARCH = "http://www.youporngay.com/search/?query=%1&type=straight&page=%2";
	const HTML_SEARCH_START = '<div class="videoList"';
	const HTML_SEARCH_FINISH = 'id="related-searches"';
	const HTML_SEARCH_SEPARATOR = '</li>';
	// replace all spaces for "+"
	keyWord = strReplace(keyWord, " ", "+");
	// init search results object
	var searchResults = new SearchResults();
	// init http object
	var http = new Http();
	var html = http.downloadWebpage(strFormat(URL_SEARCH, keyWord, pageIndex) + "&user_choice=Enter");
	// no summary avaiable
	searchResults.setSummary("");
	// get results html block
	var htmlResults = copyBetween(html, HTML_SEARCH_START, HTML_SEARCH_FINISH);
	// if we found some results then...
	if (htmlResults != "")
	{
		var blocks = splitString(htmlResults, HTML_SEARCH_SEPARATOR);
		for (n = 0; n < blocks.length-1; n++)
			parseResultItem(searchResults, blocks[n]);
	}
	// return search results
	return searchResults;
}
*/

function parseResultItem(searchResults, html)
{
	const VIDEO_URL = "http://youporngay.com";
	// vars
	var tmp, videoUrl, imageUrl, title, description, duration, rating;
	// get video url
	videoUrl = VIDEO_URL + copyBetween(html, 'href="', '"');
	// get title and image url
	tmp = copyBetween(html, '<img', '>');
	title = copyBetween(tmp, 'alt="', '"');
	imageUrl = copyBetween(tmp, 'src="', '"');
	// get video description
	description = copyBetween(html, '<div class="views">', '</div>');
	// get video duration
	tmp = copyBetween(html, '<h2 class="duration">', '</h2>');
	duration = convertToSeconds(tmp); 
	// get rating
	tmp = copyBetween(html, '<div class="rating">', '</div>');
	tmp = copyBetween(tmp, 'class="stars star-', '"');
	rating = strReplace(tmp, "-", ".");
	// add to results list
	searchResults.addSearchResult(videoUrl, imageUrl, title, description, duration, rating);
}

function convertToSeconds(text)
{
	//Clean
	var tmp2 = strReplace(text, "<span>", "");
	var tmp2 = strReplace(tmp2, "</span>", "");
	// how many ":" exists?
	var count = getTokenCount(tmp2, ":");
	// get mins and seconds
	var h = new Number(h = count == 3 ? getToken(tmp2, ":", 0) * 3600 : 0);
	var m = new Number(getToken(tmp2, ":", count - 2) * 60);
	var s = new Number(getToken(tmp2, ":", count - 1));
	// convert h:m:s to seconds
	return h + m + s;
}

function getVideoServiceIcon()
{
	return new Array(
		0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a,0x00,0x00,0x00,0x0d,0x49,0x48,0x44,0x52,
		0x00,0x00,0x00,0x10,0x00,0x00,0x00,0x10,0x08,0x06,0x00,0x00,0x00,0x1f,0xf3,0xff,
		0x61,0x00,0x00,0x01,0x9e,0x49,0x44,0x41,0x54,0x38,0x11,0x05,0xc1,0x3d,0x6f,0x8d,
		0x61,0x00,0x00,0xd0,0xf3,0xbc,0xf7,0xb9,0x1f,0xda,0x68,0x94,0x55,0x9a,0x58,0x89,
		0xc4,0xd4,0x45,0x08,0x06,0x46,0x83,0xb1,0x76,0x24,0x16,0xbf,0xc0,0x0f,0x60,0x32,
		0x88,0x48,0xe7,0x4e,0x66,0x03,0x89,0xc4,0x20,0x8c,0x22,0x51,0x22,0x15,0x22,0xd2,
		0x06,0xa5,0x68,0xf4,0xf6,0xbd,0xcf,0x97,0x73,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
		0x00,0x04,0x68,0xf7,0x1f,0x34,0x5d,0x47,0xad,0x00,0x00,0x00,0x00,0x40,0xd7,0xd1,
		0x9a,0x70,0xe3,0x5a,0x88,0x20,0x35,0xa6,0xbb,0x00,0x00,0x00,0x00,0x00,0xc0,0x81,
		0x39,0x10,0xc1,0x7e,0xe2,0x5f,0x4f,0x2e,0x4c,0x46,0xe4,0x42,0xce,0x0c,0x23,0x21,
		0x30,0x4b,0x00,0xc0,0x68,0x44,0x48,0x20,0x82,0x69,0xcf,0xa1,0x45,0x16,0x0e,0xf2,
		0xe5,0x2b,0x0b,0x0b,0x1c,0x5e,0xe4,0xe7,0x0e,0x39,0xb3,0xb4,0x44,0xd7,0x01,0xb5,
		0xb2,0xf5,0x8d,0x69,0x0f,0x22,0xd8,0x9d,0x72,0xfe,0x0c,0x67,0x96,0xb9,0x7d,0x97,
		0x93,0x27,0xb8,0x74,0x8e,0xc7,0xcf,0xf8,0xb5,0xc3,0xd5,0x2b,0x00,0xc0,0xea,0x1a,
		0xef,0x3f,0x82,0x0e,0xcc,0x0a,0x29,0x31,0x4b,0xcc,0x32,0xb3,0x0c,0xa4,0x4c,0xca,
		0xc0,0xf3,0x57,0x3c,0x5c,0x03,0x4a,0xa5,0xcf,0xa0,0x03,0x7d,0xa1,0x54,0x5a,0xe3,
		0xef,0x1e,0xfb,0x33,0x20,0x17,0x52,0x05,0x36,0xbf,0xb3,0xbe,0x01,0xe4,0x4a,0x5f,
		0x40,0x04,0x7d,0xa2,0x61,0x32,0xe6,0xfa,0x0a,0x47,0x16,0x81,0x52,0xc9,0x15,0x38,
		0xbb,0xcc,0xa9,0xe3,0x40,0xae,0xf4,0x09,0x74,0x20,0x37,0x3e,0x6f,0xf1,0xfa,0x1d,
		0xa1,0x63,0x3c,0x02,0x52,0x23,0x17,0x60,0x7e,0x9e,0x38,0x64,0x7d,0x83,0xed,0x3f,
		0xe4,0x06,0x22,0x10,0x78,0xfa,0x92,0x37,0x1f,0x80,0xcb,0x17,0xb8,0x78,0x9a,0xd6,
		0x28,0x0d,0x78,0xf2,0x82,0xd5,0x47,0xcc,0x4d,0x18,0x0e,0x19,0x4f,0x40,0x04,0x7b,
		0x89,0x38,0xe0,0xe6,0x0a,0xc7,0x8e,0xa2,0x51,0x2a,0x7d,0xa2,0xcf,0x68,0xe4,0x4a,
		0x18,0x60,0x40,0xae,0xc8,0x20,0x82,0x5c,0x99,0x65,0xee,0xad,0x31,0x19,0x53,0x0a,
		0x02,0xdb,0x3b,0xe4,0xc2,0xad,0x3b,0xfc,0xf8,0x4d,0x37,0x20,0x15,0xa0,0x16,0x10,
		0x41,0x6e,0xa4,0xc4,0xdb,0x4f,0xd4,0x4a,0x08,0xb4,0xc6,0x30,0x12,0x02,0x9b,0xdb,
		0x0c,0x23,0xc3,0x48,0xce,0x40,0x1b,0x80,0x08,0xf6,0x13,0x61,0x40,0xec,0x00,0x00,
		0x80,0x51,0x04,0x32,0x04,0x42,0x60,0x3f,0x03,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
		0x00,0xff,0x01,0xd3,0x9b,0xb8,0x71,0x62,0x78,0xd9,0xc6,0x00,0x00,0x00,0x00,0x49,
		0x45,0x4e,0x44,0xae,0x42,0x60,0x82);
}
