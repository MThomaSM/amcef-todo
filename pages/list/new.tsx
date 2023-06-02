import React, {useState} from "react";
import NewEditList from "@/components/list/NewEditList";
import Authenticated from "@/components/Authenticated";

const  NewListPage: React.FC = () => {
    return (
        <Authenticated>
            <NewEditList type={"new"}/>
        </Authenticated>
    )
}
export default NewListPage;