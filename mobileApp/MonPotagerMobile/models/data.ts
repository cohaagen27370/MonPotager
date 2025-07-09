
export default interface Data<T> {
    pageSize: number
    pageNumber: number
    count: number
    pageCount: number
    datas: Array<T>
}