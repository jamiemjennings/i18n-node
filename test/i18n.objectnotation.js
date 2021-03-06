var i18n = require('../i18n');
var should = require("should");

describe('Object Notation', function() {

  beforeEach(function() {
    i18n.configure({
      locales: ['en', 'de'],
      directory: './locales',
      register: global,
      updateFiles: true,
      objectNotation: true
    });
  });

  describe('Date/Time patterns', function() {
    it('should return en formatting as expected', function() {
      i18n.setLocale('en');
      should.equal(__('format.date'), 'MM/DD/YYYY');
      should.equal(__('format.time'), 'h:mm:ss a');
    });

    it('should return de formatting as expected', function() {
      i18n.setLocale('de');
      should.equal(__('format.date'), 'DD.MM.YYYY');
      should.equal(__('format.time'), 'hh:mm:ss');
    });
  });

  describe('i18nTranslate', function() {
    it('should return en translations as expected, using object traversal notation', function() {
      i18n.setLocale('en');
      should.equal(__('greeting.formal'), 'Hello');
      should.equal(__('greeting.informal'), 'Hi');
      should.equal(__('greeting.placeholder.formal', 'Marcus'), 'Hello Marcus');
      should.equal(__('greeting.placeholder.informal', 'Marcus'), 'Hi Marcus');
      should.throws(__('greeting.placeholder.loud', 'Marcus'));
    });

    it('should provide proper pluralization support, using object traversal notation', function() {
      i18n.setLocale('en');
      var singular = __n({ singular: "cat", plural: "cat", locale: "de" }, 1);
      var plural = __n({ singular: "cat", plural: "cat", locale: "de" }, 3);
      should.equal(singular, '1 Katze');
      should.equal(plural, '3 Katzen');
    });

    it('should allow for simple pluralization', function() {
      var singular = __n("nested.deep.plural", 1);
      var plural = __n("nested.deep.plural", 3);
      should.equal(singular, 'plural');
      should.equal(plural, 'plurals');
    });
  });
});