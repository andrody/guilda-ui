export const maskCpf = (v) => {
  if (v) {
    v = v.replace(/\D/g, '') // Remove tudo o que não é dígito
    v = v.replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2') // Coloca um hífen entre o terceiro e o quarto dígitos
  }
  return v
}

export const maskPhone = (v) => {
  if (!v) return v
  const phone = v.match(/(\d{2})(\d{2})(\d{4})(\d+)/)
  return `(${phone[2]}) ${phone[3]}-${phone[4]}`
}

export const soNumeros = v => v.replace(/\D/g, '')

export const moeda = (z) => {
  let v
  v = z
  v = v.replace(/\D/g, '') // permite digitar apenas números
  v = v.replace(/[0-9]{12}/, 'inválido') // limita pra máximo 999.999.999,99
  v = v.replace(/(\d{1})(\d{8})$/, '$1.$2') // coloca ponto antes dos últimos 8 digitos
  v = v.replace(/(\d{1})(\d{5})$/, '$1.$2') // coloca ponto antes dos últimos 5 digitos
  v = v.replace(/(\d{1})(\d{1,2})$/, '$1,$2') // coloca virgula antes dos últimos 2 digitos
  // z.value = v
  return v
}

export const dateOfBirthFormatter = (dateOfBirth) => {
  dateOfBirth = dateOfBirth.replace(/\D/g, '').substr(0, 8)

  const pattern1 = /(\d{2})(\d{2})(\d+)/
  if (dateOfBirth.match(pattern1)) {
    return dateOfBirth.replace(pattern1, '$1/$2/$3')
  }

  const pattern2 = /(\d{2})(\d+)/
  if (dateOfBirth.match(pattern2)) {
    return dateOfBirth.replace(pattern2, '$1/$2')
  }

  return dateOfBirth
}

export const toReais = value => (value ? moeda(value.replace('R$ ', '').replace(',', '').replace('.', '')) : moeda(value))
export const hideRS = value => (value ? value.replace('R$ ', '') : value)
