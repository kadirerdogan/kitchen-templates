pageSession.set("errorMessage", "");

Template.TEMPLATE_NAME.rendered = function() {
	/*TEMPLATE_RENDERED_CODE*/
	$("input[autofocus]").focus();
};

Template.TEMPLATE_NAME.created = function() {
	pageSession.set("errorMessage", "");
};

Template.TEMPLATE_NAME.events({
	"submit #login_form": function(e, t) {
		e.preventDefault();
		pageSession.set("errorMessage", "");

		var submit_button = $(t.find(":submit"));

		var login_email = t.find('#login_email').value.trim();
		var login_password = t.find('#login_password').value;

		// check email
		if(!isValidEmail(login_email))
		{
			pageSession.set("errorMessage", "Please enter your e-mail address.");
			t.find('#login_email').focus();
			return false;
		}

		// check password
		if(login_password == "")
		{
			pageSession.set("errorMessage", "Please enter your password.");
			t.find('#login_email').focus();
			return false;
		}

		submit_button.addClass('disabled loading');
		Meteor.loginWithPassword(login_email, login_password, function(err) {
			submit_button.removeClass('disabled loading');
			if (err)
			{
				pageSession.set("errorMessage", err.message);
				return false;
			}
		});
		return false;
	},

	"click #login-with-google": function(e, t) {
		e.preventDefault();
		pageSession.set("errorMessage", "");

		var button = $(e.currentTarget);
		button.addClass('disabled loading');

		Meteor.loginWithGoogle(
			{
				requestPermissions: ["email"]
			},
			function(err) {
				button.removeClass('disabled loading');;
				if (err)
				{
					pageSession.set("errorMessage", err.message);
					return false;
				}
			}
		);

		return false;
	},

	"click #login-with-github": function(e, t) {
		e.preventDefault();
		pageSession.set("errorMessage", "");

		var button = $(e.currentTarget);
		button.addClass('disabled loading');

		Meteor.loginWithGithub(
			{
				requestPermissions: ["public_repo", "user:email"]
			},
			function(err) {
				button.removeClass('disabled loading');
				if (err)
				{
					pageSession.set("errorMessage", err.message);
					return false;
				}
			}
		);

		return false;
	},

	"click #login-with-linkedin": function(e, t) {
		e.preventDefault();
		pageSession.set("errorMessage", "");

		var button = $(e.currentTarget);
		button.addClass('disabled loading');

		Meteor.loginWithLinkedin(
			{
				requestPermissions: ["r_emailaddress"]
			},
			function(err) {
				button.removeClass('disabled loading');
				if (err)
				{
					pageSession.set("errorMessage", err.message);
					return false;
				}
			}
		);

		return false;
	},

	"click #login-with-facebook": function(e, t) {
		e.preventDefault();
		pageSession.set("errorMessage", "");

		var button = $(e.currentTarget);
		button.addClass('disabled loading');

		Meteor.loginWithFacebook(
			{
				requestPermissions: ["email"]
			},
			function(err) {
				button.removeClass('disabled loading');
				if (err)
				{
					pageSession.set("errorMessage", err.message);
					return false;
				}
			}
		);

		return false;
	},

	"click #login-with-twitter": function(e, t) {
		e.preventDefault();
		pageSession.set("errorMessage", "");

		var button = $(e.currentTarget);
		button.addClass('disabled loading');

		Meteor.loginWithTwitter(
			{
				requestPermissions: ["email"]
			},
			function(err) {
				button.removeClass('disabled loading');
				if (err)
				{
					pageSession.set("errorMessage", err.message);
					return false;
				}
			}
		);

		return false;
	},

	"click #login-with-meteor": function(e, t) {
		e.preventDefault();
		pageSession.set("errorMessage", "");

		var button = $(e.currentTarget);
		button.addClass('disabled loading');

		Meteor.loginWithMeteorDeveloperAccount(
			{
				requestPermissions: ["email"]
			},
			function(err) {
				button.removeClass('disabled loading');
				if (err)
				{
					pageSession.set("errorMessage", err.message);
					return false;
				}
			}
		);

		return false;
	}
	/*EVENTS_CODE*/
});

Template.TEMPLATE_NAME.helpers({
	errorMessage: function() {
		return pageSession.get("errorMessage");
	}
	/*HELPERS_CODE*/
});
