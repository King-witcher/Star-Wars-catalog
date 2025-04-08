'use client'

import { columnDefs } from './columns'
import { EntityListTemplate } from '@/components/entity-list-template/entity-list-template'
import { getPlanets } from '@/services/planets'

export default function Page() {
  return (
    <EntityListTemplate
      collection="planets"
      columns={columnDefs}
      fetchFn={getPlanets}
      getKey={(data) => data.url}
    />
  )
}
