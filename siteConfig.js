module.exports = {
  pages: [
    {
      url: '/',
      title: 'Hem',
      header: 'Välkommen',
    }, {
      url: '/om-mig.html',
      title: 'Om mig'
    }, {
      url: '/utmarkelser.html',
      title: 'Utmärkelser',
      header: 'Priser, utmärkelser och stipendier',
    }, {
      url: '/salvia.html',
      title: 'SALVIA'
    }, {
      url: '/mina-verk.html',
      title: 'Mina verk',
      header: 'Mina verk - ett urval',
      layout: 'smaller-body',
    }, {
      url: '/cantores.html',
      title: 'Cantores Amici',
    }, {
      url: '/lyssna.html',
      title: 'Lyssna'
    }, {
      url: '/lavendela.html',
      title: 'LaVendela'
    }, {
      url: '/in-english.html',
      title: '🇬🇧 In English',
      header: 'Welcome',
    },{
      url: '/i-backspegeln.html',
      title: 'I backspegeln',
      template: 'ejs'
    }, {
      url: '/pressbilder.html',
      title: 'Pressbilder',
      template: 'ejs'
    }, {
      url: '/funderingar.html',
      title: 'Funderingar'
    }
  ],
  pressbilder() {
    fs.readdirSync(path.join(__dirname, "/src/files/images/press"))
  }
}