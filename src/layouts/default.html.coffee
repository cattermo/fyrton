

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
        meta name:'description', content:@document.metaTranslateKey
        link rel:'shortcut icon', href:'/images/favicon.ico', type:'image/x-icon'

        # Styles
        text  @getBlock('styles').add(['styles/styles.css']).toHTML()

        text '''
        <!--[if lt IE 9]>
            <script type="text/javascript" 
                src="http://html5shiv.googlecode.com/svn/trunk/html5.js">
            </script>
        <![endif]-->
        '''
        
        script type:"text/javascript", ->
            text "var _prum = [['id', '52167612abe53dd91d000000'],
             ['mark', 'firstbyte', (new Date()).getTime()]];
                (function() {
                    var s = document.getElementsByTagName('script')[0]
                      , p = document.createElement('script');
                    p.async = 'async';
                    p.src = '//rum-static.pingdom.net/prum.min.js';
                    s.parentNode.insertBefore(p, s);
                })();"

    body class:'ban_background', ->
        div class:'ban_screenwidth', id:'screen'
        h1 ->
            a class:'ir header',href:'/', ->                    
                text 'The Bandettes'     
        text @partial 'menu'
        div '.ban_main', ->
            @content                    

        if @document.name != 'index.html'
            div '.footer', ->
                a href:'mailto:info@thebandettes.com', ->
                    text 'info@thebandettes.com'

        # Scripts
        text @getBlock('scripts').add('scripts/script.js').toHTML()

        script type:"text/javascript", ->
            text "var _gaq = _gaq || [];
                      _gaq.push(['_setAccount', '"+ @site.analytics + "']);
                      _gaq.push(['_trackPageview']);

                      (function() {
                        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
                        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
                      })();"

