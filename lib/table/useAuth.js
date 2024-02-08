const user = {
    role: "user"
}

export const isRole = (roles) => roles ? roles?.includes(user.role) : true
