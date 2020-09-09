import Md2Json from 'md-2-json';

const kRegexImage = /\[.*\]\((http.*\/.*)\)/gm;

class Markdown {
  public parse(md?: string): any {
    return Md2Json.parse(md ?? '');
  }

  public getImage(md?: string): string {
    if (!md) {
      return '';
    }

    const matches = kRegexImage.exec(md);
    if (!matches || matches.length !== 2) {
      return '';
    }

    return matches[1];
  }
}

const singleton = new Markdown();
export { singleton as Markdown };
