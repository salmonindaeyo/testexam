import getConfig from 'next/config'
import { UseQueryOptions } from '@tanstack/react-query'
import { QueryKeyT, useDelete, useFetch, usePost , usePut} from './common/react_query'
import { UserResponse } from '../domain/users.domain'

export function useOurClient() {
    return useFetch<UserResponse>(`https://dummyjson.com/users`,null,null,null,true)
  }


