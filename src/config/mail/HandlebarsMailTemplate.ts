import handlebars from 'handlebars';
import { IParseEmailTemplate } from './types';

class HandlebarsMailTemplate {
  public async parse({
    template,
    variables,
  }: IParseEmailTemplate): Promise<string> {
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplate;
