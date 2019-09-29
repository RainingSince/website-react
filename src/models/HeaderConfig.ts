import { getHeaderMenus } from '@/services/system/SystemApi';

export default {

  namespace: 'headerMenu',

  state: {
    menus: [],
  },

  effects: {

    * loadHeaderMenus({ palyload }, { call, put }) {
      let response = yield call(getHeaderMenus);
      if (response) yield  put({
        type: 'saveHeaderMenus',
        playload: response
      });

    },
  },

  reducers: {

    saveHeaderMenus(state, { playload }) {
      return { ...state, menus: playload };
    },

  },

};
