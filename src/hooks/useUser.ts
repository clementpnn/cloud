import { create } from 'zustand'

interface UserStore {
  token: string
  setToken: ( _newToken: string ) => void
  role: string
  setRole: ( _newRole: string ) => void
}
  
const useUser = create<UserStore>( set => ( {
  token: '',
  setToken: ( newToken: string ) => set( { token: newToken } ),
  role: '',
  setRole: ( newRole: string ) => set( { role: newRole } ),
} ) )

export default useUser