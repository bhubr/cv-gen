const frontmatter = require('@github-docs/frontmatter')
const ejs = require('ejs')
const { join } = require('path');
const fs = require('fs');
const getTemplates = require('./lib/tmpl');
const getExpDetails = require('./lib/mdast');
const { expSchema } = require('./lib/schemas');
const { dataDir } = require('./lib/config');
const { readFile, readJsonFile } = require('./lib/utils');
const readExperiences = require('./lib/read-experiences');

const latexTemplateDir = join(__dirname, 'cv-template');
const latexSectionsDir = join(latexTemplateDir, 'cv-sections');

function processBaseData() {
  const baseFile = join(dataDir, 'main.json');
  const base = readJsonFile(baseFile);
  const { position: posArr, ...rest } = base;
  const position = posArr.join('{\\enskip\\cdotp\\enskip}');
  const data = { ...rest, position };
  const cvTmpl = getTemplates('resume_cv');
  const mainSection = ejs.render(cvTmpl, data);
  fs.writeFileSync(join(latexTemplateDir, 'resume_cv.tex'), mainSection);
}

function processSkills() {
  const skillsFile = join(dataDir, 'skills.md');
  const skillsMd = readFile(skillsFile);
  const skills = getExpDetails(skillsMd)
    .map(line => {
      const [cat, items] = line.split('|');
      return { cat, items }
    });

  const skillsTmpl = getTemplates('skills')
  const skillsSection = ejs.render(skillsTmpl, { skills })
  fs.writeFileSync(join(latexSectionsDir, 'skills.tex'), skillsSection);
}

function processExperiences() {
  const exps = readExperiences();

  const formatExp = (markdown) => {
    const { data, errors } = frontmatter(markdown, { schema: expSchema })
    if (errors.length > 0) throw new Error(`Error in ${markdown.substr(0, 20)}`)
    return data
  }

  const experiences = exps.map(md => {
    const data = formatExp(md)
    const details = getExpDetails(md)
    return { ...data, details }
  })

  const expTmpl = getTemplates('experience')
  const expSection = ejs.render(expTmpl, { experiences })
  fs.writeFileSync(join(latexSectionsDir, 'experience.tex'), expSection);
}

processSkills();
processBaseData();
processExperiences();