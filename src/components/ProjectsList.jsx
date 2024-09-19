import "./ProjectsList.css"
 
function ProjectsList(props) {

  return (
    <ul className="projectsList">
      {props.projectNames.map((projectName, key) => {
        return (
          <li key={key}>
            <a href={`/${props.projectUrls[key]}`}>{projectName}</a>
          </li>
        )
      })}
    </ul>
  )
}

export default ProjectsList
