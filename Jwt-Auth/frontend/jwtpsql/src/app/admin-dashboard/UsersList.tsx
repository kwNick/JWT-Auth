import User from "@/lib/userModel"

const UsersList = ({ users }: { users: User[] }) => {
    // const [users, setUsers] = useState<User[]>(users)
    return (
        <ul>
            {users.map((user: User) => (
                <li key={user.id}>{user.username}</li>
            ))}
        </ul>
    )
}
export default UsersList