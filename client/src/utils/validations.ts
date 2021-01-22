import isEmpty from 'is-empty';
import Validator from 'validator';
import axios, { AxiosResponse } from 'axios';

interface errors {
	email: string;
	password: string;
}
export const validate_promo_code = (data: any) => {
	let errors: any = {};
	interface errors {
		promo_code: string;
	}
	const promo_codes = data.promos.map((promo: any) => promo.promo_code.toLowerCase());
	console.log({ promo_codes });
	const promo = data.promos.find((promo: any) => promo.promo_code === data.promo_code);
	console.log({ promo });

	// Convert empty fields to an empty string so we can use validator functions
	data.promo_code = !isEmpty(data.promo_code) ? data.promo_code : '';
	// Email checks
	if (Validator.isEmpty(data.promo_code)) {
		errors.promo_code = 'Promo Code Field Empty';
	}
	if (data.user_data) {
		if (promo && promo.admin_only && promo.admin_only && data.user_data.isAdmin === false) {
			errors.promo_code = 'Promo Code Not Active';
		}
		if (promo && promo.affiliate_only && promo.affiliate_only && data.user_data.is_affiliated === false) {
			errors.promo_code = 'Promo Code Not Active';
		}
	} else if (!data.user_data) {
		if (promo && promo.admin_only) {
			errors.promo_code = 'Promo Code Not Active';
		} else if (promo && promo.affiliate_only) {
			errors.promo_code = 'Promo Code Not Active';
		}
	}
	if (promo && promo.minimum_total && promo.minimum_total > data.items_price) {
		errors.promo_code = 'Minimum Order Total Not Met';
	}
	// errors.promo_code = 'Promo Code Not Active Start';
	if (promo && !promo.active) {
		errors.promo_code = 'Promo Code Not Active';
	}

	if (promo && promo.single_use && promo.used_once) {
		console.log({ single_use: promo.single_use, used_once: promo.used_once });
		errors.promo_code = 'Promo Code Not Active';
	}
	if (!promo_codes.includes(data.promo_code.toLowerCase())) {
		errors.promo_code = 'Promo Code Not Valid';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
};

export const validate_login = (data: { email: any; password: any }) => {
	let errors: any = {};
	interface errors {
		email: string;
		password: string;
	}
	// Convert empty fields to an empty string so we can use validator functions
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	// Email checks
	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	} else if (!Validator.isEmail(data.email)) {
		errors.email = 'Valid email required';
	}
	// Password checks
	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
};

export const validate_registration = (data: {
	first_name: any;
	last_name: any;
	email: any;
	password: any;
	rePassword: any;
}) => {
	let errors: any = {};
	// let request: AxiosResponse<any>;
	// if (data.email) {
	// 	request = await axios.post('/api/users/checkemail', { email: data.email });
	// 	console.log({ request: request.data });
	// 	// Password checks
	// 	if (!request.data) {
	// 		errors.email = 'Email Already in Use';
	// 	}
	// }
	// Convert empty fields to an empty string so we can use validator functions
	data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
	data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.rePassword = !isEmpty(data.rePassword) ? data.rePassword : '';
	// First Name checks
	if (Validator.isEmpty(data.first_name)) {
		errors.first_name = 'First Name field is required';
	}
	// Last Name checks
	if (Validator.isEmpty(data.last_name)) {
		errors.last_name = 'Last Name field is required';
	}
	// Email checks
	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	} else if (!Validator.isEmail(data.email)) {
		errors.email = 'Email must a valid email';
	}
	// Password checks
	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}
	if (Validator.isEmpty(data.rePassword)) {
		errors.rePassword = 'Confirm password field is required';
	}
	if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = 'Password must be at least 6 characters';
	}
	if (!Validator.equals(data.password, data.rePassword)) {
		errors.rePassword = 'Passwords must match';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
};

export const validate_shipping = (data: {
	first_name: any;
	last_name: any;
	address_1: any;
	city: any;
	state: any;
	postalCode: any;
	country: any;
	international: any;
}) => {
	let errors: any = {};
	// Convert empty fields to an empty string so we can use validator functions
	data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
	data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
	data.address_1 = !isEmpty(data.address_1) ? data.address_1 : '';
	data.city = !isEmpty(data.city) ? data.city : '';
	data.state = !isEmpty(data.state) ? data.state : '';
	data.postalCode = !isEmpty(data.postalCode) ? data.postalCode : '';
	data.country = !isEmpty(data.country) ? data.country : '';
	// data.international = !isEmpty(data.international) ? data.international : '';
	// First Name checks
	if (Validator.isEmpty(data.first_name)) {
		errors.first_name = 'First Name field is required';
	}
	// Last Name checks
	if (Validator.isEmpty(data.last_name)) {
		errors.last_name = 'Last Name field is required';
	}
	// Address checks
	if (Validator.isEmpty(data.address_1)) {
		errors.address_1 = 'Address field is required';
	}
	// City checks
	if (Validator.isEmpty(data.city)) {
		errors.city = 'City field is required';
	}
	// State checks
	if (Validator.isEmpty(data.state)) {
		errors.state = 'State field is required';
	}
	// Postal Code checks
	if (Validator.isEmpty(data.postalCode)) {
		errors.postalCode = 'Postal Code field is required';
	}
	// // International checks
	// if (Validator.isEmpty(data.international)) {
	// 	errors.international = 'Country field is required';
	// }
	if (data.international) {
		// Country checks
		if (Validator.isEmpty(data.country)) {
			errors.country = 'Country field is required';
		}
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
export const validate_payment = (data: { paymentMethod: any }) => {
	let errors: any = {};
	// Convert empty fields to an empty string so we can use validator functions
	data.paymentMethod = !isEmpty(data.paymentMethod) ? data.paymentMethod : '';
	// First Name checks
	if (Validator.isEmpty(data.paymentMethod)) {
		errors.paymentMethod = 'Payment Method is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

export const validate_contact = (data: {
	first_name: any;
	last_name: any;
	email: any;
	// order_number: any;
	reason_for_contact: any;
	message: any;
}) => {
	let errors: any = {};
	// Convert empty fields to an empty string so we can use validator functions
	data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
	data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	// data.order_number = !isEmpty(data.order_number) ? data.order_number : '';
	data.reason_for_contact = !isEmpty(data.reason_for_contact) ? data.reason_for_contact : '';
	data.message = !isEmpty(data.message) ? data.message : '';
	// First Name checks
	if (Validator.isEmpty(data.first_name)) {
		errors.first_name = 'First Name field is required';
	}
	// Last Name checks
	if (Validator.isEmpty(data.last_name)) {
		errors.last_name = 'Last Name field is required';
	}
	// Email checks
	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	} else if (!Validator.isEmail(data.email)) {
		errors.email = 'Email must be a valid email';
	}
	// // Password checks
	// if (Validator.isEmpty(data.order_number)) {
	// 	errors.order_number = 'Order Number field is required';
	// }
	if (Validator.isEmpty(data.reason_for_contact)) {
		errors.reason_for_contact = 'Reason for Contact field is required';
	}
	if (Validator.isEmpty(data.message)) {
		errors.message = 'Message field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

export const validate_profile = (data: { first_name: any; last_name: any; email: any }) => {
	let errors: any = {};
	// Convert empty fields to an empty string so we can use validator functions
	data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
	data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	// First Name checks
	if (Validator.isEmpty(data.first_name)) {
		errors.first_name = 'First Name field is required';
	}
	// Last Name checks
	if (Validator.isEmpty(data.last_name)) {
		errors.last_name = 'Last Name field is required';
	}
	// Email checks
	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	} else if (!Validator.isEmail(data.email)) {
		errors.email = 'Valid email required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

export const validate_password_change = async (data: {
	id: any;
	current_password: any;
	password: any;
	rePassword: any;
}) => {
	// console.log({ data })
	// console.log({ data: data.current_password })
	let errors: any = {};
	let request: AxiosResponse<any>;
	if (data.current_password) {
		request = await axios.post('/api/users/getuser/' + data.id, { current_password: data.current_password });
		console.log({ request: request.data });
		// Password checks
		if (!request.data) {
			errors.current_password = 'Current Password is Incorrect';
		}
	}

	// Convert empty fields to an empty string so we can use validator functions
	data.current_password = !isEmpty(data.current_password) ? data.current_password : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.rePassword = !isEmpty(data.rePassword) ? data.rePassword : '';

	// // Password checks
	// if (!request.data) {
	// 	errors.current_password = 'Current Password is Incorrect';
	// }
	// Password checks
	if (Validator.isEmpty(data.current_password)) {
		errors.current_password = 'Current Password field is required';
	}
	// Password checks
	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}
	if (Validator.isEmpty(data.rePassword)) {
		errors.rePassword = 'Confirm password field is required';
	}
	if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = 'Password must be at least 6 characters';
	}
	if (!Validator.equals(data.password, data.rePassword)) {
		errors.rePassword = 'Passwords must match';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
};

export const validate_passwords = async (data: { id: any; password: any; rePassword: any }) => {
	// console.log({ data })
	// console.log({ data: data.current_password })
	let errors: any = {};

	// Convert empty fields to an empty string so we can use validator functions
	data.password = !isEmpty(data.password) ? data.password : '';
	data.rePassword = !isEmpty(data.rePassword) ? data.rePassword : '';

	// // Password checks
	// if (!request.data) {
	// 	errors.current_password = 'Current Password is Incorrect';
	// }
	// Password checks
	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}
	if (Validator.isEmpty(data.rePassword)) {
		errors.rePassword = 'Confirm password field is required';
	}
	if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = 'Password must be at least 6 characters';
	}
	if (!Validator.equals(data.password, data.rePassword)) {
		errors.rePassword = 'Passwords must match';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
};
