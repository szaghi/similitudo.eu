// Draft entries are visible while developing (`npm run dev`) and dropped from production builds.
export const isPublished = ({ data }: { data: { draft?: boolean } }) => import.meta.env.DEV || !data.draft;

export const byOrder = (a: { data: { order: number } }, b: { data: { order: number } }) => a.data.order - b.data.order;
