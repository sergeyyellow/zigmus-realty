$('.place-an-ad--button .info-icon').on('mouseover', function () {
    $(this).parent().find('.info-icon-prompt').fadeIn(150);
});

$('.place-an-ad--button .info-icon').on('mouseout', function () {
    $(this).parent().find('.info-icon-prompt').fadeOut(150);
});

// Functions
function userAccountShow() {
    let userAccountBlock = $('.user-account-icon').parent().find('.user-account__block');

    if (userAccountIconActive == false) {
        userAccountBlock.fadeIn(300);
        userAccountIconActive = true;

        if (notificationsIconActive == true) {
            notificationsShow();
        }

        if (favoritesIconActive == true) {
            favoritesShow();
        }
    } else {
        userAccountBlock.fadeOut(300);
        userAccountIconActive = false;
    }
}

function notificationsShow() {
    let notificationsBlock = $('.notifications-icon').parent().find('.notifications__block');

    if (notificationsIconActive == false) {
        notificationsBlock.fadeIn(300);
        notificationsIconActive = true;

        if (userAccountIconActive == true) {
            userAccountShow();
        }

        if (favoritesIconActive == true) {
            favoritesShow();
        }
    } else {
        notificationsBlock.fadeOut(300);
        notificationsIconActive = false;
    }
}

function favoritesShow() {
    let favoritesBlock = $('.favorites-icon').parent().find('.favorites__block');

    if (favoritesIconActive == false) {
        favoritesBlock.fadeIn(300);
        favoritesIconActive = true;

        if (userAccountIconActive == true) {
            userAccountShow();
        }

        if (notificationsIconActive == true) {
            notificationsShow();
        }
    } else {
        favoritesBlock.fadeOut(300);
        favoritesIconActive = false;
    }
}

// User account block show/hide
var userAccountIconActive = false;
$('.user-account-icon').on('click', userAccountShow);

// Notifications block show/hide
var notificationsIconActive = false;
$('.notifications-icon').on('click', notificationsShow);

// Favorites block show/hide
var favoritesIconActive = false;
$('.favorites-icon').on('click', favoritesShow);

// Notifications status remove class 'notifications--active'
$('.notifications-icon').on('click', function() {
    if ($('.notifications-status').hasClass('notifications--active')) {
        $('.notifications-status').removeClass('notifications--active').addClass('notifications--inactive');
    }
});

// Show/Hide search form
$('.search .search-icon').on('click', function() {
    let a = $(this).parent().parent().parent().parent().find('.search-form__container');
    
    if (userAccountIconActive == true) {
        userAccountShow();
    }

    if (notificationsIconActive == true) {
        notificationsShow();
    }

    if (favoritesIconActive == true) {
        favoritesShow();
    }

    a.slideDown(200);
    a.find('.search-form__field-text').focus();
});

$('.search-form__container .search-form__field-text').on('focusout', function() {
    $('.search-form__container').slideUp(200);
});

// Show/Hide dropdown
$('.search-form__container .search-form__field-text').on('input', function() {
    if ($(this).val() == '') {
        $(this).parent().find('.dropdown').slideUp(200);
    } else {
        $(this).parent().find('.dropdown').slideDown(200);
    }
});