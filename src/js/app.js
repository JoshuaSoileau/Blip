var app;
(function($) {
    function App() {
        this.init();
    }

    App.prototype = {
        init: function() {
            this.preview = $('#preview');
            this.modal = $("#components-modal-content");
            this.initObservers();
            this.buildLinks();
            this.initEditorLinks();
        },

        initEditorLinks: function() {
            var targets = [
                '[class*="text"]',
                '[class*="title"]'
            ];
            var elements = document.querySelectorAll(targets.join(', '));
            if(!this.editor) {
                this.editor = new MediumEditor(elements);
            } else {
                this.editor.addElements(elements);
            }
        },

        initObservers: function() {
            $(document).on('click', '.add-template-link', this.addComponent.bind(this));
        },

        buildLinks: function() {
            var types = Object.keys(components);
            types.forEach(function(type) {
                this.insertNewSection(type);
                var keys = Object.keys(components[type]);
                keys.forEach(function(key) {
                    this.buildLink(type, key);
                }.bind(this));
            }.bind(this));
        },

        insertNewSection: function(type) {
            if(components[type]["01"]) {
                this.modal.append('' +
                    '<h4>'+components[type]["01"]["name"]+'</h4>' +
                    '<ul id="links-list-'+type+'" class="link-list">' +
                    '</ul>');
            }
        },

        buildLink: function(type, key) {
            var component = components[type][key];
            this.modal.find('#links-list-'+type).append('' +
                '<li>' +
                    '<a href="#" class="add-template-link" data-template="'+component["templateId"]+'">' +
                        '<img src="'+component["image"]+'">' +
                    '</a>' +
                '</li>');
        },

        addComponent: function(event) {
            var target = $(event.target).is('a') ? $(event.target) : $(event.target).closest('a'),
                templateId = target.attr('data-template');
            $(this.preview).append( $('#'+templateId).html() );
            // $('.modal').modal('hide');
            $('.modal-backdrop').remove()
            window.dispatchEvent(new CustomEvent('initPhoenix'));
            this.initEditorLinks();
        }
    };
    $(function() {
        app = new App();
    });
})(jQuery);

