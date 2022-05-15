import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it } from 'vitest'
import Avatar from '../../components/Avatar.vue'

describe("Avatar", () => {
  it('Renders avatar', async () => {
    render(Avatar)
  })
})