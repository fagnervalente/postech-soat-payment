module.exports = {
	default: [
		"--require-module ts-node/register",
		"--require-module tsconfig-paths/register",
		"--require ./tests/steps/**/*.ts",
		"tests/features/**/*.feature"
	].join(" "),
};