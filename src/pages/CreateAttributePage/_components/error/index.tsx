interface Props {
  error: string
}
const Error = (props: Props) => {
  return <p style={{ color: 'red' }}>{props.error}</p>
}

export default Error
