//users = new Mongo.Collection('users');
if (Meteor.isClient) {

  Template.register.events ({
    'submit form' : function(event){
      event.preventDefault();
      var username = $('[name=username]').val();
      var password = $('[name=password]').val();
      Accounts.createUser({
        username : username,
        password : password
      });

      Router.go('home');
    }
  });

  Template.navigation.events({
    'click .logout': function(event){
      event.preventDefault();
      Meteor.logout();
      Router.go('login');
    }
  });

}


Router.route('/register');
Router.route('/login');
Router.route('/home');
