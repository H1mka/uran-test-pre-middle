/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { inputMask } from '../../src/directives'
import InputsForm from '../../src/components/forms/InputsForm.vue'

describe('InputsForm component', () => {
  it('should render correctly', () => {
    const wrapper = mount(InputsForm, { directive: { mask: inputMask } })

    const input = wrapper.element
    expect(input).toBeDefined()
  })

  it('all inputs should render correctly', async () => {
    const wrapper = mount(InputsForm, { directive: { mask: inputMask } })
    const inputNames = [
      'date',
      'time',
      'date_time',
      'cep',
      'phone',
      'phone_ddd',
      'phone_us',
      'mixed',
      'ip_address'
    ]

    inputNames.forEach(async (name) => {
      const input = wrapper.find(`input[name="${name}"]`)

      // test if input exist
      expect(input.exists()).toBe(true)

      // test if input can get a values
      await input.setValue('test value')
      expect(input.element.value).toBe('test value')
    })
  })
})
