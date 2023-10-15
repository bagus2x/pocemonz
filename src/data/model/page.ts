export interface Page<T> {
  total: number
  size: number
  next?: number | null
  items: T[]
}
