import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const google_sheets_json = require('./glow-leds-0e697a43198d.json');

const google_catalog_upload = async () => {
	google_sheets_json.private_key = process.env.GOOGLE_SHEETS_PRIVATE;
	try {
		const { GoogleSpreadsheet } = require('google-spreadsheet');

		// spreadsheet key is the long id in the sheets URL
		// const doc = new GoogleSpreadsheet('1qf9xryR0EPOCD0YkFQXqYioAxJRfWg6QFpdFwFTpErg');
		const doc = new GoogleSpreadsheet('1V9vSROcN0RA-OFRGOIbvt_raXh3ZG2BYDY9DSOudaqU');

		// use service account creds
		// await doc.useServiceAccountAuth({
		//   client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
		//   private_key: process.env.GOOGLE_PRIVATE_KEY,
		// });
		// OR load directly from json file if not in secure environment
		await doc.useServiceAccountAuth(google_sheets_json);
		// OR use service account to impersonate a user (see https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority)
		// await doc.useServiceAccountAuth(require('./creds-from-google.json'), 'some-user@my-domain.com');
		// OR use API key -- only for read-only access to public sheets
		// doc.useApiKey('YOUR-API-KEY');

		await doc.loadInfo(); // loads document properties and worksheets
		// console.log(doc.title);
		// await doc.updateProperties({ title: 'KYEO FB Product Sheet' });

		const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

		await sheet.clear();
		await sheet.setHeaderRow([
			'id',
			'title',
			'description',
			'link',
			'condition',
			'price',
			'availability',
			'image_link',
			'mpn',
			'brand',
			'google_product_category',
			'sale_price',
			'sale_price_effective_date'
		]);
		const { data } = await axios.get('https://www.glow-leds.com/api/products/shown');

		const new_rows = data.map((product: any, i: number) => {
			const id = product._id;
			const title = product.name;
			const description = product.description;
			const availability = 'In Stock';
			const condition = 'New';
			const price = product.price + ' USD';
			const link = 'https://www.glow-leds.com/collections/all/products/' + product.pathname;
			const image_link = product.images[0];
			const brand = 'Glow LEDs';
			const mpn = product.pathname;
			const google_product_category = 'Toys & Games > Toys > Visual Toys';
			const sale_price = product.sale_price + ' USD';
			const sale_price_effective_date = '';

			return {
				id,
				title,
				description,
				link,
				condition,
				price,
				availability,
				image_link,
				mpn,
				brand,
				google_product_category,
				sale_price,
				sale_price_effective_date
			};
		});

		await sheet.addRows(new_rows);
		await sheet.saveUpdatedCells();
		// adding / removing sheets
		// const newSheet = await doc.addSheet({ title: 'hot new sheet!' });
		// await newSheet.delete();
	} catch (error) {
		console.log({ error });
	}
};

google_catalog_upload();
