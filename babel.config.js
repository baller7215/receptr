module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ["babel-preset-expo", { jsxImportSource: "nativewind" }],
            "nativewind/babel",
        ],
        plugins: [
            // ['module:react-native-dotenv'],
            // ['expo-env'],
            // ['react-native-dotenv']
        ]
    };
};