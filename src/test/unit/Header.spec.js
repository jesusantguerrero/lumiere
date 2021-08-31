import { render, screen, fireEvent } from '@testing-library/vue'
import Header from '../../components/Header.vue'

test('emits logout on click', async () => {
  // The `render` method renders the component into the document.
  // It also binds to `screen` all the available queries to interact with
  // the component.
  render(Header, {
      props: {
          user: {},
      }
  })

  const button = screen.getByText('Logout')
  // Click a couple of times.
  await fireEvent.click(button);
})