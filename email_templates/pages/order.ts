export default (props: any) => {
	const format_date = (unformatted_date: any) => {
		const month = unformatted_date.slice(5, 7);
		const day = unformatted_date.slice(8, 10);
		const year = unformatted_date.slice(0, 4);
		const formatted_date = `${month}/${day}/20`;
		return formatted_date;
	};

	const determin_card_logo = (card_type: string) => {
		switch (card_type) {
			case 'American Express':
				return `<i class="fab fa-cc-amex" />`;
			case 'Visa':
				return `<i class="fab fa-cc-visa" />`;
			case 'Mastercard':
				return `<i class="fab fa-cc-mastercard" />`;
			case 'Discover':
				return `<i class="fab fa-cc-discover" />`;
		}
	};
	return `
 
  <div style="display:flex;justify-content:center;background-color:#5f5f5f;flex-direction:column color:white;">
    <div style="margin:auto">
      <div style="max-width:600px;line-height:30px;margin:15px;display:flex;flex-direction:column; color:white;">
        <p>Hi ${props.shipping
			.first_name}, we&#x27;re getting your order ready to be shipped. We will notify you when it has been sent.</p>
        <div style="display:flex;flex-direction:row;align-items:center">
          <div style="display:flex;justify-content:center"><a
              href="https://www.glow-leds.com/account/login?redirect=/secure/account/order/5f74a250290441002a36d078"
              alt="discount image"
              style="background-color:#4c4f60;color:white;border-radius:10px;border:0;padding:15px">
              <h4 style="font-family:helvetica;margin:0;font-size:1.2em;text-align:center">View your Order</h4>
            </a></div>
          <div style="margin:0px 10px">or</div>
          <div style="display:flex;justify-content:center"><a href="https://www.glow-leds.com/collections/all/products"
              alt="discount image" style="color:white;border:0;font-size:13px;padding:10px">
              <h4 style="font-family:helvetica;margin:0;font-size:1.2em;text-align:center">Visit our Store</h4>
            </a></div>
        </div>
        <div style="border-bottom:1px solid #ddd;padding-bottom:20px"></div>
        <table cellPadding="0" cellSpacing="0" style="width:100%;line-height:inherit;text-align:left" width="100%"
          align="left">
          <tbody>
            <tr>
              <td colSpan="2" style="vertical-align:top" valign="top">
                <table style="width:100%;line-height:inherit;text-align:left" width="100%" align="left">
                  <tbody style="color:white;">
                    <tr style="color:white;">
                      <td style="vertical-align:top;line-height:45px;color:white;" valign="top"></td>
                      <td style="vertical-align:top;text-align:right color:white;" valign="top" align="right">Order #:
                      ${props._id}<br />Created: ${format_date(props.createdAt)}<br /></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <h4 style="font-family:helvetica;width:100%;margin:0 auto;line-height:50px;color:white;font-size:1.3em">
              Order Summary</h4>
              ${props.orderItems.map((item: any) => {
					let item_item = `<tr>
              <td style="color:white; padding:20px 0;vertical-align:top;border-bottom:1px solid #eee" valign="top">${item.qty}x - ${item.category ===
						'diffuser_caps' ||
					item.category === 'mega_diffuser_caps' ||
					item.category === 'frosted_diffusers'
						? item.diffuser_cap_color
						: ''}
                - ${item.name}
                ${item.diffuser_cap_name ? `w (${item.diffuser_cap_name})` : ''}</td>
              <td style="color:white;padding:20px 0;vertical-align:top;text-align:right;border-bottom:1px solid #eee" valign="top"
                align="right">$${item.price ? item.price.toFixed(2) : item.price}</td>
            </tr>`;
					return item_item;
				})}
          </tbody>
        </table>
        <table style="width:100%;line-height:inherit;text-align:right; color:white;" width="100%" align="right">
          <tbody>
            <tr>
              <td style="vertical-align:top;width:40%;text-align:left;color:white;" valign="top"></td>
              <td style="vertical-align:top;width:30%;text-align:left;color:white;" valign="top">
                Subtotal<br />Tax<br />Shipping<br /><br />
                <div style="color:white;">Total</div>
              </td>
              <td style="vertical-align:top;width:20% color:white;" valign="top">$${props.itemsPrice.toFixed(
					2
				)}<br />$${props.taxPrice.toFixed(2)}<br />$${props.shippingPrice.toFixed(2)}<br /><br />
                <div style="font-size:30px;font-weight:800">$${props.totalPrice.toFixed(2)}</div>
              </td>
            </tr>
          </tbody>
        </table>
        <div style="vertical-align:top;width:40%;text-align:right" valign="top" align="right"></div>
        <table cellPadding="0" cellSpacing="0" style="width:100%;line-height:inherit;text-align:left" width="100%"
          align="left">
          <tbody>
            <tr style="display:flex;flex-wrap:wrap;border:0">
              <td style="vertical-align:top;width:50%;max-width:320px" valign="top">
                <table style="width:100%;line-height:inherit;text-align:left" width="100%" align="left">
                  <tbody>
                    <tr>
                      <td style="vertical-align:top;width:50%" valign="top">
                        <h4
                          style="font-family:helvetica;width:100%;margin:0 auto;line-height:50px;color:white;font-size:1.3em">
                          Customer Information</h4>
                      </td>
                    </tr>
                    <tr>
                      <td style="vertical-align:top;width:50%" valign="top">
                        <h4
                          style="font-family:helvetica;width:100%;margin:0 auto;color:white;font-size:1em;padding:10px 0">
                          Shipping Address</h4>
                      </td>
                    </tr>
                    <tr>
                      <td style="vertical-align:top;width:50%; color:white;" valign="top">${props.shipping
							.first_name} ${props.shipping.last_name}<br />${props.shipping.address_1} ${props.shipping.address_2}<br />${props.shipping
		.city}, ${props.shipping.state}
                      ${props.shipping.postalCode} ${props.shipping.country}<br />${props.shipping.email}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td style="vertical-align:top" valign="top">
                <table style="width:100%;line-height:inherit;text-align:left" width="100%" align="left">
                  <tbody>
                    <tr>
                      <td style="vertical-align:top" valign="top">
                        <h4
                          style="font-family:helvetica;width:100%;margin:0 auto;color:white;font-size:1em;padding:10px 0;margin-top:50px">
                          Payment Method</h4>
                      </td>
                    </tr>
                    <tr style="color:white;">
                      <td style="vertical-align:top" valign="top">
                        <div
                          style="padding:5px;vertical-align:top;text-align:right;width:100%;display:flex;align-items:center">
                          <div style="font-size:40px;margin-right:11px; color:white;">${determin_card_logo(
								props.token.card.brand
							)}</div>ending with
                          ${props.token.card.last4} <div style="margin:0 10px; color:white;">-</div>
                          <div style="padding:5px;vertical-align:top;font-weight:bold" valign="top" align="right; color:white;">$${props.totalPrice.toFixed(
								2
							)}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
      
    
	`;
};
