import useInitStore from "src/hooks/useInitStore";

interface InitStoreProps{
    children: React.ReactElement[]
}
export default function InitStoreProvider({ children }: InitStoreProps){

    // INIT REDUX STORE HERE
    useInitStore();

    return(
        <>{children}</>
    )
}