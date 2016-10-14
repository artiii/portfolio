/*map*/

function initMap() {
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    scrollwheel: false,
    zoom: 8
  });
}

/*preloader*/


$(function () {

  var imgs = [];

  $.each($('*'), function () {
    var
        $this = $(this),
        background = $this.css('background-image'),
        img = $this.is('img');

    if (background != 'none') {
      var path = background.replace('url("', '').replace('")', '');
      imgs.push(path);
      console.log(path);
    }

    if (img) {
      var path = $this.attr('src');
        console.log(path);
      if (path) {
        imgs.push(path);
      }
    }
  });

  var percentsTotal = 1;

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

  function setPercents(total, current) {
    var percent = Math.ceil(current / total * 100);

    if (percent >= 100) {
      $('.preloader').fadeOut();
    }

    $('.preloader__percents').text(percent + '%');
  }
});

//
// (function( $ ){
//   $.fn.myPluginName = function() {
//     var imgs = [];
//
//     $.each($('*'), function () {
//       var
//           $this = $(this),
//           background = $this.css('background-image'),
//           img = $this.is('img');
//
//       if (background != 'none') {
//         var path = background.replace('url("', '').replace('")', '');
//         imgs.push(path);
//         console.log(path);
//       }
//
//       if (img) {
//         var path = $this.attr('src');
//         console.log(path);
//         if (path) {
//           imgs.push(path);
//         }
//       }
//     });
//   return imgs
//   };
// })( jQuery );
//


// var myPluginName = function () {
//
//   var imgs = [];
//
//   $.each($('*'), function () {
//     var
//         $this = $(this),
//         background = $this.css('background-image'),
//         img = $this.is('img');
//
//     if (background != 'none') {
//       var path = background.replace('url("', '').replace('")', '');
//       imgs.push(path);
//       console.log(path);
//     }
//
//     if (img) {
//       var path = $this.attr('src');
//       if (path) {
//         imgs.push(path);
//       }
//     }
//   });
//   return imgs;
// }();
//
// // var qq = myPluginName();
//
// console.log(imgs);

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
        console.log('Error');
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
    console.log('submit');

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
        console.log('Публичный метод');
      }
    }
  }

  w.formQtp = my;

})(jQuery, window);