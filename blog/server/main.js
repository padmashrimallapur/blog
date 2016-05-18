Blogs = new Mongo.Collection("Blogs");

Meteor.methods({

    'submitPost':function(firstname, title, bloggerLastname, article, username){
        if (Meteor.user().username === username) {
                Blogs.insert({
                title:title,
                firstname : firstname,
                bloggerLastname: bloggerLastname,
                article : article,
                username : username,
                date: new Date().toString()
            })
        }
    }
    
});


