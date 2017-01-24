import { SasPage } from './app.po';

describe('sas App', function() {
  let page: SasPage;

  beforeEach(() => {
    page = new SasPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
