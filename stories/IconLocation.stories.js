import IconLocation from '@/components/icons/Location.vue'

export default {
    title: 'components/IconLocation',
}

const Template = (args, { argTypes }) => ({
    components: { IconLocation },
    props: Object.keys(argTypes),
    template: '<IconLocation v-bind="$props"/>',
})

export const Basic = Template.bind({})
Basic.args = {
    color: '#444ff2',
    hover: '#ff0000'
}