// Siumulates Rust blocks
export function block<T>(inner: () => T) {
  return inner()
}
