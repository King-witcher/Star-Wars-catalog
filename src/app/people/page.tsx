'use client'

import { getPeople } from '@/services/people'
import { columnDefs } from './columns'
import { EntityListTemplate } from '@/components/entity-list-template/entity-list-template'

export default function Page() {
  return (
    <EntityListTemplate
      collection="people"
      columns={columnDefs}
      fetchFn={getPeople}
      getKey={(data) => data.url}
    />
  )
}
