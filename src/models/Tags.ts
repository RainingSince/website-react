import { getTags } from '@/services/TagsApi';

export default {

  namespace: 'tags',
  state: {
    tags: [],
  },

  effects: {
    * loadTags({ playload }, { call, put }) {
      let res = yield call(getTags, playload.catalogId);
      if (res) yield  put({
        type: 'saveTags',
        playload: res,
      });
    },
  },

  reducers: {
    saveTags(state, { playload }) {
      return { ...state, tags: playload };
    },
  },

};
