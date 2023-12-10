import pageNotFound from "../../../Assets/pageNotFound.jpg"
import useTitle from "../../../Utils/UseTitle"
import "./page-not-found.css"

function PageNotFound():JSX.Element {
    
    useTitle("Chill Out - Page Not Found")

    return (
        <div className="PageNotFound">
            
           <img className="ImgNotFound" src={pageNotFound} alt="" />
        </div>
    )
}

export default PageNotFound