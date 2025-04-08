'use client'

import { EntityListTemplate } from '@/components/entity-list-template/entity-list-template'
import { getPeople } from '@/services/people'
import { columnDefs } from './columns'

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
