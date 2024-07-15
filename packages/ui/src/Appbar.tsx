import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return <div className="flex justify-between border-b px-4 border-slate-300">
        <div className="text-3xl flex flex-col justify-center font-bold">
            PayTM
        </div>
        <div className="flex justify-center pt-2 text-lg font-bold">
            <div className="flex flex-col justify-center mr-3 pb-2">
                Hello, {user?.name}
            </div>
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}