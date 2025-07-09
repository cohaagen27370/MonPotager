export default interface Product {
    id: string
    name: string
    count: number
    variety?: string | undefined
    image: string
}