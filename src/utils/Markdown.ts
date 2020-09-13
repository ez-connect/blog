import Md2Json from 'md-2-json';
import readingTime from 'reading-time';

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
  public getDescription(body: string): string {
    if (!body) {
      return '';
    }

    return body.replaceAll(/!?\[.*\]\((http.*\/.*)\)/g, '');
  }

  public getReadingTime(body: string): string {
    return readingTime(body).text;
  }
}

const singleton = new Markdown();
export { singleton as Markdown };
