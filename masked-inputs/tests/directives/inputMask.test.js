/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { inputMask } from '../../src/directives'

describe('v-mask directive', () => {
  it('should mount', async () => {
    const wrapper = mount({
      template: '<input v-mask />',
      directives: { inputMask }
    })

    const input = wrapper.element
    expect(input).toBeDefined()
  })

  // DATE
  it('should format date correctly', async () => {
    const wrapper = mount({
      template: '<input v-mask:date />',
      directives: { mask: inputMask }
    })

    const input = wrapper.find('input')
    const testCases = [
      { testValue: '12252024', expected: '12/25/2024' },
      { testValue: '122abcfw52025', expected: '12/25/2025' },
      { testValue: '1', expected: '1' },
      { testValue: '1234', expected: '12/34' }
    ]

    for (const { testValue, expected } of testCases) {
      await input.setValue(testValue)
      await input.trigger('input')

      expect(input.element.value).toBe(expected)
    }
  })

  // TIME
  it('should format time correctly', async () => {
    const wrapper = mount({
      template: '<input v-mask:time />',
      directives: { mask: inputMask }
    })

    const input = wrapper.find('input')
    const testCases = [
      { testValue: '161533', expected: '16:15:33' },
      { testValue: '122abcfw52025', expected: '12:25:20' },
      { testValue: '1', expected: '1' },
      { testValue: '1234', expected: '12:34' }
    ]

    for (const { testValue, expected } of testCases) {
      await input.setValue(testValue)
      await input.trigger('input')

      expect(input.element.value).toBe(expected)
    }
  })

  // DATE_TIME
  it('should format date_time correctly', async () => {
    const wrapper = mount({
      template: '<input v-mask:date_time />',
      directives: { mask: inputMask }
    })

    const input = wrapper.find('input')
    const testCases = [
      { testValue: '20112025161743', expected: '20/11/2025 16:17:43' },
      { testValue: '122abcfw52025161743', expected: '12/25/2025 16:17:43' },
      { testValue: '122abcfw52025', expected: '12/25/2025' },
      { testValue: '1107', expected: '11/07' }
    ]

    for (const { testValue, expected } of testCases) {
      await input.setValue(testValue)
      await input.trigger('input')

      expect(input.element.value).toBe(expected)
    }
  })

  // CEP
  it('should format cep correctly', async () => {
    const wrapper = mount({
      template: '<input v-mask:cep />',
      directives: { mask: inputMask }
    })

    const input = wrapper.find('input')
    const testCases = [
      { testValue: '12345678', expected: '12345-678' },
      { testValue: '123ab4f5678eee', expected: '12345-678' },
      { testValue: 'abc', expected: '' },
      { testValue: '12345', expected: '12345' }
    ]

    for (const { testValue, expected } of testCases) {
      await input.setValue(testValue)
      await input.trigger('input')

      expect(input.element.value).toBe(expected)
    }
  })

  // PHONE
  it('should format phone correctly', async () => {
    const wrapper = mount({
      template: '<input v-mask:phone />',
      directives: { mask: inputMask }
    })

    const input = wrapper.find('input')
    const testCases = [
      { testValue: '12345678', expected: '1234-5678' },
      { testValue: '123ab4f5678eee', expected: '1234-5678' },
      { testValue: 'abc', expected: '' },
      { testValue: '1234', expected: '1234' }
    ]

    for (const { testValue, expected } of testCases) {
      await input.setValue(testValue)
      await input.trigger('input')

      expect(input.element.value).toBe(expected)
    }
  })

  // PHONE_DDD
  it('should format phone_ddd correctly', async () => {
    const wrapper = mount({
      template: '<input v-mask:phone_ddd />',
      directives: { mask: inputMask }
    })

    const input = wrapper.find('input')
    const testCases = [
      { testValue: '1234567890', expected: '(12) 3456-7890' },
      { testValue: '12f3 45w6*7.890', expected: '(12) 3456-7890' },
      { testValue: 'abc', expected: '' },
      { testValue: '1234', expected: '(12) 34' }
    ]

    for (const { testValue, expected } of testCases) {
      await input.setValue(testValue)
      await input.trigger('input')

      expect(input.element.value).toBe(expected)
    }
  })

  // PHONE_US
  it('should format phone_us correctly', async () => {
    const wrapper = mount({
      template: '<input v-mask:phone_us />',
      directives: { mask: inputMask }
    })

    const input = wrapper.find('input')
    const testCases = [
      { testValue: '1234567890', expected: '(123) 456-7890' },
      { testValue: '12f3 45w6*7.890', expected: '(123) 456-7890' },
      { testValue: 'abc', expected: '' },
      { testValue: '1234567', expected: '(123) 456-7' }
    ]

    for (const { testValue, expected } of testCases) {
      await input.setValue(testValue)
      await input.trigger('input')

      expect(input.element.value).toBe(expected)
    }
  })

  // MIXED
  it('should format mixed correctly', async () => {
    const wrapper = mount({
      template: '<input v-mask:mixed />',
      directives: { mask: inputMask }
    })

    const input = wrapper.find('input')
    const testCases = [
      { testValue: 'AAA000SOS', expected: 'AAA 000-SOS' },
      { testValue: 'aaa000sos', expected: 'AAA 000-SOS' },
      { testValue: '555AAA222%$@', expected: '' },
      { testValue: 'qwe 51FF', expected: 'QWE 51' }
    ]

    for (const { testValue, expected } of testCases) {
      await input.setValue(testValue)
      await input.trigger('input')

      expect(input.element.value).toBe(expected)
    }
  })

  // IP ADDRESS
  it('should format ip_address correctly', async () => {
    const wrapper = mount({
      template: '<input v-mask:ip_address />',
      directives: { mask: inputMask }
    })

    const input = wrapper.find('input')
    const testCases = [
      { testValue: '099.099.099.099', expected: '099.099.099.099' },
      { testValue: '2551382421', expected: '255.138.242.1' },
      { testValue: '2a *5%5ffw1382421', expected: '255.138.242.1' },
      { testValue: 'fw!%$#!#^*TEXT', expected: '' }
    ]

    for (const { testValue, expected } of testCases) {
      await input.setValue(testValue)
      await input.trigger('input')

      expect(input.element.value).toBe(expected)
    }
  })
})
