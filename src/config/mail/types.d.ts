export interface IMailContact {
  name: string;
  email: string;
}

export interface ITemplateVariable {
  [key: string]: string | number;
}

export interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseEmailTemplate;
}

export interface IParseEmailTemplate {
  file: string;
  variables: ITemplateVariable;
}
