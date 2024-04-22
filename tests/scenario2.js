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
	waitFor,
} = require('taiko');

const crypto = require('crypto');
const assert = require('assert');

(async () => {
	const phone = Math.floor(Math.random() * 10000000000);
	const name = crypto.randomBytes(6).toString('base64');
	name[0] = name[0].toUpperCase();
	const lname = crypto.randomBytes(6).toString('base64');
	lname[0] = lname[0].toUpperCase();

	await openBrowser();
	await goto('https://healthapp.yaksha.com', {
		navigationTimeout: 1000000,
	});

	await write('admin', into(textBox('Username')));
	await write('pass123', into(textBox('Password')));

	await click(button(), { force: true });

	await click(link('Patient'));
	await click(link('Register Patient'));

	await write(phone, into(textBox({ placeholder: 'phone number' })));
	await dropDown(toRightOf('Country')).select(2);
	await dropDown(toRightOf('Gender')).select(1);

	await write(lname, into(textBox({ placeholder: 'Last Name' })));
	await write(32, into(textBox({ placeholder: 'Age' })));
	await write(name, into(textBox({ placeholder: 'First Name' })));

	await scrollUp();
	await focus($('//input[@value="Register Patient"]'));
	await click($('//input[@value="Register Patient"]'), { force: true });
	await waitFor(200);
	await write(name + ' ' + lname, into(textBox('Search')));
	await waitFor(200);
	assert.ok(await $(`//div[text()=${name} ${lname}`));

	// focus(link("Address"));
	// await click(link("Address"));
	// await write("Mumbai", into(textBox(toRightOf("City"))));
	// await write("Thane", into(textBox(toRightOf("Street 1"))));
	// await click($('//input[@value="Add Address"]'));

	// // focus(link("Guarantor"))
	// await click(link("Guarantor"));
	// await write("Father", into(textBox(toRightOf("Relationship With Patient"))));
	// await write("James Sully", into(textBox({
	//     placeholder: "Name"
	// })));
	// await click($('//input[@value="Save"]'));

	// alert(async() => await accept());

	// focus(link("Insurance"));
	// await click(link("Insurance"));
	// await write("Reliance");
	// await write("")

	// focus(link("Kin/Emergency Contact"));
	// await click(link("Kin/Emergency Contact"));
	// await checkBox("Kin")
	// await write("James", into(textBox({
	//     placeholder: "First Name"
	// })));
	// await write("Sully", into(textBox({
	//     placeholder: "Last Name"
	// })));
	// await write("Father", into(textBox({
	//     placeholder: "Relationship"
	// })) );
	// await click(button("Add"));
})();
