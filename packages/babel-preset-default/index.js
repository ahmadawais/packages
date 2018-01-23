const env = process.env.BABEL_ENV || process.env.NODE_ENV;
const isTestEnv = env === 'test';

module.exports = {
	presets: [
		! isTestEnv && [ require( 'babel-preset-env' ), {
			modules: false,
			targets: {
				browsers: ['extends browserslist-config-wordpress'],
			},
		} ],
		isTestEnv && [ require( 'babel-preset-env' ) ],
	].filter( Boolean ),
	plugins: [
		require( 'babel-plugin-transform-object-rest-spread' ),
		[ require( 'babel-plugin-transform-react-jsx' ), {
			pragma: 'wp.element.createElement',
		} ],
		require( 'babel-plugin-transform-runtime' ),
		! isTestEnv && require( 'babel-plugin-lodash' ),
	].filter( Boolean ),
};
