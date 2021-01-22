import React from 'react';
import { Helmet } from 'react-helmet';

const TermsPage = () => {
	return (
		<div className="main_container p-20px ">
			<Helmet>
				<title>Terms and Conditions | Glow LEDs</title>
				<meta property="og:title" content="Terms and Conditions" />
				<meta name="twitter:title" content="Terms and Conditions" />
				<link rel="canonical" href="https://www.glow-leds.com/account/terms" />
				<meta property="og:url" content="https://www.glow-leds.com/account/terms" />
				<meta
					name="description"
					content="Glow LEDs wants everyone to use our platform for what it was meant to be used for."
				/>
				<meta
					property="og:description"
					content="Glow LEDs wants everyone to use our platform for what it was meant to be used for."
				/>
				<meta
					name="twitter:description"
					content="Glow LEDs wants everyone to use our platform for what it was meant to be used for."
				/>
			</Helmet>

			<h1 style={{ textAlign: 'center' }}>Terms & Conditions</h1>
			<div className="paragraph_font">
				<p className="paragraph_font">
					Prior to using this website- I fully agree to the terms set forth here: Under no circumstances will
					the seller (Glow-LEDs.com hereby referred to as “Glow-LEDs.com” & all affiliates) be liable for any
					damages or expenses by reason of use or sale of Glow-LEDs.com products. I understand that products
					sold on Glow-LEDs.com contain small parts and are a choking hazard for small children. Glow-LEDs.com
					is not responsible for any injuries or damages that can result from any of the products sold on
					Glow-LEDs.com, any of its affiliates, or produced by Glow-LEDs.com. I hereby release from any legal
					liability Glow-LEDs.com including its owners, agents, and employees from any and all liability for
					damage, injury or death to myself, or any other person or property resulting the selection,
					assembly, maintenance or use of such equipment and any claim based upon negligence, breach of
					warranty, contract or legal theory accepting myself the full responsibility for any and all such
					damage, injury or death which may result. This also applies to any individuals whom I supply with
					these products. I further agree that any and all liability of Glow-LEDs.com including its owners,
					agents and employees resulting from the selection, assembly, maintenance or use of this equipment
					shall be limited to the purchase price of any such equipment. Glow-LEDs.com products are not
					intended for use in breaking the law. The buyer acknowledges and agrees that the disclaimer of any
					liability for personal injury is a material term for this agreement and the buyer agrees to
					indemnify the Seller and to hold the Seller harmless from any claim related to the item of the
					equipment purchased. Any suit or other legal proceedings concerning the injury or death from the
					selection, assembly, maintenance or use of this equipment may be brought only in the courts of
					Travis County, Texas. I consent to jurisdiction and venue of any such court in any such proceeding.
					I acknowledge that my email address will be added to the Glow-LEDs.com email list. In which,
					occasional promotions and customer information details may be sent. I may unsubscribe at any time by
					using the unsubscribe link in any email sent, or by contacting Glow-LEDs.com. Under no circumstances
					will my email address be shared with any third party.
				</p>
				{/* <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Custom Products</h2> */}
				<ul style={{ padding: '0 18px' }}>
					<li>
						I understand that any Custom ordered products are the intellectual property of Glow-LEDs.com and
						may be used, promoted or distributed at any time.
					</li>
				</ul>
				{/* <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Featured Content</h2> */}
				<ul style={{ padding: '0 18px' }}>
					<li>
						Any media, incuding videos or pictures, submitted to Glow-LEDs.com may be used on Glow-LEDS.com
						or GLow LEDs social media to either entertain or promote.
					</li>
					<li>
						Glow-LEDs.com will not distribute such media to third parties for any reason without prior
						consent from submitter.
					</li>
				</ul>
				{/* <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Agreement</h2> */}
				<p>
					I have carefully read this Agreement and Release of Liability and fully understand its content. I
					understand that it provides a comprehensive release of liability as to me, and all others to whom I
					may supply the equipment. This Agreement and Release of Liability may not be added or altered except
					by the written agreement assigned by Glow-LEDs.com. It is not intended to assert any claim or
					defense which applicable law prohibits. Rights of parties may vary from state to state. By accessing
					the Glow-LEDs.com website you agree to the terms and conditions outlined above. If you do not agree
					to these terms and conditions, please exit this site immediately. We reserve the right to change,
					modify, add or remove portions of these terms at any time. If you continue to use the site after we
					have posted changes to the terms, you have then inherently accepted those terms. If you need to
					contact us, please use our contact form.
				</p>
			</div>
		</div>
	);
};

export default TermsPage;
