import { useState } from "react";
import { useParams } from "react-router"

const ProjectDetailPage = () =>{

    const { id } = useParams();
    const [project, setProject] = useState();
    const [expandedStages, setExpandedStages] = useState(false);

    
}

export default ProjectDetailPage;