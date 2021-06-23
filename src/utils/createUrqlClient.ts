import { dedupExchange, fetchExchange } from '@urql/core';
import { cacheExchange } from '@urql/exchange-graphcache';
import {
  LoginUserMutation,
  LogoutUserMutation,
  MeDocument,
  MeQuery,
  RegisterUserMutation,
} from '../generated/graphql';
import { betterUpdateQuery } from './betterUpdateQuery';

export const createUrqlClient = (ssrExchange: any) => ({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include' as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutUserMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null }),
            );
          },

          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginUserMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              },
            );
          },

          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterUserMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              },
            );
          },
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});
