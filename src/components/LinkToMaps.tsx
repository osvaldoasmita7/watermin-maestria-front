import { PushpinOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
interface Props {
    street: string, exterior: string, cologne: string, delegation: string, postalcode: string
}
export const LinkToMaps = ({ street, exterior, cologne, delegation, postalcode }: Props) => {
    return (
        <Link
            to={`https://www.google.com.mx/maps/search/${street} ${exterior}. ${cologne}. ${delegation}. ${postalcode}. México`}
        >
            <PushpinOutlined style={{ marginRight: 10 }} />
            Ubicación aproximada
        </Link>
    )
}

