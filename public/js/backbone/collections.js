$(function() {
    //App Collections
    App.Collections.eMails = Backbone.Collection.extend({
        model: App.Models.eMail,
        url:'/eMails'
    });
})