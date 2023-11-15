import { shallowMount } from '@vue/test-utils';
import CardComponent from '@/components/cardComponent.vue';

describe('CardComponent.vue', () => {
  const testProps = {
    name: 'card name',
    price: 20,
    details: 'Card details',
    imageSrc: 'https://example.com/image.jpg',
  };

  it('renders props when passed', () => {
    const wrapper = shallowMount(CardComponent, {
      propsData: testProps,
    });

    // Add assertions for rendering props
    expect(wrapper.text()).toMatch(testProps.name);
    expect(wrapper.text()).toMatch(`Rs ${testProps.price}`);
    expect(wrapper.text()).toMatch(testProps.details);
    expect(wrapper.find('img').attributes('src')).toBe(testProps.imageSrc);
  });

  it('emits edit-card event on edit button click', async () => {
    const wrapper = shallowMount(CardComponent, {
      propsData: testProps,
    });

    await wrapper.find('[data-action="edit"]').trigger('click');

    expect(wrapper.emitted('edit-card')).toBeTruthy();
  });

  it('emits delete-card event on delete button click', async () => {
    const wrapper = shallowMount(CardComponent, {
      propsData: testProps,
    });

    await wrapper.find('[data-action="delete"]').trigger('click');

    expect(wrapper.emitted('delete-card')).toBeTruthy();
  });
});
