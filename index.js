const frontmatter = require('@github-docs/frontmatter')
const ejs = require('ejs')
const { join } = require('path');
const fs = require('fs');
const getTemplates = require('./tmpl');
const latexTemplateDir = join(__dirname, 'cv-template');
const latexSectionsDir = join(latexTemplateDir, 'cv-sections');

const expSchema = {
  properties: {
    title: {
      type: 'string',
      required: true
    },
    organization: {
      type: 'string',
      required: true
    },
    location: {
      type: 'string',
      required: true
    },
    dates: {
      type: 'string',
      required: true
    },
  }
}

const exps = [
`---
title: JavaScript instructor & content editor
organization: Wild Code School
location: Toulouse (FR) / Remote
dates: Feb. 2018 - Apr. 2021
---

* Teach web development fundamentals: front-end (HTML, CSS, JS, React), back-end (Node.js, Express, SQL).
* Supervise student projects, esp. end-of-term projects with real clients.
* Create and improve teaching materials for the JavaScript curriculum.
`,
`---
title: Web developer
organization: Freelance
location: Toulouse (FR)
dates: Apr. 2016 - Nov. 2017
---

* TextBeans, web marketplace for translation and correction of English texts, (Node.js/Express, AngularJS).
* WordPress websites for small companies in Toulouse and Rennes.
* Contributions to Red Pesto / ElsieApp, a web-based language school management solution (PHP, Laravel, MySQL).
`
]

const formatExp = (markdown) => {
  const { data, content, errors } = frontmatter(markdown, { schema: expSchema })
  console.log(errors)
  if (errors.length > 0) throw new Error(`Error in ${markdown.substr(0, 20)}`)
  return { data, content }
}

const experiences = exps.map(md => formatExp(md))
const expTmpl = getTemplates('experience')
const expSection = ejs.render(expTmpl, { experiences })
fs.writeFileSync(join(latexSectionsDir, 'experience.tex'), expSection);