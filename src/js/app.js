var app;
(function($) {
    function App() {
        this.init();
    }

    App.prototype = {
        init: function() {
            $.expr[':'].emptyOrText = function(e) {
                return $(e).children().length <= 1;
            };

            this.preview = $('#preview');
            this.modal = $("#components-modal-content");
            this.initObservers();
            this.buildLinks();
            this.initEditorLinks();
            this.insertImageEditorControls();
        },

        initObservers: function() {
            $(document).on('click', '.add-template-link', this.addComponent.bind(this));
            $(document).on('change', '.image-editor-file-upload', this.uploadImage.bind(this));
        },

        insertImageEditorControls: function() {
            $('#preview .image-editor-controls').remove();
            $('#preview [style*="background-image"]').each(function(index, ele) {
                $(ele).prepend(
                    '<div class="image-editor-controls">' +
                        '<input type="file" name="file-'+index+'" id="file-'+index+'" class="image-editor-file-upload" placeholder="Change Image"/>' +
                        '<label for="file-'+index+'">Change Image</label>' +
                    '</div>'
                );
            });
        },

        uploadImage: function() {
            var input = $(event.target),
                target = $(event.target).closest('[style*="background-image"]');
            if(!target.length) return;
            var image = input[0].files[0];
            if(!image) return;
            debugger;
            var url = URL.createObjectURL(image);
            target.css('background-image', 'url(' + url + ')');
            console.log('found a target');
        },

        initEditorLinks: function() {
            var targets = [
                '#preview [class*="text"]:emptyOrText',
                '#preview [class*="link"]:emptyOrText',
                '#preview [class*="title"]:emptyOrText'
            ];
            var elements = $(targets.join(', ')).get();
            if(!this.editor) {
                this.editor = new MediumEditor(elements);
            } else {
                this.editor.addElements(elements);
            }
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
            $('.modal .close').click();
            this.initEditorLinks();
            this.insertImageEditorControls();
            // window.dispatchEvent(new CustomEvent('initPhoenix'));

            $('html, body').animate({
                scrollTop: $('#preview > *:last-child').offset().top - 50
            }, 1400);
        }
    };
    $(function() {
        app = new App();
    });
})(jQuery);

