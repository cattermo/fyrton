
nav class:'ban_menu', id:'menu', ->
    ul class:'ban_menu__list ban_is-hidden ban_js-menu-items', ->
        for page, index in @site.pages
            linkcss = 'ban_menu__item-link' + if page.url == @document.url then ' ban_is-active' else ''
            li class:'ban_menu__item', ->
                a class: linkcss, href:page.url + '#menu', ->
                    text page.title
