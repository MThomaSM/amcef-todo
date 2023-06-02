import React, {useEffect, useState} from "react";
import NewEditList from "@/components/list/NewEditList";
import Authenticated from "@/components/Authenticated";


const  EditListPage: React.FC = () => {
    return (
        <Authenticated>
            <NewEditList type={"edit"}/>
        </Authenticated>
    )
}
export default EditListPage;