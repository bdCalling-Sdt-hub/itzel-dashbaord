import { api } from "../api/baseApi";

const subscribeSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getPackages: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/package",
        };
      },
    }),
  }),
});

export const { useGetPackagesQuery } = subscribeSlice;
