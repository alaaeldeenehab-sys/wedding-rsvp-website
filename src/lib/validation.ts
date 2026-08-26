export const validateFullName = (name: string): boolean => {
  const parts = name.trim().split(' ')
  return parts.length >= 2 && parts.every(part => part.length > 0)
}

export const validateGuestCount = (count: number): boolean => {
  return count >= 1 && count <= 10 && Number.isInteger(count)
}