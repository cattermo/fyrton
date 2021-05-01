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
          url: '/salvia.html',
          title: 'SALVIA'
        }, {
          url: '/mina-verk.html',
          title: 'Mina verk'
        }, {
          url: '/cantores.html',
          title: 'Cantores Amici'
        }, {
          url: '/lyssna.html',
          title: 'Lyssna'
        }, {
          url: '/lavendela.html',
          title: 'LaVendela'
        }, {
          url: '/in-english.html',
          title: '🇬🇧 In English'
        },{
          url: '/i-backspegeln.html',
          title: 'I backspegeln'
        }, {
          url: '/pressbilder.html',
          title: 'Fotogalleri'
        }, {
          url: '/funderingar.html',
          title: 'Funderingar'
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
  collections: {},
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
  events: {}
};


module.exports = docpadConfig;