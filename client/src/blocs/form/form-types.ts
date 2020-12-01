export interface FormBlocOptions<T, R> {
  onSubmit?: (formData: T) => Promise<R>;
  onSuccess?: (result: R) => void;
  submitOnChange?: boolean;
}
