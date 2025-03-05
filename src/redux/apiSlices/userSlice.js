import { api } from "../api/baseApi";

const userSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    admin: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/user?role=ADMIN",
        };
      },
    }),
    users: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "user/all?role=USER",
        };
      },
    }),

    getUserById: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `user/${id}`,
        };
      },
    }),

    getAllCreators: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "user/all?role=CREATOR",
        };
      },
    }),
    userById: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/user/profile/${id}`,
        };
      },
    }),
  }),
});

export const {
  useAdminQuery,
  useUsersQuery,
  useGetUserByIdQuery,
  useGetAllCreatorsQuery,
  useUserByIdQuery,
} = userSlice;
