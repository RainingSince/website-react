import { getProjects, getProject } from '@/services/TagsApi';

export default {
  namespace: 'projects',
  state: {
    projects: { records: [] },
    detail: {},
  },

  effects: {
    * loadProjects({ playload }, { call, put }) {
      let res = yield call(getProjects, playload);

      if (res) yield put({
        type: 'saveProject',
        playload: res,
      });
    },
    * loadDetail({ playload }, { call, put }) {
      let res = yield call(getProject, playload);

      if (res) yield put({
        type: 'saveDetail',
        playload: res,
      });
    },
  },

  reducers: {
    saveProject(state, { playload }) {
      if (playload.current > 1) {
        playload.records = playload.records.concat(state.projects.records);
        return { ...state, projects: playload };
      }
      return { ...state, projects: playload };
    },
    saveDetail(state, { playload }) {
      return { ...state, detail: playload };
    },
  },
};
