# Escorpora

Website design and development for a production company based in Barcelona

[escorpora.co](https://escorpora.co)

Developed as a static site with [Hugo](https://gohugo.io/), deployed to [Netlify](https://www.netlify.com/) and managed through [NetlifyCMS](https://www.netlifycms.org/).


## Usage

### Development

While developing your website, use:

```bash
npm start
```

Then visit http://localhost:3000/ *- or a new browser windows popped-up already -* to preview your new website. BrowserSync will automatically reload the CSS or refresh the whole page, when stylesheets or content changes.

### Static build

To build a static version of the website inside the `/dist` folder, run:

```bash
npm run build
```

Continuous deployment of the master branch is set up to Netlify, so:

```bash
git push origin master
```
will build, deploy and publish the site.



## Structure

```
|--site                // Everything in here will be built with hugo
|  |--content          // Pages and collections - ask if you need extra pages
|  |--data             // YAML data files with any data for use in examples
|  |--layouts          // This is where all templates go
|  |  |--partials      // This is where includes live
|  |  |--index.html    // The index page
|  |--static           // Files in here ends up in the public folder
|  |  |--admin         // CMS configuration files
|--src                 // Files that will pass through the asset pipeline
|  |--css              // CSS files in the root of this folder will end up in /css/...
|  |--js               // app.js will be compiled to /app.js with babel
```
