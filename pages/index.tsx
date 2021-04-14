import {
  useSession, signIn, signOut
} from 'next-auth/client'
import { Button, ButtonGroup } from "@chakra-ui/react";
export default function Component() {
  const [ session, loading ] = useSession()
  if(session) {
    return <>
      Signed in as {session.user.email} <br/>
      <Button onClick={(): Promise<void> => signOut()}>Sign out</Button>
    </>
  }
  return <>
    Not signed in <br/>
    <Button onClick={(): Promise<void> => signIn()}>Sign in</Button>
  </>
}
