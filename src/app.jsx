/**
 * Super simple client side application that mounts the contact form.
 *
 * Server side rendering just renders the HTML. Mounting is needed
 * in order to listen to DOM events such as the form submission.
 */

var React = require('react');
var ContactForm = require('./contact-form.jsx');

React.render(<ContactForm />, document.getElementById('container'));
