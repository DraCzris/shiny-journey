type FileUploadProps = {
  onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  accept?: string
  multiple?: boolean
  children?: React.ReactNode
} & React.InputHTMLAttributes<HTMLInputElement>

export const FileUpload = (props: FileUploadProps) => {
  const { onFileChange, accept, multiple, children, ...rest } = props

  return (
    <label>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={onFileChange}
        style={{ display: 'none' }}
        {...rest}
      />
      {children}
    </label>
  )
}
