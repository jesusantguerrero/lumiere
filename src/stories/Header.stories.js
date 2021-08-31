import MyHeader from '../components/Header.vue';

export default {
  title: 'Components/Header',
  component: MyHeader,
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { MyHeader },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object
    return { ...args };
  },
  // Then, the spread values can be accessed directly in the template
  template: '<my-header :user="user" />',
});

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  title: "Lumiere",
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  title: "Lumiere",
  user: null,
};
