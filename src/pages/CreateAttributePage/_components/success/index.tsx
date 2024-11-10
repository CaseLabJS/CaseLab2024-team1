import { observer } from 'mobx-react-lite'

interface Props {
  success: string
}
const Success = observer((props: Props) => {
  return <p style={{ color: 'green' }}>{props.success}</p>
})

export default Success
