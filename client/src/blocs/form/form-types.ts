export interface FormBlocOptions<T, R> {
  onSubmit?: (formData: T) => Promise<R> | R | void;
  onSuccess?: (result: R) => void;
  submitOnChange?: boolean;
}
