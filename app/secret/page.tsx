import type { Metadata } from 'next'
import SecretWorkspace from './secret-workspace'

export const metadata: Metadata = {
  title: 'Opex Hub · Secret Workspace',
  description: 'A visual-only macOS-inspired Opex Hub workspace mockup.',
  robots: { index: false, follow: false },
}

export default function SecretPage() {
  return <SecretWorkspace />
}
