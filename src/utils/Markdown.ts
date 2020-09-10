import Md2Json from 'md-2-json';

class Markdown {
  public parse(md?: string): any {
    return Md2Json.parse(md ?? '');
  }

  public getImage(md?: string): string {
    if (!md) {
      return '';
    }

    const matches = md.match(/!\[.*\]\((http.*\/.*)\)/);
    if (!matches || matches.length < 1) {
      return '';
    }

    return matches[1];
  }

  // Remove all images all keep a short description from body
  public getDescription(body?: string, length = 256): string {
    if (!body) {
      return '';
    }

    body = body.replaceAll(/\[.*\]\((http.*\/.*)\)/g, '');
    return body.substr(0, length).concat('...');
  }
}

const singleton = new Markdown();
export { singleton as Markdown };
