import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import About from '@/pages/About.vue'

describe('About', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(About, {
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
