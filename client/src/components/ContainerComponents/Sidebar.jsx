import React, { useRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import { HashLink } from 'react-router-hash-link';

const Sidebar = (props) => {
	const history = useHistory();

	function useOutsideAlerter(ref) {
		useEffect(
			() => {
				/** Alert if clicked on outside of element */
				function handleClickOutside(event) {
					if (ref.current && !ref.current.contains(event.target)) {
						// alert('You clicked outside of me!');
						document.querySelector('.sidebar').classList.remove('open');
					}
				}
				// Bind the event listener
				document.addEventListener('mousedown', handleClickOutside);
				return () => {
					// Unbind the event listener on clean up
					document.removeEventListener('mousedown', handleClickOutside);
				};
			},
			[ ref ]
		);
	}
	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef);

	const closeMenu = () => {
		document.querySelector('.sidebar').classList.remove('open');
	};
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
		closeMenu();
		history.push('/account/login');
	};

	const [ first_name, set_first_name ] = useState('');
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(
		() => {
			if (userInfo) {
				set_first_name(userInfo.first_name);
			}

			// }
		},
		[ userInfo ]
	);

	const userUpdate = useSelector((state) => state.userUpdate);

	useEffect(
		() => {
			if (userUpdate.userInfo) {
				set_first_name(userUpdate.userInfo.first_name);
			}
			return () => {};
		},
		[ userUpdate.userInfo ]
	);

	return (
		<aside ref={wrapperRef} className="sidebar">
			<div className="logo_text mh-auto ai-c">
				<Link to="/">
					<div className="h-50px w-50px">
						<img
							className="zoom logo_s"
							src="/images/optimized_images/logo_images/glow_logo_optimized.png"
							alt="Glow LEDs Logo"
							title="Small Logo"
						/>
					</div>
				</Link>
				<Link to="/">
					<div className="row">
						<label className="ml-5px fs-30px mv-0px ff-h">Glow LEDs</label>
					</div>
				</Link>
			</div>
			<button className="sidebar_close_button" aria-label="close" onClick={closeMenu}>
				<i className="fas fa-times" />
			</button>
			<div className="column  h-67vh" style={{ overflowY: 'scroll' }}>
				<Link to="/">
					<button className="sidebar-btn primary" onClick={closeMenu}>
						Home
					</button>
				</Link>
				{props.userInfo ? (
					<div className="sidebar_dropdown">
						<button className="sidebar-btn primary">{first_name}</button>
						<ul className="sidebar_dropdown_container">
							<Link to="/secure/account/profile">
								<button className=" sidebar-btn secondary" onClick={closeMenu}>
									Profile
								</button>
							</Link>
							<Link to="/secure/account/orders">
								<button className=" sidebar-btn secondary" onClick={closeMenu}>
									Orders
								</button>
							</Link>
							<button onClick={handleLogout} className=" sidebar-btn secondary">
								{' '}
								Logout
							</button>
						</ul>
						<i className="trans-neg-180 pos-abs right-10px top-8px fas fa-sort-up" />
					</div>
				) : (
					<Link to="/account/login">
						<button className="sidebar-btn primary" onClick={closeMenu}>
							Login
						</button>
					</Link>
				)}

				<div className="sidebar_dropdown">
					<button className="sidebar-btn primary">
						<Link to="/collections/all/products">Products</Link>
					</button>

					<ul className="sidebar_dropdown_container">
						<Link to="/collections/all/products/category/best_sellers">
							<button className="sidebar-btn secondary" onClick={closeMenu}>
								Best Sellers
							</button>
						</Link>
						<Link to="/collections/all/products/category/essentials">
							<button className="sidebar-btn secondary" onClick={closeMenu}>
								Glow LEDs Essentials
							</button>
						</Link>
						<div className="sidebar_dropdown_secondary">
							<button className="sidebar-btn secondary">
								<Link to="/pages/menu/gloving">Gloving</Link>
							</button>
							<ul className="sidebar_dropdown_secondary_container">
								<Link to="/collections/all/products/category/glowskins">
									<button className="sidebar-btn nested" onClick={closeMenu}>
										Glowskins (New)
									</button>
								</Link>
								{/* <Link to="/collections/all/products/category/frosted_diffusers">
									<button className="sidebar-btn nested" onClick={closeMenu}>
										Frosted Diffusers
									</button>
								</Link> */}
								<div className="sidebar_dropdown_nested w-">
									<button className="sidebar-btn nested">
										<Link to="/collections/all/products/category/frosted_diffusers">
											Frosted Diffusers
										</Link>
									</button>
									<ul className="sidebar_dropdown_nested_container">
										<Link to="/collections/all/products/category/frosted_diffusers/subcategory/domes">
											<button className="sidebar-btn nested_2" onClick={closeMenu}>
												Domes
											</button>
										</Link>
										<Link to="/collections/all/products/category/frosted_diffusers/subcategory/open_hole">
											<button className="sidebar-btn nested_2" onClick={closeMenu}>
												Open Hole
											</button>
										</Link>
										<Link to="/collections/all/products/category/frosted_diffusers/subcategory/closed_hole">
											<button className="sidebar-btn nested_2" onClick={closeMenu}>
												Closed Hole
											</button>
										</Link>
										<Link to="/collections/all/products/category/frosted_diffusers/subcategory/abstract">
											<button className="sidebar-btn nested_2" onClick={closeMenu}>
												Abstract
											</button>
										</Link>
										{/* <Link to="/collections/all/products/category/frosted_diffusers/subcategory/polygons">
											<button className="sidebar-btn nested_2" onClick={closeMenu}>
												Polygons
											</button>
										</Link> */}
									</ul>
									<i className="trans-neg-180 pos-abs right-10px top-8px fas fa-sort-up" />
								</div>
								<div className="sidebar_dropdown_nested">
									<button className="sidebar-btn nested">
										<Link to="/collections/all/products/category/diffuser_caps">Diffuser Caps</Link>
									</button>
									<ul className="sidebar_dropdown_nested_container">
										<Link to="/collections/all/products/category/diffuser_caps/subcategory/geometric">
											<button className="sidebar-btn nested_2" onClick={closeMenu}>
												Geomotric
											</button>
										</Link>
										<Link to="/collections/all/products/category/diffuser_caps/subcategory/shapes">
											<button className="sidebar-btn nested_2" onClick={closeMenu}>
												Shapes
											</button>
										</Link>
										<Link to="/collections/all/products/category/diffuser_caps/subcategory/abstract">
											<button className="sidebar-btn nested_2" onClick={closeMenu}>
												Abstract
											</button>
										</Link>
										<Link to="/collections/all/products/category/diffuser_caps/subcategory/patterns">
											<button className="sidebar-btn nested_2" onClick={closeMenu}>
												Patterns
											</button>
										</Link>
									</ul>
									<i className="trans-neg-180 pos-abs right-10px top-8px fas fa-sort-up" />
								</div>
								<div className="sidebar_dropdown_nested">
									<button className="sidebar-btn nested">
										<Link to="/collections/all/products/category/mega_diffuser_caps">
											Mega Diffuser Caps
										</Link>
									</button>
									<ul className="sidebar_dropdown_nested_container">
										<Link to="/collections/all/products/category/mega_diffuser_caps/subcategory/geometric">
											<button className="sidebar-btn nested_2" onClick={closeMenu}>
												Geomotric
											</button>
										</Link>
										<Link to="/collections/all/products/category/mega_diffuser_caps/subcategory/shapes">
											<button className="sidebar-btn nested_2" onClick={closeMenu}>
												Shapes
											</button>
										</Link>
										<Link to="/collections/all/products/category/mega_diffuser_caps/subcategory/abstract">
											<button className="sidebar-btn nested_2" onClick={closeMenu}>
												Abstract
											</button>
										</Link>
										<Link to="/collections/all/products/category/mega_diffuser_caps/subcategory/patterns">
											<button className="sidebar-btn nested_2" onClick={closeMenu}>
												Patterns
											</button>
										</Link>
										<Link to="/collections/all/products/category/mega_diffuser_caps/subcategory/emojis">
											<button className="sidebar-btn nested_2" onClick={closeMenu}>
												Emojis
											</button>
										</Link>
									</ul>
									<i className="trans-neg-180 pos-abs right-10px top-8px fas fa-sort-up" />
								</div>
								<Link to="/collections/all/products/category/accessories">
									<button className="sidebar-btn nested" onClick={closeMenu}>
										Accessories
									</button>
								</Link>
							</ul>
							<i className="trans-neg-180 pos-abs right-10px top-8px fas fa-sort-up" />
						</div>
						<Link to="/collections/all/products/category/glow_strings">
							<button className="sidebar-btn secondary" onClick={closeMenu}>
								Glow Strings
							</button>
						</Link>
					</ul>
					<i className="trans-neg-180 pos-abs right-10px top-8px fas fa-sort-up" />
				</div>
				<div className="sidebar_dropdown">
					<button className="sidebar-btn primary">
						<Link to="/pages/menu/featured">Featured</Link>
					</button>

					<ul className="sidebar_dropdown_container">
						<Link to="/collections/all/features/category/artists">
							<button className="sidebar-btn secondary" onClick={closeMenu}>
								Artists
							</button>
						</Link>
						<Link to="/collections/all/features/category/glovers">
							<button className="sidebar-btn secondary" onClick={closeMenu}>
								Glovers
							</button>
						</Link>

						<Link to="/collections/all/features/category/producers">
							<button className="sidebar-btn secondary" onClick={closeMenu}>
								Producers
							</button>
						</Link>
						<Link to="/collections/all/features/category/vfx">
							<button className="sidebar-btn secondary" onClick={closeMenu}>
								VFX
							</button>
						</Link>
						<Link to="/account/login?redirect=/secure/account/submit_feature">
							<button className="sidebar-btn secondary" onClick={closeMenu}>
								Submit Feature
							</button>
						</Link>
					</ul>
					<i className="trans-neg-180 pos-abs right-10px top-8px fas fa-sort-up" />
				</div>
				{/* <Link to="/pages/glowcontrol">
					<button className="sidebar-btn primary" onClick={closeMenu}>
						Glow Control
					</button>
				</Link> */}
				<div className="sidebar_dropdown">
					<button className="sidebar-btn primary">
						<Link to="/pages/menu/support">Support</Link>
					</button>

					<ul className="sidebar_dropdown_container">
						<Link to="/pages/track_your_order">
							<button className="sidebar-btn secondary" onClick={closeMenu}>
								Track Your Order
							</button>
						</Link>
						<Link to="/pages/about">
							<button className="sidebar-btn secondary" onClick={closeMenu}>
								About
							</button>
						</Link>
						<div className="sidebar_dropdown_secondary">
							<button className="sidebar-btn secondary">
								<Link to="/pages/faq">FAQ</Link>
							</button>
							<ul className="sidebar_dropdown_secondary_container">
								<HashLink href="/pages/faq#glowskins">
									<button className="sidebar-btn nested" onClick={closeMenu}>
										Glowskins
									</button>
								</HashLink>
								<HashLink href="/pages/faq#using_diffuser_caps_and_adapters">
									<button className="sidebar-btn nested" onClick={closeMenu}>
										Diffuser Caps Guide
									</button>
								</HashLink>
								<HashLink href="/pages/faq#diffuser_too_tight_too_loose">
									<button className="sidebar-btn nested" onClick={closeMenu}>
										Diffusers Too Tight/Loose?
									</button>
								</HashLink>
								<HashLink href="/pages/faq#ordering_custom_products">
									<button className="sidebar-btn nested" onClick={closeMenu}>
										Ordering Custom Products
									</button>
								</HashLink>
								<HashLink href="/pages/faq#featured_content">
									<button className="sidebar-btn nested" onClick={closeMenu}>
										Featured Content
									</button>
								</HashLink>
								<HashLink href="/pages/faq#processing_shipping">
									<button className="sidebar-btn nested" onClick={closeMenu}>
										Processing/Shipping
									</button>
								</HashLink>
								<HashLink href="/pages/faq#returns_cancellations">
									<button className="sidebar-btn nested" onClick={closeMenu}>
										Returns/Cancellations
									</button>
								</HashLink>
							</ul>
							<i className="trans-neg-180 pos-abs right-10px top-8px fas fa-sort-up" />
						</div>
						<Link to="/pages/contact">
							<button className="sidebar-btn secondary" onClick={closeMenu}>
								Contact
							</button>
						</Link>
						<Link to="/pages/terms">
							<button className="sidebar-btn secondary" onClick={closeMenu}>
								Terms and Conditions
							</button>
						</Link>
					</ul>
					<i className="trans-neg-180 pos-abs right-10px top-8px fas fa-sort-up" />
				</div>
				{props.userInfo &&
				props.userInfo.isAdmin && (
					<div className="sidebar_dropdown">
						<button className="sidebar-btn primary">Admin</button>
						<ul className="sidebar_dropdown_container">
							<Link to="/secure/glow/controlpanel">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Control Panel
								</button>
							</Link>
							<Link to="/secure/glow/orders">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Orders
								</button>
							</Link>
							<Link to="/secure/glow/products">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Products
								</button>
							</Link>
							<Link to="/secure/glow/users">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Users
								</button>
							</Link>
							<Link to="/secure/glow/expenses">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Expenses
								</button>
							</Link>
							<Link to="/secure/glow/affiliates">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Affiliates
								</button>
							</Link>
							<Link to="/secure/glow/promos">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Promos
								</button>
							</Link>
							<Link to="/secure/glow/carts">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Carts
								</button>
							</Link>
							<Link to="/secure/glow/contents">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Contents
								</button>
							</Link>
							<Link to="/secure/glow/emails">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Emails
								</button>
							</Link>
						</ul>
						<i className="trans-neg-180 pos-abs right-10px top-8px fas fa-sort-up" />
					</div>
				)}
			</div>
		</aside>
	);
};

export default Sidebar;
