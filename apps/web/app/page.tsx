// app/page.tsx (or similar component file)
// Note: NO "use client" directive is needed. This runs on the server.

import { pgClient } from "@repo/prisma/client";

// The component is made 'async' and fetches data before rendering
const Home = async () => {
    let users = [];

    try {
        // This direct database call is safe because it's on the server
        users = await pgClient.user.findMany();
    } catch (error) {
        console.error("Server Error fetching data:", error);
        return <div>Error loading users.</div>;
    }

    return (
        <div>
            <h1>Users List</h1>
            {users.length === 0 ? (
                <div>No users found.</div>
            ) : (
                users.map((user: any) => (
                    // Always use a unique 'key' when mapping
                    <div key={user.id} className="user-item">
                        {/* Assuming your user object has an 'email' property */}
                        **Email:** {user.email}
                    </div>
                ))
            )}
        </div>
    );
}

export default Home;