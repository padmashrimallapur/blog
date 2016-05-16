Blogs = new Mongo.Collection("Blogs");
Meteor.methods({
    'submitPost':function(firstname, title, bloggerLastname, article){
        console.log(title);
        console.log(firstname);
        Blogs.insert({
            title:title,
            firstname : firstname,
            bloggerLastname: bloggerLastname,
            article : article
        })
    }
});


