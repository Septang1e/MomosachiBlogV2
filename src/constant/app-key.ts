export class ResponseCode {
    static readonly SUCCESS = "0000"
    static readonly UN_ERROR = "0001"
    static readonly ILLEGAL_PARAM = "0002"
    static readonly DUPLICATE_OPERATION = "0003"
}
export class SortType {
    static readonly UPDATE_TIME_ASC = "0001"
    static readonly UPDATE_TIME_DESC = "0002"
    static readonly VIEW_COUNT_ASC = "0003"
    static readonly VIEW_COUNT_DESC = "0004"
    static readonly TOP = "0005"
}
export class PaginationStrategy {
    static readonly DEFAULT_STRATEGY = "0000"
    static readonly SEARCH_STRATEGY = "0001"
    static readonly CATEGORY_STRATEGY = "0002"
    static readonly TAG_STRATEGY = "0003"
}
export class ActivityType {
    static readonly CREATE = "CREATE"
    static readonly UPDATE = "UPDATE"
    static readonly DELETE = "DELETE"
}
export class ArticleState {
    static readonly SET_TOP = 1
}
export class ArticleLikeState {
    static readonly IS_LIKED = "IS_LIKED"
    static readonly NOT_LIKE = "NOT_LIKE"
}