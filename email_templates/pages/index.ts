// module.exports = {
//   verify_account_view: require("./verify_account_view"),
//   verified_account_view: require("./verified_account_view"),
//   reset_password_view: require("./reset_password_view"),
//   contact_view: require("./contact_view"),
//   order_view: require("./order_view")
// };

export { default as account_created } from './account_created';
export { default as reset_password } from './reset_password';
export { default as password_reset } from './password_reset';
export { default as error } from './error';
export { default as order } from './order';
export { default as contact } from './contact';
export { default as contact_confirmation } from './contact_confirmation';
