import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(private)/account')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(private)/account"!</div>
}
