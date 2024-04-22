const {
	textBox,
	openBrowser,
	goto,
	into,
	click,
	$,
	link,
	button,
	write,
	toLeftOf,
	toRightOf,
	dropDown,
	text,
	scrollUp,
	checkBox,
	accept,
	fileField,
} = require('taiko');
const path = require('path');
const assert = require('assert');

(async () => {
	await openBrowser();
	await goto('https://healthapp.yaksha.com', {
		navigationTimeout: 1000000,
	});

	await write('admin', into(textBox('Username')));
	await write('pass123', into(textBox('Password')));

	await click(button(), { force: true });

	await click(link('Patient'));
	await click(link('Register Patient'));

	await click($('//a[@title="Profile Picture"]'));
	await click(button('New Photo'));

	const exitsFileField = fileField({
		id: 'fileFromLocalDisk',
	}).exists();

	if (exitsFileField)
		assert.ok(
			await attach(
				path.join(__dirname, '2356.5351842648074.jpg'),
				fileField({ id: 'fileFromLocalDisk' }),
				{
					force: true,
				}
			)
		);
	assert.ok(await click(button('Done')));
	await closeBrowser();
})();
