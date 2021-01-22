import mongoose from 'mongoose';
export {};

// const settingSchema = {
// 	name: { type: String },
// 	label: { type: String },
// 	type: { type: String, default: 'Number' },
// 	max: { type: Number, default: 255 },
// 	min: { type: Number, default: 0 },
// 	step: { type: Number, default: 1 },
// 	value: { type: Number, default: 1 }
// };

// const booleanSchema = {
// 	name: { type: String },
// 	label: { type: String },
// 	type: { type: String, default: 'Boolean' },
// 	value: { type: Number, default: true }
// };
// const listSchema = {
// 	name: { type: String },
// 	label: { type: String },
// 	options: { type: Array },
// 	type: { type: String, default: 'Select' },
// 	value: { type: Number, default: 50 }
// };

// const sectionSchema = {
// 	name: { type: String },
// 	label: { type: String },
// 	type: { type: String, default: 'Section' }
// };

// const solidColorSchema = {
// 	name: { type: String },
// 	label: { type: String },
// 	type: { type: String, default: 'Number' },
// 	max: { type: Number, default: 255 },
// 	min: { type: Number, default: 0 },
// 	step: { type: Number, default: 1 },
// 	value: { type: String, default: '255,255,255' }
// };

// const modeSettingsSchema = {
// 	brightness: settingSchema,
// 	motion_speed: settingSchema,
// 	strobe: settingSchema,
// 	gap: settingSchema,
// 	blank: settingSchema,
// 	blend_palette: settingSchema,
// 	color_density: settingSchema,
// 	color_speed: settingSchema,
// 	color_fade: settingSchema,
// 	sparkling: settingSchema,
// 	fire: sectionSchema,
// 	twinkles: sectionSchema,
// 	cooling: settingSchema,
// 	twinkle_speed: settingSchema,
// 	twinkle_density: settingSchema
// };

// const deviceSettingsSchema = {
// 	power: { type: Boolean },
// 	autoplay_pattern: { type: Boolean },
// 	random_pattern: { type: Boolean },
// 	autoplay_palette: { type: Boolean },
// 	random_palette: { type: Boolean },
// 	autoplay_pattern_duration: settingSchema,
// 	autoplay_palette_duration: settingSchema,
// 	strobe_settings: modeSettingsSchema,
// 	pulse_settings: modeSettingsSchema,
// 	sparkle_settings: modeSettingsSchema,
// 	shooting_star_settings: modeSettingsSchema,
// 	cycling_desaturated_settings: modeSettingsSchema,
// 	color_waves_settings: modeSettingsSchema,
// 	beat_settings: modeSettingsSchema,
// 	juggle_settings: modeSettingsSchema,
// 	twinkle_settings: modeSettingsSchema,
// 	hsv_settings: modeSettingsSchema,
// 	rgb: solidColorSchema,
// 	hsv: solidColorSchema,
// 	pattern_order: { type: Array },
// 	palette_order: { type: Array },
// 	palette: listSchema,
// 	pattern: listSchema
// };

const modeSettingsSchema = {
	brightness: {
		name: { type: String, default: 'brightness' },
		label: { type: String, default: 'Brightness' },
		type: { type: String, default: 'NumberFieldType' },
		min: { type: Number, default: 1 },
		max: { type: Number, default: 255 },
		step: { type: Number, default: 1 },
		value: { type: Number, default: 255 }
	},
	speed: {
		name: { type: String, default: 'speed' },
		label: { type: String, default: 'Speed' },
		type: { type: String, default: 'NumberFieldType' },
		min: { type: Number, default: 1 },
		max: { type: Number, default: 255 },
		step: { type: Number, default: 1 },
		value: { type: Number, default: 30 }
	},
	strobe: {
		name: { type: String, default: 'strobe' },
		label: { type: String, default: 'Strobe' },
		type: { type: String, default: 'NumberFieldType' },
		min: { type: Number, default: 1 },
		max: { type: Number, default: 255 },
		step: { type: Number, default: 1 },
		value: { type: Number, default: 30 }
	},
	blank: {
		name: { type: String, default: 'blank' },
		label: { type: String, default: 'Blank' },
		type: { type: String, default: 'NumberFieldType' },
		min: { type: Number, default: 1 },
		max: { type: Number, default: 255 },
		step: { type: Number, default: 1 },
		value: { type: Number, default: 30 }
	},
	gap: {
		name: { type: String, default: 'gap' },
		label: { type: String, default: 'Gap' },
		type: { type: String, default: 'NumberFieldType' },
		min: { type: Number, default: 1 },
		max: { type: Number, default: 255 },
		step: { type: Number, default: 1 },
		value: { type: Number, default: 30 }
	},
	colorDensity: {
		name: { type: String, default: 'colorDensity' },
		label: { type: String, default: 'Color Density' },
		type: { type: String, default: 'NumberFieldType' },
		min: { type: Number, default: 1 },
		max: { type: Number, default: 255 },
		step: { type: Number, default: 1 },
		value: { type: Number, default: 30 }
	},
	colorSpeed: {
		name: { type: String, default: 'colorSpeed' },
		label: { type: String, default: 'Color Speed' },
		type: { type: String, default: 'NumberFieldType' },
		min: { type: Number, default: 1 },
		max: { type: Number, default: 255 },
		step: { type: Number, default: 1 },
		value: { type: Number, default: 30 }
	},
	colorFade: {
		name: { type: String, default: 'colorFade' },
		label: { type: String, default: 'Color Fade' },
		type: { type: String, default: 'NumberFieldType' },
		min: { type: Number, default: 1 },
		max: { type: Number, default: 255 },
		step: { type: Number, default: 1 },
		value: { type: Number, default: 30 }
	},
	rgb: {
		name: { type: String, default: 'rgb' },
		label: { type: String, default: 'RGB' },
		type: { type: String, default: 'ColorFieldType' },
		min: { type: Number, default: 1 },
		max: { type: Number, default: 255 },
		step: { type: Number, default: 1 },
		value: { type: String, default: '255,255,255' }
	},
	hsv: {
		name: { type: String, default: 'hsv' },
		label: { type: String, default: 'HSV' },
		type: { type: String, default: 'ColorFieldType' },
		min: { type: Number, default: 1 },
		max: { type: Number, default: 255 },
		step: { type: Number, default: 1 },
		value: { type: String, default: '255,255,255' }
	},
	cooling: {
		name: { type: String, default: 'cooling' },
		label: { type: String, default: 'Cooling' },
		type: { type: String, default: 'NumberFieldType' },
		min: { type: Number, default: 1 },
		max: { type: Number, default: 255 },
		step: { type: Number, default: 1 },
		value: { type: Number, default: 1 }
	},
	sparking: {
		name: { type: String, default: 'sparking' },
		label: { type: String, default: 'Sparking' },
		type: { type: String, default: 'NumberFieldType' },
		min: { type: Number, default: 1 },
		max: { type: Number, default: 255 },
		step: { type: Number, default: 1 },
		value: { type: Number, default: 1 }
	},
	twinkleSpeed: {
		name: { type: String, default: 'twinkleSpeed' },
		label: { type: String, default: 'Twinkle Speed' },
		type: { type: String, default: 'NumberFieldType' },
		min: { type: Number, default: 1 },
		max: { type: Number, default: 255 },
		step: { type: Number, default: 1 },
		value: { type: Number, default: 1 }
	},
	twinkleDensity: {
		name: { type: String, default: 'twinkleDensity' },
		label: { type: String, default: 'Twinkle Density' },
		type: { type: String, default: 'NumberFieldType' },
		min: { type: Number, default: 1 },
		max: { type: Number, default: 255 },
		step: { type: Number, default: 1 },
		value: { type: Number, default: 1 }
	}
};

const deviceSettingsSchema = {
	power: {
		name: { type: String, default: 'power' },
		label: { type: String, default: 'Power' },
		type: { type: String, default: 'BooleanFieldType' },
		value: { type: Number, default: 1 }
	},
	pattern: {
		name: { type: String, default: 'pattern' },
		label: { type: String, default: 'Pattern' },
		options: { type: Array },
		type: { type: String, default: 'SelectFieldType' },
		value: { type: Number, default: 1 }
	},
	palette: {
		name: { type: String, default: 'palette' },
		label: { type: String, default: 'Palette' },
		options: { type: Array },
		type: { type: String, default: 'SelectFieldType' },
		value: { type: Number, default: 1 }
	},
	autoplayPattern: {
		name: { type: String, default: 'autoplayPattern' },
		label: { type: String, default: 'Autoplay Pattern' },
		type: { type: String, default: 'BooleanFieldType' },
		value: { type: Number, default: 1 }
	},
	autoplayPalette: {
		name: { type: String, default: 'autoplayPalette' },
		label: { type: String, default: 'Autoplay Palette' },
		type: { type: String, default: 'BooleanFieldType' },
		value: { type: Number, default: 1 }
	},
	blendMode: {
		name: { type: String, default: 'blendMode' },
		label: { type: String, default: 'Blend Mode' },
		type: { type: String, default: 'BooleanFieldType' },
		value: { type: Number, default: 1 }
	},
	randomPatternMode: {
		name: { type: String, default: 'randomPatternMode' },
		label: { type: String, default: 'Randomize Patterns' },
		type: { type: String, default: 'BooleanFieldType' },
		value: { type: Number, default: 1 }
	},
	randomPaletteMode: {
		name: { type: String, default: 'randomPaletteMode' },
		label: { type: String, default: 'Randomize Palettes' },
		type: { type: String, default: 'BooleanFieldType' },
		value: { type: Number, default: 1 }
	},
	autoplayPatternDuration: {
		name: { type: String, default: 'autoplayPatternDuration' },
		label: { type: String, default: 'Autoplay Pattern Duration' },
		type: { type: String, default: 'NumberFieldType' },
		min: { type: Number, default: 1 },
		max: { type: Number, default: 255 },
		step: { type: Number, default: 1 },
		value: { type: Number, default: 30 }
	},
	autoplayPaletteDuration: {
		name: { type: String, default: 'autoplayPaletteDuration' },
		label: { type: String, default: 'Autoplay Palette Duration' },
		type: { type: String, default: 'NumberFieldType' },
		min: { type: Number, default: 1 },
		max: { type: Number, default: 255 },
		step: { type: Number, default: 1 },
		value: { type: Number, default: 30 }
	},
	strobe_settings: modeSettingsSchema,
	pulse_settings: modeSettingsSchema,
	cycling_rainbow_desaturated_settings: modeSettingsSchema,
	sparkle_settings: modeSettingsSchema,
	shooting_star_settings: modeSettingsSchema,
	color_waves_settings: modeSettingsSchema,
	beat_settings: modeSettingsSchema,
	pride_settings: modeSettingsSchema,
	juggle_settings: modeSettingsSchema,
	twinkle_settings: modeSettingsSchema,
	hsv_settings: modeSettingsSchema,
	rgb_settings: modeSettingsSchema
};

const deviceSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		device_name: { type: String },
		query_url: { type: String },
		location: { type: String },
		pathname: { type: String },
		device_settings: deviceSettingsSchema,
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const deviceModel = mongoose.model('Device', deviceSchema);

export default deviceModel;
