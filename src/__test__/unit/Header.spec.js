import { render, screen, fireEvent } from '@testing-library/vue'
import Header from '../../components/Header.vue'

test('emits logout on click', async () => {
  render(Header, {
      props: {
          user: {},
      }
  })
  const button = screen.getByText('Logout')
  await fireEvent.click(button);
})