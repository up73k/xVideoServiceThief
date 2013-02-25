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
	this.version = "1.0.2";
	this.minVersion = "2.0.0a";
	this.author = "Xesc & Technology 2009";
	this.website = "http://www.yuvutu.com/";
	this.ID = "yuvutu.com";
	this.caption = "Yuvutu";
	this.adultContent = true;
	this.musicSite = false;
}

function getVideoInformation(url)
{
	
	http://www.yuvutu.com/modules.php?name=Video&op=view&video_id=324519&proceed=yes
	
	const URL_GET_HTML = "http://yuvutu.com/modules.php?name=Video&op=view&video_id=%1&name=Video&proceed=yes";
	// video information
	var result = new VideoDefinition();
	// get the video id
	var videoId = getUrlParam(url, "video_id");
	// get the html
	// download webpage
	var http = new Http();
	var html = http.downloadWebpage(strFormat(URL_GET_HTML, videoId));
	// get video title
	result.title = copyBetween(html, "<title>", " - ");
	// get the flv url
	result.URL = copyBetween(html, 'file=', '&'); //"&file=", "&");
	// return the video information
	return result;
}

function getVideoServiceIcon()
{
	return new Array(
		0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a,0x00,0x00,0x00,0x0d,0x49,0x48,0x44,0x52,
		0x00,0x00,0x00,0x10,0x00,0x00,0x00,0x10,0x08,0x06,0x00,0x00,0x00,0x1f,0xf3,0xff,
		0x61,0x00,0x00,0x01,0xf2,0x49,0x44,0x41,0x54,0x78,0xda,0xc5,0x93,0x5f,0x48,0x53,
		0x71,0x14,0xc7,0xef,0xc3,0x84,0x7c,0x8d,0x26,0x3d,0xf4,0x6f,0x10,0xd5,0x83,0x09,
		0x03,0x1f,0x84,0x22,0xf6,0x58,0x04,0x41,0xba,0x12,0x47,0x83,0x22,0xa8,0xac,0x2c,
		0x62,0xd1,0x43,0x28,0x84,0x4a,0x49,0xc1,0x1a,0x15,0xf3,0xa9,0x87,0xfe,0xcc,0x60,
		0x81,0x24,0x88,0x61,0x51,0xba,0x11,0xdb,0x1e,0x46,0x5d,0x17,0x26,0x15,0x35,0xad,
		0x65,0xb6,0x65,0x89,0x8c,0xf6,0xbb,0xbf,0xdd,0xfb,0xfb,0xc4,0xee,0x10,0x9f,0xb3,
		0x07,0xbf,0x2f,0x07,0xce,0x39,0x7c,0x0e,0xe7,0x7b,0x38,0x1a,0xff,0xa9,0xd5,0x01,
		0x64,0xdf,0x29,0x32,0xaf,0xac,0x95,0x01,0xde,0x26,0x2c,0xda,0x77,0x0b,0xee,0x5f,
		0x2d,0x57,0x01,0x7a,0xcc,0xe2,0x59,0xc4,0x64,0x6e,0x5a,0x01,0x30,0xfb,0x19,0x86,
		0x87,0xf2,0xf4,0x4f,0xdf,0x25,0x5a,0x88,0x22,0x94,0x40,0xa1,0x18,0xfd,0x35,0x4a,
		0xff,0x6c,0x98,0xde,0xee,0x0f,0xb4,0x6c,0x34,0xe8,0xf1,0x4b,0x52,0x4f,0x2d,0xb4,
		0xc1,0xb0,0x89,0xd7,0x55,0x22,0x1a,0xaa,0x12,0x1f,0xdd,0x30,0x39,0x50,0xff,0x0d,
		0xe7,0x83,0x46,0xd6,0x25,0xd7,0xa2,0x17,0x75,0x0a,0xb2,0xc0,0xce,0x74,0x3d,0x6b,
		0x9e,0xac,0x67,0xbf,0x47,0xa7,0xd5,0x25,0x69,0xdd,0x2a,0xb8,0xdc,0x6c,0xa0,0xcd,
		0x4c,0x29,0x4e,0x36,0x09,0xae,0xf8,0x0c,0x7e,0xe7,0xa1,0xeb,0xb0,0x41,0x7b,0x53,
		0x99,0xf3,0xe3,0x7d,0x68,0x71,0x8d,0xe0,0xd7,0x20,0x23,0xf3,0x23,0x38,0xe2,0x0e,
		0x7c,0xfa,0x51,0xee,0x5d,0x13,0xb4,0x6c,0x16,0x84,0xce,0x49,0xb2,0x93,0x0a,0xcd,
		0x94,0x70,0xb3,0x43,0x72,0xbc,0x51,0xf0,0x32,0x6a,0x72,0xcc,0x2d,0x08,0x9d,0xb1,
		0x78,0xbd,0x90,0xc1,0x99,0x70,0xe2,0xd1,0x3d,0xf8,0xa7,0xfc,0xd4,0xc4,0x6a,0x18,
		0x5e,0x18,0xe2,0xc5,0x00,0x34,0x6f,0x2a,0xf1,0xb0,0xaf,0xbc,0x6c,0x62,0x6c,0xd0,
		0xc2,0xb7,0x43,0x10,0xd8,0x67,0xd0,0xb6,0x5d,0x30,0xf6,0xd8,0xc2,0x44,0xe2,0x9d,
		0xf4,0xe2,0x88,0x39,0xa8,0x8d,0xd7,0xe2,0x4e,0xbb,0x99,0x57,0x05,0x9e,0x0f,0xa8,
		0x0a,0x60,0xd9,0x44,0x80,0x7c,0x4e,0xd1,0xe1,0x31,0xec,0xc2,0xe9,0x3d,0x82,0xb9,
		0x19,0x05,0x40,0xe4,0x47,0xc4,0x06,0x68,0x63,0x1a,0x9d,0xd9,0x4e,0x96,0x86,0x79,
		0xb7,0x94,0xb8,0x7e,0x42,0xda,0x17,0xb1,0x01,0x4a,0x41,0xf8,0x52,0x99,0x83,0x1b,
		0x4a,0xdc,0xba,0x20,0xb1,0x4c,0x6c,0xe5,0x8c,0x1c,0x0d,0xe9,0x06,0xea,0x12,0x75,
		0x24,0x17,0x93,0x00,0x7c,0xca,0x28,0x4e,0xed,0x12,0x15,0x13,0xed,0xa8,0x55,0x9a,
		0xff,0x14,0xe1,0x76,0x40,0x72,0xc8,0x55,0xb2,0x27,0x2c,0x49,0xa1,0x98,0x28,0x4e,
		0x90,0x5a,0x4c,0x61,0x28,0xa3,0x9a,0xb3,0xe0,0xa3,0xae,0x6c,0xbf,0xde,0x8c,0x5b,
		0x68,0x5f,0xde,0x2b,0xba,0x8f,0x48,0xda,0xb6,0x09,0x02,0x7b,0x0d,0x7e,0x7e,0xe7,
		0x9f,0xa4,0x55,0x4e,0x77,0xe7,0xa2,0x24,0x78,0xd6,0xde,0x69,0x65,0xbf,0x60,0x96,
		0xc1,0x32,0x57,0xe9,0x1b,0xff,0x02,0xfe,0xc2,0x7f,0x69,0x05,0xda,0xab,0xd1,0x00,
		0x00,0x00,0x00,0x49,0x45,0x4e,0x44,0xae,0x42,0x60,0x82);
}