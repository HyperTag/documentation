// postcss.config.js
const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: ['./src/**/*.js'],
  css: ['./src/**/*.css'],
  whitelist: ['hidden', 'font-bold'],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
})

module.exports = () => ({
  plugins: [
    require('postcss-easy-import'),
    require('tailwindcss'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
})
