import rawData from './projects.json'
import type { Project, ProjectsData } from '../types/project'

const data = rawData as ProjectsData

export const projects: Project[] = data.projects

export function getProjectCoverImage(project: Project): string {
  if (project.coverImage) {
    return project.coverImage
  }

  return `https://picsum.photos/seed/${encodeURIComponent(project.id)}/800/600`
}
