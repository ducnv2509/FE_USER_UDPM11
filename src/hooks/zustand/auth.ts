import create from 'zustand'

export type RoleType = 'anonymous' | 'user' | 'admin'

export interface updateAuthParams {
    newRole: RoleType
    newAccessToken: string,
    newName: string,
    newId: string
}

interface AuthState {
    role: RoleType
    accessToken: string
    name: string,
    id: string,
    updateAuth: (params: updateAuthParams) => void
    resetAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    role: localStorage.getItem('UDPM11-role')
        ? (localStorage.getItem('UDPM11-role') as RoleType)
        : 'anonymous',
    accessToken: localStorage.getItem('UDPM11-accessToken')
        ? (localStorage.getItem('UDPM11-accessToken') as string)
        : 'empty access token',
    name: localStorage.getItem('UDPM11-name')
        ? (localStorage.getItem('UDPM11-name') as string)
        : 'default',
    id: localStorage.getItem('UDPM11-id')
        ? (localStorage.getItem('UDPM11-id') as string)
        : 'default',
    updateAuth: (newAuth) => {
        localStorage.setItem('UDPM11-role', newAuth.newRole)
        localStorage.setItem('UDPM11-accessToken', newAuth.newAccessToken)
        localStorage.setItem('UDPM11-name', newAuth.newName)
        localStorage.setItem('UDPM11-id', newAuth.newId)
        set({ role: newAuth.newRole, accessToken: newAuth.newAccessToken, name: newAuth.newName, id: newAuth.newId })
    },
    resetAuth: () => {
        localStorage.removeItem('UDPM11-role')
        localStorage.removeItem('UDPM11-accessToken')
        localStorage.removeItem('UDPM11-name')
        localStorage.removeItem('UDPM11-id')
        set({ role: 'anonymous', accessToken: "empty access token", name: 'default' })
    },
}))