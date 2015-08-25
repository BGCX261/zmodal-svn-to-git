$.fn.extend({

    makeModal: function (options) {


        var modalDiv = $(this);
        modalDiv.addClass('dvModal');
        if (document.getElementById('modalFull') == null) {
            modalDiv.before("<div class='fullModal' id='modalFull'><div class='modalWrapper'></div></div>");
        }

        if (!options.hideDefaultClose) {
            addDefaultClossButton();
        }
        if (options.setModalButtonCss) {
            modalDiv.find('input:button, input:submit').removeClass();
            modalDiv.find('input:button, input:submit').addClass('modal_button');
            if (jQuery.browser.msie) {
                $('.modal_button').css('background', '#1A497C');
            }
        }
        function addDefaultClossButton() {
            if (document.getElementById("close" + modalDiv.get(0).id) == null) {
                modalDiv.append("<span class='modal_button modal_button_close' id='close" + modalDiv.get(0).id + "'>X</span>");
                var closeButton = $("#close" + modalDiv.get(0).id);
                closeButton.bind('click._cgateModal', function () { modalDiv.hideModal(); });
                if (jQuery.browser.msie) {
                    $('.modal_button').css('background', '#1A497C');
                }
            }
        }
    },

    showModal: function (options) {
        if (!options) {
            options = {};
        }
        var modalDiv = $(this);
        if (!modalDiv.hasClass('dvModal')) {
            modalDiv.makeModal(options);
        }
        var topPostion = ($(window).height() - modalDiv.height()) / 2;
        var leftPosition = ($(window).width() - modalDiv.width()) / 2;
        modalDiv.css('top', topPostion);
        modalDiv.css('left', leftPosition);
        var closeButton = $("#close" + modalDiv.get(0).id);
        if (closeButton) {
            closeButton.css('position', 'fixed');
            closeButton.css('left', leftPosition + modalDiv.width() - 7);
            closeButton.css('top', topPostion - 5);
        }
        $(document).bind('keyup', function (event) { hideOnEscape(event); })
        function hideOnEscape(evt) {
            if (evt.which == '27') {
                $(document).unbind('keyup');
                modalDiv.hideModal();
            }
        }
        if (options.opacity) {
            $('.modalWrapper').css('opacity', options.opacity);
        }
        else {
            $('.modalWrapper').css('opacity', '0.3');
        }
        if (options.bgColor) {
            $('.modalWrapper').css('background-color', options.bgColor);
        }
        else {
            $('.modalWrapper').css('background-color', '#333333');
        }
        $('#modalFull').fadeIn('normal');
        modalDiv.fadeIn('slow');

    },

    hideModal: function (c) {
        $('#modalFull').fadeOut('slow');
        $(this).fadeOut('normal');
    }
});


