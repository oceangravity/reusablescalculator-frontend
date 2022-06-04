import { accessorType } from '~/store'

declare module '@nuxt/types' {
    interface Context {
        $accessor: typeof accessorType
    }
}

declare module 'vue/types/vue' {
    interface Vue {
        $accessor: typeof accessorType
    }
}