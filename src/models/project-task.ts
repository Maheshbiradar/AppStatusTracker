import { ProjectStatus } from './status-enum';

export class ProjectTask {
  constructor(
    public id: string,
    public technology: string,
    public description: string,
    public status: ProjectStatus
  ) {}
}
