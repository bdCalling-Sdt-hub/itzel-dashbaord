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

    createPackage: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/package/create",
          body: data,
        };
      },
    }),

    updatePackage: builder.mutation({
      query: (data) => {
        return {
          method: "PATCH",
          url: `/package/${data.id}`,
          body: data,
        };
      },
    }),

    deletePackage: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/package/${id}`,
        };
      },
    }),
  }),
});

export const {
  useGetPackagesQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
} = subscribeSlice;
