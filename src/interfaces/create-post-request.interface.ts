type MyFormFields = "image" | "caption";

export interface CreatePostRequest extends FormData{
  append(name: MyFormFields, value: string | Blob, fileName?: string): void
}