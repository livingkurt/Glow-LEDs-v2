import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const SitemapPage = () => {
	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Sitemap | Glow LEDs</title>
				<meta property="og:title" content="Sitemap" />
				<meta name="twitter:title" content="Sitemap" />
				<link rel="canonical" href="https://www.glow-leds.com/pages/sitemap" />
				<meta property="og:url" content="https://www.glow-leds.com/pages/sitemap" />
				<meta
					name="description"
					content="Glow LEDs Sitemap of all the places you can be on our website. Explore and you may find a place you've never been before."
				/>
				<meta
					property="og:description"
					content="Glow LEDs Sitemap of all the places you can be on our website. Explore and you may find a place you've never been before."
				/>
				<meta
					name="twitter:description"
					content="Glow LEDs Sitemap of all the places you can be on our website. Explore and you may find a place you've never been before."
				/>
			</Helmet>
			<div class="inner_content">
				<h1 style={{ textAlign: 'center' }}>Glow LEDs Sitemap</h1>
				<div className="wrap jc-b">
					<div style={{ width: '50%' }}>
						<h2 style={{ textAlign: 'left' }}>Home</h2>
						<ul>
							<li>
								<Link to="">Home</Link>
							</li>
						</ul>

						<h2 style={{ textAlign: 'left' }}>Account</h2>
						<ul>
							<li>
								<Link to="/account/login ">Login</Link>
							</li>
							<li>
								<Link to="/account/verified ">Verified</Link>
							</li>
							<li>
								<Link to="/account/checkemail ">Check Email</Link>
							</li>
							<li>
								<Link to="/account/register ">Register</Link>
							</li>
							<li>
								<Link to="/account/passwordreset ">Password Reset</Link>
							</li>
							<li>
								<Link to="/account/resetpassword ">Reset Password</Link>
							</li>
						</ul>
						<h2 style={{ textAlign: 'left' }}>Checkout</h2>
						<ul>
							<li>
								<Link to="/checkout/cart ">Cart</Link>
							</li>
						</ul>

						<h2 style={{ textAlign: 'left' }}>Pages</h2>
						<ul>
							<li>
								<Link to="/pages/contact  ">Contact</Link>
							</li>
							<li>
								<Link to="/pages/terms  ">Terms and Conditions</Link>
							</li>
							<li>
								<Link to="/pages/about  ">About</Link>
							</li>
							<li>
								<Link to="/pages/faq  ">Frequently Asked Questions</Link>
							</li>
						</ul>

						<h2 style={{ textAlign: 'left' }}>Categories</h2>
						<ul>
							<li>
								<Link to="/collections/all/products/category/frosted_diffusers">Frosted Diffusers</Link>
							</li>
							<li>
								<Link to="/collections/all/products/category/diffuser_caps">Diffuser Caps</Link>
							</li>
							<li>
								<Link to="/collections/all/products/category/diffuser_adapters">Diffuser Adapters</Link>
							</li>
							<li>
								<Link to="/collections/all/products/category/accessories">Accessories</Link>
							</li>
							<li>
								<Link to="/collections/all/products/category/glow_strings">Glow Strings</Link>
							</li>
							{/* <li>
								<Link to="/collections/all/products/category/infinity_mirrors">Infinity Mirrors</Link>
							</li> */}
						</ul>
					</div>
					<div style={{ width: '50%' }}>
						<h2 style={{ textAlign: 'left' }}>Products</h2>
						<ul>
							<li>
								<Link to="/collections/all/products">Products</Link>
							</li>
						</ul>
						<ul className="products_list">
							<ul>
								<li style={{ textAlign: 'left' }}>
									<Link to="/collections/all/products/category/diffuser_adapters">
										Diffuser Adapters
									</Link>
								</li>
								<ul className="products_list">
									<li>
										<Link to="/collections/all/products/large_frosted_dome_diffusers">
											Large Frosted Dome Diffuser
										</Link>
									</li>
									<li>
										<Link to="/collections/all/products/frosted_dome_diffusers">
											Frosted Dome Diffuser
										</Link>
									</li>
								</ul>
							</ul>

							<ul className="products_list">
								<li style={{ textAlign: 'left' }}>
									<Link to="/collections/all/products/category/glow_strings">Glow Strings</Link>
								</li>
								<ul>
									<li>
										<Link to="/collections/all/products/50_led_3_5m_glow_strings">
											50 LED 3.5m Glow Strings
										</Link>
									</li>
									<li>
										<Link to="/collections/all/products/150_led_10_5m_glow_strings">
											150 LED 10.5m Glow Strings
										</Link>
									</li>
									<li>
										<Link to="/collections/all/products/200_led_14m_glow_strings">
											200 LED 14m Glow Strings
										</Link>
									</li>
									<li>
										<Link to="/collections/all/products/100_led_7m_glow_strings">
											100 LED 7m Glow Strings
										</Link>
									</li>
									{/* <li>
							<Link to="/collections/all/products/glow_strings_controller_power_adapter">
								Home
							</Link>
						</li> */}
									{/* <li>
							<Link to="/collections/all/products/50_glow_strings_w_o_controller">
								Home
							</Link>
						</li> */}
								</ul>
							</ul>

							{/* <h3 style={{ textAlign: 'left' }}>Diffuser Adapters</h3> */}
							<ul className="products_list">
								<li style={{ textAlign: 'left' }}>
									<Link to="/collections/all/products/category/diffuser_adapters">
										Diffuser Adapters
									</Link>
								</li>
								<ul>
									<li>
										<Link to="/collections/all/products/diffuser_adapters_no_caps">
											Diffuser Adapters (No Caps)
										</Link>
									</li>
									<li>
										<Link to="/collections/all/products/diffuser_caps_adapters_starter_kit">
											Diffuser Caps + Adapters Starter Kit
										</Link>
									</li>
								</ul>
							</ul>

							<ul className="products_list">
								<li style={{ textAlign: 'left' }}>
									<Link to="/collections/all/products/category/diffuser_caps">Diffuser Caps</Link>
								</li>
								<ul>
									<li>
										<Link to="/collections/all/products/honey_comb_diffuser_caps">
											Honey Comb Diffuser Caps
										</Link>
									</li>
									<li>
										<Link to="/collections/all/products/blinking_eyes_diffuser_caps">
											Blinking Eyes Diffuser Caps
										</Link>
									</li>
									{/* <li>
							<Link to="/collections/all/products/x_diffuser_caps">
								X Diffuser Caps
							</Link>
						</li> */}
									<li>
										<Link to="/collections/all/products/icosahedron_diffuser_caps">
											Icosahedron Diffuser Caps
										</Link>
									</li>
									<li>
										<Link to="/collections/all/products/peace_diffuser_caps">
											Peace Diffuser Caps
										</Link>
									</li>
									<li>
										<Link to="/collections/all/products/dodecahedron_point_diffuser_caps">
											Dodecahedron Point Diffuser Caps
										</Link>
									</li>
									{/* <li>
							<Link to="/collections/all/products/owsla_diffuser_caps">
								Owsla Diffuser Caps
							</Link>
						</li> */}
									<li>
										<Link to="/collections/all/products/mountain_diffuser_caps">
											Mountain Diffuser Caps
										</Link>
									</li>

									<li>
										<Link to="/collections/all/products/moon_phases_diffuser_caps">
											Moon Phases Diffuser Caps
										</Link>
									</li>
									<li>
										<Link to="/collections/all/products/vesica_piscis_diffuser_caps">
											Vesica Piscis Diffuser Caps
										</Link>
									</li>
									<li>
										<Link to="/collections/all/products/heart_diffuser_caps">
											Heart Diffuser Caps
										</Link>
									</li>

									{/* <li>
							<Link to="/collections/all/products/tiger_diffuser_caps">
								Tiger Diffuser Caps
							</Link>
						</li> */}
									<li>
										<Link to="/collections/all/products/cube_diffuser_caps">
											Cube Diffuser Caps
										</Link>
									</li>
									{/* <li>
							<Link to="/collections/all/products/triforce_diffuser_caps">
								Triforce Diffuser Caps
							</Link>
						</li> */}
									<li>
										<Link to="/collections/all/products/trinity_diffuser_caps">
											Trinity Diffuser Caps
										</Link>
									</li>
									{/* <li>
							<Link to="/collections/all/products/phoenix_diffuser_caps">
								Phoenix Diffuser Caps
							</Link>
						</li> */}
									<li>
										<Link to="/collections/all/products/seed_of_life_diffuser_caps">
											Seed of Life Diffuser Caps
										</Link>
									</li>
									<li>
										<Link to="/collections/all/products/flower_diffuser_caps">
											Flower Diffuser Caps
										</Link>
									</li>
									<li>
										<Link to="/collections/all/products/dodecahedron_face_diffuser_caps">
											Dodecahedron Face Diffuser Caps
										</Link>
									</li>
									{/* <li>
							<Link to="/collections/all/products/lion_diffuser_caps">
								Lion Diffuser Caps
							</Link>
						</li> */}
									{/* <li>
							<Link to="/collections/all/products/illuminate￼_diffuser_caps">
								Illuminate Diffuser Caps
							</Link>
						</li> */}
									<li>
										<Link to="/collections/all/products/dizzy_face_emoji_diffuser_caps">
											Dizzy Face Emoji Diffuser Caps
										</Link>
									</li>
									<li>
										<Link to="/collections/all/products/gyro_sphere_diffuser_caps">
											Gyro Sphere Diffuser Caps
										</Link>
									</li>
									<li>
										<Link to="/collections/all/products/custom_diffuser_caps">
											Custom Diffuser Caps
										</Link>
									</li>
									{/* <li>
							<Link to="/collections/all/products/large_custom_infinity_mirror">
								Large Custom Infinity Mirror
							</Link>
						</li> */}
									{/* <li>
										<Link to="/collections/all/products/serotonin_molecule_infinity_mirror">
											Serotonin Molecule Infinity Mirror
										</Link>
									</li>
									<li>
										<Link to="/collections/all/products/triforce_infinity_mirror">
											Triforce Infinity Mirror
										</Link>
									</li> */}
									{/* <li>
										<Link to="/collections/all/products/custom_infinity_mirror">
											Custom Infinity Mirrors
										</Link>
									</li> */}
									<li>
										<Link to="/collections/all/products/coin_battery_storage">
											Coin Battery Storage
										</Link>
									</li>
								</ul>
							</ul>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SitemapPage;
