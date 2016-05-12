//users = new Mongo.Collection('users');
if (Meteor.isClient) {

  Template.register.events ({
    'submit form' : function(event){
      event.preventDefault();
      var email  = $('[name= email]').val();
      var username = $('[name=username]').val();
      var password = $('[name=password]').val();
      var confirmPassword = $('[name= confirmPassword]').val();
      Meteor.call('checkPassword', password, confirmPassword, function(err, result){
        if(result){
          console.log("The password matches");
        }
        else{
          console.log("Email has been already registered with the other user");
        }
      });
      Accounts.createUser({
        username : username,
        password : password,
        email : email,
        confirmPassword : confirmPassword},
          function (error) {
            if(error){
            //error info
              return false;
          }else {
            //
              Router.go('home');
            }
          });
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

Template.login.events({
  'submit form': function(event){
    event.preventDefault();
    var username = $('[name = username]').val();
    var password = $('[name = password]').val();
    Meteor.loginWithPassword(username, password, function(error){
      if(error){
        console.log(error.reason);
      }
      else{
        console.log("you are successfully logged in");
        Router.go('home');
      }
    });
  }
});

Meteor.methods({
  checkPassword: function(password, confirmPassword){
   // check(password, String);
   // check(confirmPassword, String);
    if(password != confirmPassword){
      console.log("Password should match");
    }
  }
})

Router.route('/register');
Router.route('/login');
Router.route('/home');
