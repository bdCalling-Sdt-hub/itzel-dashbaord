import { api } from "../api/baseApi";

const categorySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/category",
        };
      },
    }),

    createCategory: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/category/create",
          body: data,
        };
      },
    }),

    //event

    getAllEvents: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/event",
        };
      },
    }),

    //jobs

    getAllJobs: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/job",
        };
      },
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useGetAllEventsQuery,
  useGetAllJobsQuery,
} = categorySlice;
