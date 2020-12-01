import Case from 'case';
import { Logger } from './abstractions/Logger';
import { ProjectFile } from './abstractions/ProjectFile';
import { IParameters } from './index';

export async function main({ name }: IParameters) {
  const data = {
    name: {
      camel: Case.camel(name),
      pascal: Case.pascal(name),
      kebab: Case.kebab(name),
    },
  };

  Logger.init('/', 'log.log');
  ProjectFile.createProjectDir(name);
  ProjectFile.setSharedTemplateData(data);

  await Promise.all([
    new ProjectFile('', `${data.name.kebab}-bloc.ts`, 'bloc.ts').generate(),
    new ProjectFile('', `${data.name.kebab}-event.ts`, 'event.ts').generate(),
    new ProjectFile('', `${data.name.kebab}-hook.ts`, 'hook.ts').generate(),
    new ProjectFile('', `${data.name.kebab}-state.ts`, 'state.ts').generate(),
    new ProjectFile('', `index.ts`, 'index.ts').generate(),
  ]);
}
