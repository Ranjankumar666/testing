// Scenario 3:
// 1. Navigate to https://www.apollopharmacy.in/
// 2. Mouse hover on Apollo products and click the Skin care in Personal Care.
// 3. Select any one product and click the product to print and verify the Product name, cut
// off MRP, current MRP by using assertions
// 4. Click on add to cart.
// 5. Click on View cart.
// 6. Verify the cart total, Discount on MRP

const {
	openBrowser,
	goto,
	textBox,
	into,
	write,
	$,
	click,
	link,
	below,
	toRightOf,
	dropDown,
	radioButton,
	button,
	tableCell,
	closeBrowser,
	hover,
	scrollTo,
} = require('taiko');
const assert = require('assert');
(async () => {
	await openBrowser();
	await goto('https://www.apollopharmacy.in/');
	await hover(link('Apollo Products'));
	await click(link('Skin Care'));

	// clicking on product
	await click(
		$(`//*[@id="__next"]/div[2]/div[2]/div/div/div[2]/div[3]/div/div[1]`)
	);

	let actualProductName = await $(
		`/html/body/div[2]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[2]/div/h1`
	).text();
	assert.equal(
		actualProductName,
		'Apollo Life Premium Citrus Refreshing Wet Wipes, 60 (2 X 30) Count'
	);

	let actualCurrentMRP = await $(
		`//*[@id="PDP price banner"]/div/div/div[1]/div[1]/div/p[1]`
	).text();
	assert.equal(actualCurrentMRP, '₹100*');

	let actualCutOffMRP = await $(
		`//*[@id="PDP price banner"]/div/div/div[1]/div[1]/div/p[2]`
	).text();
	assert.equal(actualCutOffMRP, 'MRP ₹160');

	await scrollTo('Add to Cart');
	await click('Add To Cart');
	await click('View Cart');

	let actualTotal = await $(
		`//*[@id="__next"]/div[2]/div/div/div/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/p[2]/span`
	).text();
	assert.equal(actualTotal, '₹160');

	let actualDiscount = await $(
		`//*[@id="__next"]/div[2]/div/div/div/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/p[2]`
	).text();
	assert.equal(actualDiscount, '- ₹60');
})();
