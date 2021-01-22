import isEmpty from 'is-empty';
import Validator from 'validator';
import axios, { AxiosResponse } from 'axios';

interface errors {
	email: string;
	password: string;
}

export const humanize = (str: string) => {
	var i,
		frags = str.split('_');
	for (i = 0; i < frags.length; i++) {
		frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
	}
	return frags.join(' ');
};
export const snake_case = (str: string) => {
	return str.toLowerCase().split(' ').join('_');
};
export const toCapitlize = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

export const format_date = (unformatted_date: string) => {
	// console.log({ unformatted_date });
	const month = unformatted_date.slice(5, 7);
	const day = unformatted_date.slice(8, 10);
	const year = unformatted_date.slice(0, 4);
	const formatted_date = `${month}/${day}/${year}`;
	return formatted_date;
};
export const format_time = (unformatted_time: any) => {
	let hour = unformatted_time.slice(11, 13);
	// let hour_int = parseInt(hour);
	// hour = (hour_int + 11) % 12 + 1;
	const minute = unformatted_time.slice(14, 16);
	const second = unformatted_time.slice(17, 19);
	const formatted_time = `${hour}:${minute}:${second}`;
	return formatted_time;
};

export const unformat_date = (formatted_date: string) => {
	// console.log({ formatted_date });
	const date = formatted_date.split('/');
	const day = date[1];
	const month = date[0];
	const year = date[2];
	const unformat_date = `${year}-${month}-${day}`;
	return unformat_date;
};

export const occurrence = function(array: any) {
	'use strict';
	// console.log(array);
	var result: any = {};
	if (array instanceof Array) {
		// Check if input is array.
		for (let i of array) {
			i.orderItems.forEach(function(v: any, i: any) {
				if (!result[v.product]) {
					// Initial object property creation.
					result[v.product] = [ i ]; // Create an array for that property.
				} else {
					// Same occurrences found.
					result[v.product].push(i); // Fill the array.
				}
			});
		}
	}

	return result;
};

const diffuser_cap_colors = [
	{ color: 'Black', price: 11.99 },
	{ color: 'White', price: 15.99 },
	{ color: 'Red', price: 15.99 },
	{ color: 'Green', price: 15.99 },
	{ color: 'Blue', price: 15.99 },
	{ color: 'Violet', price: 15.99 },
	{ color: 'Purple', price: 15.99 }
];
const diffuser_colors = [
	{ color: 'Translucent White', price: 11.99 },
	{ color: 'Red', price: 11.99 },
	{ color: 'Green', price: 11.99 },
	{ color: 'Blue', price: 11.99 },
	{ color: 'Violet', price: 11.99 },
	{ color: 'Purple', price: 11.99 }
];

export const determine_price = (diffuser_cap_color: any, diffuser_cap: any) => {
	console.log(diffuser_cap_color);
	console.log(diffuser_cap);
	let price: any = 11.99;
	if (diffuser_cap) {
		price = diffuser_cap_colors.filter((cap_color: any) => {
			return cap_color.color === diffuser_cap_colors;
		});
	} else {
		price = diffuser_colors.filter((cap_color: any) => {
			return cap_color.color === diffuser_cap_colors;
		});
	}
	return price;
};

// export const hsvToRgb = (h, s, v) => {
// 	var r, g, b;

// 	var i = Math.floor(h * 6);
// 	var f = h * 6 - i;
// 	var p = v * (1 - s);
// 	var q = v * (1 - f * s);
// 	var t = v * (1 - (1 - f) * s);

// 	switch (i % 6) {
// 		case 0:
// 			(r = v), (g = t), (b = p);
// 			break;
// 		case 1:
// 			(r = q), (g = v), (b = p);
// 			break;
// 		case 2:
// 			(r = p), (g = v), (b = t);
// 			break;
// 		case 3:
// 			(r = p), (g = q), (b = v);
// 			break;
// 		case 4:
// 			(r = t), (g = p), (b = v);
// 			break;
// 		case 5:
// 			(r = v), (g = p), (b = q);
// 			break;
// 	}

// 	return [ r * 255, g * 255, b * 255 ];
// };

export const hslToHex = (h: any, s: any, l: any) => {
	// console.log(h);
	h /= 360;
	s /= 100;
	l /= 100;
	let r, g, b;
	if (s === 0) {
		r = g = b = l; // achromatic
	} else {
		const hue2rgb = (p: any, q: any, t: any) => {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		};
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}
	const toHex = (x: any) => {
		const hex = Math.round(x * 255).toString(16);
		return hex.length === 1 ? '0' + hex : hex;
	};
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const state_names = [
	'Alabama',
	'Alaska',
	'American Samoa',
	'Arizona',
	'Arkansas',
	'Armed Forces Pacific',
	'Armed Forces Europe',
	'Armed Forces America',
	'California',
	'Colorado',
	'Connecticut',
	'Delaware',
	'District of Columbia',
	'Federated States of Micronesia',
	'Florida',
	'Georgia',
	'Guam',
	'Hawaii',
	'Idaho',
	'Illinois',
	'Indiana',
	'Iowa',
	'Kansas',
	'Kentucky',
	'Louisiana',
	'Maine',
	'Marshall Islands',
	'Maryland',
	'Massachusetts',
	'Michigan',
	'Minnesota',
	'Mississippi',
	'Missouri',
	'Montana',
	'Nebraska',
	'Nevada',
	'New Hampshire',
	'New Jersey',
	'New Mexico',
	'New York',
	'North Carolina',
	'North Dakota',
	'Northern Mariana Islands',
	'Ohio',
	'Oklahoma',
	'Oregon',
	'Palau',
	'Pennsylvania',
	'Puerto Rico',
	'Rhode Island',
	'South Carolina',
	'South Dakota',
	'Tennessee',
	'Texas',
	'Utah',
	'Vermont',
	'Virgin Island',
	'Virginia',
	'Washington',
	'West Virginia',
	'Wisconsin',
	'Wyoming'
];

export const print_invoice = (order: any) => {
	const mywindow: any = window.open('', 'PRINT', 'height=600,width=800');

	mywindow.document.write(` <!doctype html>
  <html>
  
  <head>
    <meta charset="utf-8">
  
  </head>
  
  <body>
    <div class="invoice-box"
      style="display: flex; flex-direction: column; max-width: 300px; margin: auto;  font-size: 8px; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; color: #black;">
      <table cellpadding="0" cellspacing="0" style="width: 100%; line-height: inherit; text-align: left;" width="100%"
        align="left">
        <tr class="top">
          <td colspan="2" style=" vertical-align: top;" valign="top">
            <table style="width: 100%; line-height: inherit; text-align: left;" width="100%" align="left">
              <tr>
                <td class="title"
                  style="vertical-align: top;   line-height: 45px; color: #333; "
                  valign="top">
                  <img src="https://images2.imgbox.com/cd/00/K5HGEKDJ_o.png"
                    style="width:100px; margin-left: -5px;">
                </td>
  
                <td style=" vertical-align: top; text-align: right; " valign="top"
                  align="right">
                  Invoice #: ${order._id}<br>
                  Created: ${format_date(order.createdAt)}<br>
                </td>
              </tr>
            </table>
          </td>
        </tr>
  
        <tr class="information">
          <td colspan="2" style="vertical-align: top;" valign="top">
            <table style="width: 100%; line-height: inherit; text-align: left;" width="100%" align="left">
              <tr>
                <td style="vertical-align: top;" valign="top">
                  Glow LEDs<br>
                  404 Kenniston Dr<br>
                  Austin, TX 78752<br>
                  info.glowleds@gmail.com
                </td>
  
                <td style=" vertical-align: top; text-align: right;" valign="top"
                  align="right">
                  ${order.shipping.first_name} ${order.shipping.last_name}<br>
                  ${order.shipping.address_1} ${order.shipping.address_2}<br>
                  ${order.shipping.city}, ${order.shipping.state} ${order.shipping.postalCode}<br>
                  ${order.shipping.email}
                </td>
              </tr>
            </table>
          </td>
        </tr>
  
        <tr class="heading">
          <td
            style="padding: 5px; vertical-align: top; background: #eee; border-bottom: 1px solid #ddd; font-weight: bold;"
            valign="top">
            Payment Method
          </td>
  
          <td
            style="padding: 5px; vertical-align: top; text-align: right; background: #eee; border-bottom: 1px solid #ddd; font-weight: bold;"
            valign="top" align="right">
            Last 4
          </td>
        </tr>

        <tr class="details">
        <td style="padding: 5px; vertical-align: top; border-bottom: 1px solid #eee;" valign="top">
        ${order.payment.charge ? order.payment.charge.source.brand : ''} 
        </td>

        <td style="padding: 5px; vertical-align: top; text-align: right; border-bottom: 1px solid #eee;" valign="top"
          align="right">
          ${order.payment.charge ? order.payment.charge.source.last4 : ''}
        </td>
      </tr>
  
     
  
        <tr class="heading">
          <td
            style="padding: 5px; vertical-align: top; background: #eee; border-bottom: 1px solid #ddd; font-weight: bold;"
            valign="top">
            Item
          </td>
  
          <td
            style="padding: 5px; vertical-align: top; text-align: right; background: #eee; border-bottom: 1px solid #ddd; font-weight: bold;"
            valign="top" align="right">
            Price
          </td>
        </tr>
        ${order.orderItems
			.map((item: any) => {
				let item_item = `<tr class="item">
          <td style="padding: 5px; vertical-align: top; border-bottom: 1px solid #eee;" valign="top">
          ${item.qty}x - ${item.category === 'diffuser_caps' ||
				item.category === 'mega_diffuser_caps' ||
				item.category === 'frosted_diffusers'
					? `${item.diffuser_cap_color} -`
					: ''}
        ${item.name}
        ${item.secondary_product ? `w (${item.secondary_product.name})` : ''}
          </td>
  
          <td style="padding: 5px; vertical-align: top; text-align: right; border-bottom: 1px solid #eee;" valign="top"
            align="right">
            $${item.price.toFixed(2)}
          </td>
        </tr>`;
				return item_item;
			})
			.join('')}
  
     
      </table>
      <div class="total" style=" width: 100%;">
        <div style="vertical-align: top;" valign="top"></div>
        <div style="display: flex; flex-direction: column; justify-content: flex-end; padding-right: 9px;">
        

        <div style="padding: 5px; vertical-align: top; text-align: right;      width: 100%;"
        valign="top" align="right">
        Tax: $${order.taxPrice.toFixed(2)}
      </div>
        <div style="padding: 5px; vertical-align: top; text-align: right;     width: 100%; "
          valign="top" align="right">
          Shipping: $${order.shippingPrice.toFixed(2)}
        </div>

       
        <div style=" vertical-align: top; width: 25%;margin-left: auto;border-top: 1px solid #eee;" valign="top"></div>
        <div style="padding: 5px; vertical-align: top; text-align: right;     width: 100%; font-weight: bold;"
          valign="top" align="right">
          Total: $${order.totalPrice.toFixed(2)}
        </div>
      </div>
    </div>
    <div>
      <h3 style="text-align: center;">Welcome to the Glow LEDs family!</h3>
      <div style="text-align: center; ">We are so happy to share our art with you.</div>
      <div style="text-align: center; ">The code below will take you to our <strong>FAQ page</strong> for all kinds of helpful information.</div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
      <div style="text-align: center; width: 125px;">
        <div style="text-align: center; "><strong>Facebook</strong></div> 
        <div style="text-align: center; ">@GlowLEDsOfficial</div>
        </div> 
        <img src="/images/optimized_images/logo_images/Glow_LEDs_Frequently_Asked_Questions_Page.png" style="width:75px; text-align:center;">
        <div style="text-align: center; width: 125px;">
        <div style="text-align: center; "><strong>Instagram</strong></div> 
        <div style="text-align: center; ">@glow_leds</div>
        </div> 
      </div>
      <div style="text-align: center; "><strong>Tag us in your videos and pictures!</strong></div>
      
      
      <div style="text-align: center; ">We want to feature you!</div>
      <div style="text-align: center; ">We are figuring this out as we go so any feedback is welcome.</div>
      <div style="text-align: center; ">We appreciate you more than you know.</div>
      <div style="text-align: center; "><strong>Questions or concerns?:</strong> info.glowleds@gmail.com</div>
    </div>
    </div>
    
  </body>
  
  </html>`);

	mywindow.document.close(); // necessary for IE >= 10
	mywindow.focus(); // necessary for IE >= 10*/

	mywindow.print();
	// mywindow.close();

	return true;
};
