const React = require('react')

exports.onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script key="mr" type="text/javascript" src="/site.js" />,
  ])
}
