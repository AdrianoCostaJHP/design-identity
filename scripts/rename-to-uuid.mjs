import { randomUUID } from 'node:crypto'
import { access, readFile, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = path.join(root, 'public')
const worksPath = path.join(root, 'src', 'data', 'works.json')
const imagesPath = path.join(root, 'src', 'data', 'images', 'images.json')

// Maps an old public path (e.g. "/works/slug/01.svg") to a new uuid-based path.
const pathMap = new Map()

async function fileExists(absPath) {
  try {
    await access(absPath)
    return true
  } catch {
    return false
  }
}

async function mapPath(publicPath) {
  if (!publicPath || typeof publicPath !== 'string') return publicPath
  if (pathMap.has(publicPath)) return pathMap.get(publicPath)

  const ext = path.extname(publicPath)
  const dir = path.posix.dirname(publicPath)
  const newPublicPath = path.posix.join(dir, `${randomUUID()}${ext}`)

  const oldAbs = path.join(publicDir, publicPath)
  const newAbs = path.join(publicDir, newPublicPath)

  if (await fileExists(oldAbs)) {
    await rename(oldAbs, newAbs)
  } else {
    console.warn(`Arquivo não encontrado, mantendo referência: ${publicPath}`)
    pathMap.set(publicPath, publicPath)
    return publicPath
  }

  pathMap.set(publicPath, newPublicPath)
  return newPublicPath
}

// --- works.json ---
const worksData = JSON.parse(await readFile(worksPath, 'utf8'))
for (const work of worksData.works) {
  if (work.coverImage) {
    work.coverImage = await mapPath(work.coverImage)
  }
  if (Array.isArray(work.images)) {
    work.images = await Promise.all(work.images.map((src) => mapPath(src)))
  }
}
await writeFile(worksPath, `${JSON.stringify(worksData, null, 2)}\n`, 'utf8')

// --- images.json ---
const imagesData = JSON.parse(await readFile(imagesPath, 'utf8'))
for (const image of imagesData.images) {
  image.src = await mapPath(image.src)
}
await writeFile(imagesPath, `${JSON.stringify(imagesData, null, 2)}\n`, 'utf8')

console.log(`Renomeados ${pathMap.size} arquivo(s) para UUID v4.`)
for (const [oldPath, newPath] of pathMap) {
  console.log(`  ${oldPath}  ->  ${newPath}`)
}
