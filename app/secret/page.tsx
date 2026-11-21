import type { Metadata } from 'next'
import SecretWorkspace from './secret-workspace'

export const metadata: Metadata = {
  title: 'OpexSploit UI · Visual Demo',
  description: 'A visual-only dark blue code workspace mockup for OpexSploit UI.',
  robots: { index: false, follow: false },
}

export default function SecretPage() {
  return <SecretWorkspace />
}
