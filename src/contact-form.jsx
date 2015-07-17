var ContactForm = React.createClass({
  getInitialState: function() {
    return {
      sending: false,
      status: ''
    };
  },
  handleSubmit: function (event) {
    var i;
    event.preventDefault();
    this.setState({status: '', sending: true});

    // Scroll to the top of the page to show the status message.
    document.getElementById('heading').scrollIntoView();

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

    var url = 'send';
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
  /**
   * Transforms an object into a URL querystring.
   *
   * @param object params
   * @return string the formatted querystring.
   */
  requestBuildQueryString: function (params) {
    var queryString = [];
    for(var property in params)
      if (params.hasOwnProperty(property)) {
        queryString.push(encodeURIComponent(property) + '=' + encodeURIComponent(params[property]));
      }
    return queryString.join('&');
  },
  render: function() {
    if (this.state.status) {
      var status = <div id="status" className="alert alert-success" ref="status">{this.state.status}</div>;
    }
    return (
      <div>
        <h1 id="heading">React contact form example: Tell us about your project</h1>
        <p>This is a sample contact form powered by <a href="https://facebook.github.io/react/" target="_blank">React</a>,
          an isomorphic library built by Facebook. The form submission
           is handled by a simple <a href="https://nodejs.org/" target="_blank">Node.js</a> application written with <a href="http://expressjs.com/" target="_blank">Express</a>.</p>
        {status}
        <form action="" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your full name *</label>
            <input className="form-control" name="name" ref="name" required type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your email address *</label>
            <input className="form-control" name="email" ref="email" required type="email" />
          </div>
          <div className="form-group">
            <label htmlFor="company">Your company *</label>
            <input className="form-control" name="company" ref="company" required type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Your phone number *</label>
            <input className="form-control" name="phone" ref="phone" required type="phone" />
          </div>
          <div className="form-group">
            <label htmlFor="website">Project website URL</label>
            <input className="form-control" name="website" ref="website" type="url" />
          </div>

          <h3>How can we help&#63; *</h3>
          <div className="form-group">
            <label className="checkbox-inline"><input name="areas" ref="areas" type="checkbox" value="Strategy" />Strategy</label>
            <label className="checkbox-inline"><input name="areas" ref="areas" type="checkbox" value="UX Design" />UX Design</label>
            <label className="checkbox-inline"><input name="areas" ref="areas" type="checkbox" value="Development" />Development</label>
            <label className="checkbox-inline"><input name="areas" ref="areas" type="checkbox" value="Mentorship Consulting" />Mentorship Consulting</label>
            <label className="checkbox-inline"><input name="areas" ref="areas" type="checkbox" value="Training" />Training</label>
            <label className="checkbox-inline"><input name="areas" ref="areas" type="checkbox" value="Other" />Other</label>
          </div>

          <h3>How soon do we need to start&#63; *</h3>
          <div className="form-group">
            <label className="radio-inline"><input name="when" ref="when" type="radio" value="Immediately" /><span>Immediately</span></label>
            <label className="radio-inline"><input name="when" ref="when" type="radio" value="1-3 months" /><span>1-3 months</span></label>
            <label className="radio-inline"><input name="when" ref="when" type="radio" value="3-6 months" /><span>3-6 months</span></label>
            <label className="radio-inline"><input name="when" ref="when" type="radio" value="6-9 months" /><span>6-9 months</span></label>
            <label className="radio-inline"><input name="when" ref="when" type="radio" value="9-12 months" /><span>9-12 months</span></label>
            <label className="radio-inline"><input name="when" ref="when" type="radio" value="Not sure" /><span>Not sure</span></label>
          </div>

          <div className="form-group">
            <label htmlFor="budget">Give us a rough idea of your budget *</label>
            <input className="form-control" name="budget" ref="budget" type="text" />
          </div>

          <div className="form-group">
            <label htmlFor="project">Tell us about your project *</label>
            <textarea className="form-control" name="project" ref="project" rows="4" />
          </div>

          <div className="form-group">
            <label htmlFor="referral">How did you hear about us&#63;</label>
            <input className="form-control" name="referal" ref="referal" type="text" />
          </div>

          <div className="form-group">
            <button className="btn btn-primary" type="submit">Send your project info</button>
          </div>
        </form>
      </div>
    );
  }
});

React.render(<ContactForm />, document.getElementById('container'));
