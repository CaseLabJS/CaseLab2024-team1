import { observer } from 'mobx-react-lite'

interface Props {
  error: string
}
const Error = observer((props: Props) => {
  return <p style={{ color: 'red', textAlign: 'center' }}>{props.error}</p>
})

export default Error
