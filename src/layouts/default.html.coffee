

# HTML
doctype 5
html lang: 'en', ->
    head ->
        # Standard
        meta charset: 'utf-8'
        meta 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1'
        meta 'http-equiv': 'content-type', content: 'text/html; charset=utf-8'
        meta name: 'viewport', content: 'width=device-width, initial-scale=1'
        title ->
            text @getPreparedTitle()
        meta name:'description', content: @site.description
        meta property:'og:title', content: @document.title
        meta property:'og:description', content:@site.description
        meta property:'og:image', content:'http://bandettes-cattermo.rhcloud.com/images/bandettes_background_16_9_md.jpg'
        meta property:'twitter:card', content: 'summary'
        meta property:'twitter:site', content: '@thebandettes'
        meta property:'twitter:title', content: @document.title
        meta property:'twitter:description', content:@site.description
        meta property:'twitter:image', content:'http://bandettes-cattermo.rhcloud.com/images/bandettes_background_16_9_md.jpg'
        link rel:'shortcut icon', href:'/images/favicon.ico', type:'image/x-icon'

        # Styles
        link rel:'stylesheet', media:'all', href:@asset('styles/styles.css')

        text '''
        <!--[if lt IE 9]>
            <script type="text/javascript" 
                src="http://html5shiv.googlecode.com/svn/trunk/html5.js">
            </script>
        <![endif]-->
        '''

    body class:'ban_background', ->
        text @partial 'icons'
        div class:'ban_screenwidth', id:'screen'
        text @partial 'header'
        div '.ban_main', ->
            @content

        div '.ban_footer', ->
            a class:'ban_footer__contact', href:'mailto:info@thebandettes.com', ->
                text 'info@thebandettes.com'
            ul '.ban_footer__list', ->
                for page, index in @site.pages
                    li '.ban_footer__list-item', ->
                        a href:page.url, class:'ban_footer__list-item-link', ->
                            text page.title

        # Scripts
        script type:'text/javascript', defer:'defer', src: @asset('scripts/script.js')

        script type:"text/javascript", ->
            text "var _gaq = _gaq || [];
                      _gaq.push(['_setAccount', '"+ @site.analytics + "']);
                      _gaq.push(['_trackPageview']);

                      (function() {
                        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
                        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
                      })();"

