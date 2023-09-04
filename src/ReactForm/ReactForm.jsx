import React from "react";
import StudentInput from "./StudentInput";
import StudentTable from "./StudentTable";

const ReactForm = () => {
    return (
        <div className="container">
            <StudentInput/>
            <StudentTable/>
        </div>
    );
};

export default ReactForm;
