Blogs = new Mongo.Collection('Blogs', {idGeneration: 'MONGO'});

if (Meteor.isClient) {

    Template.registerHelper('avatar', function (input) {
        return "/images/default-user.png";
    });

    Router.route('/register');
    Template.register.events({
        'submit form': function (event) {
            event.preventDefault();
            var email = $('[name= email]').val();
            var username = $('[name=username]').val();
            var password = $('[name=password]').val();
            var confirmPassword = $('[name= confirmPassword]').val();
            Meteor.call('checkPassword', password, confirmPassword, function (err, result) {
                if (result) {
                    console.log("The password matches");
                }
                else {
                    console.log("Email has been already registered with the other user");
                }
            });
            Accounts.createUser({
                    username: username,
                    password: password,
                    email: email,
                    confirmPassword: confirmPassword
                },
                function (error) {
                    if (error) {
                        return false;
                    } else {
                        Router.go('home');
                    }
                });
        }
    });

    Template.navigation.events({
        'click .logout': function (event) {
            event.preventDefault();
            Meteor.logout();
            Router.go('home');
        }
    });
}

Router.route('/login');
Template.login.events({
    'submit form': function (event) {
        event.preventDefault();
        var username = $('[name = username]').val();
        var password = $('[name = password]').val();
        Meteor.loginWithPassword(username, password, function (error) {
            if (error) {
                console.log(error.reason);
            }
            else {
                console.log("you are successfully logged in");
                Router.go('home');
            }
        });
    }
});

Meteor.methods({
    checkPassword: function (password, confirmPassword) {
        if (password != confirmPassword) {
            console.log("Password should match");
        }
    }
});

Router.route('/newblog');
Template.newblog.events({
    'submit form': function (event) {
        var firstName = $('[name=bloggerName]').val();
        var bloggerLastName = $('[name=bloggerLastName]').val();
        var article = $('[name=article]').val();
        var title = $('[name=title]').val();
        var username = Meteor.user().username;
        Meteor.call("submitPost", firstName, title, bloggerLastName, article, username);
    }
});

Router.route('/listblogs');
Template.listblogs.myblogs = function () {
    username = Meteor.user().username;
    return Blogs.find({"username": username});
};

Router.route('/editBlog');
Router.route('/newWindow');

Template.listblogs.events({
    'click .edit': function (event) {
        var blogId = event.target.value;

        Template.editBlog.currentBlog = function () {
            return Blogs.find({"_id": blogId});
        };
        Router.go('editBlog');
    },
    "click .deleteBlog": function (event) {
        Blogs.remove(this._id);
    }

});

Router.route('/home');
Template.home.allblogs = function () {
    return Blogs.find();
};

Router.route('/viewBlog/:_id', function () {
    this.render("viewOneBlog", {
        data: function () {
            console.log(this.params._id);
            console.log(Blogs.findOne({_id: this.params._id}));
            return Blogs.findOne({_id: this.params._id});
        }
    });
});


Template.editBlog.events({
    "submit form": function (events) {
        var firstName = $('[name=bloggerName]').val();
        var bloggerLastName = $('[name=bloggerLastName]').val();
        var article = $('[name=article]').val();
        var title = $('[name=title]').val();
        var blogId = $('[name=blogId]').val();
        var username = Meteor.user().username;

        //Posts.update('theCopied_Id', {$set: {title: 'Wow the title changed!'}});
        Meteor.call("updateBlog", firstName, title, bloggerLastName, article, username, blogId)

    }
});

// helper to get the date format
Template.registerHelper("dateFormater", function (timestamp) {
    console.log(moment(timestamp).format("MM.DD.YYYY"));
    return moment(timestamp).format("MM.DD.YYYY");

});


Template.registerHelper("isEmpty", function (object) {
    return jQuery.isEmpty(object);
});