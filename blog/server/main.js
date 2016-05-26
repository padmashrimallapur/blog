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
    },

    'updateBlog' : function (firstname, title, bloggerLastname, article, username, blogId) {
        if(Meteor.user().username === username){
            debugger;
            Blogs.update( blogId, {$set: {

                title: title,
                firstname: firstname,
                bloggerLastname: bloggerLastname,
                article: article,
                username: username,
                date: new Date().toString(), function(error){

                    if (error) {
                        alert("vnkvnkv");
                        console.log(error);
                    } else {

                        alert("ascosajlca");
                        console.log("askckajhkahvk");
                    }

                }
            }
            })
        }
    }
    
});


