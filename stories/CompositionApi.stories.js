import CompositionApi from '@/components/CompositionApi.vue'

export default {
    title: 'components/CompositionApi',
}

const Template = (args, { argTypes }) => ({
    components: { CompositionApi },
    props: Object.keys(argTypes),
    template: '<CompositionApi v-bind="$props" user-id=""/>',
})

export const Basic = Template.bind({})

Basic.args = {
    userId: 1
}