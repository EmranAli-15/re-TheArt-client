import { useEffect } from "react"

const useTitle = title => {
    useEffect(() => {
        document.title = `${title} | THE ART`;
    }, [title])
}
export default useTitle;