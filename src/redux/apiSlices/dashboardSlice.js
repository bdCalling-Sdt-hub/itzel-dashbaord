import { api } from "../api/baseApi";

const dashboardSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    generalStats: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/user/home",
        };
      },
    }),
    earningState: builder.query({
      query: () => {
        return {
          method: "GET",
          url: `/user/home/earnings`,
        };
      },
    }),
    userStates: builder.query({
      query: () => {
        return {
          method: "GET",
          url: `/user/home/users`,
        };
      },
    }),
  }),
});

export const {
  useGeneralStatsQuery,
  useEarningStateQuery,
  useUserStatesQuery,
} = dashboardSlice;
