---
layout: 'text-content'
url: '/latest'
urls: ['/latest/','/latest/index.html','/latest.html']
---
feed = @feeds.facebookFixed || []
ul class:'ban_feed', ->
    index = 0
    for post in feed #when post.type is 'photo' or post.type is 'video'
        li class:'ban_feed__item', ->
            article ->
                h1 class:'ban_feed__item-header', ->
                    post.from.name + ' ' + post.created_time.substring(0, 10)
                exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig 

                p ->
                    if post.message
                        message = post.message
                        #message = message.replace /\\u003C3/g,''
                        message = message.replace /\</g,'&lt;'
                        message = message.replace /\>/g, '&gt;'
                        message = message.replace exp, "<a href='$1'>$1</a>"
                        message = message.replace /\n/g, '<br />'
                        #message = message.replace /\\n\\n/g, '<br/><br/>'
                        text message
                        
                if post.type == 'video'
                    # p ->
                    #   text post.description.replace('\r\n', '</br>').replace(exp, "<a href='$1'>$1</a>")
                    if post.link.indexOf('https//www.youtube.com/watch?v=') != -1
                        videoid = post.link.replace 'https//www.youtube.com/watch?v=', ''
                        srcUrl = 'https://www.youtube.com/embed/'+ videoid + '?wmode=transparent'
                        iframe src:srcUrl, width:'auto', height:'auto', allowfullscreen:'allowfullscreen', frameborder:'0'
                    else
                        a href:post.link, target:'_blank', ->
                            post.link
                    
                if post.type == 'photo' and post.picture and post.picture.length > 0 
                    a href:post.link, target:'_blank', ->
                        img sizes:'(min-width: 944px) calc(680px - 2em), calc(100vw - 1.5em)', srcset: @getSrcset(post.images.small) + @getSrcset(post.images.standard) + @getSrcset(post.images.big, true), src:post.images.standard
                        #img src:post.picture, data: {source1: post.images.big.source, source2: post.images.standard.source, source3: post.images.small.source}



