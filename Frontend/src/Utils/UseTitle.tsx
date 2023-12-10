import { useEffect } from "react"

function useTitle(myTitle: string): void {
    useEffect(() => {
        document.title = myTitle
    }, [])
}

export default useTitle;