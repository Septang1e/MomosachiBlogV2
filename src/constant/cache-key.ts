const APP_NAME = 'MOMOSACHI_BLOG'

class CacheKey {
    static readonly TOKEN = `${APP_NAME}-TOKEN-KEY`
    static readonly THEME = `${APP_NAME}-THEME-KEY`
    static readonly ARTICLE_THUMB_UP_STATE = `${APP_NAME}-ARTICLE-THUMB_UP-STATE-KEY`
}

export default CacheKey