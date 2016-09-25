var docpadConfig = {
  documentPaths: ['render'],
  plugins: {
    nodesass: {
      options: {
        includePaths: ['node_modules']
      },
      outputStyle: 'compressed'
    },
    thumbnails: {
      imageMagick: true,
      presets: {
        'default': {
          w: 300,
          h: 300,
          q: 90
        }
      }
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
          title: 'Hem'
        }, {
          url: '/om-mig',
          title: 'Om mig'
        }, {
          url: '/utmarkelser',
          title: 'Utmärkelser'
        }, {
          url: '/mina-verk',
          title: 'Mina verk'
        }, {
          url: '/lyssna',
          title: 'Lyssna'
        }, {
          url: '/salvia',
          title: 'SALVIA'
        }, {
          url: '/cantores-amici',
          title: 'Cantores Amici'
        }, {
          url: '/pressbilder',
          title: 'Pressbilder'
        }, {
          url: '/in-english',
          title: '🇬🇧 In English'
        }, {
          url: '/pa-gang',
          title: 'På gång'
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
      return this
        .getCollection('html')
        .findAllLive({relativeOutDirPath: 'pages/pa-gang'}, [{name: -1}])
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
  }
};


module.exports = docpadConfig;