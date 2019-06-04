import TokenService from '../../services/token-service';
class SingleProject extends React.Component{

    renderBidButton = () => {
        return <>
        <button></button>
        </>
    }

    render(){
        return(
            <article>
                <h3>Project Title:</h3>
                <p>Project Description:</p>
                <p>Languages:</p>
                <p>Minimum Reqs:</p>
                <p>Personnel Count:</p>
                <p>Deadline:</p>
                <p>Personnel Count:</p>
                {
                    TokenService.hasAuthToken()
                    ? renderBidButton()
                    : null
                }
            </article>
        )
    }
}

export default SingleProject;