/*flip hello menu*/

(function () {
  $('.button__link_hello').on('click', function(){
    if ($('.flipper').hasClass('flip')) {
      $('.flipper').removeClass('flip');
      return
    } else {
      $('.flipper').addClass('flip');
    }
  });
  $('.button__link-authorization_back').on('click', function () {
    $('.flipper').removeClass('flip');
  })
}());



/*header menu*/
$('.menu__link').on('click', function(){
  $('.menu__nav').toggle()
});

$('.menu__link').on('click', function(){
  if ($('.menu__nav').is(':hidden')) {
    $('.menu__link').removeClass('red');
    return
  } else {
    $('.menu__link').addClass('red');
  }
});

/*map*/

function initMap() {
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 59.998958, lng: 30.369851},
    scrollwheel: false,
    zoom: 15,
    styles: [{"featureType":"all","elementType":"all","stylers":[{"visibility":"on"},{"hue":"#ff0000"}]},{"featureType":"all","elementType":"geometry","stylers":[{"saturation":"100"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"hue":"#ff0000"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"hue":"#ff0000"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape.natural.terrain","elementType":"labels.text.stroke","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#86a77a"},{"visibility":"on"}]}]
  });
}

/*preloader*/


var preloader = (function () {
  var
      imgs = [],
      percentsTotal = 1,
      _findUrlImg = function (){
        $.each($('*'), function () {
          var
              $this = $(this),
              background = $this.css('background-image'),
              img = $this.is('img');

          if (background != 'none') {
            var path = background.replace('url("', '').replace('")', '');
            imgs.push(path);
          }

          if (img) {
            var path = $this.attr('src');
            if (path) {
              imgs.push(path);
            }
          }
        });
        imgTotal = imgs.length;
        return imgs
      },
      _PerCents = function() {
        for (var i = 0; i < imgs.length; i++) {
          var image = $('<img>', {
            attr: {
              src: imgs[i]
            }
          });

          image.on({
            load : function () {
              setPercents(imgs.length, percentsTotal);
              percentsTotal++;
            },

            error : function () {
              percentsTotal++;
            }
          });
        }
      },
      setPercents = function () {
        var percent = Math.ceil(percentsTotal * 100 / imgTotal );
        console.log(percentsTotal);
        if (percent >= 100) {
          $('.preloader').fadeOut();
        }

        $('.preloader__percents').text(percent + '%');
      },
      init = function () {
        _findUrlImg();
        _PerCents();

      };
  init();

}());

/*form*/

var validation = (function () {
  var init = function () {
        _setUpListeners();
      },
      validateForm = function (form) {
        // Проверяет, чтобы все поля формы были не пустыми. Если пустые - вызывает тултипы

        var elements = form.find('input, textarea').not('input[type="hidden"]'),
            valid = true;

        $.each(elements, function (index, element) {
          var $element = $(element),
              value = $element.val();

          if (!value.length) {
            _addError($element);
            valid = false;
          }
        });

        return valid;

      },
      _setUpListeners = function () { // Прослушивает все события
        // удаляем красную обводку у элементов форм по нажатию клавиши
        $('form').on('keydown', '.has-error', _removeError);
        // удаляем красную обводку у элементов форм по клику мышки
        $('form').on('click', '.has-error', _removeError);
        // при сбросе формы удаляем также: тултипы и обводку
        $('form').on('reset', _clearForm);
      },
      _removeError = function () {
        $(this).removeClass('has-error'); // Убирает красную обводку у элементов форм
      },
      _addError = function (element) {
        element.addClass('has-error');
        _createQtip(element, element.data('position'));
        // console.log('Error');
      },
      _clearForm = function (e) { // Очищает форму
        var $form = $(this);

        $form.find('input').trigger('hideTooltip'); // удаляем тултипы
        $form.find('.has-error').removeClass('has-error'); // удаляем красную подсветку

      },
      _createQtip = function (element, position) { // Создаёт тултипы
        // позиция тултипа
        if (position === 'right') {
          position = {
            my: 'left center',
            at: 'right center'
          }
        } else {
          position = {
            my: 'right center',
            at: 'left center',
            adjust: {
              method: 'shift none'
            }
          }
        };
        // инициализация тултипа
        element.qtip({
          content: {
            text: function () {
              return $(this).data('content');
            }
          },
          show: {
            event: 'show'
          },
          hide: {
            event: 'keydown click hideTooltip'
          },
          position: position,
          style: {
            classes: 'qtip-mystyle qtip-rounded',
            tip: {
              height: 10,
              width: 10
            }
          }
        }).trigger('show');
      };

  return {
    init: init,
    validateForm: validateForm
  };


}());
//Инициализация модуля validation
validation.init();

(function ($, w) {
  var my = {};

  publicInteface()
  init();
  addListener();

  function addListener() {
    $('#form-login').on('submit', submitForm);
  }

  function submitForm(e) {
    e.preventDefault();
    var $form = $(this),
        url = '',
        defObject = ajaxForm($form, url);
    // console.log('submit');

  }

  function ajaxForm(form, url) {
    if (!validation.validateForm(form)) {
      return false; // Возвращает false, если не проходит валидацию
    }
    // запрос
  }

  function init() {
    // Инициализация модуля
    my.publicMethod();
  }

  function publicInteface() {
    my = {
      publicMethod: function () {
        // console.log('Публичный метод');
      }
    }
  }

  w.formQtp = my;

})(jQuery, window);


/*slider*/

$(document).ready(function(e){
  var sliderObject ={
    name1: 'САЙТ ШКОЛЫ ОНЛАЙН ОБРАЗОВАНИЯ',
    name2: 'САЙТ ШКОЛЫ ОНЛАЙН ОБРАЗОВАНИЯ',
    name3: 'САЙТ ШКОЛЫ ОНЛАЙН ОБРАЗОВАНИЯ',
    name4: 'САЙТ ШКОЛЫ ОНЛАЙН ОБРАЗОВАНИЯ',
    image1: './assets/img/pic/work-1.png',
    image2: './assets/img/pic/work-2.png',
    image3: './assets/img/pic/work-3.png',
    image4: './assets/img/pic/work-4.png',
    technologies1: 'HTML, CSS, JAVASCRIPT',
    technologies2: 'HTML, CSS, JAVASCRIPT',
    technologies3: 'HTML, CSS, JAVASCRIPT',
    technologies4: 'HTML, CSS, JAVASCRIPT'
  };
  var item = ['name1','name2','name3','name4'];
  var itemImg = ['image1','image2','image3','image4'];
  var itemTechnologies = ['technologies1','technologies2','technologies3','technologies4'];
  var sliderTitle = $('.work__title');
  var sliderImg = $('.slider__img');
  var sliderTechnologies = $('.work__technology');
  var i = 0;


  $('.slider__button-right').on('click', function(){
    setTimeout(function(){
      sliderTitle.removeClass('bounceInDown');
      sliderImg.removeClass('bounceInUp');
    }, 1000);
    i++;
    if(i > item.length-1){
      i = 0;
    }

    sliderImg.attr('src', sliderObject[itemImg[i]]);
    sliderTitle.text(sliderObject[item[i]]);
    sliderTechnologies.text(sliderObject[itemTechnologies[i]]);
    sliderTitle.addClass('bounceInDown');
    sliderImg.addClass('bounceInUp');
  });

  $('.slider__button-left').on('click', function(){
    i--;
    if(i < 0){
      i = item.length-1;
    }
    setTimeout(function(){
      sliderTitle.removeClass('bounceInDown');
      sliderImg.removeClass('bounceInUp');
    }, 1000);
    sliderImg.attr('src', sliderObject[itemImg[i]]);
    sliderTitle.text(sliderObject[item[i]]);
    sliderTechnologies.text(sliderObject[itemTechnologies[i]]);
    sliderTitle.addClass('bounceInDown');
    sliderImg.addClass('bounceInUp');
  });

});
//
// $('.menu__link').on('click', function(){
//   if ($('.menu__nav').is(':hidden')) {
//     $('.menu__link'').removeClass('red')
//     console.log('hidden');
//     return
//   }
//   $('.menu__link'').addClass('red');
// });

// $('.menu__nav').on('click', function(){
//   if ($(this).hasClass('red')) {
//     $(this).removeClass('red').addClass('green').html('Ещё раз');
//     return
//   }
//   $(this).removeClass('green').addClass('red').html('Нажать');
// });
//
//
// $('.menu__nav').is(':hidden', function () {
//   $('menu__link').addClass('red')
// });
//
// $('.menu__link').on('click', function(){
//   if ($('.menu__nav').is(':hidden')) {
//     $('.menu__link').removeClass('red');
//     console.log('hidden');
//     return
//   } else {
//     $('.menu__link'').addClass('red');
//   }
// });