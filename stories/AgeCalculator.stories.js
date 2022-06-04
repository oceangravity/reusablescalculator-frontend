import AgeCalculator from '@/components/AgeCalculator.vue'

export default {
    title: 'components/AgeCalculator',
}

const Template = (args, { argTypes }) => ({
    components: { AgeCalculator },
    props: Object.keys(argTypes),
    template: '<AgeCalculator v-bind="$props"/>',
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