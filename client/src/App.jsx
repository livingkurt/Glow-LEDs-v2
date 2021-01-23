import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import {
	HomePage,
	AllProductsPage,
	ProductPage,
	CartPage,
	LoginPage,
	RegisterPage,
	ProductsPage,
	ShippingPage,
	PlaceOrderPage,
	OrderPage,
	ProfilePage,
	OrdersPage,
	ContactPage,
	MyOrdersPage,
	Four04Page,
	EditProfilePage,
	EditProductPage,
	PasswordResetPage,
	VerifiedPage,
	CheckEmailPage,
	ChangePasswordPage,
	TermsPage,
	AboutPage,
	UsersPage,
	FAQPage,
	UserProfilePage,
	EditUserPage,
	SitemapPage,
	ControlPanelPage,
	FeaturedPage,
	ExpensesPage,
	EditExpensePage,
	EditFeaturePage,
	FeaturesPage,
	EmailSentPage,
	EditPromoPage,
	EditAffiliatePage,
	PromosPage,
	AffiliatesPage,
	EditOrderPage,
	EditCartPage,
	CartsPage,
	ContentsPage,
	EditContentPage,
	GlowControlPage,
	GlowControlHomePage,
	EditDevicePage,
	MusicPage,
	EditEmailPage,
	EmailsPage,
	LogsPage,
	GuestDecisionPage,
	PlaceOrderPublicPage,
	MenuPage,
	ResetPasswordPage,
	ProductsDisplayPage,
	UserOrdersPage,
	TrackOrderPage,
	OrderPublicPage,
	AnnouncementsPage,
	EditAllDataPage,
	AllFeaturesPage,
	SubmitFeaturePage,
	SubmissionComplete,
	EditUserAffiliatePage,
	AffiliateCreationComplete
} from './pages/index';
import { Header, Container, Content, Footer, Sidebar } from './components/ContainerComponents/index';
import { useSelector } from 'react-redux';

import { AdminRoute, PrivateRoute } from './components/RouteComponents';
import { ScrollToTop } from './components/UtilityComponents';
import DevicesPage from './pages/PrivatePages/DevicesPage';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import {
	AccountCreatedEmail,
	AnnouncementEmail,
	InvoiceEmail,
	OrderEmail,
	OrderStatusEmail,
	PasswordChangedEmail,
	ResetPasswordEmail,
	ReviewEmail
} from './components/EmailComponents';
import { Helmet } from 'react-helmet';

import { setCurrentUser, logout } from './actions/userActions';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import store from './store';

const App = () => {
	const theme_colors = {
		footer: '#333333',
		header: '#333333',
		content: 'linear-gradient(180deg, #8a8a8a 0%, #272727 100%);',
		container: '#272727'
	};

	// const userLogin = useSelector((state) => state.userLogin);

	// let { userInfo } = userLogin;
	let userInfo = {};

	// Check for token to keep user logged in
	if (localStorage.jwtToken) {
		// Set auth token header auth
		const token = localStorage.jwtToken;
		setAuthToken(token);
		// Decode token and get user info and exp
		const decoded = jwt_decode(token);
		console.log({ decoded });
		// userInfo = decoded.userInfo;
		// Set user and isAuthenticated
		store.dispatch(setCurrentUser(decoded));
		// Check for expired token
		const currentTime = Date.now() / 1000; // to get in milliseconds
		if (decoded.exp < currentTime) {
			// Logout user
			store.dispatch(logout());

			// Redirect to login
			window.location.href = '/account/login';
		}
	}

	return (
		<Router>
			<Container>
				<Helmet>
					<title>Glow LEDs | Home of the LED Glove Diffuser Caps</title>
					<meta
						name="description"
						content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskins, and Glow Strings."
					/>
					<link rel="canonical" href="https://www.glow-leds.com" />
					<meta charset="utf-8" />
					<link rel="shortcut icon" type="image/x-icon" href="https://www.glow-leds.com/favicon.ico" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<meta name="theme-color" content="#272727" />
					<meta name="referrer" content="always" />
					<link rel="shortlink" href="https://www.glow-leds.com" />
					<meta property="og:site_name" content="Glow LEDs" />
					<meta property="og:type" content="website" />
					<meta property="og:locale" content="en_US" />
					<meta
						property="og:image"
						content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
					/>
					<meta
						property="og:image:secure_url"
						content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
					/>
					<meta property="og:title" content="Glow LEDs | Home of the LED Glove Diffuser Caps" />
					<meta
						property="og:description"
						content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskins, and Glow Strings."
					/>
					<meta property="og:url" content="https://www.glow-leds.com" />

					<meta name="twitter:site" content="@glow_leds" />
					<meta name="twitter:card" content="summary" />
					<meta
						name="twitter:description"
						content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskins, and Glow Strings."
					/>
					<meta name="twitter:title" content="Glow LEDs | Home of the LED Glove Diffuser Caps" />
					<meta
						name="twitter:image"
						content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
					/>
					<meta name="twitter:creator" content="@glow_leds" />
				</Helmet>
				<Header userInfo={userInfo} />
				<Sidebar userInfo={userInfo} />
				<Content>
					<MessengerCustomerChat
						pageId="100365571740684"
						appId="379385106779969"
						greetingDialogDisplay="show"
						shouldShowDialog={false}
						loggedInGreeting="Hi! How can we help you?"
						loggedOutGreeting="Hi! How can we help you?"
					/>
					<ScrollToTop>
						<Switch>
							{/* Private Routes */}
							<PrivateRoute path="/secure/account/profile" component={ProfilePage} />
							<PrivateRoute path="/secure/account/editprofile" component={EditProfilePage} />
							<PrivateRoute path="/secure/account/submit_feature" component={SubmitFeaturePage} />
							<PrivateRoute path="/secure/account/orders" component={MyOrdersPage} />
							<PrivateRoute path="/secure/checkout/shipping" component={ShippingPage} />
							<PrivateRoute path="/secure/account/glowcontrol/:id" component={GlowControlPage} />
							<PrivateRoute path="/secure/account/devices" component={DevicesPage} />
							<PrivateRoute path="/secure/account/editdevice/:id?" component={EditDevicePage} />
							<PrivateRoute path="/secure/account/order/:id" component={OrderPage} />
							<PrivateRoute path="/secure/checkout/placeorder" component={PlaceOrderPage} />
							<PrivateRoute
								path="/secure/account/affiliate_sign_up_complete"
								component={AffiliateCreationComplete}
							/>
							<PrivateRoute
								path="/secure/account/edit_affiliate/:id?"
								component={EditUserAffiliatePage}
							/>
							<PrivateRoute path="/secure/account/submission_complete" component={SubmissionComplete} />

							{/* Admin Routes */}
							<AdminRoute path="/secure/glow/editproduct/:pathname?" component={EditProductPage} />
							<AdminRoute path="/secure/glow/edit_all_data" component={EditAllDataPage} />
							<AdminRoute path="/secure/glow/products" component={ProductsPage} />
							<AdminRoute path="/secure/glow/logs" component={LogsPage} />
							<AdminRoute path="/secure/glow/orders" component={OrdersPage} />
							<AdminRoute path="/secure/glow/users" component={UsersPage} />
							<AdminRoute path="/secure/glow/userprofile/:id" component={UserProfilePage} />
							<AdminRoute path="/secure/glow/userorders/:id" component={UserOrdersPage} />
							<AdminRoute path="/secure/glow/edituser/:id?" component={EditUserPage} />
							<AdminRoute path="/secure/glow/editorder/:id?" component={EditOrderPage} />
							<AdminRoute path="/secure/glow/controlpanel" component={ControlPanelPage} />
							<AdminRoute path="/secure/glow/editexpense/:id?" component={EditExpensePage} />
							<AdminRoute path="/secure/glow/editfeature/:pathname?" component={EditFeaturePage} />
							<AdminRoute path="/secure/glow/editcart/:id?" component={EditCartPage} />
							<AdminRoute path="/secure/glow/expenses" component={ExpensesPage} />
							{/* <AdminRoute
								path="/secure/glow/expenses"
								component={(props) => <ExpensesPage userInfo={userInfo} {...props} />}
							/> */}
							<AdminRoute path="/secure/glow/features" component={FeaturesPage} />
							<AdminRoute path="/secure/glow/carts" component={CartsPage} />
							<AdminRoute path="/secure/glow/contents" component={ContentsPage} />
							<AdminRoute path="/secure/glow/display_products" component={ProductsDisplayPage} />
							<AdminRoute
								path="/secure/glow/emails/announcement"
								exact={true}
								component={AnnouncementEmail}
							/>
							<AdminRoute path="/secure/glow/emails/review" exact={true} component={ReviewEmail} />
							<AdminRoute
								path="/secure/glow/emails/account_created"
								exact={true}
								component={AccountCreatedEmail}
							/>
							<AdminRoute
								path="/secure/glow/emails/order/:id?/:status?/:send?"
								exact={true}
								component={OrderEmail}
							/>
							<AdminRoute
								path="/secure/glow/emails/order_status/:id?/:status?"
								exact={true}
								component={OrderStatusEmail}
							/>
							<AdminRoute path="/secure/glow/emails/invoice" exact={true} component={InvoiceEmail} />
							<AdminRoute
								path="/secure/glow/emails/reset_password"
								exact={true}
								component={ResetPasswordEmail}
							/>
							<AdminRoute
								path="/secure/glow/emails/password_changed"
								exact={true}
								component={PasswordChangedEmail}
							/>
							<AdminRoute path="/secure/glow/emails/invoice/:id?" exact={true} component={InvoiceEmail} />
							{/* <AdminRoute
								path="/secure/glow/emails/invoice/:id?"
								exact={true}
								component={(props) => <InvoiceEmail userInfo={userInfo} {...props} />}
							/> */}
							<AdminRoute path="/secure/glow/emails" component={EmailsPage} />
							<AdminRoute path="/secure/glow/editpromo/:id?" component={EditPromoPage} />
							<AdminRoute path="/secure/glow/editaffiliate/:id?" component={EditAffiliatePage} />
							<AdminRoute path="/secure/glow/editcontent/:id?" component={EditContentPage} />
							<AdminRoute path="/secure/glow/editemail/:id?" component={EditEmailPage} />
							<AdminRoute path="/secure/glow/promos" component={PromosPage} />
							<AdminRoute path="/secure/glow/affiliates" component={AffiliatesPage} />
							<AdminRoute path="/secure/glow/product_display" component={ProductsDisplayPage} />

							{/* Public Routes */}
							<Route path="/account/login" component={LoginPage} />
							<Route path="/account/verified/:id" component={VerifiedPage} />
							<Route path="/account/checkemail" component={CheckEmailPage} />
							<Route path="/account/emailsent" component={EmailSentPage} />
							<Route path="/account/changepassword" component={ChangePasswordPage} />
							<Route path="/account/register" component={RegisterPage} />
							<Route path="/account/passwordreset" component={PasswordResetPage} />
							<Route path="/account/resetpassword/:id" component={ResetPasswordPage} />
							<Route path="/checkout/decision" component={GuestDecisionPage} />
							<Route
								path="/checkout/placeorder"
								component={(props) => <PlaceOrderPublicPage userInfo={userInfo} {...props} />}
							/>
							<Route path="/checkout/shipping" component={ShippingPage} />

							<Route path="/checkout/cart/:pathname?" component={CartPage} />
							{/* <Route
								path="/checkout/cart/:pathname?"
								component={(props) => <CartPage userInfo={userInfo} {...props} />}
							/> */}
							<Route path="/collections/all/products" exact={true} component={AllProductsPage} />
							<Route
								path="/collections/all/products/category/:category/subcategory/:subcategory?"
								component={AllProductsPage}
							/>
							<Route path="/collections/all/products/category/:category" component={AllProductsPage} />

							<Route path="/collections/all/products/:pathname" component={ProductPage} />
							<Route path="/checkout/order/receipt/:id/:status/:send?" component={OrderEmail} />
							{/* <Route
								path="/pages/contact/:reason?"
								exact={true}
								component={(props) => <ContactPage userInfo={userInfo} {...props} />}
							/> */}
							<Route path="/pages/contact/:reason?" exact={true} component={ContactPage} />
							<Route path="/pages/glowcontrol" component={ContactPage} />
							{/* <Route
								path="/pages/glowcontrol"
								component={(props) => <GlowControlHomePage userInfo={userInfo} {...props} />}
							/> */}
							<Route path="/pages/terms" exact={true} component={TermsPage} />
							<Route path="/pages/menu/:pathname" exact={true} component={MenuPage} />

							<Route path="/pages/about" exact={true} component={AboutPage} />
							<Route path="/pages/faq" exact={true} component={FAQPage} />
							<Route path="/pages/sitemap" exact={true} component={SitemapPage} />
							<Route
								path="/collections/all/features/category/:category?"
								exact={true}
								component={AllFeaturesPage}
							/>
							{/* <Route
								path="/collections/all/features/category/:category?"
								exact={true}
								component={AllFeaturesPage}
							/> */}
							{/* <Route
								path="/collections/all/features/category/:category/:pathname?"
								component={(props) => <FeaturedPage userInfo={userInfo} {...props} />}
							/> */}

							<Route
								path="/collections/all/features/category/:category/:pathname?"
								exact={true}
								component={FeaturedPage}
							/>
							<Route path="/pages/music" exact={true} component={MusicPage} />
							<Route path="/" exact={true} component={HomePage} />
							<Route path="/pages/track_your_order" exact={true} component={TrackOrderPage} />
							<Route path="/checkout/order/:id" exact={true} component={OrderPublicPage} />
							<Route path="/pages/announcements" exact={true} component={AnnouncementsPage} />

							<Route component={Four04Page} />
						</Switch>
					</ScrollToTop>
				</Content>

				<Footer />
			</Container>
		</Router>
	);
};

export default App;
