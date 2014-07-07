$(function() {
    //App Views
    //View for one email item
    App.Views.eMail = Backbone.View.extend({
        tagName: 'tr',
        template: App.Helpers.template('emailTemplate'),

        initialize: function () {
            this.model.on('destroy', this.remove, this);
        },

        events: {
            'click .details': 'showMail',
            'click .reply': 'reply',
            'click .delete': 'destroy'
        },
        destroy: function () {
            this.model.destroy({
                success:function(){
                    console.log('destroyed');
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    //TODO use bootstrap to show this error
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });
        },
        remove: function () {
            this.$el.remove();
        },
        reply: function(){
            $('#inputUser').val(this.model.get('author').userName);
            $('#Subject').val('RE: '+ this.model.get('subject'));
            console.log('Need to reply to ' + this.model.get('author').userName);
        },
        showMail: function () {
            $('#'+this.model.get('id')).removeClass('unread');
            $('#'+this.model.get('id')).addClass('read');
            this.model.set({isRead:"true"});
            console.log(this.model);
            this.model.save(null,{
                success: function(){
                    console.log('readMail');
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });
            var bodyContentModal = '<div id="MessageBody" class="modal hide fade"> ' +
                '<div class="modal-header">      ' +
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> ' +
                '<h3>' +
                this.model.get('subject') +
                '</h3>    ' +
                '</div>           ' +
                '<div class="modal-body">   ' +
                '<p>' +
                this.model.get('body') +
                '</p>      ' +
                '</div>      ' +
                '<div class="modal-footer">   ' +
                '<a href="#" class="btn" data-dismiss="modal">Close</a>     ' +
                '</div>' +
                '</div>';
            $(bodyContentModal).modal('show');
        },
        render: function () {
            var template = this.template(this.model.toJSON());
            this.$el.html(template);
            if(this.model.get('isRead')==='true'){
                $(this.el).attr('id', this.model.get('id')).addClass('read');
            }
            else{
                $(this.el).attr('id', this.model.get('id')).addClass('unread');
            }
            return this;
        }
    });
    //view for the entire emails collection
    App.Views.eMails = Backbone.View.extend({
        tagName: 'tbody',
        render: function () {
            this.collection.each(this.addMail, this);
            this.collection.on( "add", this.addMail, this);

        },
        initialize: function () {
            this.render();
            var that = this.collection
            App.Helpers.socket.on('renderMails',function(data){
                var newMail = new App.Models.eMail({
                    author: data.mail.author,
                    body: data.mail.body,
                    date: data.mail.date,//(new Date((data.mail.date))).toLocaleString(),
                    isRead: data.mail.isRead,
                    subject: data.mail.subject,
                    id: data.mail._id
                })
                that.add(newMail);
            });
        },
        addMail: function (email) {
            //creating a new email
            var emailView = new App.Views.eMail({ model: email });
            //appending to emails list
            this.$el.prepend(emailView.render().el);
        }
    });
	
	App.Views.productView = Backbone.View.extend({
		tagName: 'tr',
        template: App.Helpers.template('emailTemplate'),
		render: function () {
            var template = this.template(this.model.toJSON());
            this.$el.html(template);
            return this;
        }
	
	});

})