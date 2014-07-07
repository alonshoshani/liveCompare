$(function() {
    //App Router
    App.Router = Backbone.Router.extend({
        routes:{
            '':'index',
            'show/:id':'show',
            '*other':'default'
        },
        index: function(){
            console.log('THIS IS EMAIL PAGE');
        },
        show: function (id) {
            //App.Helpers.vent.trigger('eMails:show',id);
            var user = new App.Models.User({id : id});
            App.Helpers.socket.emit('registerUser', { user:user  });
            user.fetch({
                success:function(userModel){
                    //create a view for compose mail
                    new App.Views.composeMail({model:user});
                    var userView =  new App.Views.User({model:user});
                    var u = userModel.toJSON();
                    //$(document.body).append(userView.el);
                    $('#user_details').append(userView.el);
                    var eMails = new App.Collections.eMails(App.Helpers.parseUserMails((u.mails)));
                    var eMailsView = new App.Views.eMails({ collection: eMails });
                    //$(document.body).append(eMailsView.el);
                    $('#mails_details').append(eMailsView.el);
                },
                error: function(jqXHR) {
                    console.log(jqXHR);
                }
            });
        },
        default: function(other){
            //show 404
            alert(other + ' Doesnt Exists!');
        }
    });
    new App.Router;
    Backbone.history.start();
})