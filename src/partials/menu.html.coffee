
nav class:'ban_menu', ->
    button class:'ban_menu__icon ban_js-menu', ->
        span class:'ban_menu__icon-helper'
    div class:'ban_menu__list-wrapper', ->
        ul class:'ban_menu__list ban_is-hidden ban_js-menu-items', ->
            for page, index in @site.pages
                linkcss = 'ban_menu__item-link' + if page.url == @document.url then ' ban_is-active' else ''
                li class:'ban_menu__item', ->
                    a class: linkcss, href:page.url, ->
                        text page.title
