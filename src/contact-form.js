var ContactForm = React.createClass({
  getInitialState: function() {
    return {
      sending: false,
      status: ''
    };
  },
  handleSubmit: function (event) {
    event.preventDefault();
    this.setState({status: '', sending: true});

    // Scroll to the status message.
    document.getElementById('status').scrollIntoView();

    var i;

    // Prepare form data for submitting it.
    var formData = {
      budget: React.findDOMNode(this.refs.budget).value,
      company: React.findDOMNode(this.refs.company).value,
      email: React.findDOMNode(this.refs.email).value,
      name: React.findDOMNode(this.refs.name).value,
      phone: React.findDOMNode(this.refs.phone).value,
      project: React.findDOMNode(this.refs.project).value,
      referal: React.findDOMNode(this.refs.referal).value,
      website: React.findDOMNode(this.refs.website).value
    };

    // Extract checked values from "How can we help?".
    var areas = document.getElementsByName('areas');
    var checkedAreas = [];
    for (i = 0; i < areas.length; i++) {
      if (areas[i].checked === true) {
        checkedAreas.push(areas[i].value);
      }
    }
    formData.areas = checkedAreas.join(', ');

    // Extract selected value from "How soon do we need to start?".
    var when = '';
    var whenRadios = document.getElementsByName('when');
    for (i = 0; i < whenRadios.length; i++) {
      if (whenRadios[i].checked === true) {
        when = whenRadios[i].value;
      }
    }
    formData.when = when;

    var url = '/contact-handler';
    var xmlhttp = new XMLHttpRequest();
    var _this = this;
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
        _this.setState({sending: false});
        var response = JSON.parse(xmlhttp.responseText);
        if (xmlhttp.status === 200 && response.status === 'OK') {
          _this.setState({status: 'We have received your message and will get in touch shortly. Thanks!'});
        }
        else {
          _this.setState({status: 'Sorry, there has been an error. Please try again later or send us an email at info at lullabot.com'});
        }
      }
    };
    xmlhttp.open('POST', url, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(this.requestBuildQueryString(formData));
  },
  render: function() {
    return (
      <div>
        <h2>Tell us about your project</h2>
        <div id="status" ref="status">
          Sending...
        </div>
        <form action="" onSubmit={this.handleSubmit}>
          <h3>How can we get in touch&#63;</h3>
          <p>
            <label htmlFor="name">Your full name *</label>
            <input name="name" ref="name" required type="text" />
          </p>
          <p>
            <label htmlFor="email">Your email address *</label>
            <input name="email" ref="email" required type="email" />
          </p>
          <p>
            <label htmlFor="email">Your company *</label>
            <input name="company" ref="company" required type="text" />
          </p>
          <p>
            <label htmlFor="email">Your phone number *</label>
            <input name="phone" ref="phone" required type="phone" />
          </p>
          <p>
            <label htmlFor="email">Project website URL</label>
            <input name="website" ref="website" type="url" />
          </p>

          <h3>How can we help&#63; *</h3>
          <p>
            <em>Choose all that apply:</em>
            <label><input name="areas" ref="areas" type="checkbox" value="Strategy" /><span>Strategy</span></label>
            <label><input name="areas" ref="areas" type="checkbox" value="UX Design" /><span>UX Design</span></label>
            <label><input name="areas" ref="areas" type="checkbox" value="Development" /><span>Development</span></label>
            <label><input name="areas" ref="areas" type="checkbox" value="Mentorship Consulting" /><span>Mentorship Consulting</span></label>
            <label><input name="areas" ref="areas" type="checkbox" value="Training" /><span>Training</span></label>
            <label><input name="areas" ref="areas" type="checkbox" value="Other" /><span>Other</span></label>
          </p>

          <h3>How soon do we need to start&#63; *</h3>
          <p>
            <em className="layout-contact__project-form__helper-text">Choose one:</em>
            <label><input name="when" ref="when" type="radio" value="Immediately" /><span>Immediately</span></label>
            <label><input name="when" ref="when" type="radio" value="1-3 months" /><span>1-3 months</span></label>
            <label><input name="when" ref="when" type="radio" value="3-6 months" /><span>3-6 months</span></label>
            <label><input name="when" ref="when" type="radio" value="6-9 months" /><span>6-9 months</span></label>
            <label><input name="when" ref="when" type="radio" value="9-12 months" /><span>9-12 months</span></label>
            <label><input name="when" ref="when" type="radio" value="Not sure" /><span>Not sure</span></label>
          </p>

          <p>
            <label htmlFor="budget">Give us a rough idea of your budget *</label>
            <input name="budget" ref="budget" type="text" />
          </p>

          <p>
            <label htmlFor="project">Tell us about your project *</label>
            <textarea name="project" ref="project" rows="4" />
          </p>

          <p>
            <label htmlFor="referral">How did you hear about us&#63;</label>
            <input name="referal" ref="referal" type="text" />
          </p>

          <p>
            <button type="submit">Send your project info</button>
          </p>
        </form>
      </div>
    );
  }
});

React.render(<ContactForm />, document.getElementById('container'));
