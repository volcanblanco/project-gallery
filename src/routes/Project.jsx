import "./Project.css"

function Project(props){
    return <section className="projectContainer">
        <div className="projectWrapper">
            <section>
                <div className="projectTitle">
                    <h1>{props.projectName}</h1>
                </div>
                <div className="backButtonWrapper"><a className="backButton" href={`/`}>&#60; Back</a></div>
                <p>{props.content}</p>
                <div className={props.url + ` projectImage`}>
                    {props.images.map((imageURL, key) => (
                        <img
                          key={key}
                          src={imageURL.split("public/")[1]}
                        />
                    ))}
                </div>
            </section>
        </div>
    </section>
}

export default Project