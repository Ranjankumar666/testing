/* globals gauge*/
'use strict';
const path = require('path');
const {
	openBrowser,
	closeBrowser,
	goto,
	write,
	textBox,
	button,
} = require('taiko');
const assert = require('assert');
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
	await openBrowser({
		headless: headless,
		
	});
});

afterSuite(async () => {
	await closeBrowser();
});

// Return a screenshot file name
gauge.customScreenshotWriter = async function () {
	const screenshotFilePath = path.join(
		process.env['gauge_screenshots_dir'],
		`screenshot-${process.hrtime.bigint()}.png`
	);

	await screenshot({
		path: screenshotFilePath,
	});
	return path.basename(screenshotFilePath);
};

step('Visit the login page', async function () {
	await goto('https://healthapp.yaksha.com/');
});
step('Enters the valid <arg0> and <arg1>', async function (username, password) {
	await write(username, into(textBox({ placeholder: 'Username' })));
	await write(password, into(textBox({ placeholder: 'Password' })));
});
step('Submits the credentials', async function () {
	await click(button('Sign In'));
	await waitFor(300);
});
step('Redirects to Homepage', async function () {
	assert.ok(await link('Patient'));
});
