import { useSelector } from "react-redux"
import { useTypedSelector } from "../../hooks/useTypedSelector";

const UserList: React.FC = () => {
    const {users,error,loading} = useTypedSelector(state => state.user);
    console.log(users);
    return (
        <div>

        </div>
    )
}

export default UserList;