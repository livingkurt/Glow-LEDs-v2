import React from 'react';
import { Switch, Route } from 'react-router';

export default (
	// Switch is added in v4 react-router
	<Switch>
		<Route path="/account/login" />
		<Route path="/account/verified/:id" />
		<Route path="/account/checkemail" />
		<Route path="/account/emailsent" />
		<Route path="/account/changepassword" />
		<Route path="/account/register" />
		<Route path="/account/passwordreset" />
		<Route path="/account/resetpassword/:id" />
		<Route path="/checkout/decision" />
		<Route path="/checkout/placeorder" />
		<Route path="/checkout/shipping" />
		<Route path="/checkout/paymentacccountcomplete/:id" exact={true} />
		<Route path="/checkout/paymentcomplete/:id" exact={true} />
		<Route path="/checkout/cart/:pathname?" />
		<Route path="/collections/all/products" exact={true} />
		<Route path="/collections/all/products/category/:category/subcategory/:subcategory?" />
		<Route path="/collections/all/products/category/:category" />
		<Route path="/collections/all/products/:pathname" />
		<Route path="/checkout/order/receipt/:id/:status/:send?" />
		<Route path="/pages/contact/:reason" exact={true} />
		<Route path="/pages/glowcontrol" />
		<Route path="/pages/terms" exact={true} />
		<Route path="/pages/menu/:pathname" exact={true} />
		<Route path="/pages/about" exact={true} />
		<Route path="/pages/faq" exact={true} />
		<Route path="/pages/sitemap" exact={true} />
		<Route path="/pages/featured" exact={true} />
		<Route path="/pages/music" exact={true} />
		<Route path="/" exact={true} />
		<Route path="/pages/track_your_order" exact={true} />
		<Route path="/checkout/order/:id" exact={true} />
		<Route path="/pages/announcements" exact={true} />
		<Route />
	</Switch>
);
