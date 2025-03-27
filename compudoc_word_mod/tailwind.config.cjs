module.exports = {
  content: [
    './src/*.{vue,js,ts,jsx,tsx}',
    './src/.cache/*.vue',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          500: "#3b82f6", // 替换成转换后的 hex 颜色
        },
      },
    },
  },
  plugins: [],
}
