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
          href = urlParts.length > 1 ? '/' + urlParts[urlParts.length - 1] : href;
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
  templateData: {
    site: {
      url: 'http://www.fyrton.se',
      analytics: process.env.GA,
      title: 'Anna Cederberg-Orreteg',
      description: 'Tonsättare, musiklärare, körledare',
      keywords: 'Tonsättare, musiklärare, körledare, Adolf Fredriks musikklasser',
      pages: [
        {
          url: '/',
          title: 'Hem'
        }, {
          url: '/om-mig.html',
          title: 'Om mig'
        }, {
          url: '/utmarkelser.html',
          title: 'Utmärkelser'
        }, {
          url: '/mina-verk.html',
          title: 'Mina verk'
        }, {
          url: '/lyssna.html',
          title: 'Lyssna'
        }, {
          url: '/salvia.html',
          title: 'SALVIA'
        }, {
          url: '/cantores.html',
          title: 'Cantores Amici'
        }, {
          url: '/lavendela.html',
          title: 'LaVendela'
        }, {
          url: '/pressbilder.html',
          title: 'Pressbilder'
        }, {
          url: '/in-english.html',
          title: '🇬🇧 In English'
        }, {
          url: '/pa-gang.html',
          title: 'På gång'
        }
      ],
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
        .findAllLive({relativeOutDirPath: 'pa-gang'}, [{name: -1}])
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