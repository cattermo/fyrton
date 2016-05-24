var docpadConfig = {
  documentPaths: ['render'],
  plugins: {
    nodesass: {
      outputStyle: 'compressed'
    }
  },
  regenerateEvery: 1000 * 60 * 60,
  templateData: {
    feeds: {
      facebook: {
        url: 'https://graph.facebook.com/TheBandettesmusic/posts?limit=50&access_token=' + process.env.FB_ACCESSTOKEN1 + '|' + process.env.FB_ACCESSTOKEN2,
        cache: false
      },
      bandsintown: {
        url: 'http://api.bandsintown.com/artists/The%20Bandettes/events.json?api_version=2.0&app_id=' + process.env.FB_APPID
      }
    },
    site: {
      url: 'http://www.bandettes.com',
      analytics: process.env.GA,
      title: 'The Bandettes',
      description: 'Official webpage for the Swedish Pop/Americana-band The Bandettes.',
      keywords: 'The Bandettes, band, girlband, music, country, trains, pop ',
      pages: [
        {
          url: '/',
          title: 'Home'
        }, {
          url: '/latest',
          title: 'News'
        }, {
          url: '/music',
          title: 'Music'
        }, {
          url: '/live',
          title: 'Live'
        }, {
          url: '/about-us',
          title: 'About'
        }, {
          url: '/photos',
          title: 'Photos'
        }, {
          url: '/merch',
          title: 'Merch'
        }, {
          url: '/press',
          title: 'Press'
        }, {
          url: '/contact',
          title: 'Contact'
        }
      ],
      links: [
        {
          title: 'youtube',
          url: 'https://www.youtube.com/channel/UC7plUzsE30uGKpFjz3dWACQ'
        }, {
          title: 'facebook',
          url: 'https://www.facebook.com/TheBandettesmusic'
        }, {
          title: 'instagram',
          url: 'https://instagram.com/thebandettes'
        }, {
          title: 'twitter',
          url: 'https://twitter.com/thebandettes'
        }, {
          title: 'spotify',
          url: 'https://play.spotify.com/artist/208qxflE4I6uB0jC0gKMYB'
        }, {
          title: 'soundcloud',
          url: 'https://soundcloud.com/thebandettesmusic'
        }
      ]
    },
    getPreparedTitle: function () {
      if (this.document.title) {
        return this.document.title + ' | ' + this.site.title;
      } else {
        return this.site.title;
      }
    },
    getPreparedDescription: function () {
      return this.document.description || this.site.description;
    },
    getPreparedKeywords: function () {
      return this.site.keywords.concat(this.document.keywords || []).join(', ');
    },
    getFacebookPhoto: function (id) {
      return 'https://graph.facebook.com/' + id + '?access_token=' + process.env.FB_ACCESSTOKEN1 + '|' + process.env.FB_ACCESSTOKEN2;
    },
    getSrcset: function (image, isLast) {
      return image.source + ' ' + image.width + 'w ' + (isLast ? '' : ', ');
    }
  },
  collections: {
    posts: function () {
      return this.getCollection('documents').findAllLive({
        relativeOutDirPath: 'posts'
      }, [
        {
          date: -1
        }
      ]);
    }
  },
  environments: {
    development: {
      plugins: {
        nodesass: {
          outputStyle: 'nested'
        }
      },
      templateData: {
        site: {
          url: false
        }
      }
    }
  },
  events: {
    renderBefore: function (arg, next) {
      var Feedr = require('feedr').Feedr;
      var templateData = arg.templateData;
      var Task = require('taskgroup').Task;
      var feedr = new Feedr();

      function readFeedFixPhoto(feeddata, index, newFeedData, complete) {
        var maxIndex = 50;
        var maxBigWidth = 740;
        var maxStandardWidth = 640;
        var maxSmallWidth = 500;
        var post = feeddata[index];
        var photo;

        index++;

        if (index === maxIndex || index === feeddata.length) {
          templateData.feeds.facebookFixed = newFeedData;
          return complete();
        }

        if (post.message && post.message.indexOf('/The Bandettes') > 0) {
          if (post.type === 'photo') {
            photo = {
              url: templateData.getFacebookPhoto(post.object_id)
            };
            if (photo) {
              return feedr.readFeeds(photo, function (err, res) {
                var i, image, images, len, photopost, ref;
                images = {};
                photopost = res.url;
                ref = photopost.images;
                for (i = 0, len = ref.length; i < len; i++) {
                  image = ref[i];
                  if (!images.big && image.width < maxBigWidth && image.height < maxBigWidth) {
                    images.big = image;
                  }
                  if (!images.standard && image.width < maxStandardWidth && image.height < maxStandardWidth) {
                    images.standard = image;
                  }
                  if (!images.small && image.width < maxSmallWidth && image.height < maxSmallWidth) {
                    images.small = image;
                  }
                }
                post.images = images;
                newFeedData.push(post);
                return readFeedFixPhoto(feeddata, index, newFeedData, complete);
              });
            } else {
              newFeedData.push(post);
              return readFeedFixPhoto(feeddata, index, newFeedData, complete);
            }
          } else {
            newFeedData.push(post);
            return readFeedFixPhoto(feeddata, index, newFeedData, complete);
          }
        } else {
          return readFeedFixPhoto(feeddata, index, newFeedData, complete);
        }
      }

      function readFeedCallback(complete, err, result) {
        var facebookFeed;
        if (err) {
          return next(err);
        }
        templateData.feeds = result;
        facebookFeed = templateData.feeds.facebook && templateData.feeds.facebook.data;
        if (facebookFeed) {
          console.log('READ FEED FIX PHOTO');
          return readFeedFixPhoto(facebookFeed, 0, [], complete);
        } else {
          return complete();
        }
      }

      var task = new Task(function (complete) {
        console.log('READ FEEDS', templateData.feeds);
        return feedr.readFeeds(templateData.feeds, readFeedCallback.bind(null, complete));
      });
      task.done(function (err) {
        if (err) {
          return next(err);
        }
        return next();
      });

      return task.run();
    },
    serverExtend: function (opts) {
      var server = opts.server;
      var docpad = this.docpad;
      var compression = require('compression');
      var serveStatic = require('serve-static');
      server.use(compression());
      server.use('/out', serveStatic(__dirname + '/out'));
      return server.all('/regenerate', function (req, res) {
        var ref;
        if (((ref = req.query) != null ? ref.key : void 0) === process.env.REGENERATE) {
          docpad.log('info', 'Regenerating for documentation change');
          docpad.action('generate');
          return res.send(200, 'regenerated');
        } else {
          return res.send(400, 'key is incorrect');
        }
      });
    }
  }
};


module.exports = docpadConfig;