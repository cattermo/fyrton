# The DocPad Configuration File
# It is simply a CoffeeScript Object which is parsed by CSON
docpadConfig = {
	documentPaths: [
		'render'
	]
	plugins:
		nodesass:
			bourbon: true
			outputStyle: 'compressed'

	# =================================
	# Template Data
	# These are variables that will be accessible via our templates
	# To access one of these within our templates, refer to the FAQ: https://github.com/bevry/docpad/wiki/FAQ

	templateData:
		feeds:
			facebook:
				url: "https://graph.facebook.com/TheBandettesmusic/posts?limit=50&access_token="+process.env.FB_ACCESSTOKEN1 + '|' + process.env.FB_ACCESSTOKEN2
				cache: false
			bandsintown:
					url: "http://api.bandsintown.com/artists/The%20Bandettes/events.json?api_version=2.0&app_id="+process.env.FB_APPID

		# Specify some site properties
		site:
			# The production url of our website
			# If not set, will default to the calculated site URL (e.g. http://localhost:9778)
			url: "http://www.bandettes.com"

			analytics: process.env.GA

			# The default title of our website
			title: "The Bandettes"

			# The website description (for SEO)
			description: """
				The Bandettes är
				Anna Linnéa – sång, gitarr
				Hannah – elbas, sång
				Kajsa – keyboard
				Emeli – trummor, percussion
				"""

			# The website keywords (for SEO) separated by commas
			keywords: """
				The Bandettes, band, girlband, music, country, trains, pop 
				"""

			pages: [
					url: '/'
					title: 'Home'
				,
					url: '/about-us'
					title: 'About'
				,
					url: '/live'
					title: 'Live'
				,
					url: '/latest'
					title: 'News'
				,
					url: '/photos'
					title: 'Photos'
				,
					url: '/press'
					title: 'Press'
				,
					url: '/contact',
					title: 'Contact'
				,
					url: '/music'
					title: 'Music'
			]



		# -----------------------------
		# Helper Functions

		# Get the prepared site/document title
		# Often we would like to specify particular formatting to our page's title
		# we can apply that formatting here
		getPreparedTitle: ->
			# if we have a document title, then we should use that and suffix the site's title onto it
			if @document.title
				"#{@document.title} | #{@site.title}"
			# if our document does not have it's own title, then we should just use the site's title
			else
				@site.title

		# Get the prepared site/document description
		getPreparedDescription: ->
			# if we have a document description, then we should use that, otherwise use the site's description
			@document.description or @site.description

		# Get the prepared site/document keywords
		getPreparedKeywords: ->
			# Merge the document keywords with the site keywords
			@site.keywords.concat(@document.keywords or []).join(', ')

		getFacebookPhoto: (id) ->
			return "https://graph.facebook.com/" + id + "?access_token=" + process.env.FB_ACCESSTOKEN1 + '|' + process.env.FB_ACCESSTOKEN2


	# =================================
	# Collections

	# Here we define our custom collections
	# What we do is we use findAllLive to find a subset of documents from the parent collection
	# creating a live collection out of it
	# A live collection is a collection that constantly stays up to date
	# You can learn more about live collections and querying via
	# http://bevry.me/queryengine/guide

	collections:

		# Create a collection called posts
		# That contains all the documents that will be going to the out path posts
		posts: ->
			@getCollection('documents').findAllLive({relativeOutDirPath:'posts'},[date:-1])


	# =================================
	# Environments

	# DocPad's default environment is the production environment
	# The development environment, actually extends from the production environment

	# The following overrides our production url in our development environment with false
	# This allows DocPad's to use it's own calculated site URL instead, due to the falsey value
	# This allows <%- @site.url %> in our template data to work correctly, regardless what environment we are in

	environments:
		development:
			plugins:
				nodesass:
					outputStyle: 'nested'

			templateData:
				site:
					url: false


	# =================================
	# DocPad Events

	# Here we can define handlers for events that DocPad fires
	# You can find a full listing of events on the DocPad Wiki

	events:
		renderBefore: ({templateData}, next) ->
			maxIndex = 50 #Number of posts, same number as set in facebook.url above (limit=50)
			maxBigWidth = 740
			maxStandardWidth = 640
			maxSmallWidth = 500
			Task = require('taskgroup').Task

			readFeedFixPhoto = (feeddata, index, newFeedData, complete) ->
				post = feeddata[index]
				index++
				if index == maxIndex || index == feeddata.length
					templateData.feeds.facebookFixed = newFeedData
					return complete()
					
				if (post.message and post.message.indexOf('/The Bandettes') > 0)
					if post.type == 'photo'
						photo = {url: templateData.getFacebookPhoto(post.object_id)}
						feedr.readFeeds photo, (err, res) ->
							images = {}
							photopost = res.url
							for image in photopost.images
								if !images.big and image.width < maxBigWidth and image.height < maxBigWidth
									images.big = image
								if !images.standard and image.width < maxStandardWidth and image.height < maxStandardWidth
									images.standard = image
								if !images.small and image.width < maxSmallWidth and image.height < maxSmallWidth
									images.small = image

							post.images = images
							newFeedData.push post
							readFeedFixPhoto(feeddata, index, newFeedData, complete)
				
					else 
						newFeedData.push post
						readFeedFixPhoto(feeddata, index, newFeedData, complete)
				else 
					readFeedFixPhoto(feeddata, index, newFeedData, complete)

			# Prepare feedr
			unless Feedr?
				{Feedr} = require('feedr')
			unless feedr?
				feedr = new Feedr()

			task = new Task (complete) ->
				# Read the feeds and add them to the templateData
				feedr.readFeeds templateData.feeds, (err,result) ->
					return next(err)  if err
					templateData.feeds = result
					facebookFeed = templateData.feeds.facebook.data
					if(facebookFeed)
						readFeedFixPhoto(facebookFeed, 0, [], complete)				
					else 
						return complete()

			task.done (err) ->
				if err
					return next(err) 
				return next()

			task.run()

		# Server Extend
		# Used to add our own custom routes to the server before the docpad routes are added
		serverExtend: (opts) ->
			# Extract the server from the options
			{server} = opts
			docpad = @docpad
			express = opts.express
			compression = require('compression')
			serveStatic = require('serve-static')
			server.use(compression())
			server.use("/out", serveStatic(__dirname+'/out'));

			server.all '/regenerate', (req,res) ->
				if req.query?.key is process.env.REGENERATE
					docpad.log('info', 'Regenerating for documentation change')
					docpad.action('generate')
					res.send(200, 'regenerated')
				else
					res.send(400, 'key is incorrect')
}

# Export our DocPad Configuration
module.exports = docpadConfig