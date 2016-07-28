var docpadConfig = {
  documentPaths: ['render'],
  plugins: {
    nodesass: {
      options: {
        includePaths: ['node_modules']
      },
      outputStyle: 'compressed'
    },
    marked: {
      markedRenderer: {
        image: function(href, title, text) {
          var urlParts = href.split('/');
          href = urlParts.length > 1 ? '/' + urlParts[urlParts.length - 2] + '/' + urlParts[urlParts.length - 1] : href;
          var out = '<img class="testar_lite" src="' + href + '" alt="' + text + '"';
          if (title) {
            out += ' title="' + title + '"';
          }
          out += this.options.xhtml ? '/>' : '>';
          return out;
        }
      }
    }
  },
  regenerateEvery: 1000 * 60 * 60,
  templateData: {
    site: {
      url: 'http://www.bandettes.com',
      analytics: process.env.GA,
      title: 'Anna Cederberg-Orreteg',
      description: 'Tonsättare, musiklärare, körledare',
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