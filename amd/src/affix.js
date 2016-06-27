/* jshint ignore:start */
define(['jquery', 'core/log'], function($, log) {

  "use strict"; // jshint ;_;

  log.debug('Campus affix AMD');

  /* ==========================================================
   * bootstrap-affix.js v2.3.2
   * http://getbootstrap.com/2.3.2/javascript.html#affix
   * ==========================================================
   * Copyright 2013 Twitter, Inc.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * ========================================================== */

  "use strict"; // jshint ;_;


  /* AFFIX CLASS DEFINITION
   * ====================== */

  var Affix = function (element, options) {
    this.options = $.extend({}, $.fn.affix.defaults, options)
    this.$window = $(window)
      .on('scroll.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.affix.data-api',  $.proxy(function () { setTimeout($.proxy(this.checkPosition, this), 1) }, this))
    this.$element = $(element)
    this.checkPosition()
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
      , scrollTop = this.$window.scrollTop()
      , position = this.$element.offset()
      , offset = this.options.offset
      , offsetBottom = offset.bottom
      , offsetTop = offset.top
      , reset = 'affix affix-top affix-bottom'
      , affix

    if (typeof offset != 'object') offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function') offsetTop = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    affix = this.unpin != null && (scrollTop + this.unpin <= position.top) ?
      false    : offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ?
      'bottom' : offsetTop != null && scrollTop <= offsetTop ?
      'top'    : false

    if (this.affixed === affix) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? position.top - scrollTop : null

    this.$element.removeClass(reset).addClass('affix' + (affix ? '-' + affix : ''))
  }


  /* AFFIX PLUGIN DEFINITION
   * ======================= */

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('affix')
        , options = typeof option == 'object' && option
      if (!data) $this.data('affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix

  $.fn.affix.defaults = {
    offset: 0
  }


  /* AFFIX NO CONFLICT
   * ================= */

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  /* AFFIX DATA-API
   * ============== */

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
        , data = $spy.data()
       data.offset = data.offset || {}

      data.offsetBottom && (data.offset.bottom = data.offsetBottom)
      data.offsetTop && (data.offset.top = data.offsetTop)

      $spy.affix(data)
    })
  })

  return {
    init: function() {
      $(document).ready(function($) {
        $('.campusnavbar').affix({
          offset: {
            top: function() {
              return $('#page-header').height()
            }
          }
        });
        $("body").addClass("hasaffix");

        // Task #743 - Anchor links have a positioning problem - will only kick in if 'stickynavbar' setting is set.
        // See also: https://github.com/twbs/bootstrap/issues/1768
        // If the navbar is fixed and you have anchor links, then clicking on a link takes you to the target but the target
        // is obscured underneath the navbar.
        var navbarheight = $('.campusnavbar').height();
        navbarheight = navbarheight + 10;
        $('#region-main a[href~="#"]').each(function() { // Anchors.
            $($(this).attr("href")).css("padding-top", navbarheight + "px").css("margin-top", "-" + navbarheight + "px");
        });
      });
      log.debug('Campus affix AMD init');
    }
  }
});
/* jshint ignore:end */
