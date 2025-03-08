import { api } from "../api/baseApi";

const termsAndConditionSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    updateTermsAndConditions: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/termsandconditions/${id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    termsAndCondition: builder.query({
      query: () => {
        return {
          url: `/termsandconditions`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
      transformResponse: ({ data }) => {
        return data;
      },
    }),
  }),
});

export const {
  useTermsAndConditionQuery,
  useUpdateTermsAndConditionsMutation,
} = termsAndConditionSlice;
