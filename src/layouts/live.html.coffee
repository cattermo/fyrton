---
layout: 'text-content'
---

h1 ->
  text 'Live'


if @feeds.bandsintown.length > 0
  ul class:'ban_feed', ->
    for entry in @feeds.bandsintown
      li class:'ban_feed__sitem', ->
        h4 ->
          entry.formatted_datetime + ' ' + entry.formatted_location
        a href:entry.facebook_rsvp_url, ->
          entry.title

#img src:'/images/live768.JPG', data: {source1: '/images/live1280.JPG', source2: '/images/live1024.JPG', source3: '/images/live768.JPG'}

div ->
  @content
