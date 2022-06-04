import Link from '@/components/Link.vue'

export default {
    title: 'components/Link',
}

const Template = (args, { argTypes }) => ({
    components: { Link },
    props: Object.keys(argTypes),
    template: '<Link v-bind="$props"/>',
})

export const Basic = Template.bind({})
Basic.args = {
    name: 'Et aliqua labore nostrud qui nulla nisi elit cillum.',
    show: true,
    list: [
        {id: 0, name: 'Gati'},
        {id: 1, name: 'Niña'},
        {id: 2, name: 'Mu'},
        {id: 3, name: 'Ra'},
        {id: 4, name: 'Filiberto'}
    ]
}