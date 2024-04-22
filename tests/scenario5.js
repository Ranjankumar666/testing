// Scenario 5:
// 1. Navigate to the YAKSHA Health App: Go to https://healthapp.yaksha.com/
// 2. Enter Login Credentials: In the designated fields, enter your username and
// password.
// 3. Log In: Click the "Login" button.
// 4. Access Patient Registration: On the left sidebar, click the "Patient" link.
// 5. Register a New Patient: Click the "Register Patient" button and fill out all the
// required fields, including dropdowns, text boxes, checkboxes, and radio buttons.
// 6. Verify Patient Details: Once you've filled in all the information, click "Register
// Patient" and then verify that the details are available in the patient list or not.
// 7. Click on the appointment link in the sidebar.
// 8. Focus on the registered patient's name in the list, then click on "check-in."
// 9. Fill in the Visit Information details and click on "Print Invoice."
// 10. Click on "Confirm" in the popup dialogue.
// 11. Verify if the printed receipt is available or not and take a screenshot

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
	focus,
	near,
	timeField,
	screenshot,
} = require('taiko');

const crypto = require('crypto');
const assert = require('assert');

(async () => {
	const phone = Math.floor(Math.random() * 10000000000);
	const name = crypto.randomBytes(6).toString('base64');
	name[0] = name[0].toUpperCase();
	const lname = crypto.randomBytes(6).toString('base64');
	lname[0] = lname[0].toUpperCase();
	const date = new Date();
	date.setDate(date.getDate() + 1);

	await openBrowser();
	await goto('https://healthapp.yaksha.com');

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

	await click(link('Appointment'));
	await click($('//h5[contains(text(), "New-1 ")]'));
	await write(name + ' ' + lname, into(textBox('Search')));
	await waitFor(200);
	await click(link('Check In'));
	await write('Dental', into(textBox(toRightOf('Department'))));
	await write('Dr. pooja Mishra', into(textBox({ id: 'doctorName' })));
	await timeField(toRightOf('Visit Date')).select(date);
	await click($('//input[@id="btnPrintInvoice"]'));
	await click(button('Confirm'));
	assert.ok(await click(button('Print Receipt')));
	await screenshot();
})();
