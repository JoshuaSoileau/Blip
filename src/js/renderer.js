var renderer;
(function($) {
    function Renderer() {
        this.init();
    }

    Renderer.prototype = {
        init: function() {
            this.initObservers();
        },

        initObservers: function() {
            $(document).on('rendererModal:open', this.openChooserModal.bind(this));
        },

        openChooserModal: function() {


        }
    };
    renderer = new Renderer();
})(jQuery);

