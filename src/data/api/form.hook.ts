import getConfig from 'next/config'
import { UseQueryOptions } from '@tanstack/react-query'
import { QueryKeyT, useDelete, usePatch, useFetch, usePost , usePut} from './common/react_query'
import axios from 'axios';




  export function useSendForm( options?: UseQueryOptions<unknown, Error, unknown, QueryKeyT>) {
    return usePost(`${process.env.BASE_API}/api/v1/lead`, options)
  }

   
  
  