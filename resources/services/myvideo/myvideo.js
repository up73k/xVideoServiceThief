/*
*
* This file is part of xVideoServiceThief,
* an open-source cross-platform Video service download
*
* Copyright (C) 2007 - 2009 Xesc & Technology
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
	this.version = "2.0.0";
	this.minVersion = "2.0.0a";
	this.author = "Xesc & Technology 2009";
	this.website = "http://www.myvideo.de/";
	this.ID = "myvideo.de";
	this.caption = "MyVideo";
	this.adultContent = false;
	this.musicSite = false;
}

function getVideoInformation(url)
{
	const URL_FLV = "%1/%2.flv";
	// video information
	var result = new VideoDefinition();
	// download webpage
	var http = new Http();
	var html = http.downloadWebpage(url);
	// get the flv url and params
	var path = copyBetween(html, "<link rel='image_src' href='", "/thumbs");
	var vidId = copyBetween(html, path + "/thumbs/", "_");
	// get the video title
	result.title = copyBetween(html, "entry-title'>", "</a>");
	// build final url
	result.URL = strFormat(URL_FLV, path, vidId);
	// get cookies
	result.cookies = http.getCookies("|");
	// return the video information
	return result;
}

function searchVideos(keyWord, pageIndex)
{
	const URL_SEARCH = "http://www.myvideo.de/Videos_A-Z?lpage=%2&searchWord=%1&searchOrder=0";
	const HTML_SEARCH_START = "<table class='body sCenter vl_newMargin'>"; //'<div class="lBox lLeftBox globalBxBorder globalBx video_list">';
	const HTML_SEARCH_FINISH = '</table>'; //"</body>";
	const HTML_SEARCH_SEPARATOR = "<td class='body sTLeft hslice entry-content vCont' id='slice_";
	// replace all spaces for "+"
	keyWord = strReplace(keyWord, " ", "+");
	// init search results object
	var searchResults = new SearchResults();
	// init http object
	var http = new Http();
	var html = http.downloadWebpage(strFormat(URL_SEARCH, keyWord, pageIndex, searchResults.getUserLanguage()));
	// get the search summary
	var tmp = copyBetween(html, '<td> Dein Ergebnis', '</td>');
	var summary = "Dein Ergebnis" + copyBetween(tmp, "<span class='sWord'>", "'");
	var tmp = copyBetween(html, "<span class='pView pnPages'>", "</span>");
	var summary = summary + " " + tmp
	var tmp = copyBetween(html, "<span class='pView pnResults'>", "</span>");
	var summary = summary + " " + tmp
	searchResults.setSummary(summary);
	// get results html block
	var htmlResults = copyBetween(html, HTML_SEARCH_START, HTML_SEARCH_FINISH);
	// if we found some results then...
	if (htmlResults != "")
	{
		var block = "";
		// iterate over results
		while ((block = copyBetween(htmlResults, HTML_SEARCH_SEPARATOR, HTML_SEARCH_SEPARATOR)) != "")
		{
			parseResultItem(searchResults, block);
			htmlResults = strRemove(htmlResults, 0, block.toString().length);
		}
		// get last result
		parseResultItem(searchResults, htmlResults);
	}
	// return search results
	return searchResults;
}

function parseResultItem(searchResults, html)
{
	const VIDEO_URL = "http://www.myvideo.de";
	// vars
	var tmp, videoUrl, imageUrl, title, description, duration, rating;
	// get title and image url
	tmp = copyBetween(html, "<div class='vThumb'>", '</div>') ;
	title = copyBetween(tmp, "title='", "'");
	imageUrl = copyBetween(tmp, "src='", "'");
	// get video url
	videoUrl = VIDEO_URL + copyBetween(tmp, "href='", "'");
	//if (strIndexOf(imageUrl, "default.jpg") == -1) // if is not a "default.jpg"...
	//	imageUrl = copyBetween(tmp, 'thumb="', '"');
	// get video description
	tmp = copyBetween(html, "<div class='sCenter vTitle'>", '</div>') ;
	description = copyBetween(tmp, "<span class='hidden'>", '</span>');
	// get video duration
	tmp = copyBetween(html, ' Lnge ', '/span>');
	duration = convertToSeconds(copyBetween(tmp, "> ", '<'));
	// get rating
	rating = getrating(copyBetween(html, 'ratingBox', '</div>'));
	// add to results list
	searchResults.addSearchResult(videoUrl, imageUrl, title, description, duration, rating);
}

function getrating(text)
{
	var rating = 0
	var i = 1
	while (i < 6)
	{
		var part = getToken(text, '<img',i);
		if (strIndexOf(part,"m_star_red_0.gif") != -1)
		{
			rating = rating + 1
		}
		if (strIndexOf(part,"m_star_half_0.gif") != -1)
		{
			rating = rating + 0.5
		}
		i++
	}
	return rating;
}

function convertToSeconds(text)
{
	// how many ":" exists?
	var count = getTokenCount(text, ":");
	// get mins and seconds
	var h = new Number(h = count == 3 ? getToken(text, ":", 0) * 3600 : 0);
	var m = new Number(getToken(text, ":", count - 2) * 60);
	var s = new Number(getToken(text, ":", count - 1));
	// convert h:m:s to seconds
	return h + m + s;
}

function getVideoServiceIcon()
{
	return new Array(
		0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a,0x00,0x00,0x00,0x0d,0x49,0x48,0x44,0x52,
		0x00,0x00,0x00,0x10,0x00,0x00,0x00,0x10,0x08,0x03,0x00,0x00,0x00,0x28,0x2d,0x0f,
		0x53,0x00,0x00,0x00,0x66,0x50,0x4c,0x54,0x45,0x3d,0x88,0xe5,0x49,0x8f,0xe7,0x55,
		0x97,0xe8,0x61,0x9e,0xea,0x62,0x9e,0xea,0x6e,0xa6,0xec,0x7a,0xad,0xed,0x85,0xb5,
		0xee,0x86,0xb5,0xef,0x92,0xbc,0xf0,0x9e,0xc3,0xf2,0x9e,0xc4,0xf2,0xaa,0xcb,0xf4,
		0xb6,0xd2,0xf5,0xc2,0xda,0xf7,0xce,0xe1,0xf8,0xda,0xe9,0xfa,0xdb,0xe9,0xfa,0xe7,
		0xf0,0xfc,0xf3,0xf8,0xfd,0xff,0x66,0x00,0xff,0x70,0x10,0xff,0x79,0x20,0xff,0x8c,
		0x40,0xff,0x96,0x50,0xff,0x9f,0x60,0xff,0xb3,0x80,0xff,0xbc,0x8f,0xff,0xc6,0x9f,
		0xff,0xcf,0xaf,0xff,0xd9,0xbf,0xff,0xec,0xe0,0xff,0xf5,0xef,0xff,0xff,0xff,0x48,
		0xd7,0xaa,0x42,0x00,0x00,0x00,0x8c,0x49,0x44,0x41,0x54,0x18,0x19,0x05,0xc1,0x09,
		0x42,0xc2,0x30,0x14,0x05,0xc0,0x17,0x4a,0x2b,0x01,0x0a,0x4a,0x3e,0x54,0x71,0x9d,
		0xfb,0x5f,0xd2,0x99,0x60,0xf4,0x96,0x76,0x1c,0x40,0x18,0xfb,0xec,0xfa,0x69,0xda,
		0x0f,0x10,0x96,0x2c,0xe3,0x36,0xac,0x0b,0x88,0xd7,0xec,0xc6,0x5b,0x47,0xbf,0x42,
		0xf4,0x9c,0x2d,0xc3,0xb7,0x71,0x80,0x98,0x73,0x33,0xb3,0x3d,0x7e,0x4e,0x10,0x2d,
		0xec,0xd8,0xaa,0xde,0x7f,0x11,0x09,0xad,0xdb,0xaa,0xea,0xfe,0x49,0x24,0xf4,0xd8,
		0xaa,0xaa,0xea,0x43,0xcc,0xb9,0x19,0x93,0xad,0xaa,0x1e,0x5f,0xc4,0x21,0x2b,0x6c,
		0x75,0x7f,0x42,0xac,0x99,0x61,0x7b,0xfe,0xbd,0x40,0x8c,0x96,0x0b,0x38,0x1f,0x21,
		0x9c,0xd3,0x2e,0x58,0xdb,0x80,0xe0,0x90,0x4c,0xf3,0x94,0x0b,0x08,0x1c,0x5b,0xb2,
		0xbf,0x02,0xff,0xae,0x67,0x16,0x49,0x16,0x8a,0x4e,0x0f,0x00,0x00,0x00,0x00,0x49,
		0x45,0x4e,0x44,0xae,0x42,0x60,0x82);
}
