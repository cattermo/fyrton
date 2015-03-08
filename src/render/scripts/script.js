'use strict';

(function () {
    //classlist
    if (typeof window.Element === "undefined" || "classList" in document.documentElement) return;

    var prototype = Array.prototype,
        push = prototype.push,
        splice = prototype.splice,
        join = prototype.join;

    function DOMTokenList(el) {
      this.el = el;
      // The className needs to be trimmed and split on whitespace
      // to retrieve a list of classes.
      var classes = el.className.replace(/^\s+|\s+$/g,'').split(/\s+/);
      for (var i = 0; i < classes.length; i++) {
        push.call(this, classes[i]);
      }
    };

    DOMTokenList.prototype = {
      add: function(token) {
        if(this.contains(token)) return;
        push.call(this, token);
        this.el.className = this.toString();
      },
      contains: function(token) {
        return this.el.className.indexOf(token) != -1;
      },
      item: function(index) {
        return this[index] || null;
      },
      remove: function(token) {
        if (!this.contains(token)) return;
        for (var i = 0; i < this.length; i++) {
          if (this[i] == token) break;
        }
        splice.call(this, i, 1);
        this.el.className = this.toString();
      },
      toString: function() {
        return join.call(this, ' ');
      },
      toggle: function(token) {
        if (!this.contains(token)) {
          this.add(token);
        } else {
          this.remove(token);
        }

        return this.contains(token);
      }
    };

    window.DOMTokenList = DOMTokenList;

    function defineElementGetter (obj, prop, getter) {
        if (Object.defineProperty) {
            Object.defineProperty(obj, prop,{
                get : getter
            });
        } else {
            obj.__defineGetter__(prop, getter);
        }
    }

    defineElementGetter(Element.prototype, 'classList', function () {
      return new DOMTokenList(this);
    });

})();

(function(){
    //Responsive images
    var initResponsiveImages = function(){
        var screenelem = document.getElementById('screen'),
            screen = window.getComputedStyle(screenelem).getPropertyValue('width'),
            nodelist, i, elem;
        if(screen === '4px')
            return;
        switch(screen){
            case '1px':
                nodelist = document.querySelectorAll('img[data-source1]');
                for(i = 0; i<nodelist.length;i++) {
                    elem = nodelist[i];
                    elem.setAttribute('src', elem.getAttribute('data-source1'));
                }
                break;
            case '2px':
                nodelist = document.querySelectorAll('img[data-source2]'); 
                for(i = 0; i<nodelist.length;i++) {
                    elem = nodelist[i];
                    elem.setAttribute('src', elem.getAttribute('data-source2'));
                }
                break;
            case '3px':
                nodelist = document.querySelectorAll('img[data-source3]'); 
                for(i = 0; i<nodelist.length;i++) {
                    elem = nodelist[i];
                    elem.setAttribute('src', elem.getAttribute('data-source3'));
                }
                break;
        }
    };

    initResponsiveImages();  
})();

(function() {
    //Menu
    var initMenu = function() {
        var button = document.querySelector('.ban_js-menu'),
            list = document.querySelector('.ban_js-menu-items'),
            HIDE_CLASS = 'ban_is-hidden',
            EXPANDED_CLASS = 'ban_is-expanded',
            COLLAPSED_CLASS = 'ban_is-collapsed';


        button.addEventListener('click', function() {
            var container = this.parentNode;

            if (container.classList.contains(EXPANDED_CLASS)) {
                container.classList.remove(EXPANDED_CLASS);
                container.classList.add(COLLAPSED_CLASS);
                setTimeout(function() {
                    list.classList.add(HIDE_CLASS);
                }, 300); //Hack to wait for animation
            } else {
                list.classList.remove(HIDE_CLASS);

                setTimeout(function() {
                    container.classList.remove(COLLAPSED_CLASS);
                    container.classList.add(EXPANDED_CLASS);
                }, 50); //Hack to make items visible before sliding down list
            }
        }, false)
    }

    initMenu();
})();
