import { getArticles, getArticlesType, getDetail } from '@/services/TagsApi';

export default {
  namespace: 'article',
  state: {
    articles: [],
    hotArticles: [],
    recentArticles: [],
    detail: {},
  },

  effects: {
    * loadArticles({ playload }, { call, put }) {
      let res = yield call(getArticles, playload);

      if (res) yield put({
        type: 'saveArticle',
        playload: res,
      });
    },
    * loadDetail({ playload }, { call, put }) {
      let res = yield call(getDetail, playload);

      if (res) yield put({
        type: 'saveDetail',
        playload: res,
      });
    },

    * loadHotArticles({ playload }, { call, put }) {
      let res = yield call(getArticlesType, 'host');

      if (res) yield put({
        type: 'saveHotArticle',
        playload: res,
      });
    },

    * loadRencentArticles({ playload }, { call, put }) {
      let res = yield call(getArticlesType, 'rencent');

      if (res) yield put({
        type: 'saveRencentArticle',
        playload: res,
      });
    },

  },
  reducers: {
    saveArticle(state, { playload }) {
      if (playload.current > 1) {
        playload.records = playload.records.concat(state.articles.records);
        return { ...state, articles: playload };
      }
      return { ...state, articles: playload };
    },
    saveHotArticle(state, { playload }) {
      return { ...state, hotArticles: playload };
    },
    saveRencentArticle(state, { playload }) {
      return { ...state, recentArticles: playload };
    },
    saveDetail(state, { playload }) {
      return { ...state, detail: playload };
    },
  },
};
