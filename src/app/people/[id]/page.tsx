interface Props {
  params: {
    id: string
  }
}

export default async function Page({ params }: Props) {
  return <h1>{params.id} oi</h1>
}
