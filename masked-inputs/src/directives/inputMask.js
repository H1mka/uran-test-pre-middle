const maskedValues = {
  date: '00/00/0000',
  time: '00:00:00',
  date_time: '00/00/0000 00:00:00',
  cep: '00000-000',
  phone: '0000-0000',
  phone_ddd: '(00) 0000-0000',
  phone_us: '(000) 000-0000',
  mixed: 'AAA 000-S0S',
  ip_address: '099.099.099.099'
}

const inputMask = {
  mounted(el, binding) {
    // check is arg correct
    if (!Object.keys(maskedValues).includes(binding.arg)) {
      console.error('Wrong mask key in v-mask directive')
      return
    }

    const onInputChange = (event) => {
      applyMask(event.target, binding.arg)
    }

    el.placeholder = maskedValues[binding.arg] || ''
    el.addEventListener('input', onInputChange)
  },

  unmounted(el, binding) {
    el.removeEventListener('input', onInputChange)
  }
}

function applyMask(target, maskName) {
  try {
    const { value } = target
    const maskMap = {
      date: () => formatDate(value),
      time: () => formatTime(value),
      date_time: () => formatDateTime(value),
      cep: () => formatCep(value),
      phone: () => formatPhone(value),
      phone_ddd: () => formatPhoneWithDDD(value),
      phone_us: () => formatPhoneUS(value),
      mixed: () => formatMixed(value),
      ip_address: () => formatIpAddress(value)
    }

    target.value = maskMap[maskName]()
  } catch (error) {
    console.error('Error in v-mask derictive with applyMask method', error)
  }
}

function formatDate(value) {
  value = clearAndSlice(value, 8)

  if (value.length <= 2) return value
  if (value.length <= 4) return value.replace(/^(\d{2})(\d{0,2})/, '$1/$2')

  return value.replace(/^(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3')
}

function formatTime(value) {
  value = clearAndSlice(value, 6)

  if (value.length <= 2) {
    return value
  }
  if (value.length <= 4) {
    return value.replace(/^(\d{2})(\d{0,2})/, '$1:$2')
  }

  return value.replace(/^(\d{2})(\d{2})(\d{0,2})/, '$1:$2:$3')
}

function formatDateTime(value) {
  value = clearAndSlice(value, 14)

  if (value.length <= 8) {
    return formatDate(value)
  }
  if (value.length > 8) {
    const secondPart = value.slice(8)
    return `${formatDate(value)} ${formatTime(secondPart)}`
  }

  return value
}

function formatCep(value) {
  value = clearAndSlice(value, 8)

  if (value.length <= 5) {
    return value
  }

  return value.replace(/^(\d{5})(\d{0,3})/, '$1-$2')
}

function formatPhone(value) {
  value = clearAndSlice(value, 8)

  if (value.length <= 4) {
    return value
  }

  return value.replace(/^(\d{4})(\d{0,4})/, '$1-$2')
}

function formatPhoneWithDDD(value) {
  value = clearAndSlice(value, 10)

  if (value.length <= 2) {
    return value
  }
  if (value.length <= 6) {
    return value.replace(/^(\d{2})(\d{0,4})/, '($1) $2')
  }

  return value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
}

function formatPhoneUS(value) {
  value = clearAndSlice(value, 10)

  if (value.length <= 3) {
    return value
  }
  if (value.length <= 6) {
    return value.replace(/^(\d{3})(\d{0,3})/, '($1) $2')
  }

  return value.replace(/^(\d{3})(\d{3})(\d{0,4})/, '($1) $2-$3')
}

function formatMixed(value) {
  const maxLength = 9
  value = value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, maxLength)

  if (value.length <= 3) {
    return value.replace(/[^A-Z]/, '')
  }
  if (value.length <= 6) {
    const validValue = value.slice(0, 3) + value.slice(3, 6).replace(/\D/g, '')
    return validValue.replace(/^([A-Z]{3})(\d{1,3})/, '$1 $2')
  }
  if (value.length <= 9) {
    const validValue = value.slice(0, 6) + value.slice(6).replace(/[^A-Z]/, '')
    return validValue.replace(/^([A-Z]{3})(\d{3})([A-Z]{0,3})/, '$1 $2-$3')
  }
}

function formatIpAddress(value) {
  value = clearAndSlice(value, 12)

  if (value.length <= 3) {
    return value
  }
  if (value.length <= 6) {
    return value.replace(/^(\d{3})(\d{0,3})/, '$1.$2')
  }
  if (value.length <= 9) {
    return value.replace(/^(\d{0,3})(\d{0,3})(\d{0,3})/, '$1.$2.$3')
  }

  return value.replace(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,3})/, '$1.$2.$3.$4')
}

function clearAndSlice(value, maxLength) {
  if (!value || !Number(maxLength)) return ''

  return value.replace(/\D/g, '').slice(0, maxLength)
}

export default inputMask
