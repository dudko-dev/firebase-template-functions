'use strict';
const settings = require('../utils/settings.js');
require('../utils/global.js');
require('mocha');
const chaiLoader = import('chai');
const { textMsgTemplates } = require('../../lib/utils/textMsgTemplates');
const { htmlMsgTemplates } = require('../../lib/utils/htmlMsgTemplates');

const spaceInTab = 2;

describe('Test templates functionality:', function () {
  const tabToSpace = new Array(spaceInTab)
    .fill()
    .map(() => ' ')
    .join('');
  let chai;
  this.timeout(60000);
  this.beforeAll(async () => {
    const chaiModule = await chaiLoader;
    chai = chaiModule;
  });
  this.afterAll(async () => {});
  it('Test text/sms templates base', async function () {
    const templateEditor = textMsgTemplates.example;
    chai.expect(templateEditor).to.be.an('function');
    const arg = {};
    const res = templateEditor(arg);
    chai.expect(res).to.be.an('object');
    chai.expect(res.text).to.be.an('string');
    chai
      .expect(res.text)
      .to.eql(
        `Example of an text message to the user {{userName}}.\nSincerely, Firebase Template.\n`
      );
    return;
  });
  it('Test text/sms templates with replace', async function () {
    const templateEditor = textMsgTemplates.example;
    chai.expect(templateEditor).to.be.an('function');
    const arg = {
      userName: 'Siarhei Dudko',
      garageName: 'Minsk RPS',
    };
    const res = templateEditor(arg);
    chai.expect(res).to.be.an('object');
    chai.expect(res.text).to.be.an('string');
    chai
      .expect(res.text)
      .to.eql(
        `Example of an text message to the user ${arg.userName}.\nSincerely, Firebase Template.\n`
      );
    return;
  });
  it('Test text/sms templates with replaced template', async function () {
    const templateEditor = textMsgTemplates.example;
    chai.expect(templateEditor).to.be.an('function');
    const arg = {
      userName: 'Siarhei Dudko',
      garageName: 'Minsk RPS',
    };
    const res = templateEditor(
      arg,
      `Example of an text message to the user {{ userName }}.`
    );
    chai.expect(res).to.be.an('object');
    chai.expect(res.text).to.be.an('string');
    chai
      .expect(res.text)
      .to.eql(`Example of an text message to the user ${arg.userName}.`);
    return;
  });
  it('Test html templates base', async function () {
    const templateEditor = htmlMsgTemplates.example;
    chai.expect(templateEditor).to.be.an('function');
    const arg = {};
    const res = templateEditor(arg);
    chai.expect(res).to.be.an('object');
    chai.expect(res.text).to.be.an('string');
    chai.expect(res.html).to.be.an('string');
    chai
      .expect(res.text)
      .to.eql(
        `Example of an html message to the user {{userName}}.\nSincerely, Firebase Template.`
      );
    chai
      .expect(res.html)
      .to.eql(
        `<html>\n\t<body>\n\t\tExample of an <i>html message</i> to the user <b>{{userName}}</b>.<br />\n\t\tSincerely, Firebase Template.\n\t</body>\n</html>\n`.replace(
          /\t/g,
          tabToSpace
        )
      );
    return;
  });
  it('Test html templates with replace', async function () {
    const templateEditor = htmlMsgTemplates.example;
    chai.expect(templateEditor).to.be.an('function');
    const arg = {
      userName: 'Siarhei Dudko',
      garageName: 'Minsk RPS',
    };
    const res = templateEditor(arg);
    chai.expect(res).to.be.an('object');
    chai.expect(res.text).to.be.an('string');
    chai.expect(res.html).to.be.an('string');
    chai
      .expect(res.text)
      .to.eql(
        `Example of an html message to the user ${arg.userName}.\nSincerely, Firebase Template.`
      );
    chai
      .expect(res.html)
      .to.eql(
        `<html>\n\t<body>\n\t\tExample of an <i>html message</i> to the user <b>${arg.userName}</b>.<br />\n\t\tSincerely, Firebase Template.\n\t</body>\n</html>\n`.replace(
          /\t/g,
          tabToSpace
        )
      );
    return;
  });
  it('Test html templates with replaced template', async function () {
    const templateEditor = htmlMsgTemplates.example;
    chai.expect(templateEditor).to.be.an('function');
    const arg = {
      userName: 'Siarhei Dudko',
      garageName: 'Minsk RPS',
    };
    const res = templateEditor(
      arg,
      (
        '<html>\n' +
        '\t<body>\n' +
        '\t\tExample of an <i>html message</i> to the user <b>{{userName}}</b>.\n' +
        '\t</body>\n' +
        '</html>\n'
      ).replace(/\t/g, tabToSpace)
    );
    chai.expect(res).to.be.an('object');
    chai.expect(res.text).to.be.an('string');
    chai.expect(res.html).to.be.an('string');
    chai
      .expect(res.text)
      .to.eql(`Example of an html message to the user ${arg.userName}.`);
    chai
      .expect(res.html)
      .to.eql(
        `<html>\n\t<body>\n\t\tExample of an <i>html message</i> to the user <b>${arg.userName}</b>.\n\t</body>\n</html>\n`.replace(
          /\t/g,
          tabToSpace
        )
      );
    return;
  });
});
