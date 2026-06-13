export type ProjectStats = {
  appreciations: number
  views: number
  comments: number
}

export type Project = {
  id: string
  title: string
  url: string
  description: string
  shortDescription: string
  category: string
  tags: string[]
  tools: string[]
  creativeFields: string[]
  publishedDate: string
  stats: ProjectStats
  coverImage?: string
  images: string[]
  highlights: string[]
}

export type ProjectsData = {
  profile: {
    name: string
    headline: string
    location: string
    behanceUrl: string
    bio: string
    availability: string
    memberSince: string
    stats: {
      projectViews: number
      appreciations: number
      followers: number
      following: number
    }
  }
  projects: Project[]
}
